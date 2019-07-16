using System;  
using System.Text;
using a_srv.models;
using Microsoft.EntityFrameworkCore; // пространство имен EntityFramework
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Xml;

namespace A300Loader
{
    class Program
    {
        static void Main(string[] args)
        {
            //string connection = "Server=localhost\\sqlexpress;Database=a3;Trusted_Connection=True;MultipleActiveResultSets=true";
            //string connection = "Server=localhost;Database=a3;User Id=sa;Password=P@ssw0rd;MultipleActiveResultSets=true";

            ReadConfig();

            DbContextOptionsBuilder<MyContext> ob = new DbContextOptionsBuilder<MyContext>();
            ob.UseSqlServer(Connection);


            using (MyContext context = new MyContext(ob.Options))
            {
                List<Dictionary<string, object>> rows = context.GetRaw("select distinct devEui  from LoraInput");
                foreach (Dictionary<string, object> row in rows)
                {
                    Console.WriteLine(row["devEui"].ToString());
                    String dev = row["devEui"].ToString();

                    var devdata = context.MONDEV_CONNECT.Where(d => d.callerID == dev).FirstOrDefault();
                    if (devdata != null)
                    {
                        Console.WriteLine(devdata.MONDEV_BDEVICESId.ToString());
                        List<Dictionary<string, object>> packets = context.GetRaw("select *  from LoraInput where devEui='" + dev + "' order by recvTime,fcntup");
                        string payload = "";
                        string[] payloads = new string[4];
                        Byte[] b = null;
                        bool payloadsReady = false;
                        foreach (Dictionary<string, object> packet in packets)
                        {
                            if (packet["payload"].ToString().Length > 2)
                            {
                                string data;

                                string p = packet["payload"].ToString();
                                //  убираем первый нулевой полубайт
                                if (p.StartsWith("00") || p.StartsWith("024"))
                                {
                                    data = packet["payload"].ToString().Substring(1);
                                    b = Utils.Hex2Bytes(data);
                                }
                                else
                                {
                                    data = packet["payload"].ToString();
                                    b = Utils.Hex2Bytes(data);
                                }


                                if (((b[0] & 0x38) >> 3) == 1)
                                {
                                    payloads[0] = "";
                                    payloads[1] = "";
                                    payloads[2] = "";
                                    payloads[3] = "";
                                    payloadsReady = true;
                                }

                                if (((b[0] & 0x38) >> 3) >= 1)
                                {

                                    // у всех пакетов кроме первого отрезаем первый байт
                                    if (((b[0] & 0x38) >> 3) > 1)
                                    {
                                        payloads[((b[0] & 0x38) >> 3) - 1] = data.Substring(2);
                                    }
                                    else
                                    {
                                        payloads[((b[0] & 0x38) >> 3) - 1] = data;
                                    }


                                    // если это последний пакет в посылке
                                    if ((b[0] & 0x7) == ((b[0] & 0x38) >> 3))
                                    {
                                        // боремся с несколькими последними пакетами
                                        if (payloadsReady)
                                        {
                                            payload = payloads[0] + payloads[1] + payloads[2] + payloads[3];
                                            b = Utils.Hex2Bytes(payload);
                                            System.Diagnostics.Debug.Print("\r\n" + payload.Length.ToString() + " " + payload);

                                            ProcessPacket(context, b, devdata.MONDEV_BDEVICESId);
                                            payloadsReady = false;
                                        }

                                    }
                                }else{
                                    Console.WriteLine("Skip broken packet:" + data);
                                }

                            }


                        }
                    }




                }


            }
        }

        private static string Connection;

        private static void ReadConfig()
        {
            XmlDocument xml; //As XmlDocument
            String s;
            s = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase);
            s = s.Substring(6);
            xml = new XmlDocument();
            xml.Load(s + "\\LoaderConfig.xml");
            XmlElement node; //As XmlElement
            node = (XmlElement)xml.LastChild;

