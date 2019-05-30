using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using MySys.Identity.Models;

namespace MySys.Identity.Data
{
    public class MySysIdentityDbContext : IdentityDbContext<ApplicationUser, MyIdentityRole, Guid>
    {
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public MySysIdentityDbContext(DbContextOptions<MySysIdentityDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        
        }
    }
}
