using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Diagnostics;
using System.Data.SqlClient ;
using ServerMain;
using NLog;

namespace STKService
{
    public class ThreadObj
     {
         public System.Data.DataRow dr;
         public ServerMain.TVMain TvMain;
     }

    class DeviceProcessor
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();

        private void InitializeComponent()
        {
          
        }
         public void Run()
        {
            InitializeComponent(); 
            InfoReport("Starting DeviceThread...ID=" + DivID.ToString() );
            MainThread();
            InfoReport("Stop DeviceThread...ID=" + DivID.ToString());
        }

        public Guid DivID=Guid.Empty;
     
        private ServerMain.TVMain TvMain;

        private void MainThread()
        {

          
          
           
            DataRow dr=null;
            bool bLogged = false;
            TvMain = new ServerMain.TVMain();
            
            try
            {
            
                if (TvMain.Init() == true)
                {
                    bLogged = true;
                }
                else
                {
                    WarningReport("Unable to login, check credentials");
                    InfoReport(TvMain.GetEnvInfo());
                    return;
                }
            }
            catch (Exception Ex)
            {
            
                ErrorReport("Login failed, try again... " + Ex.Message);
                InfoReport(TvMain.GetEnvInfo());
            }
      
           
            System.Data.DataTable oRS;
            if (bLogged)
            {
                oRS = null;
                oRS = TvMain.GetDBOneDevicePlanList(DivID);
                if (oRS != null)
                {

                    if (oRS.Rows.Count > 0)
                    {
                        try
                        {
                            dr = oRS.Rows[0];
                            DeviceThread(dr);

                        }
                        catch (Exception Ex)
                        {
                            ErrorReport("������ ID=  " + DivID.ToString() + " error:" + Ex.Message);
                            dr = null;
                        }
                    }
                    oRS = null;

                }




                try
                {
                    //InfoReport("Closing Device thread...");

                    //dr = null;

                    TvMain.ClearDuration(); 
                    // close transport
                    TvMain.DeviceClose();

                    if (dr != null)
                    {
                        AnalizeDevice(dr);
                    }
                  
                    TvMain = null;
                    
                    return;
                }
                catch (Exception Ex)
                {
                    ErrorReport("Closing DeviceThread error:" + Ex.Message);
                }

                
            }
            
            
        }
             
