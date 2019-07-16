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
    [Route("api/DATA_EP")]
    public class DATA_EPController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public DATA_EPController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/DATA_EP
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetDATA_EP()
        {
            return Json (_context.DATA_EP, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT DATA_EPId id, ( [dbo].[DATA_EP_BRIEF_F](DATA_EPId,null)  ) name
                         FROM            
                          DATA_EP 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_DATA_EP where DATA_RECORDID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/DATA_EP/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetDATA_EP([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_EP = await _context.DATA_EP.SingleOrDefaultAsync(m => m.DATA_EPId == id);

            if (varDATA_EP == null)
            {
                return NotFound();
            }

            return Ok(varDATA_EP);
        }

        // PUT: api/DATA_EP/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutDATA_EP([FromRoute] Guid id, [FromBody] DATA_EP varDATA_EP)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varDATA_EP.DATA_EPId)
            {
                return BadRequest();
            }

            _context.Entry(varDATA_EP).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DATA_EPExists(id))
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

        // POST: api/DATA_EP
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostDATA_EP([FromBody] DATA_EP varDATA_EP)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DATA_EP.Add(varDATA_EP);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDATA_EP", new { id = varDATA_EP.DATA_EPId }, varDATA_EP);
        }

        // DELETE: api/DATA_EP/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteDATA_EP([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_EP = await _context.DATA_EP.SingleOrDefaultAsync(m => m.DATA_EPId == id);
            if (varDATA_EP == null)
            {
                return NotFound();
            }

            _context.DATA_EP.Remove(varDATA_EP);
            await _context.SaveChangesAsync();

            return Ok(varDATA_EP);
        }

        private bool DATA_EPExists(Guid id)
        {
            return _context.DATA_EP.Any(e => e.DATA_EPId == id);
        }
    }
}
