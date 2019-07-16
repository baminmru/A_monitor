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
    [Route("api/DATA_V")]
    public class DATA_VController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public DATA_VController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/DATA_V
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetDATA_V()
        {
            return Json (_context.DATA_V, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT DATA_VId id, ( [dbo].[DATA_V_BRIEF_F](DATA_VId,null)  ) name
                         FROM            
                          DATA_V 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_DATA_V where DATA_RECORDID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/DATA_V/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetDATA_V([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_V = await _context.DATA_V.SingleOrDefaultAsync(m => m.DATA_VId == id);

            if (varDATA_V == null)
            {
                return NotFound();
            }

            return Ok(varDATA_V);
        }

        // PUT: api/DATA_V/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutDATA_V([FromRoute] Guid id, [FromBody] DATA_V varDATA_V)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varDATA_V.DATA_VId)
            {
                return BadRequest();
            }

            _context.Entry(varDATA_V).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DATA_VExists(id))
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

        // POST: api/DATA_V
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostDATA_V([FromBody] DATA_V varDATA_V)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DATA_V.Add(varDATA_V);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDATA_V", new { id = varDATA_V.DATA_VId }, varDATA_V);
        }

        // DELETE: api/DATA_V/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteDATA_V([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_V = await _context.DATA_V.SingleOrDefaultAsync(m => m.DATA_VId == id);
            if (varDATA_V == null)
            {
                return NotFound();
            }

            _context.DATA_V.Remove(varDATA_V);
            await _context.SaveChangesAsync();

            return Ok(varDATA_V);
        }

        private bool DATA_VExists(Guid id)
        {
            return _context.DATA_V.Any(e => e.DATA_VId == id);
        }
    }
}