        private void DeviceThread( DataRow dr)
        {

          
            DateTime SrvDate;
            DateTime ddd;
            Boolean DeviceOK ;
            Guid archType_hour = new Guid("89AA7513-9012-434D-EE99-08D6C2911B79");
            Guid archType_day = new Guid("483F98E0-9796-4F45-D3DB-08D6D1323977");
            Guid archType_moment = new Guid("19DB21FC-0BD7-47A1-D3D7-08D6D1323977"); 
            Guid archType_total = new Guid("904590BC-87D7-4F70-D3D8-08D6D1323977"); 
            Int16 ncall=0;
            Int16 nmaxcall=5;
            Int16 minrepeat = 5;
            
            try
            {
                #region "init"
                ncall = Convert.ToInt16(dr["ncall"]);
                nmaxcall = Convert.ToInt16(dr["nmaxcall"]);
                minrepeat = Convert.ToInt16(dr["minrepeat"]);
                Guid id_bdc;
                bool chour = false, ccurr = false, c24 = false,csum = false;
                id_bdc = new Guid(dr["id_bd"].ToString());
                if (dr["chour"].ToString() == "1") chour = true;
                if (dr["ccurr"].ToString() == "1") ccurr = true;
                if (dr["c24"].ToString() == "1") c24 = true;
                if (dr["csum"].ToString() == "1") csum = true;
                SrvDate = DateTime.Now;
                try
                {
                    SrvDate = Convert.ToDateTime(dr["ServerDate"].ToString());
                }
                catch { 
                }

                
                //if (chour || ccurr || c24 || csum)
                {
                    TvMain.ClearDuration();
                    if (TvMain.LockDevice(id_bdc, 60 * 40, false))
                    {
                        if (TvMain.DeviceInit(id_bdc)) 
                        {
                            DeviceOK = true;
                            //TvMain.SaveLog(id_bdc,0,"??",1,"������������� ������������� ������:OK");
                        }
                        else
                        {
                            bool SkipErr = false;
                            if( TvMain.TVD !=null){
                                if (TvMain.TVD.Transport.ToString() == "10C31283-151C-4153-4A46-08D6C2921B4D")
                                { 
                                    if( TvMain.TVD.ComPort == "")
                                    {
                                        SkipErr = true;
                                    }
                                    if (TvMain.PortBusy)
                                    {
                                        SkipErr = true;
                                    }
                                }

                            }
                            if (!SkipErr)
                            {
                                string tError = "";
                                try
                                {
                                    tError = TvMain.ConnectStatus() ; 
                                }
                                catch (Exception)
                                {

                                    tError = "";
                                }


                                if (tError != "")
                                {
                                    TvMain.WriteErrToDB(id_bdc, DateTime.Now,  tError);
                                    TvMain.SaveLog(id_bdc, Guid.Empty,"??", tError);
                                }else{
                                    if (TvMain.TVD != null)
                                    {
                                        if(TvMain.TVD.DriverTransport!=null)
                                            tError = TvMain.TVD.DriverTransport.GetError;
                                    }
                                    TvMain.WriteErrToDB(id_bdc, DateTime.Now, "������ ����������. " + tError);
                                    TvMain.SaveLog(id_bdc, Guid.Empty,"??", "������ ����������. " +tError);
                                 }
                             
                                
                                if (ncall +1< nmaxcall)
                                {
                                    ////TvMain.SetNCALLToPlanCall(id_bdc.ToString(), ncall + 1);
                                    TvMain.SetTimeToPlanCall(id_bdc, "dlock", DateTime.Now);
                                }
                                else
                                {
                                    ////TvMain.SetNCALLToPlanCall(id_bdc.ToString(), 0);
                                    
                                     ddd = SrvDate;
                                    try
                                    {
                                        ddd = Convert.ToDateTime(dr["dnextcurr"].ToString());
                                    }
                                    catch(System.Exception ex)
                                    {
                                        InfoReport("������ ID=  " + id_bdc.ToString() + " error converting dnextcurr :" + dr["dnextcurr"].ToString());
                                        TvMain.SaveLog(id_bdc, archType_hour, "??",  "������ �������������� ���� (dnextcurr) :" + dr["dnextcurr"].ToString() + " " + ex.Message);
                                    }
                                    while (ddd < SrvDate)
                                    {
                                        ddd = ddd.AddHours(1);
                                    }
                                    ddd = ddd.AddMinutes(-minrepeat);  

                                    TvMain.SetTimeToPlanCall(id_bdc, "dlock", ddd);
                                }


                              
                                //try
                                //{


                                //    VIPAnalizer.NodeAnalizer na = new VIPAnalizer.NodeAnalizer();
                                //    na.CheckStatus(TvMain, id_bdc, 3, 2);
                                //}
                                //catch (System.Exception)
                                //{
                                //}
                            }
                            DeviceOK = false;
                            TvMain.UnLockDevice(id_bdc); 
                            TvMain.SaveLog(id_bdc,archType_moment,"??","������ ���������� ����������");
                        }
                    }
                    else
                    {
                        TvMain.SaveLog(id_bdc, Guid.Empty,"??", "���������������� �����");
                        DeviceOK = false;
                    }
                    if (DeviceOK)
                    {
                      

                            TvMain.connect();
                            if (TvMain.isConnected() == false)
                            {
                                string tError = "";
                                try
                                {
                                    tError = TvMain.ConnectStatus();
                                }
                                catch (Exception)
                                {

                                    tError = "";
                                }
                                if(tError !=""){
                                    TvMain.WriteErrToDB(id_bdc, DateTime.Now, tError);
                                    TvMain.SaveLog(id_bdc, Guid.Empty,"??", tError);
                                }else{
                                    TvMain.WriteErrToDB(id_bdc, DateTime.Now, "������ ����������. "+ tError);
                                    TvMain.SaveLog(id_bdc, Guid.Empty,"??", "������ ����������. "+tError);
                                }

                                if (ncall+1 < nmaxcall)
                                {
                                    //TvMain.SetNCALLToPlanCall(id_bdc.ToString(), ncall + 1);
                                    TvMain.SetTimeToPlanCall(id_bdc, "dlock", DateTime.Now);
                                }
                                else
                                {
                                    //TvMain.SetNCALLToPlanCall(id_bdc.ToString(), 0);

                                    ddd = SrvDate;
                                    try
                                    {
                                        ddd = Convert.ToDateTime(dr["dnextcurr"].ToString());
                                    }
                                    catch (System.Exception ex)
                                    {
                                        InfoReport("������ ID=  " + id_bdc.ToString() + " error converting dnextcurr :" + dr["dnextcurr"].ToString());
                                        TvMain.SaveLog(id_bdc, archType_hour, "??",  "������ �������������� ���� (dnextcurr) :" + dr["dnextcurr"].ToString() + " " + ex.Message);
                                    }
                                    while (ddd < SrvDate)
                                    {
                                        ddd = ddd.AddHours(1);
                                    }
                                    ddd = ddd.AddMinutes(-minrepeat);  

                                    TvMain.SetTimeToPlanCall(id_bdc, "dlock", ddd);
                                }

                                ErrorReport("������ ID " + dr["id_bd"].ToString() + " Counter initialization Error!");
                                DeviceOK = false;

                                //try
                                //{

                                //    VIPAnalizer.NodeAnalizer na = new VIPAnalizer.NodeAnalizer();
                                //    na.CheckStatus  (TvMain, id_bdc, 3,2);
                                //}
                                //catch (System.Exception)
                                //{
                                //}
                            }
                            else
                            {
                                TvMain.SaveLog(id_bdc, Guid.Empty,"??", "���������� � �����������������:OK");
                            }
                        
                        
                    }
                #endregion "init"
                    if (DeviceOK)
                    {

                        ////TvMain.SetNCALLToPlanCall(id_bdc.ToString(), 0);
                        TvMain.SetTimeToPlanCall(id_bdc, "dlock", DateTime.Now);
 ddd = SrvDate;
#region                 "hour"

                        try
                        {
                            ddd = Convert.ToDateTime(dr["dnexthour"].ToString());
                        }
                        catch(System.Exception ex)
                        {
                            InfoReport("������ ID=  " + id_bdc.ToString() + " error while convert dnexthour :" + dr["dnexthour"].ToString());
                            TvMain.SaveLog(id_bdc, archType_hour, "??", "������ �������������� ���� (dnexthour) :" + dr["dnexthour"].ToString() + " " + ex.Message);
                        }
                        if (TvMain.TVD.IsConnected()  && chour && ddd <= SrvDate)
                        {
                           
                            //DateTime dlasthour, nowhour,tempdate;
                            DateTime tempdate;
                            Int16 numhour;
                            numhour = Convert.ToInt16("0" + dr["numhour"].ToString());
                            Int16 icall = Convert.ToInt16("0" + dr["icall"].ToString());
                            if (TvMain.LockDevice(id_bdc, 400 * numhour,true))
                            {
                                TvMain.HoldLine();
                                
                                if (ddd.AddHours(numhour) <= SrvDate.AddHours(1))
                                {
                                    // ����������, ������ ������
                                   
                                    tempdate = ddd;
                                    tempdate = tempdate.AddHours(-1);

                                    for (int j = 0; j < numhour ; j++)
                                    {
                                        if (TvMain.TVD.IsConnected())
                                        {
                                            try
                                            {
                                                tempdate = tempdate.AddHours(1);
                                                if (TvMain.CheckForArch(archType_hour, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour, id_bdc) == false)
                                                {
                                                    InfoReport("������ ID=  " + id_bdc.ToString() + " ������ ����� �� ���� " + tempdate.ToString());
                                                    String str;
                                                    TvMain.ClearDuration();
                                                    str = TvMain.readarch(archType_hour, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour);

                                                    if (str.Length == 0)
                                                    {
                                                        WarningReport("������ ID: " + dr["id_bd"].ToString() + " �� ������� ������� ����� �� ����:" + tempdate.ToString());
                                                        TvMain.SaveLog(id_bdc, archType_hour, "??", "������ ������ �������� ������ �� ����:" + tempdate.ToString());
                                                    }
                                                    else
                                                    {
                                                        if (str.Substring(0, 6) != "������")
                                                        {

                                                            if (TvMain.TVD.isArchToDBWrite)
                                                            {
                                                                TvMain.SaveLog(id_bdc, archType_hour, "??", "������� ����� �� ����:" + tempdate.ToString() + ":OK");
                                                                TvMain.ClearDBArchString(archType_hour, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour, id_bdc);
                                                                TvMain.WriteArchToDB();
                                                                TvMain.SetTimeToPlanCall(id_bdc, "dlasthour", tempdate);
                                                            }

                                                        }
                                                        else
                                                        {
                                                            TvMain.SaveLog(id_bdc, archType_hour, "??", "������ ������ �������� ������ �� ����:" + tempdate.ToString() + " " + str);
                                                            WarningReport("������ ID: " + dr["id_bd"].ToString() + " �� �������  ������� ����� �� " + tempdate.ToString() + "\r\n" + str);
                                                            TvMain.SetTimeToPlanCall(id_bdc, "dlasthour", tempdate);
                                                        }
                                                    }
                                                }
                                                else
                                                {
                                                    InfoReport("������ ID=  " + id_bdc.ToString() + " ����� �� ���� " + tempdate.ToString() + "  ��� ���� � ����");
                                                }

                                            }
                                            catch (Exception Ex)
                                            {
                                                ErrorReport("������ ID " + dr["id_bd"].ToString() + " failed, " + Ex.Message);
                                            }
                                        }
                                 
                                    }// end for

                                    // ��������� ���������� �����, ������� ���� �������� �� ���
                                    if (TvMain.TVD.IsConnected())
                                    {
                                        TvMain.AddHourToPlanCall(id_bdc, "dnexthour", numhour);
                                    }
                                }
                                else
                                {
                                    tempdate = ddd;

                                    while (tempdate.AddHours(1) <= SrvDate)
                                    {
                                        tempdate = tempdate.AddHours(1);
                                    }
                                   

                                    bool ReadHOK;
                                    ReadHOK = false;

                                    // ��� �� ����������, ������ ������ �����
                                    for (int j = 0; j < numhour; j++)
                                    {
                                        if (TvMain.TVD.IsConnected())
                                        {
                                            try
                                            {
                                                tempdate = tempdate.AddHours(-1);


                                                String str;
                                                if (TvMain.CheckForArch(archType_hour, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour, id_bdc) == false)
                                                {
                                                    InfoReport("������ ID=  " + id_bdc.ToString() + " ������ ����� �� ���� " + tempdate.ToString());
                                                    TvMain.ClearDuration();
                                                    str = TvMain.readarch(archType_hour, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour);
                                                    if (str.Length == 0)
                                                    {

                                                        WarningReport("������ ID: " + dr["id_bd"].ToString() + " �� �������  ������� ����� �� " + tempdate.ToString());
                                                        TvMain.SaveLog(id_bdc, archType_hour, "??", "������ ������ �������� ������ �� ����:" + tempdate.ToString());

                                                    }
                                                    else
                                                    {
                                                        if (str.Substring(0, 6) != "������")
                                                        {

                                                            if (TvMain.TVD.isArchToDBWrite)
                                                            {
                                                                TvMain.SaveLog(id_bdc, archType_hour, "??", "������� ����� �� ����:" + tempdate.ToString() + ":OK");
                                                                TvMain.ClearDBArchString(archType_hour, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour, id_bdc);
                                                                TvMain.WriteArchToDB();

                                                            }
                                                            if (!ReadHOK)
                                                            {
                                                                ReadHOK = true;

                                                                // ��������� ��������� ������� �����
                                                                TvMain.SetTimeToPlanCall(id_bdc, "dlasthour", tempdate);
                                                            }

                                                        }
                                                        else
                                                        {
                                                            WarningReport("������ ID: " + dr["id_bd"].ToString() + " �� �������  ������� ����� �� " + tempdate.ToString() + "\r\n" + str);
                                                            TvMain.SaveLog(id_bdc, archType_hour, "??", "������ ������ �������� ������ �� ����:" + tempdate.ToString() + " " + str);
                                                        }
                                                    }
                                                }
                                                else
                                                {
                                                    InfoReport("������ ID=  " + id_bdc.ToString() + " ����� �� ���� " + tempdate.ToString() + "  ��� ���� � ����");
                                                }
                                            }
                                            catch (Exception Ex)
                                            {
                                                ErrorReport("������ ID " + dr["id_bd"].ToString() + " failed, " + Ex.Message);
                                            }
                                        }
                                    }// end for

                                    // �������� ��������� �� ������ ���������� �����
                                    if (TvMain.TVD.IsConnected())
                                    {
                                        TvMain.AddMinutesToPlanCall(id_bdc, "dnexthour", icall );
                                    }

                                 
                               
                                }
                                //TvMain.UnLockDevice(id_bdc); 
                            } // Lock
                           
                        }//if (chour)

#endregion "hour"
               #region "day"         
ddd = SrvDate;
                        try
                        {
                            ddd = Convert.ToDateTime(dr["dnext24"].ToString());
                        }
                        catch
                        {
                            InfoReport("������ ID=  " + id_bdc.ToString() + " error while convert dnext24 :" + dr["dnext24"].ToString());
                        }

                        if (TvMain.TVD.IsConnected() && c24 && ddd <= SrvDate)
                        {

                           
                            
                            DateTime tempdate;
                            Int16 num24;
                            num24 = Convert.ToInt16(dr["num24"].ToString());
                            Int16 icall24 = Convert.ToInt16(dr["icall24"].ToString());
                            if (ddd.AddDays(num24) <= SrvDate.AddDays(1))
                            {
                                // ���� �� ������ ������� �� ���������� � ��������

                                tempdate = ddd;
                                tempdate = tempdate.AddDays(-1);
                                try
                                {
                                    if( TvMain.LockDevice(id_bdc,400 * num24,true )){
                                        TvMain.HoldLine();

                                        // ��������� �� ���������� ������������ ������
                                        for (int j = 0; j < num24 ; j++)
                                        {
                                            if (TvMain.TVD.IsConnected())
                                            {
                                                tempdate = tempdate.AddDays(1);

                                                if (TvMain.CheckForArch(archType_day, tempdate.Year, tempdate.Month, tempdate.Day, 0, id_bdc) == false)
                                                {
                                                    InfoReport("������ ID=  " + id_bdc.ToString() + " ������ �������� ����� �� ���� " + tempdate.ToString());
                                                    String str;
                                                    TvMain.ClearDuration();
                                                    str = TvMain.readarch(archType_day, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour);
                                                    if (str.Length == 0)
                                                    {
                                                        WarningReport("������ ID: " + dr["id_bd"].ToString() + " �� ������� ����� �� ���� " + tempdate.ToString());
                                                        TvMain.SaveLog(id_bdc, archType_day, "??", "������ ������ ��������� ������ �� ����:" + tempdate.ToString());
                                                    }
                                                    else
                                                    {
                                                        if (str.Substring(0, 6) != "������")
                                                        {


                                                            if (TvMain.TVD.isArchToDBWrite)
                                                            {
                                                                TvMain.SaveLog(id_bdc, archType_day, "??", "�������� ����� �� ����:" + tempdate.ToString() + ":OK");
                                                                TvMain.ClearDBArchString(archType_day, tempdate.Year, tempdate.Month, tempdate.Day, 0, id_bdc);
                                                                TvMain.WriteArchToDB();
                                                            }


                                                            // ���������� ��������� �������
                                                            TvMain.SetTimeToPlanCall(id_bdc, "dlastday", tempdate);
                                                        }
                                                        else
                                                        {
                                                            WarningReport("������ ID: " + dr["id_bd"].ToString() + " �� ������� ����� �� ���� " + tempdate.ToString() + "\r\n" + str);
                                                            TvMain.SaveLog(id_bdc, archType_day, "??", "������ ������ ��������� ����� �� ����:" + tempdate.ToString() + " " + str);


                                                        }
                                                    }
                                                }
                                                else
                                                {
                                                    InfoReport("������ ID=  " + id_bdc.ToString() + " �������� ����� �� ���� " + tempdate.ToString() + " ��� ���� � ����");
                                                }
                                            }

                                        }//end for 

                                        // ��������� ����������� �����
                                        if (TvMain.TVD.IsConnected())
                                        {
                                            TvMain.AddDaysToPlanCall(id_bdc.ToString(), "dnext24", num24);
                                        }

                                        //TvMain.UnLockDevice(id_bdc); 
                                    }
                                }//try
                                catch (Exception Ex)
                                {
                                     ErrorReport("������ ID: " + dr["id_bd"].ToString() + " read day arch failed, " + Ex.Message);
                                }

                            }
                            else
                            {
                                tempdate = ddd;
                                tempdate = tempdate.AddDays(1);
                                bool ReadDOK;
                                ReadDOK = false;
                                try
                                {
                                    if( TvMain.LockDevice(id_bdc,400 * num24,true) ){ 
                                    for (int j = 0; j < num24 ; j++)
                                    {

                                        if (TvMain.TVD.IsConnected())
                                        {
                                            TvMain.HoldLine();
                                            tempdate = tempdate.AddDays(-1);

                                            String str;
                                            if (TvMain.CheckForArch(archType_day, tempdate.Year, tempdate.Month, tempdate.Day, 0, id_bdc) == false)
                                            {
                                                InfoReport("������ ID=  " + id_bdc.ToString() + " ������ �������� ����� �� ���� " + tempdate.ToString());
                                                TvMain.ClearDuration();
                                                str = TvMain.readarch(archType_day, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour);
                                                if (str.Length == 0)
                                                {
                                                    WarningReport("������ ID: " + dr["id_bd"].ToString() + " " + str + tempdate.ToString());
                                                    TvMain.SaveLog(id_bdc, archType_day, "??", "������ ������ ��������� ������ �� ����:" + tempdate.ToString());
                                                }
                                                else
                                                {
                                                    if (str.Substring(0, 6) != "������")
                                                    {

                                                        if (TvMain.TVD.isArchToDBWrite)
                                                        {
                                                            TvMain.SaveLog(id_bdc, archType_day, "??", "�������� ����� �� ����:" + tempdate.ToString() + ":OK");
                                                            TvMain.ClearDBArchString(archType_day, tempdate.Year, tempdate.Month, tempdate.Day, 0, id_bdc);
                                                            TvMain.WriteArchToDB();
                                                            if (!ReadDOK)
                                                            {
                                                                ReadDOK = true;
                                                                TvMain.SetTimeToPlanCall(id_bdc, "dlastday", tempdate);
                                                            }
                                                        }


                                                    }
                                                    else
                                                    {
                                                        WarningReport("������ ID: " + dr["id_bd"].ToString() + " " + str + tempdate.ToString());
                                                        TvMain.SaveLog(id_bdc, archType_day, "??", "������ ������ ��������� ������ �� ����:" + tempdate.ToString() + " " + str);
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                InfoReport("������ ID=  " + id_bdc.ToString() + " �������� ����� �� ���� " + tempdate.ToString() + " ��� ���� � ����");
                                            }
                                        }

                                    }//for (int j = 0; j <= razn.Days; j++)
                                    if (TvMain.TVD.IsConnected())
                                    {
                                        TvMain.AddHourToPlanCall(id_bdc, "dnext24", Convert.ToInt32(dr["icall24"].ToString()));
                                    }
                                    //TvMain.UnLockDevice(id_bdc );
                                    }
                                }//try
                                catch (Exception Ex)
                                {
                                    ErrorReport("������ ID: " + dr["id_bd"].ToString() + " read day arch failed, " + Ex.Message);
                                }
                            }
                        }//if (c24)

#endregion "day"


                        #region "moment"
                        if ( ccurr)

                            ddd = SrvDate;
                        try
                        {
                            ddd = Convert.ToDateTime(dr["dnextcurr"].ToString());
                        }
                        catch
                        {
                            InfoReport("������ ID=  " + id_bdc.ToString() + " error converting dnextcurr :" + dr["dnextcurr"].ToString());
                        }


                        if (TvMain.TVD.IsConnected() && ccurr && ddd <= SrvDate)
                        {
                            DateTime tempdate;
                            Double nmin;
                            InfoReport("������ ID=  " + id_bdc.ToString() + " ������ ������� ������� �� " + ddd.ToString());
                            try
                            {
                                if(TvMain.LockDevice(id_bdc,400,true)){
                                    TvMain.HoldLine();
                                String str;
                                TvMain.ClearDuration();
                                str = TvMain.readmarch();
                                if (str.Length == 0)
                                {

                                    TvMain.WriteErrToDB(id_bdc, SrvDate, "������ ������ ������");
                                    TvMain.SaveLog(id_bdc, archType_moment, "??", "������ ������ �������� ������");
                                }
                                else
                                {
                                    if (str.Substring(0, 6) != "������")
                                    {
                                        if (TvMain.TVD.isMArchToDBWrite)
                                        {
                                            TvMain.SaveLog(id_bdc, archType_moment, "??", "������� �����" + ":OK");
                                            TvMain.WritemArchToDB();

                                        }
                                        //);
                                        tempdate = ddd;
                                        nmin = Convert.ToDouble(dr["icallcurr"].ToString());

                                        while (tempdate.AddMinutes(nmin) <= SrvDate)
                                        {
                                            tempdate = tempdate.AddMinutes(nmin);
                                        }
                                        tempdate = tempdate.AddMinutes(nmin);

                                        TvMain.SetTimeToPlanCall(id_bdc, "dnextcurr", tempdate);
                                    }
                                    else {
                                        TvMain.WriteErrToDB(id_bdc, SrvDate, str);
                                        TvMain.SaveLog(id_bdc, archType_moment, "??", "������ ������ �������� ������ " +str);

                                        tempdate = ddd;
                                        nmin = Convert.ToDouble(dr["icallcurr"].ToString());

                                        while (tempdate.AddMinutes(nmin) <= SrvDate)
                                        {
                                            tempdate = tempdate.AddMinutes(nmin);
                                        }
                                        //tempdate = tempdate.AddMinutes(nmin);

                                        TvMain.SetTimeToPlanCall(id_bdc, "dnextcurr", tempdate);
                                    }
                                }
                                //TvMain.UnLockDevice(id_bdc);
                            }
                            }//try
                            catch (Exception Ex)
                            {
                                TvMain.WriteErrToDB(id_bdc, SrvDate, "������ ������ ������:" + Ex.Message);  
                                ErrorReport("������ ID " + dr["id_bd"].ToString() + " read arch failed, " + Ex.Message);
                            }
                          
                        }//if (ccurr)


                        if (csum)

                            ddd = SrvDate;
                        try
                        {
                            ddd = Convert.ToDateTime(dr["dnextsum"].ToString());
                        }
                        catch
                        {
                            InfoReport("������ ID=  " + id_bdc.ToString() + " error converting dnextsum " + dr["dnextsum"].ToString());
                        }


                        if (TvMain.TVD.IsConnected() && csum && ddd <= SrvDate)
                        {
                            DateTime tempdate;
                            Double nmin;
                            InfoReport("������ ID=  " + id_bdc.ToString() + " read total data at " + SrvDate.ToString());
                            try
                            {

                                String str;
                                if (TvMain.LockDevice(id_bdc, 400,true))
                                {
                                    TvMain.HoldLine();
                                    TvMain.ClearDuration();
                                    str = TvMain.readtarch();

                                    InfoReport("������ ID " + id_bdc.ToString() + " -> " + str);
                                    if (str.Length == 0)
                                    {
                                        // oops!
                                        TvMain.SaveLog(id_bdc, archType_total, "??", "������ ������ ��������� ������ " );
                                    }
                                    else
                                    {
                                        if (str.Substring(0, 6) != "������")
                                        {
                                            if (TvMain.TVD.isTArchToDBWrite)
                                            {
                                                TvMain.SaveLog(id_bdc, archType_moment, "??", "�������� ����� " + ":OK");
                                                TvMain.WriteTArchToDB();
                                            }
                                            tempdate = ddd;
                                            nmin = Convert.ToDouble(dr["icallsum"].ToString());

                                            while (tempdate.AddMinutes(nmin) <= SrvDate)
                                            {
                                                tempdate = tempdate.AddMinutes(nmin);
                                            }
                                            tempdate = tempdate.AddMinutes(nmin);

                                            TvMain.SetTimeToPlanCall(id_bdc, "dnextsum", tempdate);
                                            //TvMain.AddMinutesToPlanCall(id_bdc.ToString(), "dnextsum", Convert.ToInt32(nmin));
                                        }
                                        else
                                        {
                                            TvMain.SaveLog(id_bdc, archType_total, "??", "������ ������ ��������� ������ " +str);
                                        }
                                    }
                                    //TvMain.UnLockDevice(id_bdc);
                                }
                            }//try
                            catch (Exception Ex)
                            {
                                ErrorReport("������ ID " + dr["id_bd"].ToString() + " read arch failed, " + Ex.Message);

                            }
                        }//if (ccurr)

                        #endregion "moment"
                        
//                        #region "missing hour"
//                        TvMain.SetTimeToPlanCall(id_bdc, "dlastcall", SrvDate);

//                        // try to load missing hour archives
//                        {
//                            ddd = SrvDate;
//                            try
//                            {
//                                ddd = Convert.ToDateTime(dr["dnexthour"].ToString());
//                            }
//                            catch
//                            {
//                            }

//                            DateTime tempdate;
//                            DataTable missing;
//                            Boolean GetRow=false;
//                            int GRCount=0;
//                            int TryCount = 0;
//                            DataTable missingpass;
//                            missing = TvMain.QuerySelect("select ARCHDATE,DEVNAME from missingarch where id_bd=" + id_bdc.ToString() + " and ARCHDATE>SYSDATE-32 and ARCHDATE<SYSDATE-4/24 and ARCHDATE<" + TvMain.OracleDate(ddd) + "  and DEVNAME like '%���%' order by archdate desc  "); // and devname not like '%����%'");

//                            try
//                            {
//                                if (missing.Rows.Count > 0)
//                                {
//                                TvMain.LockDevice(id_bdc, 400 * missing.Rows.Count, true);
//                                    TvMain.SaveLog(id_bdc, archType_hour, "??", "������ ����������� ������� ( " + missing.Rows.Count.ToString() +" �������)");
//                                }

//                                for (int j = 0; j < missing.Rows.Count && GRCount <15 ; j++)
//                                {
//                                    tempdate = (DateTime)(missing.Rows[j]["ARCHDATE"]);
//                                    GetRow = false;
//                                    missingpass = TvMain.QuerySelect("select TRYCOUNT from missingpass where id_bd=" + id_bdc.ToString() + " and ARCHDATE=" + TvMain.OracleDate(tempdate) + "  and DEVNAME ='" + missing.Rows[j]["DEVNAME"] + "'  "); // and devname not like '%����%'");
//                                    if (missingpass.Rows.Count == 0)
//                                    {
//                                        GetRow = true;
//                                        TryCount = 0;
//                                    }
//                                    else
//                                    {
//                                        TryCount = int.Parse(missingpass.Rows[0]["TRYCOUNT"].ToString());
//                                        if (TryCount < 5)
//                                        {
//                                            GetRow = true;
//                                        }
//                                    }

                                    
//                                    if (TvMain.TVD.IsConnected())
//                                    {
//                                        TvMain.HoldLine();

//                                        String str;
//                                        if (GetRow)
//                                        {
//                                            GRCount++;

//                                        InfoReport("������ ID=  " + id_bdc.ToString() + " ������ ������������ �������� ������ �� " + tempdate.ToString());
//                                        TvMain.ClearDuration();
//                                        str = TvMain.readarch(archType_hour, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour);
//                                        if (str.Length == 0)
//                                        {
//                                            WarningReport("������ ID: " + dr["id_bd"].ToString() + " " + str + tempdate.ToString());
//                                            TvMain.SaveLog(id_bdc, archType_hour, "??", "������ ������ ������������ �������� ������ �� ����:" + tempdate.ToString());
//                                        }
//                                        else
//                                        {
//                                            if (str.Substring(0, 6) != "������")
//                                            {
//                                                //if (TvMain.CheckForArch(archType_day, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour, id_bdc) == false)
//                                                {
//                                                    if (TvMain.TVD.isArchToDBWrite)
//                                                    {
//                                                            TvMain.SaveLog(id_bdc, archType_hour, "??", "����������� ������� ����� �� ����:" + tempdate.ToString() + ":OK");
//                                                        TvMain.ClearDBArchString(archType_hour, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour, id_bdc);
//                                                        TvMain.WriteArchToDB();
//                                                    }

//                                                }
//                                            }
//                                            else
//                                            {
//                                                WarningReport("������ ID: " + dr["id_bd"].ToString() + " " + str + tempdate.ToString());
//                                                TvMain.SaveLog(id_bdc, archType_hour, "??", "������ ������ ������������ �������� ������ �� ����:" + tempdate.ToString());
//                                            }
//                                        }

//                                            String q;
//                                            if (TryCount == 0)
//                                            {
//                                                q = "insert into missingpass(id_bd,archdate,devname,trycount) values(" + dr["id_bd"].ToString() + "," + TvMain.OracleDate(tempdate) + ",'" + missing.Rows[j]["DEVNAME"].ToString() + "'," + (TryCount + 1).ToString() + ")";
//                                            }
//                                            else
//                                            {
//                                                q = "update missingpass set trycount=" +(TryCount + 1).ToString() + " where id_bd = "+ dr["id_bd"].ToString() + " and archdate=" + TvMain.OracleDate(tempdate) + " and devname ='" + missing.Rows[j]["DEVNAME"].ToString() + "'";
//                                            }

//                                            TvMain.QueryExec(q); 

//                                        }
//                                    }
//                                }

//                            }//try
//                            catch (Exception Ex)
//                            {
//                                ErrorReport("������ ID " + dr["id_bd"].ToString() + " ������ ������ ������������ �������� ������, " + Ex.Message);

//                            }
//                        }// (missing hour)

//#endregion "missinghour"
                      

//                        #region "missing day"
//                        // try to load missing day archives
//                        {

//                            ddd = SrvDate;
//                            try
//                            {
//                                ddd = Convert.ToDateTime(dr["dnext24"].ToString());
//                            }
//                            catch
//                            {

//                            }
//                            DateTime tempdate;
//                            DataTable missing;
//                            Boolean GetRow = false;
//                            int GRCount = 0;
//                            int TryCount = 0;
//                            DataTable missingpass;
//                            missing = TvMain.QuerySelect("select ARCHDATE,DEVNAME from missingarch where id_bd=" + id_bdc.ToString() + " and ARCHDATE>SYSDATE-32 and ARCHDATE<SYSDATE-1 and  ARCHDATE<" + TvMain.OracleDate(ddd) + " and DEVNAME like '%�����%'  order by archdate desc "); //and devname not like '%����%'");

//                            try
//                            {
//                                if (missing.Rows.Count > 0)
//                                {
//                                TvMain.LockDevice(id_bdc, 400 * missing.Rows.Count, true);
//                                    TvMain.SaveLog(id_bdc, archType_hour, "??", "������ ����������� �������� ( " + missing.Rows.Count.ToString() + " �������)");
//                                }

//                                for (int j = 0; j < missing.Rows.Count && GRCount < 15; j++)
//                                {
//                                    tempdate = (DateTime)(missing.Rows[j]["ARCHDATE"]);

//                                    GetRow = false;
//                                    missingpass = TvMain.QuerySelect("select TRYCOUNT from missingpass where id_bd=" + id_bdc.ToString() + " and ARCHDATE=" + TvMain.OracleDate(tempdate) + "  and DEVNAME ='" + missing.Rows[j]["DEVNAME"] + "'  "); // and devname not like '%����%'");
//                                    if (missingpass.Rows.Count == 0)
//                                    {
//                                        GetRow = true;
//                                        TryCount = 0;
//                                    }
//                                    else
//                                    {
//                                        TryCount = int.Parse(missingpass.Rows[0]["TRYCOUNT"].ToString());
//                                        if (TryCount < 5)
//                                        {
//                                            GetRow = true;
//                                        }
//                                    }



//                                    if (TvMain.TVD.IsConnected())
//                                    {
//                                        TvMain.HoldLine();


//                                        if (GetRow)
//                                        {
//                                            GRCount++;
//                                        String str;

//                                        InfoReport("������ ID=  " + id_bdc.ToString() + " ������ ������������ ��������� ������ ��  " + tempdate.ToString());
//                                        TvMain.ClearDuration();
//                                        str = TvMain.readarch(archType_day, tempdate.Year, tempdate.Month, tempdate.Day, 0);
//                                        if (str.Length == 0)
//                                        {
//                                            WarningReport("������ ID: " + dr["id_bd"].ToString() + " " + str + tempdate.ToString());
//                                            TvMain.SaveLog(id_bdc, archType_day, "??", "������ ������ ������������ ��������� ������ �� ����:" + tempdate.ToString());
//                                        }
//                                        else
//                                        {
//                                            if (str.Substring(0, 6) != "������")
//                                            {
//                                                //if (TvMain.CheckForArch(archType_day, tempdate.Year, tempdate.Month, tempdate.Day, 0, id_bdc) == false)
//                                                {
//                                                    if (TvMain.TVD.isArchToDBWrite)
//                                                    {
//                                                        TvMain.SaveLog(id_bdc, archType_day, "??", "����������� �������� ����� �� ����:" + tempdate.ToString() + ":OK");
//                                                        TvMain.ClearDBArchString(archType_day, tempdate.Year, tempdate.Month, tempdate.Day, 0, id_bdc);
//                                                        TvMain.WriteArchToDB();
//                                                    }

//                                                }
//                                            }
//                                            else
//                                            {
//                                                WarningReport("������ ID: " + dr["id_bd"].ToString() + " " + str + tempdate.ToString());
//                                                TvMain.SaveLog(id_bdc, archType_day, "??", "������ ������ ������������ ��������� ������ �� ����:" + tempdate.ToString());
//                                            }
//                                        }


//                                            String q;
//                                            if (TryCount == 0)
//                                            {
//                                                q = "insert into missingpass(id_bd,archdate,devname,trycount) values(" + dr["id_bd"].ToString() + "," + TvMain.OracleDate(tempdate) + ",'" + missing.Rows[j]["DEVNAME"].ToString() + "'," + (TryCount + 1).ToString() + ")";
//                                            }
//                                            else
//                                            {
//                                                q = "update missingpass set trycount=" + (TryCount + 1).ToString() + " where id_bd = " + dr["id_bd"].ToString() + " and archdate=" + TvMain.OracleDate(tempdate) + " and devname ='" + missing.Rows[j]["DEVNAME"].ToString() + "'";
//                                            }

//                                            TvMain.QueryExec(q);
//                                        }

//                                    }
//                                }

//                            }//try
//                            catch (Exception Ex)
//                            {
//                                ErrorReport("������ ID " + dr["id_bd"].ToString() + " ������ ������ ������������ ��������� ������, " + Ex.Message);

//                            }
//                        }// (missing day)
                      
//                        #endregion "missing day"



 //             #region "qlist hour"

 //                       TvMain.SetTimeToPlanCall(id_bdc, "dlastcall", SrvDate);

 //                       // try to load missing hour archives
 //                       {

                           

 //                           DateTime tempdate;
 //                           DataTable missing;
 //                           missing = TvMain.QuerySelect("select QLISTID, QDATE,PROCESSED from QLIST where id_bd=" + id_bdc.ToString() + " and id_PTYPE=3 ");

 //                           try
 //                           {
 //                               if (missing.Rows.Count > 0)
 //                               TvMain.LockDevice(id_bdc, 400 * missing.Rows.Count, true);
 //                               for (int j = 0; j < missing.Rows.Count && j < 6; j++)
 //                               {

                                   
 //                                   tempdate = (DateTime)(missing.Rows[j]["QDATE"]);
 //                                   if (TvMain.TVD.IsConnected())
 //                                   {
 //                                       TvMain.HoldLine();

 //                                       String str;

 //                                       InfoReport("������ ID=  " + id_bdc.ToString() + " ������ �������� ������ �� ������� " + tempdate.ToString());
 //                                       TvMain.ClearDuration();
 //                                       str = TvMain.readarch(archType_hour, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour);
 //                                       if (str.Length == 0)
 //                                       {
                                         
 //                                           WarningReport("������ ID= " + dr["id_bd"].ToString() + " " + str + " " + tempdate.ToString());
 //                                           TvMain.SaveLog(id_bdc, archType_hour, "??", "������ ������  �������� ������ �� ������� �� ����:" + tempdate.ToString() + " " + str);
 //                                           if (Convert.ToInt16(missing.Rows[j]["PROCESSED"]) < 9)
 //                                           {
 //                                               TvMain.QueryExec("update QLIST set processed=processed+1 where QLISTID=" + missing.Rows[j]["QLISTID"].ToString());
 //                                           }
 //                                           else
 //                                           {
 //                                               TvMain.QueryExec("delete from QLIST where QLISTID=" + missing.Rows[j]["QLISTID"].ToString());
 //                                           }
 //                                       }
 //                                       else
 //                                       {
 //                                           if (str.Substring(0, 6) != "������")
 //                                           {
 //                                               //if (TvMain.CheckForArch(archType_day, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour, id_bdc) == false)
 //                                               {
 //                                                   if (TvMain.TVD.isArchToDBWrite)
 //                                                   {
 //                                                       TvMain.SaveLog(id_bdc, archType_hour, "??", "������� ����� �� ������� �� ����:" + tempdate.ToString() + ":OK");
 //                                                       TvMain.ClearDBArchString(archType_hour, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour, id_bdc);
 //                                                       TvMain.WriteArchToDB();
 //                                                       TvMain.QueryExec("delete from QLIST where QLISTID=" + missing.Rows[j]["QLISTID"].ToString());
                                                       
 //                                                   }

 //                                               }
 //                                           }
 //                                           else
 //                                           {
                                              
 //                                               WarningReport("������ ID= " + dr["id_bd"].ToString() + " " + str + tempdate.ToString());
 //                                               TvMain.SaveLog(id_bdc, archType_hour, "??", "������ ������ �������� ������ �� ������� �� ����:" + tempdate.ToString() + " " + str);
 //                                               if (Convert.ToInt16(missing.Rows[j]["PROCESSED"]) < 9)
 //                                               {
 //                                                   TvMain.QueryExec("update QLIST set processed=processed+1 where QLISTID=" + missing.Rows[j]["QLISTID"].ToString());
 //                                               }
 //                                               else
 //                                               {
 //                                                   TvMain.QueryExec("delete from QLIST where QLISTID=" + missing.Rows[j]["QLISTID"].ToString());
 //                                               }
 //                                           }
 //                                       }
 //                                   }
 //                               }

 //                           }//try
 //                           catch (Exception Ex)
 //                           {
                                
 //                               ErrorReport("������ ID= " + dr["id_bd"].ToString() + " ������ ������ �������� ������ �� �������, " + Ex.Message);

 //                           }
 //                       }// (QLIST hour)

 //                       #endregion

 //#region "qlist day"

 //                       TvMain.SetTimeToPlanCall(id_bdc, "dlastcall", SrvDate);

 //                       // try to load missing hour archives
 //                       {

                          

 //                           DateTime tempdate;
 //                           DataTable missing;
 //                           missing = TvMain.QuerySelect("select QLISTID, QDATE,PROCESSED from QLIST where id_bd=" + id_bdc.ToString() + " and id_PTYPE=4 ");

 //                           try
 //                           {
 //                               if (missing.Rows.Count > 0)
 //                               {
 //                               TvMain.LockDevice(id_bdc, 400 * missing.Rows.Count, true);
 //                               }
 //                               for (int j = 0; j < missing.Rows.Count && j < 6; j++)
 //                               {


 //                                   tempdate = (DateTime)(missing.Rows[j]["QDATE"]);
 //                                   if (TvMain.TVD.IsConnected())
 //                                   {
 //                                       TvMain.HoldLine();

 //                                       String str;

 //                                       InfoReport("������ ID=  " + id_bdc.ToString() + " ������ ��������� ������ �� ������� " + tempdate.ToString());
 //                                       TvMain.ClearDuration();
 //                                       str = TvMain.readarch(archType_day, tempdate.Year, tempdate.Month, tempdate.Day, 0);
 //                                       if (str.Length == 0)
 //                                       {

 //                                           WarningReport("������ ID= " + dr["id_bd"].ToString() + " " + str + " " + tempdate.ToString());
 //                                           TvMain.SaveLog(id_bdc, archType_hour, "??", "������ ������  ��������� ������ �� ������� �� ����:" + tempdate.ToString() + " " + str);
 //                                           if (Convert.ToInt16(missing.Rows[j]["PROCESSED"]) < 9)
 //                                           {
 //                                               TvMain.QueryExec("update QLIST set processed=processed+1 where QLISTID=" + missing.Rows[j]["QLISTID"].ToString());
 //                                           }
 //                                           else
 //                                           {
 //                                               TvMain.QueryExec("delete from QLIST where QLISTID=" + missing.Rows[j]["QLISTID"].ToString());
 //                                           }
 //                                       }
 //                                       else
 //                                       {
 //                                           if (str.Substring(0, 6) != "������")
 //                                           {
 //                                               //if (TvMain.CheckForArch(archType_day, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour, id_bdc) == false)
 //                                               {
 //                                                   if (TvMain.TVD.isArchToDBWrite)
 //                                                   {
 //                                                       TvMain.SaveLog(id_bdc, archType_day, "??", "�������� ����� �� ������� �� ����:" + tempdate.ToString() + ":OK");
 //                                                       TvMain.ClearDBArchString(archType_day, tempdate.Year, tempdate.Month, tempdate.Day, tempdate.Hour, id_bdc);
 //                                                       TvMain.WriteArchToDB();
 //                                                       TvMain.QueryExec("delete from QLIST where QLISTID=" + missing.Rows[j]["QLISTID"].ToString());

 //                                                   }

 //                                               }
 //                                           }
 //                                           else
 //                                           {

 //                                               WarningReport("������ ID= " + dr["id_bd"].ToString() + " " + str + tempdate.ToString());
 //                                               TvMain.SaveLog(id_bdc, archType_day, "??", "������ ������ ��������� ������ �� ������� �� ����:" + tempdate.ToString() + " " + str);
 //                                               if (Convert.ToInt16(missing.Rows[j]["PROCESSED"]) < 9)
 //                                               {
 //                                                   TvMain.QueryExec("update QLIST set processed=processed+1 where QLISTID=" + missing.Rows[j]["QLISTID"].ToString());
 //                                               }
 //                                               else
 //                                               {
 //                                                   TvMain.QueryExec("delete from QLIST where QLISTID=" + missing.Rows[j]["QLISTID"].ToString());
 //                                               }
 //                                           }
 //                                       }
 //                                   }
 //                               }

 //                           }//try
 //                           catch (Exception Ex)
 //                           {

 //                               ErrorReport("������ ID= " + dr["id_bd"].ToString() + " ������ ������ ��������� ������ �� �������, " + Ex.Message);

 //                           }
 //                       }// (QLIST day)

 //                       #endregion

                      

                      
                        TvMain.UnLockDevice(id_bdc);
                         string transpname  = "";
                         if (TvMain.TVD != null)
                         {
                             if (TvMain.TVD.Transport.ToString() == "10C31283-151C-4153-4A46-08D6C2921B4D")
                             {
                                 transpname = TvMain.TVD.ComPort;
                             }

                         }
                        TvMain.SaveLog(id_bdc, Guid.Empty,"??", "�������� ������. " + transpname);
                     
        
                    }
                    else
                    {
                        ErrorReport("������ ID " + dr["id_bd"].ToString() + " transport initialization Error!"  );
                    }
                }
                //else
                //{
                //    InfoReport("������ ID " + dr["id_bd"].ToString() + " plan is active, but no tasks to process!");
                //}
            }
            catch (System.Exception threadEx)
            {
                ErrorReport("������ ID " + dr["id_bd"].ToString() + " thread failed, " + threadEx.Message);
            }
        }



        private void AnalizeDevice(DataRow dr)
        {
            // finalization 
            Int32 id_bdc;
          
            id_bdc = Convert.ToInt32(dr["id_bd"].ToString());

            

            //DataTable aCFG = TvMain.QuerySelect("select * from ANALIZER_CFG where ID_BD=" + dr["id_bd"].ToString());
            //if (aCFG.Rows.Count > 0)
            //{

            //    if (int.Parse(aCFG.Rows[0]["ANALIZENODE"].ToString()) != 0)
            //    {
            //        try
            //        {
            //            VIPAnalizer.NodeAnalizer na = new VIPAnalizer.NodeAnalizer();
            //            na.AnalizeNode(TvMain, id_bdc, 14,false);
            //            TvMain.SaveLog(id_bdc, Guid.Empty,"??", "������ ������");
            //        }
            //        catch (System.Exception ex)
            //        {
            //            TvMain.SaveLog(id_bdc, Guid.Empty,"??", "������ ��� ������� ������: " + ex.Message );
            //        }

            //    }

            //}
        }


        #region log functions
       
       

        public void ErrorReport(string Message)
        {
            logger.Error(Message);
        }
        public void InfoReport(string Message)
        {
            
                logger.Info (Message);
            
        }
        public void WarningReport(string Message)
        {
               logger.Warn(Message);
            
        }
        
        #endregion log functions

      
    }

    
}
