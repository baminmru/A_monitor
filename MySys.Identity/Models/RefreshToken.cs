using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MySys.Identity.Models
{
    public class RefreshToken
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime DateIssued { get; set; }
        public bool IsExpired { get; set; }
        public string Token { get; set; }
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }

    }
}
