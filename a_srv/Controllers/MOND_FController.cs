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
    [Route("api/MOND_F")]
    public class MOND_FController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MOND_FController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MOND_F
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetMOND_F()
        {
            return Json (_context.MOND_F, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MOND_FId id, ( [dbo].[MOND_F_BRIEF_F](MOND_FId,null)  ) name
                         FROM            
                          MOND_F 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MOND_F where moncli_infoID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MOND_F/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetMOND_F([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_F = await _context.MOND_F.SingleOrDefaultAsync(m => m.MOND_FId == id);

            if (varMOND_F == null)
            {
                return NotFound();
            }

            return Ok(varMOND_F);
        }

        // PUT: api/MOND_F/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutMOND_F([FromRoute] Guid id, [FromBody] MOND_F varMOND_F)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMOND_F.MOND_FId)
            {
                return BadRequest();
            }

            _context.Entry(varMOND_F).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MOND_FExists(id))
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

        // POST: api/MOND_F
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostMOND_F([FromBody] MOND_F varMOND_F)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MOND_F.Add(varMOND_F);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMOND_F", new { id = varMOND_F.MOND_FId }, varMOND_F);
        }

        // DELETE: api/MOND_F/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteMOND_F([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_F = await _context.MOND_F.SingleOrDefaultAsync(m => m.MOND_FId == id);
            if (varMOND_F == null)
            {
                return NotFound();
            }

            _context.MOND_F.Remove(varMOND_F);
            await _context.SaveChangesAsync();

            return Ok(varMOND_F);
        }

        private bool MOND_FExists(Guid id)
        {
            return _context.MOND_F.Any(e => e.MOND_FId == id);
        }
    }
}
