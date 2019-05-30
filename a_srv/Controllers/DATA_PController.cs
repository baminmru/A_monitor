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
    [Route("api/DATA_P")]
    public class DATA_PController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public DATA_PController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/DATA_P
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetDATA_P()
        {
            return Json (_context.DATA_P, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT DATA_PId id, ( [dbo].[DATA_P_BRIEF_F](DATA_PId,null)  ) name
                         FROM            
                          DATA_P 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_DATA_P where DATA_RECORDID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/DATA_P/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDATA_P([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_P = await _context.DATA_P.SingleOrDefaultAsync(m => m.DATA_PId == id);

            if (varDATA_P == null)
            {
                return NotFound();
            }

            return Ok(varDATA_P);
        }

        // PUT: api/DATA_P/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutDATA_P([FromRoute] Guid id, [FromBody] DATA_P varDATA_P)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varDATA_P.DATA_PId)
            {
                return BadRequest();
            }

            _context.Entry(varDATA_P).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DATA_PExists(id))
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

        // POST: api/DATA_P
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostDATA_P([FromBody] DATA_P varDATA_P)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DATA_P.Add(varDATA_P);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDATA_P", new { id = varDATA_P.DATA_PId }, varDATA_P);
        }

        // DELETE: api/DATA_P/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteDATA_P([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_P = await _context.DATA_P.SingleOrDefaultAsync(m => m.DATA_PId == id);
            if (varDATA_P == null)
            {
                return NotFound();
            }

            _context.DATA_P.Remove(varDATA_P);
            await _context.SaveChangesAsync();

            return Ok(varDATA_P);
        }

        private bool DATA_PExists(Guid id)
        {
            return _context.DATA_P.Any(e => e.DATA_PId == id);
        }
    }
}
