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

namespace a_srv.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/logcall")]
    public class logcallController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public logcallController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/logcall
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult Getlogcall()
        {
            return Json (_context.logcall, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT logcallId id, ( [dbo].[logcall_BRIEF_F](logcallId,null)  ) name
                         FROM            
                          logcall 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_logcall ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/logcall/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> Getlogcall([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varlogcall = await _context.logcall.SingleOrDefaultAsync(m => m.logcallId == id);

            if (varlogcall == null)
            {
                return NotFound();
            }

            return Ok(varlogcall);
        }

        // PUT: api/logcall/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> Putlogcall([FromRoute] Guid id, [FromBody] logcall varlogcall)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varlogcall.logcallId)
            {
                return BadRequest();
            }

            _context.Entry(varlogcall).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!logcallExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/logcall
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> Postlogcall([FromBody] logcall varlogcall)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.logcall.Add(varlogcall);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getlogcall", new { id = varlogcall.logcallId }, varlogcall);
        }

        // DELETE: api/logcall/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> Deletelogcall([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varlogcall = await _context.logcall.SingleOrDefaultAsync(m => m.logcallId == id);
            if (varlogcall == null)
            {
                return NotFound();
            }

            _context.logcall.Remove(varlogcall);
            await _context.SaveChangesAsync();

            return Ok(varlogcall);
        }

        private bool logcallExists(Guid id)
        {
            return _context.logcall.Any(e => e.logcallId == id);
        }
    }
}
