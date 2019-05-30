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
using a_srv.data;
using System.Data;
using System.Text;

namespace a_srv.Controllers
{
    [Produces("application/json")]
    [Route("api/Dispatcher")]
    public class DispatcherController : Controller
    {

        private readonly MyContext _context;
        IHostingEnvironment _appEnvironment;

        public DispatcherController(MyContext context, IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }



        [HttpGet("nodes")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetNodes()
        {
            string sql = @" SELECT  MONDEV_BDEVICESID DeviceID, MONN_DEF.Addr NodeName, MONDEV_BDEVICES.Name DeviceName  
                FROM MONDEV_BDEVICES join MONN_DEF on MONDEV_BDEVICES.TheNode =MONN_DEFid 
				order by NodeName,DeviceName";
            return _context.GetRaw(sql);
        }




        [HttpGet("init/{id}")]
        [AllowAnonymous]
        public async Task<string> Init([FromRoute] Guid id)
        {

            DateTime RDate = new DateTime(2019, 4, 1, 0, 0, 0);
            Random Rnd = new Random();

            while (RDate < DateTime.Today)
            {
                Guid RID = Guid.NewGuid();

                var varDATA_RECORD = new DATA_RECORD()
                {
                    DATA_RECORDId = RID,
                    ID_BD = id,
                    DCOUNTER = RDate,
                    DCALL = RDate,
                    dstart = RDate.AddMinutes(-61),
                    dend = RDate.AddMinutes(-1),
                    AType = new Guid("19DB21FC-0BD7-47A1-D3D7-08D6D1323977")
                };

                _context.DATA_RECORD.Add(varDATA_RECORD);

                await _context.SaveChangesAsync();


                var varDATA_I = new DATA_I()
                {
                    DATA_IId = new Guid(),
                    DATA_RECORDId = RID,
                    I1 = Rnd.Next(1, 30),
                    I2 = Rnd.Next(1, 30),
                    I3 = Rnd.Next(1, 30)
                };

                _context.DATA_I.Add(varDATA_I);

                await _context.SaveChangesAsync();


                var varDATA_U = new DATA_U()
                {
                    DATA_UId = new Guid(),
                    DATA_RECORDId = RID,
                    U1 = Rnd.Next(200, 245),
                    U2 = Rnd.Next(200, 245),
                    U3 = Rnd.Next(200, 245)
                };

                _context.DATA_U.Add(varDATA_U);


                var varDATA_EP = new DATA_EP()
                {
                    DATA_EPId = new Guid(),
                    DATA_RECORDId = RID,
                    EP1 = varDATA_U.U1 * varDATA_I.I1,
                    EP2 = varDATA_U.U2 * varDATA_I.I2,
                    EP3 = varDATA_U.U3 * varDATA_I.I3
                };

                _context.DATA_EP.Add(varDATA_EP);

                await _context.SaveChangesAsync();

                var varDATA_EQ = new DATA_EQ()
                {
                    DATA_EQId = new Guid(),
                    DATA_RECORDId = RID,
                    E1 = varDATA_U.U1 * varDATA_I.I1,
                    E2 = varDATA_U.U2 * varDATA_I.I2,
                    E3 = varDATA_U.U3 * varDATA_I.I3,
                    E0 = varDATA_U.U1 * varDATA_I.I1 + varDATA_U.U2 * varDATA_I.I2 + varDATA_U.U3 * varDATA_I.I3,
                    AP = varDATA_U.U1 * varDATA_I.I1,
                    AM = 0,
                    RP = varDATA_U.U1 * varDATA_I.I1 / 10,
                    RM = 0


                };

                _context.DATA_EQ.Add(varDATA_EQ);

                await _context.SaveChangesAsync();

                RDate = RDate.AddHours(1);

            }






            return "Ok";


        }

        [HttpPost("electro/{id}")]
        [AllowAnonymous]
        public List<Dictionary<string, object>> GetView([FromRoute] Guid id, [FromBody] DispatcherFilter request)
        {
            //var uid = User.GetUserId();


            string sql = MakeRequest(id, request);
            return _context.GetRaw(sql);
        }


        [HttpPost("chart_i/{id}")]
        [AllowAnonymous]
        public string GetChart_I([FromRoute] Guid id, [FromBody] DispatcherFilter request)
        {
            //var uid = User.GetUserId();


            string sql = MakeChartRequest(id, request);

            DataTable dt = _context.DoQuery(sql);

            StringBuilder sb = new StringBuilder();
        sb.Append(@"[[{ ""datatype"":""string"",""label"":""Час""},{ ""datatype"":""number"",""label"":""I1""},{ ""datatype"":""number"",""label"":""I2""},{ ""datatype"":""number"",""label"":""I3""}]");

            for (int i = 0; i < dt.Rows.Count; i++)
            {

            sb.Append(@",[");
            //sb.Append(@"""" + dt.Rows[i]["DCOUNTER"].ToString() +@""",");
                sb.Append(@"""" + i.ToString() + @""",");
                sb.Append(dt.Rows[i]["I1"].ToString().Replace(",",".") + ",");
            sb.Append(dt.Rows[i]["I2"].ToString().Replace(",", ".") + ",");
            sb.Append(dt.Rows[i]["I3"].ToString().Replace(",", "."));

            sb.Append(@"]");

        }
            sb.Append(@"]");

            return sb.ToString();
        }

        [HttpPost("chart_u/{id}")]
        [AllowAnonymous]
        public string GetChart_U([FromRoute] Guid id, [FromBody] DispatcherFilter request)
        {
            //var uid = User.GetUserId();


            string sql = MakeChartRequest(id, request);

            DataTable dt = _context.DoQuery(sql);

            StringBuilder sb = new StringBuilder();
            sb.Append(@"[[{ ""datatype"":""string"",""label"":""Час""},{ ""datatype"":""number"",""label"":""U1""},{ ""datatype"":""number"",""label"":""U2""},{ ""datatype"":""number"",""label"":""U3""}]");

            for (int i = 0; i < dt.Rows.Count; i++)
            {

                sb.Append(@",[");
                //sb.Append(@"""" + dt.Rows[i]["DCOUNTER"].ToString() +@""",");
                sb.Append(@"""" + i.ToString() + @""",");
                sb.Append(dt.Rows[i]["U1"].ToString().Replace(",", ".") + ",");
                sb.Append(dt.Rows[i]["U2"].ToString().Replace(",", ".") + ",");
                sb.Append(dt.Rows[i]["U3"].ToString().Replace(",", "."));

                sb.Append(@"]");

            }
            sb.Append(@"]");

            return sb.ToString();
        }



        [HttpPost("chart_p/{id}")]
        [AllowAnonymous]
        public string GetChart_P([FromRoute] Guid id, [FromBody] DispatcherFilter request)
        {
            //var uid = User.GetUserId();


            string sql = MakeChartRequest(id, request);

            DataTable dt = _context.DoQuery(sql);

            StringBuilder sb = new StringBuilder();
            sb.Append(@"[[{ ""datatype"":""string"",""label"":""Час""},{ ""datatype"":""number"",""label"":""P1""},{ ""datatype"":""number"",""label"":""P2""},{ ""datatype"":""number"",""label"":""P3""}]");

            for (int i = 0; i < dt.Rows.Count; i++)
            {

                sb.Append(@",[");
                //sb.Append(@"""" + dt.Rows[i]["DCOUNTER"].ToString() +@""",");
                sb.Append(@"""" + i.ToString() + @""",");
                sb.Append(dt.Rows[i]["EP1"].ToString().Replace(",", ".") + ",");
                sb.Append(dt.Rows[i]["EP2"].ToString().Replace(",", ".") + ",");
                sb.Append(dt.Rows[i]["EP3"].ToString().Replace(",", "."));

                sb.Append(@"]");

            }
            sb.Append(@"]");

            return sb.ToString();
        }

        [HttpPost("chart_t/{id}")]
        [AllowAnonymous]
        public string GetChart_T([FromRoute] Guid id, [FromBody] DispatcherFilter request)
        {
            //var uid = User.GetUserId();


            string sql = MakeChartRequest(id, request);

            DataTable dt = _context.DoQuery(sql);

            StringBuilder sb = new StringBuilder();
            sb.Append(@"[[{ ""datatype"":""string"",""label"":""Час""},{ ""datatype"":""number"",""label"":""T1""},{ ""datatype"":""number"",""label"":""T2""},{ ""datatype"":""number"",""label"":""T3""}]");
            //sb.Append(@"[[""Час"",""T1"",""T2"",""T3""]");

            for (int i = 0; i < dt.Rows.Count; i++)
            {

                sb.Append(@",[");
                //sb.Append(@"""" + dt.Rows[i]["DCOUNTER"].ToString() +@""",");
                sb.Append(@"""" + i.ToString() + @""",");
                sb.Append(dt.Rows[i]["E1"].ToString().Replace(",", ".") + ",");
                sb.Append(dt.Rows[i]["E2"].ToString().Replace(",", ".") + ",");
                sb.Append(dt.Rows[i]["E3"].ToString().Replace(",", "."));

                sb.Append(@"]");

            }
            sb.Append(@"]");

            return sb.ToString();
        }




        private string MakeRequest(Guid id, DispatcherFilter request)
        {
            string sql = @"SELECT [DATA_RECORDid]
      ,[ID_BD]
      ,[ATYPE]
      ,substring(convert(varchar,[DCALL],120),0,17) DCALL
      ,substring(convert(varchar,[DCOUNTER],120),0,17) DCOUNTER
      ,substring(convert(varchar,[dstart],120),0,17) dstart
      ,substring(convert(varchar,[dend],120),0,17) dend
      ,[name]
      ,[U1]
      ,[U2]
      ,[U3]
      ,[I1]
      ,[I2]
      ,[I3]
      ,[EP1]
      ,[EP2]
      ,[EP3]
      ,[E0]
      ,[E1]
      ,[E2]
      ,[E3]
      ,[AP]
      ,[AM]
      ,[RP]
      ,[RM] FROM V_DISPATCHER_ELECTRO where ID_BD='" + id.ToString() + "' ";

            if (!request.AType.Equals(Guid.Empty))
            {
                sql = sql + " and ATYPE='" + request.AType.ToString() + "' ";
            }


            DateTime d;
            if (request.dstart != null && request.dstart != "")
            {

                if (DateTime.TryParse(request.dstart, out d))
                {
                    sql = sql + " and DCOUNTER >=" + Utils.MSSQLDate(d);
                }
                else
                {
                    d = DateTime.Today.AddDays(-10);
                    sql = sql + " and DCOUNTER >=" + Utils.MSSQLDate(d);
                }
            }
            else
            {
                d = DateTime.Today.AddDays(-10);
                sql = sql + " and DCOUNTER >=" + Utils.MSSQLDate(d);
            }


            if (request.dend != null && request.dend != "")
            {

                if (DateTime.TryParse(request.dend, out d))
                {
                    sql = sql + " and DCOUNTER <=" + Utils.MSSQLDate(d);
                }
                else
                {
                    d = DateTime.Today.AddDays(1);
                    sql = sql + " and DCOUNTER <=" + Utils.MSSQLDate(d);
                }
            }
            else
            {
                d = DateTime.Today.AddDays(1);
                sql = sql + " and DCOUNTER <=" + Utils.MSSQLDate(d);
            }

            sql = sql + " order by DCOUNTER";
            return sql;
        }

    

    private string MakeChartRequest(Guid id, DispatcherFilter request)
    {
        string sql = @"SELECT [DATA_RECORDid]
      ,[ID_BD]
      ,[ATYPE]
      ,substring(convert(varchar,[DCALL],120),0,17) DCALL
      ,substring(convert(varchar,[DCOUNTER],120),0,17) DCOUNTER
      ,substring(convert(varchar,[dstart],120),0,17) dstart
      ,substring(convert(varchar,[dend],120),0,17) dend
      ,[name]
      ,[U1]
      ,[U2]
      ,[U3]
      ,[I1]
      ,[I2]
      ,[I3]
      ,[EP1]
      ,[EP2]
      ,[EP3]
      ,[E0]
      ,[E1]
      ,[E2]
      ,[E3]
      ,[AP]
      ,[AM]
      ,[RP]
      ,[RM] FROM V_DISPATCHER_ELECTRO where ID_BD='" + id.ToString() + "' ";

        if (!request.AType.Equals(Guid.Empty))
        {
            sql = sql + " and ATYPE='" + request.AType.ToString() + "' ";
        }


        DateTime d;
        if (request.dstart != null && request.dstart != "")
        {

            if (DateTime.TryParse(request.dstart, out d))
            {
                sql = sql + " and DCOUNTER >=" + Utils.MSSQLDate(d);
                    d = d.AddDays(1);
                sql = sql + " and DCOUNTER <" + Utils.MSSQLDate(d);
            }
            else
            {
                d = DateTime.Today.AddDays(-1);
                sql = sql + " and DCOUNTER >=" + Utils.MSSQLDate(d);
                    d = d.AddDays(1);
                    sql = sql + " and DCOUNTER <" + Utils.MSSQLDate(d);
                }
        }
        else
        {
            d = DateTime.Today.AddDays(-1);
            sql = sql + " and DCOUNTER >=" + Utils.MSSQLDate(d);
                d = d.AddDays(1);
                sql = sql + " and DCOUNTER <" + Utils.MSSQLDate(d);
            }

        /*
        if (request.dend != null && request.dend != "")
        {

            if (DateTime.TryParse(request.dend, out d))
            {
                sql = sql + " and DCOUNTER <=" + Utils.MSSQLDate(d);
            }
            else
            {
                d = DateTime.Today.AddDays(1);
                sql = sql + " and DCOUNTER <=" + Utils.MSSQLDate(d);
            }
        }
        else
        {
            d = DateTime.Today.AddDays(1);
            sql = sql + " and DCOUNTER <=" + Utils.MSSQLDate(d);
        }
        */

        sql = sql + " order by DCOUNTER";
        return sql;
    }

}




}

