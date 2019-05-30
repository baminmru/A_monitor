using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a_srv.Services.Data.User
{
    public class ChangePasswordRequest
    {
        public Guid Id { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
    public class ChangePasswordResponse
    {
        public string Status { get; set; }
    }
}
