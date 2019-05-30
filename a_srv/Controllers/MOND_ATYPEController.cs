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
    [Route("api/MOND_ATYPE")]
    public class MOND_ATYPEController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MOND_ATYPEController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MOND_ATYPE
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMOND_ATYPE()
        {
            return Json (_context.MOND_ATYPE, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MOND_ATYPEId id, ( [dbo].[MOND_ATYPE_BRIEF_F](MOND_ATYPEId,null)  ) name
                         FROM            
                          MOND_ATYPE 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MOND_ATYPE ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MOND_ATYPE/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMOND_ATYPE([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_ATYPE = await _context.MOND_ATYPE.SingleOrDefaultAsync(m => m.MOND_ATYPEId == id);

            if (varMOND_ATYPE == null)
            {
                return NotFound();
            }

            return Ok(varMOND_ATYPE);
        }

        // PUT: api/MOND_ATYPE/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutMOND_ATYPE([FromRoute] Guid id, [FromBody] MOND_ATYPE varMOND_ATYPE)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMOND_ATYPE.MOND_ATYPEId)
            {
                return BadRequest();
            }

            _context.Entry(varMOND_ATYPE).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MOND_ATYPEExists(id))
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

        // POST: api/MOND_ATYPE
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostMOND_ATYPE([FromBody] MOND_ATYPE varMOND_ATYPE)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MOND_ATYPE.Add(varMOND_ATYPE);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMOND_ATYPE", new { id = varMOND_ATYPE.MOND_ATYPEId }, varMOND_ATYPE);
        }

        // DELETE: api/MOND_ATYPE/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMOND_ATYPE([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_ATYPE = await _context.MOND_ATYPE.SingleOrDefaultAsync(m => m.MOND_ATYPEId == id);
            if (varMOND_ATYPE == null)
            {
                return NotFound();
            }

            _context.MOND_ATYPE.Remove(varMOND_ATYPE);
            await _context.SaveChangesAsync();

            return Ok(varMOND_ATYPE);
        }

        private bool MOND_ATYPEExists(Guid id)
        {
            return _context.MOND_ATYPE.Any(e => e.MOND_ATYPEId == id);
        }
    }
}
