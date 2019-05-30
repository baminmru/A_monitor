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
    [Route("api/DATA_T")]
    public class DATA_TController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public DATA_TController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/DATA_T
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetDATA_T()
        {
            return Json (_context.DATA_T, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT DATA_TId id, ( [dbo].[DATA_T_BRIEF_F](DATA_TId,null)  ) name
                         FROM            
                          DATA_T 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_DATA_T where DATA_RECORDID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/DATA_T/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDATA_T([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_T = await _context.DATA_T.SingleOrDefaultAsync(m => m.DATA_TId == id);

            if (varDATA_T == null)
            {
                return NotFound();
            }

            return Ok(varDATA_T);
        }

        // PUT: api/DATA_T/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutDATA_T([FromRoute] Guid id, [FromBody] DATA_T varDATA_T)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varDATA_T.DATA_TId)
            {
                return BadRequest();
            }

            _context.Entry(varDATA_T).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DATA_TExists(id))
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

        // POST: api/DATA_T
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostDATA_T([FromBody] DATA_T varDATA_T)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DATA_T.Add(varDATA_T);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDATA_T", new { id = varDATA_T.DATA_TId }, varDATA_T);
        }

        // DELETE: api/DATA_T/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteDATA_T([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_T = await _context.DATA_T.SingleOrDefaultAsync(m => m.DATA_TId == id);
            if (varDATA_T == null)
            {
                return NotFound();
            }

            _context.DATA_T.Remove(varDATA_T);
            await _context.SaveChangesAsync();

            return Ok(varDATA_T);
        }

        private bool DATA_TExists(Guid id)
        {
            return _context.DATA_T.Any(e => e.DATA_TId == id);
        }
    }
}
