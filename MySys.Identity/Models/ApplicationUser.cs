using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MySys.Identity.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        
        public string OS { get; set; }
        public string DeviceId { get; set; }
        public string Passcode { get; set; }
        public bool IsSingleSignon { get; set; }
        public bool IsDisabled { get; set; }
        public DateTime? ExpireTime { get; set; }
    }
}
