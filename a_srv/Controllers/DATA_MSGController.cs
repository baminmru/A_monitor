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
    [Route("api/DATA_MSG")]
    public class DATA_MSGController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public DATA_MSGController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/DATA_MSG
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetDATA_MSG()
        {
            return Json (_context.DATA_MSG, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT DATA_MSGId id, ( [dbo].[DATA_MSG_BRIEF_F](DATA_MSGId,null)  ) name
                         FROM            
                          DATA_MSG 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_DATA_MSG where DATA_RECORDID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/DATA_MSG/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetDATA_MSG([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_MSG = await _context.DATA_MSG.SingleOrDefaultAsync(m => m.DATA_MSGId == id);

            if (varDATA_MSG == null)
            {
                return NotFound();
            }

            return Ok(varDATA_MSG);
        }

        // PUT: api/DATA_MSG/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutDATA_MSG([FromRoute] Guid id, [FromBody] DATA_MSG varDATA_MSG)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varDATA_MSG.DATA_MSGId)
            {
                return BadRequest();
            }

            _context.Entry(varDATA_MSG).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DATA_MSGExists(id))
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

        // POST: api/DATA_MSG
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostDATA_MSG([FromBody] DATA_MSG varDATA_MSG)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DATA_MSG.Add(varDATA_MSG);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDATA_MSG", new { id = varDATA_MSG.DATA_MSGId }, varDATA_MSG);
        }

        // DELETE: api/DATA_MSG/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteDATA_MSG([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varDATA_MSG = await _context.DATA_MSG.SingleOrDefaultAsync(m => m.DATA_MSGId == id);
            if (varDATA_MSG == null)
            {
                return NotFound();
            }

            _context.DATA_MSG.Remove(varDATA_MSG);
            await _context.SaveChangesAsync();

            return Ok(varDATA_MSG);
        }

        private bool DATA_MSGExists(Guid id)
        {
            return _context.DATA_MSG.Any(e => e.DATA_MSGId == id);
        }
    }
}
