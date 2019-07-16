using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using a_srv.models;
using a_srv.Data;
using a_srv.Service;
using System.IO;
using Newtonsoft.Json;

namespace a_srv.Controllers
{
    [Produces("application/json")]
    [Route("api/LoraInput")]
    public class LoraInputController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;
        private readonly LoraInputService _LoraService;

        public LoraInputController(MyContext context, IHostingEnvironment appEnvironment, LoraInputService LoraService)
        {
            _context = context;
            _appEnvironment = appEnvironment;
            _LoraService = LoraService;
        }

        // GET: api/LoraInput
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "Lora input", "controller" };
        }

               
        // POST: api/LoraInput
        [HttpPost()]
        public async Task<IActionResult> Post([FromBody]LoraPacket packet)
        {
            

            LoraInput li = new LoraInput();
            if (packet != null)
            {
                if (!LoraInputExists(packet.id)) {

                    string result = await _LoraService.SavePacket(packet);
                    return Ok(result);
                }
                else
                {
                    return BadRequest("Packet already received.");
                }
            }
            else
            {

                return BadRequest("packet is null");
            }

        }

        [HttpPost("dataUp")]
        public async Task<IActionResult> Save([FromBody]LoraPacket packet)
        {


            LoraInput li = new LoraInput();
            if (packet != null)
            {
                if (!LoraInputExists(packet.id))
                {

                    string result = await _LoraService.SavePacket(packet);
                    return Ok(result);
                }
                else
                {
                    return BadRequest("Packet already received.");
                }
            }
            else
            {

                return BadRequest("packet is null");
            }

        }

        private bool LoraInputExists(string id)
        {
            return _context.LoraInput.Any(e => e.id == id);
        }

        

    }
}
