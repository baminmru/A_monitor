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
    [Route("api/MONSRV_PORTS")]
    public class MONSRV_PORTSController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONSRV_PORTSController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONSRV_PORTS
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetMONSRV_PORTS()
        {
            return Json (_context.MONSRV_PORTS, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONSRV_PORTSId id, ( [dbo].[MONSRV_PORTS_BRIEF_F](MONSRV_PORTSId,null)  ) name
                         FROM            
                          MONSRV_PORTS 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONSRV_PORTS where MONSRV_INFOID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONSRV_PORTS/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetMONSRV_PORTS([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONSRV_PORTS = await _context.MONSRV_PORTS.SingleOrDefaultAsync(m => m.MONSRV_PORTSId == id);

            if (varMONSRV_PORTS == null)
            {
                return NotFound();
            }

            return Ok(varMONSRV_PORTS);
        }

        // PUT: api/MONSRV_PORTS/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutMONSRV_PORTS([FromRoute] Guid id, [FromBody] MONSRV_PORTS varMONSRV_PORTS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONSRV_PORTS.MONSRV_PORTSId)
            {
                return BadRequest();
            }

            _context.Entry(varMONSRV_PORTS).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONSRV_PORTSExists(id))
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

        // POST: api/MONSRV_PORTS
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostMONSRV_PORTS([FromBody] MONSRV_PORTS varMONSRV_PORTS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONSRV_PORTS.Add(varMONSRV_PORTS);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONSRV_PORTS", new { id = varMONSRV_PORTS.MONSRV_PORTSId }, varMONSRV_PORTS);
        }

        // DELETE: api/MONSRV_PORTS/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteMONSRV_PORTS([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONSRV_PORTS = await _context.MONSRV_PORTS.SingleOrDefaultAsync(m => m.MONSRV_PORTSId == id);
            if (varMONSRV_PORTS == null)
            {
                return NotFound();
            }

            _context.MONSRV_PORTS.Remove(varMONSRV_PORTS);
            await _context.SaveChangesAsync();

            return Ok(varMONSRV_PORTS);
        }

        private bool MONSRV_PORTSExists(Guid id)
        {
            return _context.MONSRV_PORTS.Any(e => e.MONSRV_PORTSId == id);
        }
    }
}
