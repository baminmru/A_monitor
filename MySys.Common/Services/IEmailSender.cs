using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MySys.Common.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(
            string text,
            string subject,
            string toName,
            string toAddress);
    }
}
