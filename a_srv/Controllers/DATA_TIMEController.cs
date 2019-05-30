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
    [Route("api/DATA_TIME")]
    public class DATA_TIMEController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public DATA_TIMEController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/DATA_TIME
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetDATA_TIME()
        {
            return Json (_context.DATA_TIME, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT DATA_TIMEId id, ( [dbo].[DATA_TIME_BRIEF_F](DATA_TIMEId,null)  ) name
                         FROM            
                          DATA_TIME 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_DATA_TIME where DATA_RECORDID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/DATA_TIME/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDATA_TIME([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_TIME = await _context.DATA_TIME.SingleOrDefaultAsync(m => m.DATA_TIMEId == id);

            if (varDATA_TIME == null)
            {
                return NotFound();
            }

            return Ok(varDATA_TIME);
        }

        // PUT: api/DATA_TIME/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutDATA_TIME([FromRoute] Guid id, [FromBody] DATA_TIME varDATA_TIME)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varDATA_TIME.DATA_TIMEId)
            {
                return BadRequest();
            }

            _context.Entry(varDATA_TIME).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DATA_TIMEExists(id))
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

        // POST: api/DATA_TIME
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostDATA_TIME([FromBody] DATA_TIME varDATA_TIME)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DATA_TIME.Add(varDATA_TIME);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDATA_TIME", new { id = varDATA_TIME.DATA_TIMEId }, varDATA_TIME);
        }

        // DELETE: api/DATA_TIME/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteDATA_TIME([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_TIME = await _context.DATA_TIME.SingleOrDefaultAsync(m => m.DATA_TIMEId == id);
            if (varDATA_TIME == null)
            {
                return NotFound();
            }

            _context.DATA_TIME.Remove(varDATA_TIME);
            await _context.SaveChangesAsync();

            return Ok(varDATA_TIME);
        }

        private bool DATA_TIMEExists(Guid id)
        {
            return _context.DATA_TIME.Any(e => e.DATA_TIMEId == id);
        }
    }
}
