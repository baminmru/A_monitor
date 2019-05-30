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
    [Route("api/MONQ_DEF")]
    public class MONQ_DEFController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONQ_DEFController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONQ_DEF
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMONQ_DEF()
        {
            return Json (_context.MONQ_DEF, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONQ_DEFId id, ( [dbo].[MONQ_DEF_BRIEF_F](MONQ_DEFId,null)  ) name
                         FROM            
                          MONQ_DEF 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONQ_DEF ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONQ_DEF/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMONQ_DEF([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONQ_DEF = await _context.MONQ_DEF.SingleOrDefaultAsync(m => m.MONQ_DEFId == id);

            if (varMONQ_DEF == null)
            {
                return NotFound();
            }

            return Ok(varMONQ_DEF);
        }

        // PUT: api/MONQ_DEF/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutMONQ_DEF([FromRoute] Guid id, [FromBody] MONQ_DEF varMONQ_DEF)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONQ_DEF.MONQ_DEFId)
            {
                return BadRequest();
            }

            _context.Entry(varMONQ_DEF).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONQ_DEFExists(id))
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

        // POST: api/MONQ_DEF
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostMONQ_DEF([FromBody] MONQ_DEF varMONQ_DEF)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONQ_DEF.Add(varMONQ_DEF);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONQ_DEF", new { id = varMONQ_DEF.MONQ_DEFId }, varMONQ_DEF);
        }

        // DELETE: api/MONQ_DEF/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMONQ_DEF([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONQ_DEF = await _context.MONQ_DEF.SingleOrDefaultAsync(m => m.MONQ_DEFId == id);
            if (varMONQ_DEF == null)
            {
                return NotFound();
            }

            _context.MONQ_DEF.Remove(varMONQ_DEF);
            await _context.SaveChangesAsync();

            return Ok(varMONQ_DEF);
        }

        private bool MONQ_DEFExists(Guid id)
        {
            return _context.MONQ_DEF.Any(e => e.MONQ_DEFId == id);
        }
    }
}
