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
    [Route("api/MONDEV_REPORTS")]
    public class MONDEV_REPORTSController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONDEV_REPORTSController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONDEV_REPORTS
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetMONDEV_REPORTS()
        {
            return Json (_context.MONDEV_REPORTS, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONDEV_REPORTSId id, ( [dbo].[MONDEV_REPORTS_BRIEF_F](MONDEV_REPORTSId,null)  ) name
                         FROM            
                          MONDEV_REPORTS 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONDEV_REPORTS where MONDEV_BDEVICESID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONDEV_REPORTS/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetMONDEV_REPORTS([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONDEV_REPORTS = await _context.MONDEV_REPORTS.SingleOrDefaultAsync(m => m.MONDEV_REPORTSId == id);

            if (varMONDEV_REPORTS == null)
            {
                return NotFound();
            }

            return Ok(varMONDEV_REPORTS);
        }

        // PUT: api/MONDEV_REPORTS/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutMONDEV_REPORTS([FromRoute] Guid id, [FromBody] MONDEV_REPORTS varMONDEV_REPORTS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONDEV_REPORTS.MONDEV_REPORTSId)
            {
                return BadRequest();
            }

            _context.Entry(varMONDEV_REPORTS).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONDEV_REPORTSExists(id))
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

        // POST: api/MONDEV_REPORTS
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostMONDEV_REPORTS([FromBody] MONDEV_REPORTS varMONDEV_REPORTS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONDEV_REPORTS.Add(varMONDEV_REPORTS);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONDEV_REPORTS", new { id = varMONDEV_REPORTS.MONDEV_REPORTSId }, varMONDEV_REPORTS);
        }

        // DELETE: api/MONDEV_REPORTS/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteMONDEV_REPORTS([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONDEV_REPORTS = await _context.MONDEV_REPORTS.SingleOrDefaultAsync(m => m.MONDEV_REPORTSId == id);
            if (varMONDEV_REPORTS == null)
            {
                return NotFound();
            }

            _context.MONDEV_REPORTS.Remove(varMONDEV_REPORTS);
            await _context.SaveChangesAsync();

            return Ok(varMONDEV_REPORTS);
        }

        private bool MONDEV_REPORTSExists(Guid id)
        {
            return _context.MONDEV_REPORTS.Any(e => e.MONDEV_REPORTSId == id);
        }
    }
}
