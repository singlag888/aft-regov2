﻿using System;
using AFT.RegoV2.Core.Common.Interfaces;

namespace AFT.RegoV2.Core.Payment.Interface.Events
{
    public class PaymentLevelActivated : DomainEventBase
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string ActivatedBy { get; set; }
        public DateTimeOffset ActivatedDate { get; set; }
        public string Remarks { get; set; }
    }
}
