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
    [Route("api/DATA_Q")]
    public class DATA_QController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public DATA_QController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/DATA_Q
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetDATA_Q()
        {
            return Json (_context.DATA_Q, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT DATA_QId id, ( [dbo].[DATA_Q_BRIEF_F](DATA_QId,null)  ) name
                         FROM            
                          DATA_Q 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_DATA_Q where DATA_RECORDID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/DATA_Q/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetDATA_Q([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_Q = await _context.DATA_Q.SingleOrDefaultAsync(m => m.DATA_QId == id);

            if (varDATA_Q == null)
            {
                return NotFound();
            }

            return Ok(varDATA_Q);
        }

        // PUT: api/DATA_Q/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutDATA_Q([FromRoute] Guid id, [FromBody] DATA_Q varDATA_Q)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varDATA_Q.DATA_QId)
            {
                return BadRequest();
            }

            _context.Entry(varDATA_Q).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DATA_QExists(id))
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

        // POST: api/DATA_Q
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostDATA_Q([FromBody] DATA_Q varDATA_Q)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DATA_Q.Add(varDATA_Q);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDATA_Q", new { id = varDATA_Q.DATA_QId }, varDATA_Q);
        }

        // DELETE: api/DATA_Q/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteDATA_Q([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_Q = await _context.DATA_Q.SingleOrDefaultAsync(m => m.DATA_QId == id);
            if (varDATA_Q == null)
            {
                return NotFound();
            }

            _context.DATA_Q.Remove(varDATA_Q);
            await _context.SaveChangesAsync();

            return Ok(varDATA_Q);
        }

        private bool DATA_QExists(Guid id)
        {
            return _context.DATA_Q.Any(e => e.DATA_QId == id);
        }
    }
}
