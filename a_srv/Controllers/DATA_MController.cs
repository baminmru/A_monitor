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
    [Route("api/DATA_M")]
    public class DATA_MController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public DATA_MController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/DATA_M
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetDATA_M()
        {
            return Json (_context.DATA_M, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT DATA_MId id, ( [dbo].[DATA_M_BRIEF_F](DATA_MId,null)  ) name
                         FROM            
                          DATA_M 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_DATA_M where DATA_RECORDID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/DATA_M/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDATA_M([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_M = await _context.DATA_M.SingleOrDefaultAsync(m => m.DATA_MId == id);

            if (varDATA_M == null)
            {
                return NotFound();
            }

            return Ok(varDATA_M);
        }

        // PUT: api/DATA_M/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutDATA_M([FromRoute] Guid id, [FromBody] DATA_M varDATA_M)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varDATA_M.DATA_MId)
            {
                return BadRequest();
            }

            _context.Entry(varDATA_M).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DATA_MExists(id))
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

        // POST: api/DATA_M
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostDATA_M([FromBody] DATA_M varDATA_M)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DATA_M.Add(varDATA_M);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDATA_M", new { id = varDATA_M.DATA_MId }, varDATA_M);
        }

        // DELETE: api/DATA_M/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteDATA_M([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_M = await _context.DATA_M.SingleOrDefaultAsync(m => m.DATA_MId == id);
            if (varDATA_M == null)
            {
                return NotFound();
            }

            _context.DATA_M.Remove(varDATA_M);
            await _context.SaveChangesAsync();

            return Ok(varDATA_M);
        }

        private bool DATA_MExists(Guid id)
        {
            return _context.DATA_M.Any(e => e.DATA_MId == id);
        }
    }
}
