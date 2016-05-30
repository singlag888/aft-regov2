﻿using System.Runtime.Serialization;

namespace AFT.RegoV2.GameApi.ServiceContracts
{
    [DataContract, KnownType(typeof(BatchCommandRequest))]
    public class BatchAdjust : BatchCommandRequest
    {
    }

    [DataContract, KnownType(typeof(BatchCommandResponse))]
    public class BatchAdjustResponse : BatchCommandResponse
    {
    }
}
