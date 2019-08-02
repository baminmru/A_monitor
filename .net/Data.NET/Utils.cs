using System;
using System.Collections.Generic;
using System.Text;
using System.Data;

namespace a_srv.models
{
    public static class Utils
    {

        public static string Right(string str, int length)
        {
            if(str.Length >length)
                return str.Substring((str.Length-length ), length);
            else
            {
                return str;
            }

        }

        public static string Left(string param, int length)
        {
            string result = param.Substring(0, length);
            return result;
        }

        public static string Mid(string param, int startIndex, int length)
        {
            string result = param.Substring(startIndex, length);
            return result;
        }

        public static string MSSQLDate(DateTime d, bool FullDate = true)
        {
            if (Convert.IsDBNull(d))
                return "NULL";

            else if (FullDate)
                return "convert(datetime,'" + MakeODBCDate(d) + "',120)";
            else
            {
                d = new DateTime(d.Year , d.Month , d.Day);
                return "convert(datetime,'" + MakeODBCDate(d) + "',120)";
            }
        }

        public static string MakeODBCDate(DateTime d)
        {
            // yyyy-mm-dd hh:mi:ss(24h)
            if (Convert.IsDBNull(d))
                return "NULL";
            else
                return Right("0000" + d.Year.ToString() , 4) + "-" + Right("00" + d.Month.ToString() , 2) + "-" + Right("00" + d.Day.ToString(), 2)
                    + " " + Right("00" + d.Hour, 2) + ":" + Right("00" + d.Minute.ToString(), 2) + ":" + Right("00" + d.Second.ToString(), 2);
        }
    }
}
