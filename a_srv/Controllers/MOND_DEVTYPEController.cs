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
    [Route("api/MOND_DEVTYPE")]
    public class MOND_DEVTYPEController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MOND_DEVTYPEController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MOND_DEVTYPE
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetMOND_DEVTYPE()
        {
            return Json (_context.MOND_DEVTYPE, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MOND_DEVTYPEId id, ( [dbo].[MOND_DEVTYPE_BRIEF_F](MOND_DEVTYPEId,null)  ) name
                         FROM            
                          MOND_DEVTYPE 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MOND_DEVTYPE ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MOND_DEVTYPE/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetMOND_DEVTYPE([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_DEVTYPE = await _context.MOND_DEVTYPE.SingleOrDefaultAsync(m => m.MOND_DEVTYPEId == id);

            if (varMOND_DEVTYPE == null)
            {
                return NotFound();
            }

            return Ok(varMOND_DEVTYPE);
        }

        // PUT: api/MOND_DEVTYPE/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutMOND_DEVTYPE([FromRoute] Guid id, [FromBody] MOND_DEVTYPE varMOND_DEVTYPE)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMOND_DEVTYPE.MOND_DEVTYPEId)
            {
                return BadRequest();
            }

            _context.Entry(varMOND_DEVTYPE).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MOND_DEVTYPEExists(id))
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

        // POST: api/MOND_DEVTYPE
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostMOND_DEVTYPE([FromBody] MOND_DEVTYPE varMOND_DEVTYPE)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MOND_DEVTYPE.Add(varMOND_DEVTYPE);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMOND_DEVTYPE", new { id = varMOND_DEVTYPE.MOND_DEVTYPEId }, varMOND_DEVTYPE);
        }

        // DELETE: api/MOND_DEVTYPE/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteMOND_DEVTYPE([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_DEVTYPE = await _context.MOND_DEVTYPE.SingleOrDefaultAsync(m => m.MOND_DEVTYPEId == id);
            if (varMOND_DEVTYPE == null)
            {
                return NotFound();
            }

            _context.MOND_DEVTYPE.Remove(varMOND_DEVTYPE);
            await _context.SaveChangesAsync();

            return Ok(varMOND_DEVTYPE);
        }

        private bool MOND_DEVTYPEExists(Guid id)
        {
            return _context.MOND_DEVTYPE.Any(e => e.MOND_DEVTYPEId == id);
        }
    }
}
