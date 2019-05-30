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
    [Route("api/MOND_DEVCLASS")]
    public class MOND_DEVCLASSController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MOND_DEVCLASSController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MOND_DEVCLASS
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMOND_DEVCLASS()
        {
            return Json (_context.MOND_DEVCLASS, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MOND_DEVCLASSId id, ( [dbo].[MOND_DEVCLASS_BRIEF_F](MOND_DEVCLASSId,null)  ) name
                         FROM            
                          MOND_DEVCLASS 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MOND_DEVCLASS ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MOND_DEVCLASS/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMOND_DEVCLASS([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_DEVCLASS = await _context.MOND_DEVCLASS.SingleOrDefaultAsync(m => m.MOND_DEVCLASSId == id);

            if (varMOND_DEVCLASS == null)
            {
                return NotFound();
            }

            return Ok(varMOND_DEVCLASS);
        }

        // PUT: api/MOND_DEVCLASS/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutMOND_DEVCLASS([FromRoute] Guid id, [FromBody] MOND_DEVCLASS varMOND_DEVCLASS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMOND_DEVCLASS.MOND_DEVCLASSId)
            {
                return BadRequest();
            }

            _context.Entry(varMOND_DEVCLASS).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MOND_DEVCLASSExists(id))
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

        // POST: api/MOND_DEVCLASS
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostMOND_DEVCLASS([FromBody] MOND_DEVCLASS varMOND_DEVCLASS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MOND_DEVCLASS.Add(varMOND_DEVCLASS);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMOND_DEVCLASS", new { id = varMOND_DEVCLASS.MOND_DEVCLASSId }, varMOND_DEVCLASS);
        }

        // DELETE: api/MOND_DEVCLASS/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMOND_DEVCLASS([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_DEVCLASS = await _context.MOND_DEVCLASS.SingleOrDefaultAsync(m => m.MOND_DEVCLASSId == id);
            if (varMOND_DEVCLASS == null)
            {
                return NotFound();
            }

            _context.MOND_DEVCLASS.Remove(varMOND_DEVCLASS);
            await _context.SaveChangesAsync();

            return Ok(varMOND_DEVCLASS);
        }

        private bool MOND_DEVCLASSExists(Guid id)
        {
            return _context.MOND_DEVCLASS.Any(e => e.MOND_DEVCLASSId == id);
        }
    }
}
