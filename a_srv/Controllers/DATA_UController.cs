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
    [Route("api/DATA_U")]
    public class DATA_UController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public DATA_UController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/DATA_U
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetDATA_U()
        {
            return Json (_context.DATA_U, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT DATA_UId id, ( [dbo].[DATA_U_BRIEF_F](DATA_UId,null)  ) name
                         FROM            
                          DATA_U 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_DATA_U where DATA_RECORDID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/DATA_U/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDATA_U([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_U = await _context.DATA_U.SingleOrDefaultAsync(m => m.DATA_UId == id);

            if (varDATA_U == null)
            {
                return NotFound();
            }

            return Ok(varDATA_U);
        }

        // PUT: api/DATA_U/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutDATA_U([FromRoute] Guid id, [FromBody] DATA_U varDATA_U)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varDATA_U.DATA_UId)
            {
                return BadRequest();
            }

            _context.Entry(varDATA_U).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DATA_UExists(id))
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

        // POST: api/DATA_U
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostDATA_U([FromBody] DATA_U varDATA_U)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DATA_U.Add(varDATA_U);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDATA_U", new { id = varDATA_U.DATA_UId }, varDATA_U);
        }

        // DELETE: api/DATA_U/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteDATA_U([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_U = await _context.DATA_U.SingleOrDefaultAsync(m => m.DATA_UId == id);
            if (varDATA_U == null)
            {
                return NotFound();
            }

            _context.DATA_U.Remove(varDATA_U);
            await _context.SaveChangesAsync();

            return Ok(varDATA_U);
        }

        private bool DATA_UExists(Guid id)
        {
            return _context.DATA_U.Any(e => e.DATA_UId == id);
        }
    }
}
