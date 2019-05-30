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
    [Route("api/MOND_PARAM")]
    public class MOND_PARAMController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MOND_PARAMController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MOND_PARAM
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMOND_PARAM()
        {
            return Json (_context.MOND_PARAM, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MOND_PARAMId id, ( [dbo].[MOND_PARAM_BRIEF_F](MOND_PARAMId,null)  ) name
                         FROM            
                          MOND_PARAM 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MOND_PARAM ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MOND_PARAM/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMOND_PARAM([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_PARAM = await _context.MOND_PARAM.SingleOrDefaultAsync(m => m.MOND_PARAMId == id);

            if (varMOND_PARAM == null)
            {
                return NotFound();
            }

            return Ok(varMOND_PARAM);
        }

        // PUT: api/MOND_PARAM/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutMOND_PARAM([FromRoute] Guid id, [FromBody] MOND_PARAM varMOND_PARAM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMOND_PARAM.MOND_PARAMId)
            {
                return BadRequest();
            }

            _context.Entry(varMOND_PARAM).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MOND_PARAMExists(id))
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

        // POST: api/MOND_PARAM
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostMOND_PARAM([FromBody] MOND_PARAM varMOND_PARAM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MOND_PARAM.Add(varMOND_PARAM);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMOND_PARAM", new { id = varMOND_PARAM.MOND_PARAMId }, varMOND_PARAM);
        }

        // DELETE: api/MOND_PARAM/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMOND_PARAM([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_PARAM = await _context.MOND_PARAM.SingleOrDefaultAsync(m => m.MOND_PARAMId == id);
            if (varMOND_PARAM == null)
            {
                return NotFound();
            }

            _context.MOND_PARAM.Remove(varMOND_PARAM);
            await _context.SaveChangesAsync();

            return Ok(varMOND_PARAM);
        }

        private bool MOND_PARAMExists(Guid id)
        {
            return _context.MOND_PARAM.Any(e => e.MOND_PARAMId == id);
        }
    }
}
