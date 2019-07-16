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
    [Route("api/DATA_EQ")]
    public class DATA_EQController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public DATA_EQController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/DATA_EQ
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetDATA_EQ()
        {
            return Json (_context.DATA_EQ, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT DATA_EQId id, ( [dbo].[DATA_EQ_BRIEF_F](DATA_EQId,null)  ) name
                         FROM            
                          DATA_EQ 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_DATA_EQ where DATA_RECORDID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/DATA_EQ/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetDATA_EQ([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_EQ = await _context.DATA_EQ.SingleOrDefaultAsync(m => m.DATA_EQId == id);

            if (varDATA_EQ == null)
            {
                return NotFound();
            }

            return Ok(varDATA_EQ);
        }

        // PUT: api/DATA_EQ/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutDATA_EQ([FromRoute] Guid id, [FromBody] DATA_EQ varDATA_EQ)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varDATA_EQ.DATA_EQId)
            {
                return BadRequest();
            }

            _context.Entry(varDATA_EQ).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DATA_EQExists(id))
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

        // POST: api/DATA_EQ
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostDATA_EQ([FromBody] DATA_EQ varDATA_EQ)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DATA_EQ.Add(varDATA_EQ);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDATA_EQ", new { id = varDATA_EQ.DATA_EQId }, varDATA_EQ);
        }

        // DELETE: api/DATA_EQ/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteDATA_EQ([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_EQ = await _context.DATA_EQ.SingleOrDefaultAsync(m => m.DATA_EQId == id);
            if (varDATA_EQ == null)
            {
                return NotFound();
            }

            _context.DATA_EQ.Remove(varDATA_EQ);
            await _context.SaveChangesAsync();

            return Ok(varDATA_EQ);
        }

        private bool DATA_EQExists(Guid id)
        {
            return _context.DATA_EQ.Any(e => e.DATA_EQId == id);
        }
    }
}
