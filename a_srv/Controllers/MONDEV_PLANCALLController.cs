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
    [Route("api/MONDEV_PLANCALL")]
    public class MONDEV_PLANCALLController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONDEV_PLANCALLController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONDEV_PLANCALL
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetMONDEV_PLANCALL()
        {
            return Json (_context.MONDEV_PLANCALL, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONDEV_PLANCALLId id, ( [dbo].[MONDEV_PLANCALL_BRIEF_F](MONDEV_PLANCALLId,null)  ) name
                         FROM            
                          MONDEV_PLANCALL 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONDEV_PLANCALL where MONDEV_BDEVICESID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONDEV_PLANCALL/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetMONDEV_PLANCALL([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONDEV_PLANCALL = await _context.MONDEV_PLANCALL.SingleOrDefaultAsync(m => m.MONDEV_PLANCALLId == id);

            if (varMONDEV_PLANCALL == null)
            {
                return NotFound();
            }

            return Ok(varMONDEV_PLANCALL);
        }

        // PUT: api/MONDEV_PLANCALL/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutMONDEV_PLANCALL([FromRoute] Guid id, [FromBody] MONDEV_PLANCALL varMONDEV_PLANCALL)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONDEV_PLANCALL.MONDEV_PLANCALLId)
            {
                return BadRequest();
            }

            _context.Entry(varMONDEV_PLANCALL).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONDEV_PLANCALLExists(id))
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

        // POST: api/MONDEV_PLANCALL
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostMONDEV_PLANCALL([FromBody] MONDEV_PLANCALL varMONDEV_PLANCALL)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONDEV_PLANCALL.Add(varMONDEV_PLANCALL);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONDEV_PLANCALL", new { id = varMONDEV_PLANCALL.MONDEV_PLANCALLId }, varMONDEV_PLANCALL);
        }

        // DELETE: api/MONDEV_PLANCALL/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteMONDEV_PLANCALL([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONDEV_PLANCALL = await _context.MONDEV_PLANCALL.SingleOrDefaultAsync(m => m.MONDEV_PLANCALLId == id);
            if (varMONDEV_PLANCALL == null)
            {
                return NotFound();
            }

            _context.MONDEV_PLANCALL.Remove(varMONDEV_PLANCALL);
            await _context.SaveChangesAsync();

            return Ok(varMONDEV_PLANCALL);
        }

        private bool MONDEV_PLANCALLExists(Guid id)
        {
            return _context.MONDEV_PLANCALL.Any(e => e.MONDEV_PLANCALLId == id);
        }
    }
}
