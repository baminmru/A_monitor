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
    [Route("api/MONDEV_CONNECT")]
    public class MONDEV_CONNECTController : Controller
    {
        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public MONDEV_CONNECTController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/MONDEV_CONNECT
        [HttpGet]
        //[AllowAnonymous]
        public IActionResult GetMONDEV_CONNECT()
        {
            return Json (_context.MONDEV_CONNECT, _context.serializerSettings());
        }

        [HttpGet("combo")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetCombo()
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT MONDEV_CONNECTId id, ( [dbo].[MONDEV_CONNECT_BRIEF_F](MONDEV_CONNECTId,null)  ) name
                         FROM            
                          MONDEV_CONNECT 
                            order by name ";
            return _context.GetRaw(sql);
        }
        
        [HttpGet("byparent/{id}")]
        //[AllowAnonymous]
        public List<Dictionary<string, object>> GetByBarent([FromRoute] Guid id)
        {
            //var uid = User.GetUserId();

            string sql = @"SELECT * FROM V_MONDEV_CONNECT where MONDEV_BDEVICESID='" + id.ToString() + "'";
            return _context.GetRaw(sql);
        }
        
        // GET: api/MONDEV_CONNECT/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> GetMONDEV_CONNECT([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONDEV_CONNECT = await _context.MONDEV_CONNECT.SingleOrDefaultAsync(m => m.MONDEV_CONNECTId == id);

            if (varMONDEV_CONNECT == null)
            {
                return NotFound();
            }

            return Ok(varMONDEV_CONNECT);
        }

        // PUT: api/MONDEV_CONNECT/5
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutMONDEV_CONNECT([FromRoute] Guid id, [FromBody] MONDEV_CONNECT varMONDEV_CONNECT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != varMONDEV_CONNECT.MONDEV_CONNECTId)
            {
                return BadRequest();
            }

            _context.Entry(varMONDEV_CONNECT).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MONDEV_CONNECTExists(id))
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

        // POST: api/MONDEV_CONNECT
        [HttpPost]
        //[AllowAnonymous]
        public async Task<IActionResult> PostMONDEV_CONNECT([FromBody] MONDEV_CONNECT varMONDEV_CONNECT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MONDEV_CONNECT.Add(varMONDEV_CONNECT);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMONDEV_CONNECT", new { id = varMONDEV_CONNECT.MONDEV_CONNECTId }, varMONDEV_CONNECT);
        }

        // DELETE: api/MONDEV_CONNECT/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteMONDEV_CONNECT([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var varMONDEV_CONNECT = await _context.MONDEV_CONNECT.SingleOrDefaultAsync(m => m.MONDEV_CONNECTId == id);
            if (varMONDEV_CONNECT == null)
            {
                return NotFound();
            }

            _context.MONDEV_CONNECT.Remove(varMONDEV_CONNECT);
            await _context.SaveChangesAsync();

            return Ok(varMONDEV_CONNECT);
        }

        private bool MONDEV_CONNECTExists(Guid id)
        {
            return _context.MONDEV_CONNECT.Any(e => e.MONDEV_CONNECTId == id);
        }
    }
}
