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
    [Route("api/MOND_CONNECTTYPE")]
    public class MOND_CONNECTTYPEController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MOND_CONNECTTYPEController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MOND_CONNECTTYPE
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetMOND_CONNECTTYPE()
        {
            return Json (_context.MOND_CONNECTTYPE, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MOND_CONNECTTYPEId id, ( [dbo].[MOND_CONNECTTYPE_BRIEF_F](MOND_CONNECTTYPEId,null)  ) name
                         FROM            
                          MOND_CONNECTTYPE 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MOND_CONNECTTYPE ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MOND_CONNECTTYPE/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetMOND_CONNECTTYPE([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_CONNECTTYPE = await _context.MOND_CONNECTTYPE.SingleOrDefaultAsync(m => m.MOND_CONNECTTYPEId == id);

            if (varMOND_CONNECTTYPE == null)
            {
                return NotFound();
            }

            return Ok(varMOND_CONNECTTYPE);
        }

        // PUT: api/MOND_CONNECTTYPE/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutMOND_CONNECTTYPE([FromRoute] Guid id, [FromBody] MOND_CONNECTTYPE varMOND_CONNECTTYPE)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMOND_CONNECTTYPE.MOND_CONNECTTYPEId)
            {
                return BadRequest();
            }

            _context.Entry(varMOND_CONNECTTYPE).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MOND_CONNECTTYPEExists(id))
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

        // POST: api/MOND_CONNECTTYPE
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostMOND_CONNECTTYPE([FromBody] MOND_CONNECTTYPE varMOND_CONNECTTYPE)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MOND_CONNECTTYPE.Add(varMOND_CONNECTTYPE);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMOND_CONNECTTYPE", new { id = varMOND_CONNECTTYPE.MOND_CONNECTTYPEId }, varMOND_CONNECTTYPE);
        }

        // DELETE: api/MOND_CONNECTTYPE/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteMOND_CONNECTTYPE([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMOND_CONNECTTYPE = await _context.MOND_CONNECTTYPE.SingleOrDefaultAsync(m => m.MOND_CONNECTTYPEId == id);
            if (varMOND_CONNECTTYPE == null)
            {
                return NotFound();
            }

            _context.MOND_CONNECTTYPE.Remove(varMOND_CONNECTTYPE);
            await _context.SaveChangesAsync();

            return Ok(varMOND_CONNECTTYPE);
        }

        private bool MOND_CONNECTTYPEExists(Guid id)
        {
            return _context.MOND_CONNECTTYPE.Any(e => e.MOND_CONNECTTYPEId == id);
        }
    }
}
