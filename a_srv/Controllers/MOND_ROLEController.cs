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
    [Route("api/MOND_ROLE")]
    public class MOND_ROLEController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MOND_ROLEController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MOND_ROLE
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetMOND_ROLE()
        {
            return Json (_context.MOND_ROLE, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MOND_ROLEId id, ( [dbo].[MOND_ROLE_BRIEF_F](MOND_ROLEId,null)  ) name
                         FROM            
                          MOND_ROLE 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MOND_ROLE ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MOND_ROLE/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetMOND_ROLE([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_ROLE = await _context.MOND_ROLE.SingleOrDefaultAsync(m => m.MOND_ROLEId == id);

            if (varMOND_ROLE == null)
            {
                return NotFound();
            }

            return Ok(varMOND_ROLE);
        }

        // PUT: api/MOND_ROLE/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutMOND_ROLE([FromRoute] Guid id, [FromBody] MOND_ROLE varMOND_ROLE)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMOND_ROLE.MOND_ROLEId)
            {
                return BadRequest();
            }

            _context.Entry(varMOND_ROLE).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MOND_ROLEExists(id))
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

        // POST: api/MOND_ROLE
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostMOND_ROLE([FromBody] MOND_ROLE varMOND_ROLE)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MOND_ROLE.Add(varMOND_ROLE);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMOND_ROLE", new { id = varMOND_ROLE.MOND_ROLEId }, varMOND_ROLE);
        }

        // DELETE: api/MOND_ROLE/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteMOND_ROLE([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_ROLE = await _context.MOND_ROLE.SingleOrDefaultAsync(m => m.MOND_ROLEId == id);
            if (varMOND_ROLE == null)
            {
                return NotFound();
            }

            _context.MOND_ROLE.Remove(varMOND_ROLE);
            await _context.SaveChangesAsync();

            return Ok(varMOND_ROLE);
        }

        private bool MOND_ROLEExists(Guid id)
        {
            return _context.MOND_ROLE.Any(e => e.MOND_ROLEId == id);
        }
    }
}
