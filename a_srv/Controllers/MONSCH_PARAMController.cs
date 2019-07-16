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
    [Route("api/MONSCH_PARAM")]
    public class MONSCH_PARAMController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONSCH_PARAMController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONSCH_PARAM
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetMONSCH_PARAM()
        {
            return Json (_context.MONSCH_PARAM, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONSCH_PARAMId id, ( [dbo].[MONSCH_PARAM_BRIEF_F](MONSCH_PARAMId,null)  ) name
                         FROM            
                          MONSCH_PARAM 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONSCH_PARAM where MONSCH_INFOID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONSCH_PARAM/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetMONSCH_PARAM([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONSCH_PARAM = await _context.MONSCH_PARAM.SingleOrDefaultAsync(m => m.MONSCH_PARAMId == id);

            if (varMONSCH_PARAM == null)
            {
                return NotFound();
            }

            return Ok(varMONSCH_PARAM);
        }

        // PUT: api/MONSCH_PARAM/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutMONSCH_PARAM([FromRoute] Guid id, [FromBody] MONSCH_PARAM varMONSCH_PARAM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONSCH_PARAM.MONSCH_PARAMId)
            {
                return BadRequest();
            }

            _context.Entry(varMONSCH_PARAM).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONSCH_PARAMExists(id))
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

        // POST: api/MONSCH_PARAM
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostMONSCH_PARAM([FromBody] MONSCH_PARAM varMONSCH_PARAM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONSCH_PARAM.Add(varMONSCH_PARAM);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONSCH_PARAM", new { id = varMONSCH_PARAM.MONSCH_PARAMId }, varMONSCH_PARAM);
        }

        // DELETE: api/MONSCH_PARAM/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteMONSCH_PARAM([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONSCH_PARAM = await _context.MONSCH_PARAM.SingleOrDefaultAsync(m => m.MONSCH_PARAMId == id);
            if (varMONSCH_PARAM == null)
            {
                return NotFound();
            }

            _context.MONSCH_PARAM.Remove(varMONSCH_PARAM);
            await _context.SaveChangesAsync();

            return Ok(varMONSCH_PARAM);
        }

        private bool MONSCH_PARAMExists(Guid id)
        {
            return _context.MONSCH_PARAM.Any(e => e.MONSCH_PARAMId == id);
        }
    }
}
