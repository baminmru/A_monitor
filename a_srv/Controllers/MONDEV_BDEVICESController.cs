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
    [Route("api/MONDEV_BDEVICES")]
    public class MONDEV_BDEVICESController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONDEV_BDEVICESController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONDEV_BDEVICES
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMONDEV_BDEVICES()
        {
            return Json (_context.MONDEV_BDEVICES, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONDEV_BDEVICESId id, ( [dbo].[MONDEV_BDEVICES_BRIEF_F](MONDEV_BDEVICESId,null)  ) name
                         FROM            
                          MONDEV_BDEVICES 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONDEV_BDEVICES ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONDEV_BDEVICES/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMONDEV_BDEVICES([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONDEV_BDEVICES = await _context.MONDEV_BDEVICES.SingleOrDefaultAsync(m => m.MONDEV_BDEVICESId == id);

            if (varMONDEV_BDEVICES == null)
            {
                return NotFound();
            }

            return Ok(varMONDEV_BDEVICES);
        }

        // PUT: api/MONDEV_BDEVICES/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutMONDEV_BDEVICES([FromRoute] Guid id, [FromBody] MONDEV_BDEVICES varMONDEV_BDEVICES)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONDEV_BDEVICES.MONDEV_BDEVICESId)
            {
                return BadRequest();
            }

            _context.Entry(varMONDEV_BDEVICES).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONDEV_BDEVICESExists(id))
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

        // POST: api/MONDEV_BDEVICES
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostMONDEV_BDEVICES([FromBody] MONDEV_BDEVICES varMONDEV_BDEVICES)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONDEV_BDEVICES.Add(varMONDEV_BDEVICES);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONDEV_BDEVICES", new { id = varMONDEV_BDEVICES.MONDEV_BDEVICESId }, varMONDEV_BDEVICES);
        }

        // DELETE: api/MONDEV_BDEVICES/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMONDEV_BDEVICES([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONDEV_BDEVICES = await _context.MONDEV_BDEVICES.SingleOrDefaultAsync(m => m.MONDEV_BDEVICESId == id);
            if (varMONDEV_BDEVICES == null)
            {
                return NotFound();
            }

            _context.MONDEV_BDEVICES.Remove(varMONDEV_BDEVICES);
            await _context.SaveChangesAsync();

            return Ok(varMONDEV_BDEVICES);
        }

        private bool MONDEV_BDEVICESExists(Guid id)
        {
            return _context.MONDEV_BDEVICES.Any(e => e.MONDEV_BDEVICESId == id);
        }
    }
}
