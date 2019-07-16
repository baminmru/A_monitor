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
    [Route("api/MONDEV_MASK")]
    public class MONDEV_MASKController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONDEV_MASKController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONDEV_MASK
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetMONDEV_MASK()
        {
            return Json (_context.MONDEV_MASK, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONDEV_MASKId id, ( [dbo].[MONDEV_MASK_BRIEF_F](MONDEV_MASKId,null)  ) name
                         FROM            
                          MONDEV_MASK 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONDEV_MASK where MONDEV_BDEVICESID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONDEV_MASK/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetMONDEV_MASK([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONDEV_MASK = await _context.MONDEV_MASK.SingleOrDefaultAsync(m => m.MONDEV_MASKId == id);

            if (varMONDEV_MASK == null)
            {
                return NotFound();
            }

            return Ok(varMONDEV_MASK);
        }

        // PUT: api/MONDEV_MASK/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutMONDEV_MASK([FromRoute] Guid id, [FromBody] MONDEV_MASK varMONDEV_MASK)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONDEV_MASK.MONDEV_MASKId)
            {
                return BadRequest();
            }

            _context.Entry(varMONDEV_MASK).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONDEV_MASKExists(id))
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

        // POST: api/MONDEV_MASK
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostMONDEV_MASK([FromBody] MONDEV_MASK varMONDEV_MASK)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONDEV_MASK.Add(varMONDEV_MASK);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONDEV_MASK", new { id = varMONDEV_MASK.MONDEV_MASKId }, varMONDEV_MASK);
        }

        // DELETE: api/MONDEV_MASK/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteMONDEV_MASK([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONDEV_MASK = await _context.MONDEV_MASK.SingleOrDefaultAsync(m => m.MONDEV_MASKId == id);
            if (varMONDEV_MASK == null)
            {
                return NotFound();
            }

            _context.MONDEV_MASK.Remove(varMONDEV_MASK);
            await _context.SaveChangesAsync();

            return Ok(varMONDEV_MASK);
        }

        private bool MONDEV_MASKExists(Guid id)
        {
            return _context.MONDEV_MASK.Any(e => e.MONDEV_MASKId == id);
        }
    }
}
