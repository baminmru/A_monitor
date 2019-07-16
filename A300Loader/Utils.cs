using System;
using System.Collections.Generic;
using System.Text;
using System.Data;

namespace A300Loader
{
    public class Utils
    {
        public static  byte[] Hex2Bytes(string s)
        {
            string sOut = "";
            int i;
            List<byte> lb;
            lb = new List<byte>();

            for (i = 0; i <= s.Length - 2; i += 2)
            {
                byte v;
                v = Convert.ToByte(s.Substring(i, 2), 16);
                lb.Add(v);
            }
            return lb.ToArray();
        }


        public static string Hex2Str(string s)
        {
            string sOut = "";
            int i;
            for (i = 0; i <= s.Length - 2; i += 2)
            {
                byte v;
                v = Convert.ToByte(s.Substring(i, 2), 16);
                Char c = (Char)v;
                sOut = sOut + c.ToString();
            }
            return sOut;
        }


        public static double DP(string s)
        {
            double dOut;
            dOut = 0.0;
            if (s.Length == 0 | s == "")
                return 0.0;

            try
            {
                if (!double.TryParse(s, out dOut))
                    double.TryParse(s.Replace(".", ","), out dOut);
            }
            catch (Exception ex)
            {
                dOut = 0.0;
            }
            return dOut;
        }

        public static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddMilliseconds(unixTimeStamp).ToLocalTime();
            return dtDateTime;
        }

        public static DateTime UnixTimeStampToDateTime2(double unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToLocalTime();
            return dtDateTime;
        }

       
            public static string MakeMSSQLDate(DateTime d, bool FullDate = true)
            {
                if (d == null)
                    return "NULL";
                else if (FullDate)
                    return "convert(datetime,'" + MakeODBCDate(d) + "',120)";
                else
                {
                    d = new DateTime(d.Year, d.Month, d.Day);
                    return "convert(datetime,'" + MakeODBCDate(d) + "',120)";
                }
            }

            public static string Right(string str, int length)
            { return str.Substring(
                (str.Length-length), length
                );
        }



            public static string MakeORACLEDate(DateTime d, bool FullDate = true)
            {
                if (d == null)
                    return "NULL";
                else if (!FullDate)
                {
                    d = new DateTime(d.Year, d.Month, d.Day);
                    return "to_date('" + MakeODBCDate(d) + "','YYYY-MM-DD HH24:MI:SS')";
                }
                else
                    return "to_date('" + MakeODBCDate(d) + "','YYYY-MM-DD HH24:MI:SS')";
            }

            public static string MakeMySQLDate(DateTime d, bool FullDate = true)
            {
                if (d == null)
                    return "NULL";
                else if (!FullDate)
                {
                    d = new DateTime(d.Year, d.Month, d.Day);
                    return "str_to_date('" + MakeODBCDate(d) + "','%Y-%m-%d %H:%i:%s')";
                }
                else
                    return "str_to_date('" + MakeODBCDate(d) + "','%Y-%m-%d %H:%i:%s')";
            }

            public static string MakeODBCDate(DateTime d)
            {
                // yyyy-mm-dd hh:mi:ss(24h)
                if (d==null)
                    return "NULL";
                else
                    return Right("0000" + d.Year.ToString(), 4) + "-" + Right("00" + d.Month.ToString(), 2) + "-" + Right("00" + d.Day.ToString(), 2) + " " 
                        + Right("00" + d.Hour.ToString(), 2) + ":" + Right("00" + d.Minute.ToString(), 2) + ":" + Right("00" + d.Second.ToString(), 2);
            }
        


    }
}
