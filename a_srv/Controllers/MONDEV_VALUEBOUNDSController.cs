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
    [Route("api/MONDEV_VALUEBOUNDS")]
    public class MONDEV_VALUEBOUNDSController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONDEV_VALUEBOUNDSController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONDEV_VALUEBOUNDS
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMONDEV_VALUEBOUNDS()
        {
            return Json (_context.MONDEV_VALUEBOUNDS, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONDEV_VALUEBOUNDSId id, ( [dbo].[MONDEV_VALUEBOUNDS_BRIEF_F](MONDEV_VALUEBOUNDSId,null)  ) name
                         FROM            
                          MONDEV_VALUEBOUNDS 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONDEV_VALUEBOUNDS where MONDEV_BDEVICESID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONDEV_VALUEBOUNDS/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMONDEV_VALUEBOUNDS([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONDEV_VALUEBOUNDS = await _context.MONDEV_VALUEBOUNDS.SingleOrDefaultAsync(m => m.MONDEV_VALUEBOUNDSId == id);

            if (varMONDEV_VALUEBOUNDS == null)
            {
                return NotFound();
            }

            return Ok(varMONDEV_VALUEBOUNDS);
        }

        // PUT: api/MONDEV_VALUEBOUNDS/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutMONDEV_VALUEBOUNDS([FromRoute] Guid id, [FromBody] MONDEV_VALUEBOUNDS varMONDEV_VALUEBOUNDS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONDEV_VALUEBOUNDS.MONDEV_VALUEBOUNDSId)
            {
                return BadRequest();
            }

            _context.Entry(varMONDEV_VALUEBOUNDS).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONDEV_VALUEBOUNDSExists(id))
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

        // POST: api/MONDEV_VALUEBOUNDS
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostMONDEV_VALUEBOUNDS([FromBody] MONDEV_VALUEBOUNDS varMONDEV_VALUEBOUNDS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONDEV_VALUEBOUNDS.Add(varMONDEV_VALUEBOUNDS);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONDEV_VALUEBOUNDS", new { id = varMONDEV_VALUEBOUNDS.MONDEV_VALUEBOUNDSId }, varMONDEV_VALUEBOUNDS);
        }

        // DELETE: api/MONDEV_VALUEBOUNDS/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMONDEV_VALUEBOUNDS([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONDEV_VALUEBOUNDS = await _context.MONDEV_VALUEBOUNDS.SingleOrDefaultAsync(m => m.MONDEV_VALUEBOUNDSId == id);
            if (varMONDEV_VALUEBOUNDS == null)
            {
                return NotFound();
            }

            _context.MONDEV_VALUEBOUNDS.Remove(varMONDEV_VALUEBOUNDS);
            await _context.SaveChangesAsync();

            return Ok(varMONDEV_VALUEBOUNDS);
        }

        private bool MONDEV_VALUEBOUNDSExists(Guid id)
        {
            return _context.MONDEV_VALUEBOUNDS.Any(e => e.MONDEV_VALUEBOUNDSId == id);
        }
    }
}
