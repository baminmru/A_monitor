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
    [Route("api/MON_USR")]
    public class MON_USRController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MON_USRController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MON_USR
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMON_USR()
        {
            return Json (_context.MON_USR, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MON_USRId id, ( [dbo].[MON_USR_BRIEF_F](MON_USRId,null)  ) name
                         FROM            
                          MON_USR 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MON_USR ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MON_USR/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMON_USR([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMON_USR = await _context.MON_USR.SingleOrDefaultAsync(m => m.MON_USRId == id);

            if (varMON_USR == null)
            {
                return NotFound();
            }

            return Ok(varMON_USR);
        }

        // PUT: api/MON_USR/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutMON_USR([FromRoute] Guid id, [FromBody] MON_USR varMON_USR)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMON_USR.MON_USRId)
            {
                return BadRequest();
            }

            _context.Entry(varMON_USR).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MON_USRExists(id))
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

        // POST: api/MON_USR
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostMON_USR([FromBody] MON_USR varMON_USR)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MON_USR.Add(varMON_USR);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMON_USR", new { id = varMON_USR.MON_USRId }, varMON_USR);
        }

        // DELETE: api/MON_USR/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMON_USR([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMON_USR = await _context.MON_USR.SingleOrDefaultAsync(m => m.MON_USRId == id);
            if (varMON_USR == null)
            {
                return NotFound();
            }

            _context.MON_USR.Remove(varMON_USR);
            await _context.SaveChangesAsync();

            return Ok(varMON_USR);
        }

        private bool MON_USRExists(Guid id)
        {
            return _context.MON_USR.Any(e => e.MON_USRId == id);
        }
    }
}
