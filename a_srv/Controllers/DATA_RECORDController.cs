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
    [Route("api/DATA_RECORD")]
    public class DATA_RECORDController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public DATA_RECORDController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/DATA_RECORD
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetDATA_RECORD()
        {
            return Json (_context.DATA_RECORD, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT DATA_RECORDId id, ( [dbo].[DATA_RECORD_BRIEF_F](DATA_RECORDId,null)  ) name
                         FROM            
                          DATA_RECORD 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_DATA_RECORD ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/DATA_RECORD/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDATA_RECORD([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_RECORD = await _context.DATA_RECORD.SingleOrDefaultAsync(m => m.DATA_RECORDId == id);

            if (varDATA_RECORD == null)
            {
                return NotFound();
            }

            return Ok(varDATA_RECORD);
        }

        // PUT: api/DATA_RECORD/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutDATA_RECORD([FromRoute] Guid id, [FromBody] DATA_RECORD varDATA_RECORD)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varDATA_RECORD.DATA_RECORDId)
            {
                return BadRequest();
            }

            _context.Entry(varDATA_RECORD).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DATA_RECORDExists(id))
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

        // POST: api/DATA_RECORD
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostDATA_RECORD([FromBody] DATA_RECORD varDATA_RECORD)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DATA_RECORD.Add(varDATA_RECORD);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDATA_RECORD", new { id = varDATA_RECORD.DATA_RECORDId }, varDATA_RECORD);
        }

        // DELETE: api/DATA_RECORD/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteDATA_RECORD([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_RECORD = await _context.DATA_RECORD.SingleOrDefaultAsync(m => m.DATA_RECORDId == id);
            if (varDATA_RECORD == null)
            {
                return NotFound();
            }

            _context.DATA_RECORD.Remove(varDATA_RECORD);
            await _context.SaveChangesAsync();

            return Ok(varDATA_RECORD);
        }

        private bool DATA_RECORDExists(Guid id)
        {
            return _context.DATA_RECORD.Any(e => e.DATA_RECORDId == id);
        }
    }
}
