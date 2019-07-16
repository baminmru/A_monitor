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
    [Route("api/MOND_SNAB")]
    public class MOND_SNABController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MOND_SNABController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MOND_SNAB
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetMOND_SNAB()
        {
            return Json (_context.MOND_SNAB, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MOND_SNABId id, ( [dbo].[MOND_SNAB_BRIEF_F](MOND_SNABId,null)  ) name
                         FROM            
                          MOND_SNAB 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MOND_SNAB ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MOND_SNAB/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetMOND_SNAB([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_SNAB = await _context.MOND_SNAB.SingleOrDefaultAsync(m => m.MOND_SNABId == id);

            if (varMOND_SNAB == null)
            {
                return NotFound();
            }

            return Ok(varMOND_SNAB);
        }

        // PUT: api/MOND_SNAB/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutMOND_SNAB([FromRoute] Guid id, [FromBody] MOND_SNAB varMOND_SNAB)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMOND_SNAB.MOND_SNABId)
            {
                return BadRequest();
            }

            _context.Entry(varMOND_SNAB).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MOND_SNABExists(id))
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

        // POST: api/MOND_SNAB
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostMOND_SNAB([FromBody] MOND_SNAB varMOND_SNAB)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MOND_SNAB.Add(varMOND_SNAB);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMOND_SNAB", new { id = varMOND_SNAB.MOND_SNABId }, varMOND_SNAB);
        }

        // DELETE: api/MOND_SNAB/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteMOND_SNAB([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_SNAB = await _context.MOND_SNAB.SingleOrDefaultAsync(m => m.MOND_SNABId == id);
            if (varMOND_SNAB == null)
            {
                return NotFound();
            }

            _context.MOND_SNAB.Remove(varMOND_SNAB);
            await _context.SaveChangesAsync();

            return Ok(varMOND_SNAB);
        }

        private bool MOND_SNABExists(Guid id)
        {
            return _context.MOND_SNAB.Any(e => e.MOND_SNABId == id);
        }
    }
}
