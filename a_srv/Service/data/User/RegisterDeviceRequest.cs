using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a_srv.Services.Data.User
{
    public class RegisterDeviceRequest : BaseRequest
    {
        public string OS { get; set; }
        public string DeviceId { get; set; }
    }
}
