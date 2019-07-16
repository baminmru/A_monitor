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
    [Route("api/MONSRV_MODEMS")]
    public class MONSRV_MODEMSController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONSRV_MODEMSController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONSRV_MODEMS
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetMONSRV_MODEMS()
        {
            return Json (_context.MONSRV_MODEMS, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONSRV_MODEMSId id, ( [dbo].[MONSRV_MODEMS_BRIEF_F](MONSRV_MODEMSId,null)  ) name
                         FROM            
                          MONSRV_MODEMS 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONSRV_MODEMS where MONSRV_INFOID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONSRV_MODEMS/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetMONSRV_MODEMS([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONSRV_MODEMS = await _context.MONSRV_MODEMS.SingleOrDefaultAsync(m => m.MONSRV_MODEMSId == id);

            if (varMONSRV_MODEMS == null)
            {
                return NotFound();
            }

            return Ok(varMONSRV_MODEMS);
        }

        // PUT: api/MONSRV_MODEMS/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutMONSRV_MODEMS([FromRoute] Guid id, [FromBody] MONSRV_MODEMS varMONSRV_MODEMS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONSRV_MODEMS.MONSRV_MODEMSId)
            {
                return BadRequest();
            }

            _context.Entry(varMONSRV_MODEMS).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONSRV_MODEMSExists(id))
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

        // POST: api/MONSRV_MODEMS
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostMONSRV_MODEMS([FromBody] MONSRV_MODEMS varMONSRV_MODEMS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONSRV_MODEMS.Add(varMONSRV_MODEMS);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONSRV_MODEMS", new { id = varMONSRV_MODEMS.MONSRV_MODEMSId }, varMONSRV_MODEMS);
        }

        // DELETE: api/MONSRV_MODEMS/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteMONSRV_MODEMS([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONSRV_MODEMS = await _context.MONSRV_MODEMS.SingleOrDefaultAsync(m => m.MONSRV_MODEMSId == id);
            if (varMONSRV_MODEMS == null)
            {
                return NotFound();
            }

            _context.MONSRV_MODEMS.Remove(varMONSRV_MODEMS);
            await _context.SaveChangesAsync();

            return Ok(varMONSRV_MODEMS);
        }

        private bool MONSRV_MODEMSExists(Guid id)
        {
            return _context.MONSRV_MODEMS.Any(e => e.MONSRV_MODEMSId == id);
        }
    }
}
