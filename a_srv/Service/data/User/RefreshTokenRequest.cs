using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a_srv.Services.Data.User
{
    public class RefreshTokenRequest : BaseRequest
    {
        public string RefreshToken { get; set; }
    }
}
