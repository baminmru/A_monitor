using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using MySys.Common.Extensions;
using MySys.Common.Service;
using MySys.Identity.Data;
using MySys.Identity.Models;
using a_srv.models;
using a_srv.Services.Data.User;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace a_srv.Controllers
{
    [Produces("application/json")]
    public class HomeController : Controller
    {
        //private readonly MyContext _context;

        public HomeController()
        {
            // _context = context;

        }

        // GET: /<controller>/
        public async Task<IActionResult> Index()
        {
            return View();
        }
    }
}
