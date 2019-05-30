using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace a_srv.Services.Data.User
{
    public class GetOrganizationUsersRequest
    {
        public Guid Id { get; set; }
    }

    public class GetOrganizationUsersResponse
    {
        public List<OrganizationUserItem> Items { get; set; }
    }

    public class OrganizationUserItem
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
