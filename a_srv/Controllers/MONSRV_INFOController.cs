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
    [Route("api/MONSRV_INFO")]
    public class MONSRV_INFOController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONSRV_INFOController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONSRV_INFO
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMONSRV_INFO()
        {
            return Json (_context.MONSRV_INFO, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONSRV_INFOId id, ( [dbo].[MONSRV_INFO_BRIEF_F](MONSRV_INFOId,null)  ) name
                         FROM            
                          MONSRV_INFO 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONSRV_INFO ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONSRV_INFO/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMONSRV_INFO([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONSRV_INFO = await _context.MONSRV_INFO.SingleOrDefaultAsync(m => m.MONSRV_INFOId == id);

            if (varMONSRV_INFO == null)
            {
                return NotFound();
            }

            return Ok(varMONSRV_INFO);
        }

        // PUT: api/MONSRV_INFO/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutMONSRV_INFO([FromRoute] Guid id, [FromBody] MONSRV_INFO varMONSRV_INFO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONSRV_INFO.MONSRV_INFOId)
            {
                return BadRequest();
            }

            _context.Entry(varMONSRV_INFO).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONSRV_INFOExists(id))
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

        // POST: api/MONSRV_INFO
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostMONSRV_INFO([FromBody] MONSRV_INFO varMONSRV_INFO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONSRV_INFO.Add(varMONSRV_INFO);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONSRV_INFO", new { id = varMONSRV_INFO.MONSRV_INFOId }, varMONSRV_INFO);
        }

        // DELETE: api/MONSRV_INFO/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMONSRV_INFO([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONSRV_INFO = await _context.MONSRV_INFO.SingleOrDefaultAsync(m => m.MONSRV_INFOId == id);
            if (varMONSRV_INFO == null)
            {
                return NotFound();
            }

            _context.MONSRV_INFO.Remove(varMONSRV_INFO);
            await _context.SaveChangesAsync();

            return Ok(varMONSRV_INFO);
        }

        private bool MONSRV_INFOExists(Guid id)
        {
            return _context.MONSRV_INFO.Any(e => e.MONSRV_INFOId == id);
        }
    }
}
