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
    [Route("api/MONDEV_CONTRACT")]
    public class MONDEV_CONTRACTController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONDEV_CONTRACTController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONDEV_CONTRACT
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetMONDEV_CONTRACT()
        {
            return Json (_context.MONDEV_CONTRACT, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONDEV_CONTRACTId id, ( [dbo].[MONDEV_CONTRACT_BRIEF_F](MONDEV_CONTRACTId,null)  ) name
                         FROM            
                          MONDEV_CONTRACT 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONDEV_CONTRACT where MONDEV_BDEVICESID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONDEV_CONTRACT/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetMONDEV_CONTRACT([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONDEV_CONTRACT = await _context.MONDEV_CONTRACT.SingleOrDefaultAsync(m => m.MONDEV_CONTRACTId == id);

            if (varMONDEV_CONTRACT == null)
            {
                return NotFound();
            }

            return Ok(varMONDEV_CONTRACT);
        }

        // PUT: api/MONDEV_CONTRACT/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutMONDEV_CONTRACT([FromRoute] Guid id, [FromBody] MONDEV_CONTRACT varMONDEV_CONTRACT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONDEV_CONTRACT.MONDEV_CONTRACTId)
            {
                return BadRequest();
            }

            _context.Entry(varMONDEV_CONTRACT).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONDEV_CONTRACTExists(id))
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

        // POST: api/MONDEV_CONTRACT
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostMONDEV_CONTRACT([FromBody] MONDEV_CONTRACT varMONDEV_CONTRACT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONDEV_CONTRACT.Add(varMONDEV_CONTRACT);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONDEV_CONTRACT", new { id = varMONDEV_CONTRACT.MONDEV_CONTRACTId }, varMONDEV_CONTRACT);
        }

        // DELETE: api/MONDEV_CONTRACT/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteMONDEV_CONTRACT([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONDEV_CONTRACT = await _context.MONDEV_CONTRACT.SingleOrDefaultAsync(m => m.MONDEV_CONTRACTId == id);
            if (varMONDEV_CONTRACT == null)
            {
                return NotFound();
            }

            _context.MONDEV_CONTRACT.Remove(varMONDEV_CONTRACT);
            await _context.SaveChangesAsync();

            return Ok(varMONDEV_CONTRACT);
        }

        private bool MONDEV_CONTRACTExists(Guid id)
        {
            return _context.MONDEV_CONTRACT.Any(e => e.MONDEV_CONTRACTId == id);
        }
    }
}
