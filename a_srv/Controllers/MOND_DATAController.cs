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
    [Route("api/MOND_DATA")]
    public class MOND_DATAController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MOND_DATAController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MOND_DATA
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMOND_DATA()
        {
            return Json (_context.MOND_DATA, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MOND_DATAId id, ( [dbo].[MOND_DATA_BRIEF_F](MOND_DATAId,null)  ) name
                         FROM            
                          MOND_DATA 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MOND_DATA ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MOND_DATA/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMOND_DATA([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_DATA = await _context.MOND_DATA.SingleOrDefaultAsync(m => m.MOND_DATAId == id);

            if (varMOND_DATA == null)
            {
                return NotFound();
            }

            return Ok(varMOND_DATA);
        }

        // PUT: api/MOND_DATA/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutMOND_DATA([FromRoute] Guid id, [FromBody] MOND_DATA varMOND_DATA)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMOND_DATA.MOND_DATAId)
            {
                return BadRequest();
            }

            _context.Entry(varMOND_DATA).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MOND_DATAExists(id))
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

        // POST: api/MOND_DATA
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostMOND_DATA([FromBody] MOND_DATA varMOND_DATA)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MOND_DATA.Add(varMOND_DATA);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMOND_DATA", new { id = varMOND_DATA.MOND_DATAId }, varMOND_DATA);
        }

        // DELETE: api/MOND_DATA/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMOND_DATA([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_DATA = await _context.MOND_DATA.SingleOrDefaultAsync(m => m.MOND_DATAId == id);
            if (varMOND_DATA == null)
            {
                return NotFound();
            }

            _context.MOND_DATA.Remove(varMOND_DATA);
            await _context.SaveChangesAsync();

            return Ok(varMOND_DATA);
        }

        private bool MOND_DATAExists(Guid id)
        {
            return _context.MOND_DATA.Any(e => e.MOND_DATAId == id);
        }
    }
}
