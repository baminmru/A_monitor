using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MySys.Identity.Models
{
    public class MyIdentityRole : IdentityRole<Guid>
    {
        public const string ROLE_SUPERADMIN = "SUPERADMIN";
        public const string ROLE_MOBILEAPP = "MOBILEAPP";

        public const string ROLE_ADMIN = "Администратор";
        public const string ROLE_CLIENT = "Клинет";
        public const string ROLE_DISPATCHER = "Диспетчер";
        
        public static List<string> ALL_ROLES = new List<string>
        {
            ROLE_ADMIN, ROLE_CLIENT, ROLE_DISPATCHER
        };
    }
}

