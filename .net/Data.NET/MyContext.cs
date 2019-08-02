using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using NLog;
using System.Configuration;
using Newtonsoft.Json;

namespace a_srv.models
{
   public class MyContext: DbContext
    {
        public MyContext(): base("a_srv")
        {
            //Database.EnsureCreated();

            _serializerSettings = new JsonSerializerSettings()
            {
                TypeNameHandling = TypeNameHandling.None
            };
        }


        
        private JsonSerializerSettings _serializerSettings;

        public JsonSerializerSettings serializerSettings()
        {

            return _serializerSettings;
        }
        public SqlConnection GetConnection()
        {
            return (SqlConnection)Database.Connection;
        }

        // retrivedata from raw sql select
        public List<Dictionary<string, object>> GetRaw(string SQL)
        {
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            DataTable dt;
            SqlDataAdapter da;
            SqlCommand cmd = new SqlCommand(SQL, (SqlConnection)Database.Connection);
            cmd.CommandType = CommandType.Text;
            dt = new DataTable();
            da = new SqlDataAdapter(cmd);
            try
            {

                // retrive data from db
                da.Fill(dt);

                foreach (DataRow dr in dt.Rows)
                {
                    row = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        if (dr[col] != DBNull.Value)
                            row.Add(col.ColumnName, dr[col]);
                        else
                            row.Add(col.ColumnName, null);
                    }
                    rows.Add(row);
                }


            }
            catch (System.Exception ex)
            {
                System.Diagnostics.Debug.Print(ex.Message);
            }
            finally
            {
                dt.Dispose();
                da.Dispose();
                cmd.Dispose();
            }

            return rows;
        }

        public DataTable DoQuery(string SQL)
        {
            DataTable dt;
            SqlDataAdapter da;
            SqlCommand cmd = new SqlCommand(SQL, (SqlConnection)Database.Connection);
            cmd.CommandType = CommandType.Text;
            dt = new DataTable();
            da = new SqlDataAdapter(cmd);
            try
            {

                // retrive data from db
                da.Fill(dt);

            }
            catch (System.Exception ex)
            {
                System.Diagnostics.Debug.Print(ex.Message);
            }
            finally
            {

                da.Dispose();
                cmd.Dispose();
            }

            return dt;
        }


        public string DoExec(string SQL)
        {

            SqlCommand cmd = new SqlCommand(SQL, (SqlConnection)Database.Connection);
            cmd.CommandType = CommandType.Text;
            System.Diagnostics.Debug.Print("Exec: " + SQL);
            Boolean my_open = false;
            try
            {
                if (cmd.Connection.State != ConnectionState.Open) { cmd.Connection.Open(); my_open = true; }
                cmd.ExecuteNonQuery();

            }
            catch (System.Exception ex)
            {
                System.Diagnostics.Debug.Print(ex.Message);
                return ex.Message;
            }
            finally
            {
                if (my_open && cmd.Connection.State == ConnectionState.Open) cmd.Connection.Close();
                cmd.Dispose();
            }
            return "";
        }




        public DbSet<a_srv.models.DATA_RECORD> DATA_RECORD { get; set; }
        public DbSet<a_srv.models.DATA_V> DATA_V { get; set; }
        public DbSet<a_srv.models.DATA_M> DATA_M { get; set; }
        public DbSet<a_srv.models.DATA_T> DATA_T { get; set; }
        public DbSet<a_srv.models.DATA_P> DATA_P { get; set; }
        public DbSet<a_srv.models.DATA_Q> DATA_Q { get; set; }
        public DbSet<a_srv.models.DATA_EP> DATA_EP { get; set; }
        public DbSet<a_srv.models.DATA_U> DATA_U { get; set; }
        public DbSet<a_srv.models.DATA_I> DATA_I { get; set; }
        public DbSet<a_srv.models.DATA_EQ> DATA_EQ { get; set; }
        public DbSet<a_srv.models.DATA_MSG> DATA_MSG { get; set; }
        public DbSet<a_srv.models.DATA_TIME> DATA_TIME { get; set; }
        public DbSet<a_srv.models.MONQ_DEF> MONQ_DEF { get; set; }
        public DbSet<a_srv.models.MONQ_result> MONQ_result { get; set; }
        public DbSet<a_srv.models.moncli_info> moncli_info { get; set; }
        public DbSet<a_srv.models.MOND_F> MOND_F { get; set; }
        public DbSet<a_srv.models.MOND_GRP> MOND_GRP { get; set; }
        public DbSet<a_srv.models.MONSRV_INFO> MONSRV_INFO { get; set; }
        public DbSet<a_srv.models.MONSRV_MODEMS> MONSRV_MODEMS { get; set; }
        public DbSet<a_srv.models.MONSRV_PORTS> MONSRV_PORTS { get; set; }
        public DbSet<a_srv.models.MON_USR> MON_USR { get; set; }
        public DbSet<a_srv.models.MOND_PARAM> MOND_PARAM { get; set; }
        public DbSet<a_srv.models.MOND_CONNECTTYPE> MOND_CONNECTTYPE { get; set; }
        public DbSet<a_srv.models.MOND_DEVCLASS> MOND_DEVCLASS { get; set; }
        public DbSet<a_srv.models.MOND_DEVTYPE> MOND_DEVTYPE { get; set; }
        public DbSet<a_srv.models.MOND_ATYPE> MOND_ATYPE { get; set; }
        public DbSet<a_srv.models.MOND_SNABTOP> MOND_SNABTOP { get; set; }
        public DbSet<a_srv.models.MOND_SNAB> MOND_SNAB { get; set; }
        public DbSet<a_srv.models.MOND_ROLE> MOND_ROLE { get; set; }
        public DbSet<a_srv.models.MOND_DATA> MOND_DATA { get; set; }
        public DbSet<a_srv.models.MONSCH_INFO> MONSCH_INFO { get; set; }
        public DbSet<a_srv.models.MONSCH_PARAM> MONSCH_PARAM { get; set; }
        public DbSet<a_srv.models.MONN_DEF> MONN_DEF { get; set; }
        public DbSet<a_srv.models.MONN_LATLON> MONN_LATLON { get; set; }
        public DbSet<a_srv.models.MONDEV_BDEVICES> MONDEV_BDEVICES { get; set; }
        public DbSet<a_srv.models.MONDEV_CONNECT> MONDEV_CONNECT { get; set; }
        public DbSet<a_srv.models.MONDEV_CONTRACT> MONDEV_CONTRACT { get; set; }
        public DbSet<a_srv.models.MONDEV_PLANCALL> MONDEV_PLANCALL { get; set; }
        public DbSet<a_srv.models.MONDEV_VALUEBOUNDS> MONDEV_VALUEBOUNDS { get; set; }
        public DbSet<a_srv.models.MONDEV_REPORTS> MONDEV_REPORTS { get; set; }
        public DbSet<a_srv.models.MONDEV_MASK> MONDEV_MASK { get; set; }

        public DbSet<a_srv.models.logcall> logcall { get; set; }
        public DbSet<a_srv.models.LoraInput> LoraInput { get; set; }


    }
}
