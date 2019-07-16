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
    [Route("api/DATA_I")]
    public class DATA_IController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public DATA_IController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/DATA_I
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetDATA_I()
        {
            return Json (_context.DATA_I, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT DATA_IId id, ( [dbo].[DATA_I_BRIEF_F](DATA_IId,null)  ) name
                         FROM            
                          DATA_I 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_DATA_I where DATA_RECORDID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/DATA_I/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetDATA_I([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_I = await _context.DATA_I.SingleOrDefaultAsync(m => m.DATA_IId == id);

            if (varDATA_I == null)
            {
                return NotFound();
            }

            return Ok(varDATA_I);
        }

        // PUT: api/DATA_I/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutDATA_I([FromRoute] Guid id, [FromBody] DATA_I varDATA_I)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varDATA_I.DATA_IId)
            {
                return BadRequest();
            }

            _context.Entry(varDATA_I).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DATA_IExists(id))
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

        // POST: api/DATA_I
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostDATA_I([FromBody] DATA_I varDATA_I)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DATA_I.Add(varDATA_I);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDATA_I", new { id = varDATA_I.DATA_IId }, varDATA_I);
        }

        // DELETE: api/DATA_I/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteDATA_I([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_I = await _context.DATA_I.SingleOrDefaultAsync(m => m.DATA_IId == id);
            if (varDATA_I == null)
            {
                return NotFound();
            }

            _context.DATA_I.Remove(varDATA_I);
            await _context.SaveChangesAsync();

            return Ok(varDATA_I);
        }

        private bool DATA_IExists(Guid id)
        {
            return _context.DATA_I.Any(e => e.DATA_IId == id);
        }
    }
}
