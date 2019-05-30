using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a_srv.Services.Data.User
{
    public class LoginRequest
    {
        public string appsecret { get; set; }
        public string clientid { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public UserDeviceData Device { get; set; }
    }
    public class UserDeviceData
    {
        public string DeviceOS { get; set; }
        public string DeviceToken { get; set; }
        public string AppVersion { get; set; }
    }
}
