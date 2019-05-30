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
    [Route("api/MONSCH_INFO")]
    public class MONSCH_INFOController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONSCH_INFOController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONSCH_INFO
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMONSCH_INFO()
        {
            return Json (_context.MONSCH_INFO, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONSCH_INFOId id, ( [dbo].[MONSCH_INFO_BRIEF_F](MONSCH_INFOId,null)  ) name
                         FROM            
                          MONSCH_INFO 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONSCH_INFO ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONSCH_INFO/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMONSCH_INFO([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONSCH_INFO = await _context.MONSCH_INFO.SingleOrDefaultAsync(m => m.MONSCH_INFOId == id);

            if (varMONSCH_INFO == null)
            {
                return NotFound();
            }

            return Ok(varMONSCH_INFO);
        }

        // PUT: api/MONSCH_INFO/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutMONSCH_INFO([FromRoute] Guid id, [FromBody] MONSCH_INFO varMONSCH_INFO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONSCH_INFO.MONSCH_INFOId)
            {
                return BadRequest();
            }

            _context.Entry(varMONSCH_INFO).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONSCH_INFOExists(id))
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

        // POST: api/MONSCH_INFO
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostMONSCH_INFO([FromBody] MONSCH_INFO varMONSCH_INFO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONSCH_INFO.Add(varMONSCH_INFO);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONSCH_INFO", new { id = varMONSCH_INFO.MONSCH_INFOId }, varMONSCH_INFO);
        }

        // DELETE: api/MONSCH_INFO/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMONSCH_INFO([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONSCH_INFO = await _context.MONSCH_INFO.SingleOrDefaultAsync(m => m.MONSCH_INFOId == id);
            if (varMONSCH_INFO == null)
            {
                return NotFound();
            }

            _context.MONSCH_INFO.Remove(varMONSCH_INFO);
            await _context.SaveChangesAsync();

            return Ok(varMONSCH_INFO);
        }

        private bool MONSCH_INFOExists(Guid id)
        {
            return _context.MONSCH_INFO.Any(e => e.MONSCH_INFOId == id);
        }
    }
}
