using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a_srv.Services.Data.User
{
    public class CreateUserProfileRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public Guid OrganizationId { get; set; }
        public string Role { get; set; }
        public string Passcode { get; set; }
    }

    public class CreateUserProfileResponse
    {
        public string Status { get; set; }
        public Guid Id { get; set; }
    }
}
