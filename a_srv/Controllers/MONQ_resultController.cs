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
    [Route("api/MONQ_result")]
    public class MONQ_resultController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONQ_resultController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONQ_result
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMONQ_result()
        {
            return Json (_context.MONQ_result, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONQ_resultId id, ( [dbo].[MONQ_result_BRIEF_F](MONQ_resultId,null)  ) name
                         FROM            
                          MONQ_result 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONQ_result where MONQ_DEFID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONQ_result/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMONQ_result([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONQ_result = await _context.MONQ_result.SingleOrDefaultAsync(m => m.MONQ_resultId == id);

            if (varMONQ_result == null)
            {
                return NotFound();
            }

            return Ok(varMONQ_result);
        }

        // PUT: api/MONQ_result/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutMONQ_result([FromRoute] Guid id, [FromBody] MONQ_result varMONQ_result)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONQ_result.MONQ_resultId)
            {
                return BadRequest();
            }

            _context.Entry(varMONQ_result).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONQ_resultExists(id))
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

        // POST: api/MONQ_result
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostMONQ_result([FromBody] MONQ_result varMONQ_result)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONQ_result.Add(varMONQ_result);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONQ_result", new { id = varMONQ_result.MONQ_resultId }, varMONQ_result);
        }

        // DELETE: api/MONQ_result/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMONQ_result([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONQ_result = await _context.MONQ_result.SingleOrDefaultAsync(m => m.MONQ_resultId == id);
            if (varMONQ_result == null)
            {
                return NotFound();
            }

            _context.MONQ_result.Remove(varMONQ_result);
            await _context.SaveChangesAsync();

            return Ok(varMONQ_result);
        }

        private bool MONQ_resultExists(Guid id)
        {
            return _context.MONQ_result.Any(e => e.MONQ_resultId == id);
        }
    }
}
