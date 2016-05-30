﻿// Generated by IcedCoffeeScript 108.0.9
(function() {
  define(function(require) {
    var IdentityRemarksDialog, ViewModel, config, confirmation, nav;
    require("controls/grid");
    nav = require("nav");
    IdentityRemarksDialog = require("player-manager/info/remarks-dialog/remarks-dialog");
    confirmation = require("player-manager/info/confirm-dialog/confirm-dialog");
    config = require("config");
    return ViewModel = (function() {
      function ViewModel() {
        this.moment = require("moment");
        this.config = require("config");
        this.playerId = ko.observable();
        this.selectedRowId = ko.observable();
        this.status = ko.observable();
        this.verifyEnabled = ko.computed((function(_this) {
          return function() {
            return _this.selectedRowId() && _this.status() === 'Pending';
          };
        })(this));
        this.unverifyEnabled = ko.computed((function(_this) {
          return function() {
            return _this.selectedRowId() && _this.status() === 'Pending';
          };
        })(this));
      }

      ViewModel.prototype.activate = function(data) {
        return this.playerId(data.playerId);
      };

      ViewModel.prototype.attached = function(view) {
        var $grid, self;
        self = this;
        $grid = findGrid(view);
        $("form", view).submit(function() {
          $grid.trigger("reload");
          return false;
        });
        $(view).on("click", ".identity-remark", function() {
          var id, remark;
          id = $(this).parents("tr").first().attr("id");
          remark = $(this).attr("title");
          return (new IdentityRemarksDialog(id, remark)).show(function() {
            return $grid.trigger("reload");
          });
        });
        return $(view).on("click", ".jqgrow", function() {
          var data, table;
          self.selectedRowId($(this).attr("id"));
          table = $grid.find('.ui-jqgrid-btable');
          data = table.jqGrid('getRowData', self.selectedRowId());
          return self.status(data.VerificationStatus);
        });
      };

      ViewModel.prototype.upload = function() {
        return nav.open({
          path: 'player-manager/documents-upload/upload-identification-doc',
          title: "Upload document",
          data: {
            playerId: this.playerId()
          }
        });
      };

      ViewModel.prototype.verify = function() {
        var confirm;
        confirm = new confirmation((function(_this) {
          return function(onSuccessFunc, onFailedFunc) {
            return $.ajax(config.adminApi('PlayerInfo/VerifyIdDocument'), {
              type: "post",
              data: ko.toJSON({
                id: _this.selectedRowId()
              }),
              contentType: "application/json",
              success: function(response) {
                if (response.result === 'success') {
                  $('#id-documents-grid').trigger('reload');
                  if (onSuccessFunc) {
                    return onSuccessFunc();
                  }
                } else {
                  if (onFailedFunc) {
                    return onFailedFunc(response.data);
                  }
                }
              }
            });
          };
        })(this), "Are you sure you want to verify player's submitted documents?", 'Documents have been sucessfully verified.');
        return confirm.show();
      };

      ViewModel.prototype.unverify = function() {
        var confirm;
        confirm = new confirmation((function(_this) {
          return function(onSuccessFunc) {
            return $.ajax(config.adminApi('PlayerInfo/UnverifyIdDocument'), {
              type: "post",
              data: ko.toJSON({
                id: _this.selectedRowId()
              }),
              contentType: "application/json",
              success: function(response) {
                $('#id-documents-grid').trigger('reload');
                if (onSuccessFunc) {
                  return onSuccessFunc();
                }
              }
            });
          };
        })(this), "Are you sure you want to unverify player's submitted documents?", 'Documents have been sucessfully unverified.');
        return confirm.show();
      };

      return ViewModel;

    })();
  });

}).call(this);