            Connection = node.Attributes.GetNamedItem("db").Value;
            Console.WriteLine(Connection);
        }
        private static void ProcessPacket(MyContext context, Byte[]b, Guid DeviceID)
        {
            if (b.Length > 110)
            {

                // process packet 0
                if (((b[0] & 0xC0) >> 6) == 0)
                {
                    for (int i = 0; i < 1440 /b[31]; i++)
                    {
                        DATA_RECORD rec = new DATA_RECORD();
                        Guid RecordID = Guid.NewGuid();
                        rec.DATA_RECORDId = RecordID;
                        rec.ID_BD = DeviceID;
                        rec.AType = new Guid("868BCF44-FB91-47B2-D3DA-08D6D1323977");  // получасовки
                        UInt32 loraT = (((UInt32)b[3]) << 24) + (((UInt32)b[4]) << 16) + (((UInt32)b[5]) << 8) + (UInt32)b[6];
                        UInt32 t = (((UInt32)b[18]) << 24) + (((UInt32)b[19]) << 16) + (((UInt32)b[20]) << 8) + (UInt32)b[21];
                        DateTime lTime = Utils.UnixTimeStampToDateTime2(loraT);
                        DateTime recTime = Utils.UnixTimeStampToDateTime2(t);
                        DateTime curTime = new DateTime(b[28 + 2] + 2000, b[28 + 1], b[28]);
                        rec.DCOUNTER = recTime;
                        rec.dstart = curTime.AddMinutes(i*b[31]);
                        rec.dend = curTime.AddMinutes((i+1) * b[31]); 
                        rec.DCALL = lTime;

                        context.DoExec("delete from data_record where AType='" + rec.AType.ToString() + "'  and dstart=" + Utils.MakeMSSQLDate(rec.dstart.Value,true));

                        context.DATA_RECORD.Add(rec);
                        context.SaveChanges();

                        

                        DATA_EQ eq = new DATA_EQ();
                        eq.DATA_RECORDId = RecordID;
                        eq.DATA_EQId = Guid.NewGuid();
                        if(b[32]=='A' && b[33]=='+')
                            eq.AP = Get3b(b, 34 + 3 * i, 0.001);
                        if (b[32] == 'A' && b[33] == '-')
                            eq.AM = Get3b(b, 34 + 3 * i, 0.001);
                        if (b[32] == 'R' && b[33] == '+')
                            eq.RP = Get3b(b, 34 + 3 * i, 0.001);
                        if (b[32] == 'R' && b[33] == '-')
                            eq.RM = Get3b(b, 34 + 3 * i, 0.001);

                        context.DATA_EQ.Add(eq);
                        context.SaveChanges();
                    }
                }

                // process packet 1
                if (((b[0] & 0xC0) >> 6) == 1)
                {

                    // add moment record
                    {
                    DATA_RECORD rec = new DATA_RECORD();
                    Guid RecordID = Guid.NewGuid();
                    rec.DATA_RECORDId = RecordID;
                    rec.ID_BD = DeviceID;
                    rec.AType = new Guid("19DB21FC-0BD7-47A1-D3D7-08D6D1323977");
                    UInt32 loraT = (((UInt32)b[3]) << 24) + (((UInt32)b[4]) << 16) + (((UInt32)b[5]) << 8) + (UInt32)b[6];
                    UInt32 t = (((UInt32)b[18]) << 24) + (((UInt32)b[19]) << 16) + (((UInt32)b[20]) << 8) + (UInt32)b[21];

                    DateTime lTime = Utils.UnixTimeStampToDateTime2(loraT);
                    DateTime recTime = Utils.UnixTimeStampToDateTime2(t);
                    rec.DCOUNTER = recTime;
                    rec.dstart = recTime;
                    rec.dend = recTime;
                    rec.DCALL = lTime;
                    context.DoExec("delete from data_record where AType='" + rec.AType.ToString() + "'  and dstart=" + Utils.MakeMSSQLDate(rec.dstart.Value, true));


                    context.DATA_RECORD.Add(rec);
                    context.SaveChanges();

                    //// DATA_EP ep = new DATA_EP();
                    //DATA_EQ eq = new DATA_EQ();
                    //eq.DATA_RECORDId = RecordID;
                    //eq.DATA_EQId = Guid.NewGuid();
                    //eq.AP = Get3b(b, 31, 0.01);
                    //eq.AM = Get3b(b, 34, 0.01);
                    //eq.RP = Get3b(b, 37, 0.01);
                    //eq.RM = Get3b(b, 40, 0.01);
                    //eq.E1 = Get3b(b, 43, 0.01);
                    //eq.E2 = Get3b(b, 46, 0.01);
                    //eq.E3 = Get3b(b, 49, 0.01);
                    //eq.E4 = Get3b(b, 52, 0.01);
                    //eq.E0 = Get3b(b, 28, 0.01);

                    //context.DATA_EQ.Add(eq);
                    //context.SaveChanges();

                    DATA_U U = new DATA_U();
                    U.DATA_RECORDId = RecordID;
                    U.DATA_UId = Guid.NewGuid();
                    U.U1 = Get2b(b, 55, 0.01);
                    U.U2 = Get2b(b, 57, 0.01);
                    U.U3 = Get2b(b, 59, 0.01);
                    context.DATA_U.Add(U);
                    context.SaveChanges();

                    DATA_I I = new DATA_I();
                    I.DATA_RECORDId = RecordID;
                    I.DATA_IId = Guid.NewGuid();
                    I.I1 = Get3b(b, 61, 0.01);
                    I.I2 = Get3b(b, 64, 0.01);
                    I.I3 = Get3b(b, 67, 0.01);
                    context.DATA_I.Add(I);
                    context.SaveChanges();

                    DATA_EP ep = new DATA_EP();
                    ep.DATA_RECORDId = RecordID;
                    ep.DATA_EPId = Guid.NewGuid();
                    ep.EP1 = Get3b(b, 97, 0.01);
                    ep.EP2 = Get3b(b, 100, 0.01);
                    ep.EP3 = Get3b(b, 103, 0.01);

                    context.DATA_EP.Add(ep);
                    context.SaveChanges();

                }

                    // add total record
                    {
                        DATA_RECORD rec = new DATA_RECORD();
                        Guid RecordID = Guid.NewGuid();
                        rec.DATA_RECORDId = RecordID;
                        rec.ID_BD = DeviceID;
                        rec.AType = new Guid("904590BC-87D7-4F70-D3D8-08D6D1323977");
                        UInt32 loraT = (((UInt32)b[3]) << 24) + (((UInt32)b[4]) << 16) + (((UInt32)b[5]) << 8) + (UInt32)b[6];
                        UInt32 t = (((UInt32)b[18]) << 24) + (((UInt32)b[19]) << 16) + (((UInt32)b[20]) << 8) + (UInt32)b[21];

                        DateTime lTime = Utils.UnixTimeStampToDateTime2(loraT);
                        DateTime recTime = Utils.UnixTimeStampToDateTime2(t);
                        rec.DCOUNTER = recTime;
                        rec.dstart = recTime;
                        rec.dend = recTime;
                        rec.DCALL = lTime;
                        context.DoExec("delete from data_record where AType='" + rec.AType.ToString() + "'  and dstart=" + Utils.MakeMSSQLDate(rec.dstart.Value, true));


                        context.DATA_RECORD.Add(rec);
                        context.SaveChanges();

                        // DATA_EP ep = new DATA_EP();
                        DATA_EQ eq = new DATA_EQ();
                        eq.DATA_RECORDId = RecordID;
                        eq.DATA_EQId = Guid.NewGuid();
                        eq.AP = Get3b(b, 31, 0.01);
                        eq.AM = Get3b(b, 34, 0.01);
                        eq.RP = Get3b(b, 37, 0.01);
                        eq.RM = Get3b(b, 40, 0.01);
                        eq.E1 = Get3b(b, 43, 0.01);
                        eq.E2 = Get3b(b, 46, 0.01);
                        eq.E3 = Get3b(b, 49, 0.01);
                        eq.E4 = Get3b(b, 52, 0.01);
                        eq.E0 = Get3b(b, 28, 0.01);

                        context.DATA_EQ.Add(eq);
                        context.SaveChanges();

                        //DATA_U U = new DATA_U();
                        //U.DATA_RECORDId = RecordID;
                        //U.DATA_UId = Guid.NewGuid();
                        //U.U1 = Get2b(b, 55, 0.01);
                        //U.U2 = Get2b(b, 57, 0.01);
                        //U.U3 = Get2b(b, 59, 0.01);
                        //context.DATA_U.Add(U);
                        //context.SaveChanges();

                        //DATA_I I = new DATA_I();
                        //I.DATA_RECORDId = RecordID;
                        //I.DATA_IId = Guid.NewGuid();
                        //I.I1 = Get3b(b, 61, 0.01);
                        //I.I2 = Get3b(b, 64, 0.01);
                        //I.I3 = Get3b(b, 67, 0.01);
                        //context.DATA_I.Add(I);
                        //context.SaveChanges();

                        //DATA_EP ep = new DATA_EP();
                        //ep.DATA_RECORDId = RecordID;
                        //ep.DATA_EPId = Guid.NewGuid();
                        //ep.EP1 = Get3b(b, 97, 0.01);
                        //ep.EP2 = Get3b(b, 100, 0.01);
                        //ep.EP3 = Get3b(b, 103, 0.01);

                        //context.DATA_EP.Add(ep);
                        //context.SaveChanges();


                    }

                }

            }
        }

        private static double Get3b( Byte[] b, int Index, double Mult)
        {
            double res = (double)((UInt32)(b[Index] << 16) + (UInt32)(b[Index+1] << 8) + (UInt32)(b[Index + 2])) * Mult;
            return res;
        }

        private static double Get2b(Byte[] b, int Index, double Mult)
        {
            double res = (double)( (UInt32)(b[Index ] << 8) + (UInt32)(b[Index + 1])) * Mult;
            return res;
        }
    }
}

