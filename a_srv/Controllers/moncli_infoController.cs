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
    [Route("api/moncli_info")]
    public class moncli_infoController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public moncli_infoController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/moncli_info
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Getmoncli_info()
        {
            return Json (_context.moncli_info, _context.serializerSettings());
        }

        [HttpGet("combo")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT moncli_infoId id, ( [dbo].[moncli_info_BRIEF_F](moncli_infoId,null)  ) name
                         FROM            
                          moncli_info 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("view")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetView()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_moncli_info ";
            return _context.GetRaw(sql);
        }
        
        // GET: api/moncli_info/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Getmoncli_info([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varmoncli_info = await _context.moncli_info.SingleOrDefaultAsync(m => m.moncli_infoId == id);

            if (varmoncli_info == null)
            {
                return NotFound();
            }

            return Ok(varmoncli_info);
        }

        // PUT: api/moncli_info/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Putmoncli_info([FromRoute] Guid id, [FromBody] moncli_info varmoncli_info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varmoncli_info.moncli_infoId)
            {
                return BadRequest();
            }

            _context.Entry(varmoncli_info).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!moncli_infoExists(id))
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

        // POST: api/moncli_info
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Postmoncli_info([FromBody] moncli_info varmoncli_info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.moncli_info.Add(varmoncli_info);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getmoncli_info", new { id = varmoncli_info.moncli_infoId }, varmoncli_info);
        }

        // DELETE: api/moncli_info/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Deletemoncli_info([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varmoncli_info = await _context.moncli_info.SingleOrDefaultAsync(m => m.moncli_infoId == id);
            if (varmoncli_info == null)
            {
                return NotFound();
            }

            _context.moncli_info.Remove(varmoncli_info);
            await _context.SaveChangesAsync();

            return Ok(varmoncli_info);
        }

        private bool moncli_infoExists(Guid id)
        {
            return _context.moncli_info.Any(e => e.moncli_infoId == id);
        }
    }
}
