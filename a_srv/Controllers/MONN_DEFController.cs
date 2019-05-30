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
    [Route("api/MONN_DEF")]
    public class MONN_DEFController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONN_DEFController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONN_DEF
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMONN_DEF()
        {
            return Json (_context.MONN_DEF, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONN_DEFId id, ( [dbo].[MONN_DEF_BRIEF_F](MONN_DEFId,null)  ) name
                         FROM            
                          MONN_DEF 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONN_DEF ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONN_DEF/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMONN_DEF([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONN_DEF = await _context.MONN_DEF.SingleOrDefaultAsync(m => m.MONN_DEFId == id);

            if (varMONN_DEF == null)
            {
                return NotFound();
            }

            return Ok(varMONN_DEF);
        }

        // PUT: api/MONN_DEF/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutMONN_DEF([FromRoute] Guid id, [FromBody] MONN_DEF varMONN_DEF)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONN_DEF.MONN_DEFId)
            {
                return BadRequest();
            }

            _context.Entry(varMONN_DEF).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONN_DEFExists(id))
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

        // POST: api/MONN_DEF
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostMONN_DEF([FromBody] MONN_DEF varMONN_DEF)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONN_DEF.Add(varMONN_DEF);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONN_DEF", new { id = varMONN_DEF.MONN_DEFId }, varMONN_DEF);
        }

        // DELETE: api/MONN_DEF/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMONN_DEF([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONN_DEF = await _context.MONN_DEF.SingleOrDefaultAsync(m => m.MONN_DEFId == id);
            if (varMONN_DEF == null)
            {
                return NotFound();
            }

            _context.MONN_DEF.Remove(varMONN_DEF);
            await _context.SaveChangesAsync();

            return Ok(varMONN_DEF);
        }

        private bool MONN_DEFExists(Guid id)
        {
            return _context.MONN_DEF.Any(e => e.MONN_DEFId == id);
        }
    }
}
