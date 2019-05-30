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
    [Route("api/MOND_GRP")]
    public class MOND_GRPController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MOND_GRPController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MOND_GRP
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetMOND_GRP()
        {
            return Json (_context.MOND_GRP, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MOND_GRPId id, ( [dbo].[MOND_GRP_BRIEF_F](MOND_GRPId,null)  ) name
                         FROM            
                          MOND_GRP 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MOND_GRP where moncli_infoID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MOND_GRP/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMOND_GRP([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_GRP = await _context.MOND_GRP.SingleOrDefaultAsync(m => m.MOND_GRPId == id);

            if (varMOND_GRP == null)
            {
                return NotFound();
            }

            return Ok(varMOND_GRP);
        }

        // PUT: api/MOND_GRP/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutMOND_GRP([FromRoute] Guid id, [FromBody] MOND_GRP varMOND_GRP)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMOND_GRP.MOND_GRPId)
            {
                return BadRequest();
            }

            _context.Entry(varMOND_GRP).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MOND_GRPExists(id))
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

        // POST: api/MOND_GRP
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostMOND_GRP([FromBody] MOND_GRP varMOND_GRP)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MOND_GRP.Add(varMOND_GRP);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMOND_GRP", new { id = varMOND_GRP.MOND_GRPId }, varMOND_GRP);
        }

        // DELETE: api/MOND_GRP/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteMOND_GRP([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_GRP = await _context.MOND_GRP.SingleOrDefaultAsync(m => m.MOND_GRPId == id);
            if (varMOND_GRP == null)
            {
                return NotFound();
            }

            _context.MOND_GRP.Remove(varMOND_GRP);
            await _context.SaveChangesAsync();

            return Ok(varMOND_GRP);
        }

        private bool MOND_GRPExists(Guid id)
        {
            return _context.MOND_GRP.Any(e => e.MOND_GRPId == id);
        }
    }
}
