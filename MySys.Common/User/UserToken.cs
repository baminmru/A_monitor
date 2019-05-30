//using Microsoft.AspNetCore.Identity;
//using MySys.Identity.Models;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MySys.Common.User
{
    public class UserToken
    {
        public Guid Id { get; set; }
        public UserToken()
        {

        }
        public UserToken(string id)
        {
            this.Id =  new Guid(id);
        }
    }
}
