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
    [Route("api/MOND_SNABTOP")]
    public class MOND_SNABTOPController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MOND_SNABTOPController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MOND_SNABTOP
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetMOND_SNABTOP()
        {
            return Json (_context.MOND_SNABTOP, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MOND_SNABTOPId id, ( [dbo].[MOND_SNABTOP_BRIEF_F](MOND_SNABTOPId,null)  ) name
                         FROM            
                          MOND_SNABTOP 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MOND_SNABTOP ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MOND_SNABTOP/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetMOND_SNABTOP([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_SNABTOP = await _context.MOND_SNABTOP.SingleOrDefaultAsync(m => m.MOND_SNABTOPId == id);

            if (varMOND_SNABTOP == null)
            {
                return NotFound();
            }

            return Ok(varMOND_SNABTOP);
        }

        // PUT: api/MOND_SNABTOP/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutMOND_SNABTOP([FromRoute] Guid id, [FromBody] MOND_SNABTOP varMOND_SNABTOP)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMOND_SNABTOP.MOND_SNABTOPId)
            {
                return BadRequest();
            }

            _context.Entry(varMOND_SNABTOP).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MOND_SNABTOPExists(id))
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

        // POST: api/MOND_SNABTOP
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostMOND_SNABTOP([FromBody] MOND_SNABTOP varMOND_SNABTOP)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MOND_SNABTOP.Add(varMOND_SNABTOP);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMOND_SNABTOP", new { id = varMOND_SNABTOP.MOND_SNABTOPId }, varMOND_SNABTOP);
        }

        // DELETE: api/MOND_SNABTOP/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteMOND_SNABTOP([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_SNABTOP = await _context.MOND_SNABTOP.SingleOrDefaultAsync(m => m.MOND_SNABTOPId == id);
            if (varMOND_SNABTOP == null)
            {
                return NotFound();
            }

            _context.MOND_SNABTOP.Remove(varMOND_SNABTOP);
            await _context.SaveChangesAsync();

            return Ok(varMOND_SNABTOP);
        }

        private bool MOND_SNABTOPExists(Guid id)
        {
            return _context.MOND_SNABTOP.Any(e => e.MOND_SNABTOPId == id);
        }
    }
}
