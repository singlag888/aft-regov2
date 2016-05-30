﻿// Generated by IcedCoffeeScript 108.0.9
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["./bonusBase", "komapping", "moment", "i18next", "config"], function(bonusBase, mapping, moment, i18N, config) {
    var ViewBonusModel;
    return ViewBonusModel = (function(_super) {
      __extends(ViewBonusModel, _super);

      function ViewBonusModel() {
        this.activate = __bind(this.activate, this);
        ViewBonusModel.__super__.constructor.call(this);
        this.LicenseeName = ko.observable("");
        this.BrandName = ko.observable("");
        this.created = ko.observable(false);
        this.edited = ko.observable(false);
        this.formatDateRange = function(from, to, includeTime) {
          var endDate, format, startDate;
          format = "YYYY/MM/DD";
          if (includeTime) {
            format += " HH:mm";
          }
          startDate = moment(from, format).format(format);
          endDate = moment(to, format).format(format);
          return "from " + startDate + " to " + endDate;
        };
        this.vTemplateName = ko.computed((function(_this) {
          return function() {
            var template, _i, _len, _ref;
            _ref = _this.templates();
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              template = _ref[_i];
              if (template.Id === _this.TemplateId()) {
                return template.Name;
              }
            }
            return _this.emptyCaption();
          };
        })(this));
        this.vCode = ko.computed((function(_this) {
          return function() {
            if (_this.Code() != null) {
              return _this.Code();
            } else {
              return _this.emptyCaption();
            }
          };
        })(this));
        this.vDuration = ko.computed((function(_this) {
          return function() {
            var combination, dateRange;
            if (_this.DurationType() === 1) {
              combination = _this.formatTimeString(_this.DurationDays(), _this.DurationHours(), _this.DurationMinutes());
              dateRange = _this.formatDateRange(_this.ActiveFrom(), _this.DurationEnd(), true);
              return "" + combination + " (" + dateRange + ")";
            }
            return _this.formatDateRange(_this.DurationStart(), _this.DurationEnd(), true);
          };
        })(this));
        this.vActivityRange = ko.computed((function(_this) {
          return function() {
            return _this.formatDateRange(_this.ActiveFrom(), _this.ActiveTo(), false);
          };
        })(this));
      }

      ViewBonusModel.prototype.activate = function(data) {
        if (data.created !== void 0) {
          this.created(true);
        }
        if (data.edited !== void 0) {
          this.edited(true);
        }
        return $.get(config.adminApi("Bonus/GetRelatedData"), {
          id: data.id
        }).done((function(_this) {
          return function(data) {
            mapping.fromJS(data.Bonus, {}, _this);
            _this.templates(data.Templates);
            return _this.TemplateId.valueHasMutated();
          };
        })(this));
      };

      return ViewBonusModel;

    })(bonusBase);
  });

}).call(this);
