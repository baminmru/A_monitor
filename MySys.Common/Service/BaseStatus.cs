using System;
using System.Collections.Generic;
using System.Text;

namespace MySys.Common.Service
{
    public enum BaseStatus : int
    {
        Exception = -99,
        IncorrectRequest = -98,
        VersionMismach = -97,
        AccessDenied = -96,
        Error = -95,
        AllCategoriesNotAvailable = -92,

        Success = 0,

        UnauthorizedAccess = 403,

    }
}
