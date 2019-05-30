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
    [Route("api/MONN_LATLON")]
    public class MONN_LATLONController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONN_LATLONController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONN_LATLON
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMONN_LATLON()
        {
            return Json (_context.MONN_LATLON, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONN_LATLONId id, ( [dbo].[MONN_LATLON_BRIEF_F](MONN_LATLONId,null)  ) name
                         FROM            
                          MONN_LATLON 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONN_LATLON where MONN_DEFID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONN_LATLON/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMONN_LATLON([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONN_LATLON = await _context.MONN_LATLON.SingleOrDefaultAsync(m => m.MONN_LATLONId == id);

            if (varMONN_LATLON == null)
            {
                return NotFound();
            }

            return Ok(varMONN_LATLON);
        }

        // PUT: api/MONN_LATLON/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutMONN_LATLON([FromRoute] Guid id, [FromBody] MONN_LATLON varMONN_LATLON)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONN_LATLON.MONN_LATLONId)
            {
                return BadRequest();
            }

            _context.Entry(varMONN_LATLON).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONN_LATLONExists(id))
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

        // POST: api/MONN_LATLON
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostMONN_LATLON([FromBody] MONN_LATLON varMONN_LATLON)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONN_LATLON.Add(varMONN_LATLON);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONN_LATLON", new { id = varMONN_LATLON.MONN_LATLONId }, varMONN_LATLON);
        }

        // DELETE: api/MONN_LATLON/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMONN_LATLON([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONN_LATLON = await _context.MONN_LATLON.SingleOrDefaultAsync(m => m.MONN_LATLONId == id);
            if (varMONN_LATLON == null)
            {
                return NotFound();
            }

            _context.MONN_LATLON.Remove(varMONN_LATLON);
            await _context.SaveChangesAsync();

            return Ok(varMONN_LATLON);
        }

        private bool MONN_LATLONExists(Guid id)
        {
            return _context.MONN_LATLON.Any(e => e.MONN_LATLONId == id);
        }
    }
}
