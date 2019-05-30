using IdentityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace MySys.Common.Extensions
{
    public static class ClaimsPrincipalExtension
    {
        public static Guid GetUserId(this ClaimsPrincipal user)
        {
            string val = user.Claims.FirstOrDefault(p => p.Type == ClaimTypes.NameIdentifier).Value;
            if (!string.IsNullOrEmpty(val))
            {
                return new Guid(val);
            }
            else
            {
                return Guid.Empty;
            }
        }

        public static string GetEmail(this ClaimsPrincipal user)
        {
            return user.Claims.FirstOrDefault(p => p.Type == JwtClaimTypes.Email).Value;
        }

        public static IEnumerable<Claim> GetRoles(this ClaimsPrincipal user)
        {
            return user.Claims.Where(p => p.Type == ClaimTypes.Role).ToList();
        }
    }
}
