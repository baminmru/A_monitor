Imports System.Data
Imports System.IO
Imports System.Reflection
Imports System.Xml
Imports System.Data.SqlClient
Imports a_srv.models
Imports NLog

Public Class TVMain

    Public Shared MomentArchID As Guid = New Guid("19DB21FC-0BD7-47A1-D3D7-08D6D1323977")

    Private Inited As Boolean
    Private m_DBTableName As String = "DATA_RECORD"
    Private Shared logger As Logger = LogManager.GetCurrentClassLogger()

    Protected Sub Log(ByVal s As String)
        Init()
        logger.Info(s)
        Debug.Print(s)
    End Sub

    Public Overridable Property DBTableName() As String
        Get
            Return (m_DBTableName)
        End Get
        Set(ByVal value As String)
            m_DBTableName = value
        End Set
    End Property

    Private MyPort As Guid = Guid.Empty
    Private PhoneLineType As String = "T"

    Private mPortBusy As Boolean
    Public Property PortBusy() As Boolean
        Get
            Return mPortBusy
        End Get
        Set(ByVal value As Boolean)
            mPortBusy = value
        End Set
    End Property

    Public Event Idle()
    Public Event TransportStatus(ByVal Action As UnitransportAction, ByVal MSG As String)

    Public Function ReadSystemParameters() As DataTable
        If Not TVD Is Nothing Then
            If TVD.IsConnected Then
                Return TVD.ReadSystemParameters()
            Else
                Return Nothing
            End If


        Else
            Return Nothing
        End If

    End Function


    Public WithEvents TVD As TVDriver
    'Dim context.GetConnection() As SqlConnection 'SqlConnection
    Dim context As a_srv.models.MyContext = Nothing


    'Dim command As SqlCommand 'SqlCommand
    Dim PortID As Short
    Dim m_RequestInterval As Integer
    Dim DeviceReady As Boolean
    Dim m_DataSourceName As String
    Dim m_ShowHidden As Boolean = False
    Dim m_LogEnabled As Boolean = False
    Dim m_SendToTGK As Boolean = True
    Dim m_ConnectStatus As String = ""
    Dim m_AutoOpen As String = "Данные"
    Public Function AutoOpen() As String
        Return m_AutoOpen
    End Function
    Public Function ConnectStatus() As String
        Return m_ConnectStatus
    End Function

    Public Property LogEnabled() As Boolean
        Get
            Return m_LogEnabled
        End Get
        Set(ByVal value As Boolean)
            m_LogEnabled = value
        End Set
    End Property

    Public Property SendToTGK() As Boolean
        Get
            Return m_SendToTGK
        End Get
        Set(ByVal value As Boolean)
            m_SendToTGK = value
        End Set
    End Property
    Public Property ShowHidden() As Boolean
        Get
            Return m_ShowHidden
        End Get
        Set(ByVal value As Boolean)
            m_ShowHidden = value
        End Set
    End Property
    Public Property DataSourceName() As String
        Get
            Return m_DataSourceName
        End Get
        Set(ByVal value As String)
            m_DataSourceName = value
        End Set
    End Property

    Public Property RequestInterval() As Integer
        Get
            Return m_RequestInterval
        End Get
        Set(ByVal value As Integer)
            m_RequestInterval = value
        End Set
    End Property
    Public Function dbconnect() As SqlConnection
        If context.GetConnection().State <> ConnectionState.Open Then

            ' If context.GetConnection().State <> ConnectionState.Open Then
            Init()
        End If

        Return context.GetConnection()
    End Function
    Private Structure ToolTipStruct
        Dim ip As String
        Dim schemeName As String
        Dim Caddress As String
        Dim device As String
    End Structure
    Public Structure ConfigStruct
        Dim ip As String
        Dim ipport As String
        Dim Transport As String
        Dim password As String
        Dim device As String
        Dim NPQuery As Integer
        Dim HideRow As Integer
    End Structure



    Public Shared Function MSSQLDate(ByVal d As Date, Optional ByVal FullDate As Boolean = True) As String
        If IsDBNull(d) Then
            Return "NULL"
        Else
            If FullDate Then
                Return "convert(datetime,'" & MakeODBCDate(d) & "',120)"
            Else
                d = DateSerial(Year(d), Month(d), Day(d))
                Return "convert(datetime,'" & MakeODBCDate(d) & "',120)"
            End If
        End If
    End Function

    Public Shared Function MakeODBCDate(ByVal d As Date) As String
        'yyyy-mm-dd hh:mi:ss(24h)
        If IsDBNull(d) Then
            Return "NULL"
        Else
            Return Right("0000" & Year(d), 4) & "-" & Right("00" & Month(d), 2) & "-" & Right("00" & d.Day(), 2) & " " & Right("00" & Hour(d), 2) & ":" & Right("00" & Minute(d), 2) & ":" & Right("00" & Second(d), 2)
        End If
    End Function

    Public Sub ClearDBArchString(ByVal ArchType As Guid, ByVal ArchYear As Int32,
    ByVal ArchMonth As Int32, ByVal ArchDay As Int32, ByVal ArchHour As Int32, ByVal id_bd As Guid)

        Dim datearch As DateTime
        Dim after As Date, befor As Date
        datearch = New DateTime(ArchYear, ArchMonth, ArchDay, ArchHour, 0, 0)



        after = datearch.AddSeconds(-1)
        befor = datearch.AddSeconds(1)

        Dim s As String = "delete from " & DBTableName & " where dcounter>=" +
        MSSQLDate(after) + " and dcounter<=" +
        MSSQLDate(befor) + " and atype='" + ArchType.ToString() + "' and id_bd='" + id_bd.ToString() + "'"

        Try

            context.DoExec(s)

        Catch ex As Exception
            Log(ex.Message)
        End Try
    End Sub






    Public Function CheckForArch(ByVal ArchType As Guid, ByVal ArchYear As Int32,
    ByVal ArchMonth As Int32, ByVal ArchDay As Int32, ByVal ArchHour As Int32, ByVal id_bd As Guid) As Boolean

        Dim datearch As DateTime
        Dim after As Date, befor As Date
        datearch = New DateTime(ArchYear, ArchMonth, ArchDay, ArchHour, 0, 0)

        after = datearch.AddSeconds(-1)
        befor = datearch.AddSeconds(1)

        Dim s As String = "select count(*) CNT  from " & DBTableName & " where dcounter>=" +
        MSSQLDate(after) + " and dcounter<=" +
        MSSQLDate(befor) + " and atype='" + ArchType.ToString() +
        "' and " & DBTableName & "id='" + id_bd.ToString() + "'"


        Dim dt As DataTable
        dt = context.DoQuery(s)

        If dt.Rows.Count > 0 Then

            If dt.Rows(0)("CNT") > 0 Then

                Return True
            End If
        End If
        Return False
    End Function



    Public Function GetRealDateFromBase(ByVal ArchType As Int32, ByVal ArchYear As Int32,
    ByVal ArchMonth As Int32, ByVal ArchDay As Int32, ByVal ArchHour As Int32, ByVal id_bd As Guid) As DateTime

        Dim datearch As DateTime
        Dim after As Date, befor As Date
        datearch = New DateTime(ArchYear, ArchMonth, ArchDay, ArchHour, 0, 0)


        after = datearch.AddSeconds(-1)
        befor = datearch.AddSeconds(1)

        Dim s As String = "select dcounter  from " & DBTableName & " where dcounter>=" +
        MSSQLDate(after) + " and dcounter<=" +
        MSSQLDate(befor) + " and atype=" + ArchType.ToString() +
        " and id_bd='" + id_bd.ToString() + "' "


        Dim dt As DataTable = New DataTable


        Try
            SyncLock context.GetConnection()
                dt = context.DoQuery(s)
            End SyncLock

            If dt.Rows.Count > 0 Then

                Return dt.Rows(0)("dcounter")


            End If


        Catch ex As Exception
            Log(ex.Message)
        End Try

        Return DateTime.Now
    End Function



    Public Function GetDBRecords2(ByVal id_bd As Guid, ByVal after As Date, ByVal befor As Date, ByVal archtype As Guid) As DataTable
        Dim dt As DataTable = Nothing
        Dim s As String
        Try
            after = after.AddSeconds(-1)
        Catch
        End Try
        befor = befor.AddSeconds(1)

        s = "select * from v_" & DBTableName & " where dcounter>=" +
        MSSQLDate(after) + " and dcounter<=" +
        MSSQLDate(befor) + " and atype='" + archtype.ToString +
        "' and id_bd='" + id_bd.ToString() + "' "
        dt = context.DoQuery(s)
        Return dt
    End Function

    Public Function GetDBDevicePlanListAll() As DataTable

        Dim dt As DataTable

        Dim s As String = "select MONDEV_PLANCALL.*,ipaddr,password,MONDEV_CONNECT.portNum,MOND_CONNECTTYPE.name transportName, ConnectType transport ,getdate() ServerDate 
        from mondev_bdevices 
        join MONDEV_CONNECT on MONDEV_CONNECT.MONDEV_BDEVICESID=mondev_bdevices.MONDEV_BDEVICESid
        join MOND_CONNECTTYPE on MONDEV_CONNECT.ConnectType=MOND_CONNECTTYPE.MOND_CONNECTTYPEid
        join MONDEV_PLANCALL on mondev_bdevices.mondev_bdevicesid=MONDEV_PLANCALL.mondev_bdevicesid where ( nplock is null or nplock < getdate()) 
             and (MONDEV_PLANCALL.dlock is null or MONDEV_PLANCALL.dlock< getdate() )  
             and ((MONDEV_PLANCALL.chour=1 and ISNULL(MONDEV_PLANCALL.DNEXTHOUR,getdate()-1)<=getdate()) 
			 or (MONDEV_PLANCALL.ccurr=1 and ISNULL(MONDEV_PLANCALL.dnextcurr,getdate()-1) <=getdate()) 
			 or (MONDEV_PLANCALL.c24=1 and ISNULL(MONDEV_PLANCALL.dnext24 ,getdate()-1)<=getdate()) 
			 or (MONDEV_PLANCALL.csum=1 and ISNULL(MONDEV_PLANCALL.dnextsum ,getdate()-1)<=getdate()))"
        dt = context.DoQuery(s)

        Return dt
    End Function

    Public Function GetDBDevicePlanListIP() As DataTable
        Dim MyName As String
        MyName = Environment.MachineName
        Dim dt As DataTable

        Dim s As String = "select MONDEV_PLANCALL.*,MONDEV_CONNECT.ipaddr,password,MONDEV_CONNECT.portNum,MOND_CONNECTTYPE.name transportName, ConnectType transport ,getdate() ServerDate 
            from mondev_bdevices 
            join MONDEV_CONNECT on MONDEV_CONNECT.MONDEV_BDEVICESID=mondev_bdevices.MONDEV_BDEVICESid
            join MOND_CONNECTTYPE on MONDEV_CONNECT.ConnectType=MOND_CONNECTTYPE.MOND_CONNECTTYPEid
            join MONDEV_PLANCALL on mondev_bdevices.mondev_bdevicesid=MONDEV_PLANCALL.mondev_bdevicesid 
            join MONSRV_INFO on mondev_connect.TheServer =MONSRV_INFO.MONSRV_INFOid
            where ( nplock is null or nplock < getdate()) 
             and (MONDEV_PLANCALL.dlock is null or MONDEV_PLANCALL.dlock< getdate() )  
             and ((MONDEV_PLANCALL.chour=1 and ISNULL(MONDEV_PLANCALL.DNEXTHOUR,getdate()-1)<=getdate()) 
			 or (MONDEV_PLANCALL.ccurr=1 and ISNULL(MONDEV_PLANCALL.dnextcurr,getdate()-1) <=getdate()) 
			 or (MONDEV_PLANCALL.c24=1 and ISNULL(MONDEV_PLANCALL.dnext24 ,getdate()-1)<=getdate()) 
			 or (MONDEV_PLANCALL.csum=1 and ISNULL(MONDEV_PLANCALL.dnextsum ,getdate()-1)<=getdate()))
			 and MONSRV_INFO.Name='" & MyName & "'"


        dt = context.DoQuery(s)

            Return dt
    End Function

    Public Function GetDBDevicePlanListModem() As DataTable
        'Dim da As System.Data.Common.DbDataAdapter

        Dim MyName As String
        MyName = Environment.MachineName

        Dim dt As DataTable

        Dim s As String = "select MONDEV_PLANCALL.*,MONDEV_CONNECT.ipaddr,password,MONDEV_CONNECT.portNum,MOND_CONNECTTYPE.name transportName, ConnectType transport ,getdate() ServerDate 
            from mondev_bdevices 
            join MONDEV_CONNECT on MONDEV_CONNECT.MONDEV_BDEVICESID=mondev_bdevices.MONDEV_BDEVICESid
            join MOND_CONNECTTYPE on MONDEV_CONNECT.ConnectType=MOND_CONNECTTYPE.MOND_CONNECTTYPEid
            join MONDEV_PLANCALL on mondev_bdevices.mondev_bdevicesid=MONDEV_PLANCALL.mondev_bdevicesid 
            join MONSRV_INFO on mondev_connect.TheServer =MONSRV_INFO.MONSRV_INFOid
            where ( nplock is null or nplock < getdate()) 
             and (MONDEV_PLANCALL.dlock is null or MONDEV_PLANCALL.dlock< getdate() )  
             and ((MONDEV_PLANCALL.chour=1 and ISNULL(MONDEV_PLANCALL.DNEXTHOUR,getdate()-1)<=getdate()) 
			 or (MONDEV_PLANCALL.ccurr=1 and ISNULL(MONDEV_PLANCALL.dnextcurr,getdate()-1) <=getdate()) 
			 or (MONDEV_PLANCALL.c24=1 and ISNULL(MONDEV_PLANCALL.dnext24 ,getdate()-1)<=getdate()) 
			 or (MONDEV_PLANCALL.csum=1 and ISNULL(MONDEV_PLANCALL.dnextsum ,getdate()-1)<=getdate()))
			 and MONSRV_INFO.Name='" & MyName & "'"


        dt = context.DoQuery(s)



            Return dt
    End Function


    Public Function GetDBOneDevicePlanList(ByVal DevID As Guid) As DataTable

        Dim dt As DataTable

        Dim s As String = "select MONDEV_PLANCALL.*,ipaddr,password,MONDEV_CONNECT.portNum,MOND_CONNECTTYPE.name transportName, ConnectType transport ,getdate() ServerDate 
        from mondev_bdevices 
        join MONDEV_CONNECT on MONDEV_CONNECT.MONDEV_BDEVICESID=mondev_bdevices.MONDEV_BDEVICESid
        join MOND_CONNECTTYPE on MONDEV_CONNECT.ConnectType=MOND_CONNECTTYPE.MOND_CONNECTTYPEid
        join MONDEV_PLANCALL on mondev_bdevices.mondev_bdevicesid=MONDEV_PLANCALL.mondev_bdevicesid where ( nplock is null or nplock < getdate()) 
             and (MONDEV_PLANCALL.dlock is null or MONDEV_PLANCALL.dlock< getdate() )  
             and ((MONDEV_PLANCALL.chour=1 and ISNULL(MONDEV_PLANCALL.DNEXTHOUR,getdate()-1)<=getdate()) 
			 or (MONDEV_PLANCALL.ccurr=1 and ISNULL(MONDEV_PLANCALL.dnextcurr,getdate()-1) <=getdate()) 
			 or (MONDEV_PLANCALL.c24=1 and ISNULL(MONDEV_PLANCALL.dnext24 ,getdate()-1)<=getdate()) 
			 or (MONDEV_PLANCALL.csum=1 and ISNULL(MONDEV_PLANCALL.dnextsum ,getdate()-1)<=getdate())) And mondev_bdevices.MONDEV_BDEVICESid='" & DevID.ToString() + "' "


        dt = context.DoQuery(s)


        Return dt

    End Function



    Public Function GetRequestList(ByVal DevID As Guid) As DataTable

        Dim dt As DataTable

        Dim s As String = "select MONQ_DEF.*,MONDEV_CONNECT.ipaddr,password,MONDEV_CONNECT.portNum,MOND_CONNECTTYPE.name transportName, ConnectType transport ,getdate() ServerDate 
        from mondev_bdevices 
        join MONDEV_CONNECT on MONDEV_CONNECT.MONDEV_BDEVICESID=mondev_bdevices.MONDEV_BDEVICESid
        join MOND_CONNECTTYPE on MONDEV_CONNECT.ConnectType=MOND_CONNECTTYPE.MOND_CONNECTTYPEid
        join MONQ_DEF On mondev_bdevices.mondev_bdevicesid=MONQ_DEF.TheDevice where  mondev_bdevices.mondev_bdevicesid='" & DevID.ToString() + "' "

        dt = context.DoQuery(s)

        Return dt
    End Function



    Public Function LockDevice(ByVal DevID As Guid, ByVal LockSeconds As Integer, ByVal NoCheck As Boolean) As Boolean

        Dim dt As DataTable

        Dim s As String = "Select nplock,getdate() ServerDate from mondev_bdevices  where  ( nplock Is null Or nplock <getdate() )  And mondev_bdevicesid='" & DevID.ToString() + "' "


        dt = context.DoQuery(s)



        If NoCheck Or dt.Rows.Count > 0 Then
            s = "update mondev_bdevices set nplock =dateadd(second," + LockSeconds.ToString + ",getdate() ) where mondev_bdevices.mondev_bdevicesid='" + DevID.ToString() + "'"
            context.DoExec(s)
            SaveLog(DevID, Guid.Empty, "??", "Блокировка  устройства на " + LockSeconds.ToString + " сек.")

            Return True
        End If
        Return False
    End Function

    Public Function UnLockDevice(ByVal DevID As Guid) As Boolean

        Dim dt As DataTable

        Dim s As String = "select nplock,getdate() ServerDate from mondev_bdevices  where  ( nplock >=getdate() )   and mondev_bdevicesid='" + DevID.ToString() + "' "


        Try

            dt = context.DoQuery(s)

        Catch
        End Try

        If dt.Rows.Count > 0 Then
            s = "update mondev_bdevices set nplock = null where mondev_bdevicesid='" + DevID.ToString() + "'"
            context.DoExec(s)
            SaveLog(DevID, Guid.Empty, "??", "Снятие блокировки устройства ")

            Return True
        End If
        Return False
    End Function



    Public Function GetDBDateTime() As DateTime
        'Dim da As System.Data.Common.DbDataAdapter

        Dim dt As DataTable

        Dim s As String = "select getdate() d "


        Try

            dt = context.DoQuery(s)

            Return Convert.ToDateTime(dt.Rows(0)("d"))
        Catch

            Return System.DateTime.Now
        End Try

    End Function

    Public Function CounterName() As String
        Return TVD.CounterName
    End Function

    Public Function DeviceInit(ByVal id_bd As Guid, Optional ByVal UsePort As String = "(Любой)", Optional ByVal aSocket As GRPSSocket = Nothing) As Boolean
        ClearDuration()
        Dim deviceid As Int32
        Dim IPstr As String = String.Empty
        Dim DrvStr As String = String.Empty
        Dim NPPassword As String = String.Empty
        m_ConnectStatus = ""

        Dim dr As DataRow
        Dim dt As DataTable


        dt = context.DoQuery("select devices.DriverLibName dllname, bmodems.IPAddr npip,bmodems.Password nppassword, bmodems.PortNum ipport,bmodems.ConnectType transport, mondev_bdevices.mondev_bdevicesid
           ,bmodems.cspeed,bmodems.cphone,bmodems.cdatabit,bmodems.cstopbits,bmodems.cparity,bmodems.connectlimit 
		   from mondev_bdevices ,MONDEV_CONNECT bmodems, MOND_DEVTYPE devices where devices.MOND_DEVTYPEid =mondev_bdevices.DEVType 
		   and bmodems.MONDEV_BDEVICESID=mondev_bdevices.MONDEV_BDEVICESid and mondev_bdevices.MONDEV_BDEVICESid='" + id_bd.ToString + "' ")


        Dim cspeed As Long = 9600
        Dim cdatabit As Integer = 0
        Dim cstopbits As Integer = 0
        Dim connectlimit As Integer
        Dim cparity As String = "None"
        Dim ipport As String = ""
        Dim phone As String = ""
        Dim transport As Guid

        If dt.Rows.Count > 0 Then
            dr = dt.Rows(0)


            IPstr = dr("NPIP").ToString & ""
            deviceid = Convert.ToInt32(dr("id_dev").ToString)
            DrvStr = "" & dr("dllname")
            NPPassword = dr("nppassword").ToString() & ""
            Try
                cspeed = dr("cspeed")
                cdatabit = dr("cdatabit")
                cstopbits = dr("cstopbits")
                connectlimit = dr("connectlimit")
            Catch ex As Exception

            End Try

            If dr("cparity") = "N" Then
                cparity = "None"
            End If
            If dr("cparity") = "E" Then
                cparity = "Even"
            End If
            If dr("cparity") = "O" Then
                cparity = "Odd"
            End If
            If dr("cparity") = "S" Then
                cparity = "Space"
            End If
            If dr("cparity") = "M" Then
                cparity = "Mark"
            End If
            ipport = dr("ipport").ToString() & ""
            transport = dr("transport") & ""
            phone = dr("cphone") & ""

        Else

            SaveLog(id_bd, Guid.Empty, "??", "Не обнаружена запись об устройстве в базе данных")
            m_ConnectStatus = "Не обнаружена запись об устройстве в базе данных"
            Return False
        End If
        'SaveLog(id_bd,Guid.Empty,"??", "Найдена запись об устройстве в базе данных")
        'm_ConnectStatus = "Найдена запись об устройстве в базе данных"




        If (DrvStr = "") Then
            m_ConnectStatus = "Неизвестный драйвер"
            SaveLog(id_bd, Guid.Empty, "??", "Неизвестный драйвер")
            Return False
        End If


        TVD = Nothing
        Try
            TVD = GetDoc(DrvStr)
        Catch
            m_ConnectStatus = "Ошибка загрузки драйвера"
            SaveLog(id_bd, Guid.Empty, "??", "Ошибка загрузки драйвера")
            Return False
        End Try

        If Not TVD Is Nothing Then

            'Dim xml As XmlDocument
            'xml = New XmlDocument
            'Try
            '    xml.Load(System.IO.Path.GetDirectoryName(Me.GetType().Assembly.Location()) + "\Config" + DrvStr + ".xml")
            'Catch
            '    'MsgBox("Не найден файл конфигурации:" + System.IO.Path.GetDirectoryName(Me.GetType().Assembly.Location()) + "\Config" + DrvStr + ".xml")
            '    Return False
            'End Try

            'Dim node As XmlElement
            'node = xml.LastChild()


            TVD.ServerIp = IPstr
            TVD.BaudRate = cspeed 'Int(node.Attributes.GetNamedItem("BaudRate").Value)
            TVD.DataBits = cdatabit ' Int(node.Attributes.GetNamedItem("DataBits").Value)
            TVD.StopBits = cstopbits 'Int(node.Attributes.GetNamedItem("StopBits").Value)
            TVD.Parity = cparity 'node.Attributes.GetNamedItem("Parity").Value

            TVD.IPPort = ipport
            TVD.Transport = transport
            Select Case transport.ToString()
                Case "10C31283-151C-4153-4A46-08D6C2921B4D"
                    'm_ConnectStatus += vbCrLf & "Транспорт: модем"
                    SaveLog(id_bd, Guid.Empty, "??", "Транспорт: модем")

                Case "212E6CB6-BE9B-42A5-4A43-08D6C2921B4D"
                    'm_ConnectStatus += vbCrLf & "Транспорт: NPORT"
                    SaveLog(id_bd, Guid.Empty, "??", "Транспорт: NPORT")

                Case "D57A9CFD-46B8-4763-4A44-08D6C2921B4D"
                    'm_ConnectStatus += vbCrLf & "Транспорт: Vortex virtual serial"
                    SaveLog(id_bd, Guid.Empty, "??", "Транспорт:  Vortex virtual serial")

                    'Case 4
                    '    'm_ConnectStatus += vbCrLf & "Транспорт: модем"
                    '    SaveLog(id_bd, Guid.Empty, "??", "Транспорт: GSM модем")

                    'Case 5
                    '    'm_ConnectStatus += vbCrLf & "Транспорт: модем"
                    '    SaveLog(id_bd, Guid.Empty, "??", "Транспорт: АССВ")

                    'Case 6
                    '    'm_ConnectStatus += vbCrLf & "Транспорт: модем"
                    '    SaveLog(id_bd, Guid.Empty, "??", "Транспорт: ROBUSTEL")

            End Select

            If transport.ToString() = "10C31283-151C-4153-4A46-08D6C2921B4D" Then ' MODEM
                If UsePort = "(Любой)" Then
                    'If transport = 4 Then
                    '    TVD.ComPort = GetNextModem("G")
                    '    transport = 0
                    '    TVD.Transport = transport
                    'Else
                    TVD.ComPort = GetNextModem("")
                    'End If
                Else
                    TVD.ComPort = GetModemByName(UsePort)
                End If


                TVD.AtCommand = GetModemINIT()
                TVD.PhoneLineType = PhoneLineType
                TVD.Phone = phone
                TVD.ConnectLimit = connectlimit

                If TVD.ComPort = "" Then
                    m_ConnectStatus = "Все модемы заняты, либо не определены для терминала: " & Environment.MachineName
                    SaveLog(id_bd, Guid.Empty, "??", "Все модемы заняты, либо не определены для терминала: " & Environment.MachineName)
                    'TVD = Nothing
                    Return False
                End If



                SaveLog(id_bd, Guid.Empty, "??", "Выделен модем на порту: " & TVD.ComPort & " Телефон:" & TVD.Phone)
                'ElseIf transport = 1 Then
                '    TVD.ComPort = UsePort
                'ElseIf transport = 5 Or transport = 6 Then
                '    If Not aSocket Is Nothing Then
                '        If transport = 5 Then SaveLog(id_bd, Guid.Empty, "??", "ASSV CALLER ID:" & aSocket.callerID)
                '        If transport = 6 Then SaveLog(id_bd, Guid.Empty, "??", "ROBUSTEL CALLER ID:" & aSocket.callerID)
                '    End If
            Else

                SaveLog(id_bd, Guid.Empty, "??", "IP адрес:" & TVD.ServerIp)
                'm_ConnectStatus += vbCrLf & "IP адрес:" & TVD.ServerIp
            End If
            TVD.NPPassword = NPPassword

            TVD.DeviceID = id_bd


            ' таймаут
            TVD.TimeOut = 2000
            TVD.sleepInterval = 50


            'm_ConnectStatus += vbCrLf & "Параметры транспортного уровня загружены"


            If TVD.OpenPort(aSocket) = False Then
                Dim msg As String = ""

                msg = TVD.DriverTransport.GetError
                If transport.ToString() = "10C31283-151C-4153-4A46-08D6C2921B4D" Then
                    PortBusy = TVD.DriverTransport.PortBusy
                    If TVD.DriverTransport.PortBusy Then
                        If msg <> "" Then
                            msg = msg + " "
                        End If
                        msg = msg + TVD.ComPort + " "
                        msg = msg + "порт занят "
                    End If
                End If

                TVD.CloseTransportConnect()
                FreeModem()
                UnLockDevice(id_bd)
                m_ConnectStatus = "Ошибка транспортa. " + msg
                SaveLog(id_bd, Guid.Empty, "??", "Ошибка транспорта. " + msg)
                ClearDuration()
                SaveLog(id_bd, Guid.Empty, "??", "Сеанс завершен")
                Return False
            End If

            SaveLog(id_bd, Guid.Empty, "??", "Транспортный уровень инициализирован")
            ClearDuration()


            DeviceReady = True


            Return True
        Else
            Return False
        End If
    End Function

    Public Function GetEnvInfo() As String
        Dim out As String
        out = "Path:" & System.IO.Path.GetDirectoryName(Me.GetType().Assembly.Location()) + "\Config.xml"
        Try
            out = out & vbCrLf & context.GetConnection().ConnectionString
        Catch
        End Try
        Return out
    End Function
    Public Function Init() As Boolean
        If Inited Then
            If context.GetConnection().State = ConnectionState.Open Then
                Return Inited
            End If
        End If

        DeviceReady = False


        If context Is Nothing Then
            context = New MyContext()
        End If

        Try
            '' SyncLock context.GetConnection()
            context.GetConnection().Open()
            '' End SyncLock
            If context.GetConnection().State <> ConnectionState.Open Then
                Log("Ошибка соединения")
                Return False
            End If
            'Dim SessionGlob As OracleGlobalization = context.GetConnection().GetSessionInfo()
            'SessionGlob.Language = "RUSSIAN"
            'Try
            '    m_RequestInterval = Convert.ToDouble(node.Attributes.GetNamedItem("RequestInterval").Value)

            'Catch
            '    m_RequestInterval = 59000
            'End Try




        Catch ex As Exception
            'MsgBox(ex.Message, MsgBoxStyle.OkOnly)
            m_ConnectStatus += ex.Message
            Log(ex.Message)
            Return False
        End Try



        Inited = True
        Return Inited
    End Function

    Public Sub DeviceClose()
        Try
            If Not TVD Is Nothing Then
                TVD.CloseTransportConnect()
                TVD = Nothing
            End If
        Catch ex As Exception
            Log(ex.Message)
        End Try

        FreeModem()

        DeviceReady = False



    End Sub

    Public Function GetToolTipStructFromId_BD(ByVal id_bd As Guid) As Object
        GetToolTipStructFromId_BD = New ToolTipStruct
        Dim dr As DataRow
        Dim dt As DataTable

        dt = context.DoQuery("select mondev_bdevices.npip,mondev_bdevices.scheme_name,bbuildings.caddress," +
           "devices.cdevdesc from mondev_bdevices,bbuildings,devices where mondev_bdevices.id_bd=" + id_bd.ToString +
           " and bbuildings.id_bu = mondev_bdevices.id_bu and devices.id_dev=mondev_bdevices.id_dev" + " ")

        If dt.Rows.Count > 0 Then
            dr = dt.Rows(0)
            GetToolTipStructFromId_BD.ip = dr("NPIP").ToString
            GetToolTipStructFromId_BD.schemeName = dr("scheme_Name").ToString
            GetToolTipStructFromId_BD.caddress = dr("caddress").ToString
            GetToolTipStructFromId_BD.device = dr("cdevdesc").ToString


        End If
        Return GetToolTipStructFromId_BD

    End Function
    Public Function GetConfigStructFromId_BD(ByVal id_bd As Guid) As ConfigStruct
        Dim mGetConfigStructFromId_BD
        mGetConfigStructFromId_BD = New ConfigStruct
        Dim dr As DataRow
        Dim dt As DataTable

        dt = context.DoQuery("select mondev_bdevices.npip, mondev_bdevices.nppassword, mondev_bdevices.npquery,mondev_bdevices.hiderow,  devices.cdevname, mondev_bdevices.transport, mondev_bdevices.ipport" +
           " from mondev_bdevices,devices where mondev_bdevices.id_bd=" + id_bd.ToString + " and devices.id_dev=mondev_bdevices.id_dev" + " ")
        If dt.Rows.Count > 0 Then
            dr = dt.Rows(0)
            mGetConfigStructFromId_BD.ipport = dr("IPPORT").ToString
            If dr("transport") = 0 Then
                mGetConfigStructFromId_BD.Transport = "MODEM"
            End If

            If dr("transport") = 1 Then
                mGetConfigStructFromId_BD.Transport = "COM"
            End If

            If dr("transport") = 2 Then
                mGetConfigStructFromId_BD.Transport = "NPORT"
            End If

            If dr("transport") = 3 Then
                mGetConfigStructFromId_BD.Transport = "VSX"
            End If
            If dr("transport") = 4 Then
                mGetConfigStructFromId_BD.Transport = "GSM Modem"
            End If

            If dr("transport") = 5 Then
                mGetConfigStructFromId_BD.Transport = "ASSV"
            End If


            If dr("transport") = 6 Then
                mGetConfigStructFromId_BD.Transport = "ROBUSTEL"
            End If


            mGetConfigStructFromId_BD.IP = dr("NPIP").ToString
            mGetConfigStructFromId_BD.device = dr("cdevname").ToString
            mGetConfigStructFromId_BD.Password = dr("nppassword").ToString
            mGetConfigStructFromId_BD.NPQUERY = dr("npquery").ToString
            mGetConfigStructFromId_BD.HideRow = dr("hiderow").ToString

            Return mGetConfigStructFromId_BD
        Else
            Return Nothing
        End If

    End Function

    Public Sub ClearDBarch(ByVal after As Date, ByVal befor As Date, ByVal archtype As Guid, ByVal id_bd As Guid)

        after = after.AddSeconds(-1)
        befor = befor.AddSeconds(1)

        Dim s As String = "delete from " & DBTableName & " where dcounter>=" +
        "to_date('" + after.Year.ToString() + "-" + after.Month.ToString() + "-" + after.Day.ToString() +
        " " + after.Hour.ToString() + ":" + after.Minute.ToString() + ":" + after.Second.ToString() + "','YYYY-MM-DD HH24:MI:SS') and dcounter<=" +
        "to_date('" + befor.Year.ToString() + "-" + befor.Month.ToString() + "-" + befor.Day.ToString() +
        " " + befor.Hour.ToString() + ":" + befor.Minute.ToString() + ":" + befor.Second.ToString() + "','YYYY-MM-DD HH24:MI:SS') and atype='" + archtype.ToString() + "' " +
        " and id_bd='" + id_bd.ToString() + "'"
        Try
            '' SyncLock context.GetConnection()
            context.DoExec(s)
            '' End SyncLock

        Catch ex As Exception
            Log(ex.Message)
        End Try
    End Sub
    Protected Function GetDoc(ByVal name As String, Optional ByVal Root As String = "") As TVDriver
        Dim funcAssembly As TVDriver
        Dim asm As System.Reflection.Assembly
        funcAssembly = Nothing
        asm = Nothing
        Try
            If asm Is Nothing Then
                If Root <> "" Then
                    Try
                        asm = System.Reflection.Assembly.LoadFrom(Root + "\" & name & ".dll")
                    Catch
                    End Try
                End If
            End If
            If asm Is Nothing Then
                Dim FileName As String
                FileName = System.IO.Path.GetDirectoryName(Me.GetType().Assembly.Location) + "\" & name & ".dll"
                Try
                    If (File.Exists(FileName)) Then
                        asm = System.Reflection.Assembly.LoadFrom(FileName)
                    End If
                Catch ex As Exception
                    Log(ex.Message)
                End Try
                If (asm Is Nothing) Then
                    Try
                        FileName = AppDomain.CurrentDomain.DynamicDirectory + "\" & name & ".dll"
                        If (File.Exists(FileName)) Then
                            asm = System.Reflection.Assembly.LoadFrom(FileName)
                        Else
                            Try
                                funcAssembly = CType(System.Activator.CreateInstance(name, name & ".Driver").Unwrap(), TVDriver)
                            Catch e2 As System.Exception
                                Dim i As Integer = 0
                                Return Nothing
                            End Try
                        End If
                    Catch ex As Exception
                        Log(ex.Message)
                    End Try
                End If
                If (funcAssembly Is Nothing) Then
                    funcAssembly = CType(asm.CreateInstance(name & ".Driver", True), TVDriver)
                End If
            End If
        Catch
        End Try
        asm = Nothing
        Return funcAssembly
    End Function
    Public Sub CloseTransportConnect()

        Try
            If DeviceReady Then
                TVD.CloseTransportConnect()
                DeviceReady = False
            End If
        Catch ex As Exception

        End Try
    End Sub
    Public Function write(ByRef buf() As Byte, ByVal len As Long)
        Dim ret As Long
        If Not TVD Is Nothing Then
            ret = TVD.write(buf, len)
            Return ret
        Else
            Return 0
        End If
    End Function
    Public Sub connect()
        If Not TVD Is Nothing Then
            TVD.Connect()
            If Not TVD.IsConnected Then
                m_ConnectStatus = "Ошибка протокола обмена. " + TVD.DriverTransport.GetError
                TVD.CloseTransportConnect()
                UnLockDevice(TVD.DeviceID)
            End If
        End If

    End Sub

    Public Function isConnected() As Boolean
        If Not TVD Is Nothing Then
            Return TVD.IsConnected
        Else
            Return False
        End If
    End Function

    Public Function readmarch() As String
        If Not TVD Is Nothing Then
            HoldLine()
            Return TVD.ReadMArch()
        Else
            m_ConnectStatus = "Драйвер устройства не создан"
            Return "Ошибка. Драйвер устройства не создан"
        End If
    End Function
    Public Function readtarch() As String
        If Not TVD Is Nothing Then
            HoldLine()
            Return TVD.ReadTArch()
        Else
            m_ConnectStatus = "Драйвер устройства не создан"
            Return "Ошибка. Драйвер устройства не создан"
        End If
    End Function
    Public Function readarch(ByVal ArchType As Guid, ByVal ArchYear As Int32,
   ByVal ArchMonth As Int32, ByVal ArchDay As Int32, ByVal ArchHour As Int32) As String
        HoldLine()
        Return TVD.ReadArch(ArchType, ArchYear, ArchMonth, ArchDay, ArchHour)
    End Function



    Public Sub SetTimeToPlanCall(ByVal id_bd As Guid, ByVal FieldName As String, ByVal time As DateTime)
        Dim s As String = "update MONDEV_PLANCALL set " + FieldName +
        "=" + Utils.MSSQLDate(time, True) + " where MONDEV_BDEVICEID='" + id_bd.ToString() + "' "
        context.DoExec(s)

    End Sub



    Public Sub AddHourToPlanCall(ByVal id_bd As Guid, ByVal FieldName As String, ByVal Hours As Integer)
        Dim s As String = "update MONDEV_PLANCALL set " + FieldName +
        "= dateadd(hour," + Hours.ToString() + ", " + FieldName + ")where MONDEV_BDEVICEID'" + id_bd.ToString() + "' "
        Try

            context.DoExec(s)

        Catch ex As Exception
            Log(ex.Message)

        End Try
    End Sub

    Public Sub AddMinutesToPlanCall(ByVal id_bd As Guid, ByVal FieldName As String, ByVal Minutes As Integer)
        Dim s As String = "update MONDEV_PLANCALL set " + FieldName +
        "= dateadd(minute," + Minutes.ToString() + ", " + FieldName + ") where MONDEV_BDEVICEID'" + id_bd.ToString() + "' "
        Try
            context.DoExec(s)
        Catch ex As Exception
            Log(ex.Message)

        End Try
    End Sub

    Public Sub AddDaysToPlanCall(ByVal id_bd As String, ByVal FieldName As String, ByVal Days As Integer)
        Dim s As String = "update MONDEV_PLANCALL set " + FieldName +
        "=dateadd(day," + Days.ToString() + ", " + FieldName + ") where MONDEV_BDEVICEID'" + id_bd.ToString() + "' "
        Try
            context.DoExec(s)
        Catch ex As Exception
            Log(ex.Message)

        End Try
    End Sub
    Public Function WriteArchToDB() As String
        Dim s As String = TVD.WriteArchToDB

        Try

            context.DoExec(s)

            TVD.isArchToDBWrite = False
            Return " Архив добавлен в БД"
        Catch ex As Exception
            Log(ex.Message)

            Return ex.Message
        End Try
    End Function


    Public Function WritemArchToDB() As String
        Dim s As String = TVD.WriteMArchToDB


        Try
            TVD.isMArchToDBWrite = False
            '' SyncLock context.GetConnection()
            context.DoExec(s)
            '' End SyncLock
            Return "Мгновенный архив добавлен в БД"
        Catch ex As Exception

            Log(ex.Message)
            Return ex.Message
        End Try
    End Function

    Public Function WriteTArchToDB() As String
        Dim s As String = TVD.WriteTArchToDB


        Try
            TVD.isTArchToDBWrite = False

            context.DoExec(s)

            Return "Тотальный архив добавлен в БД"
        Catch ex As Exception
            Log(ex.Message)

            Return ex.Message
        End Try
    End Function

    Private Function GetLastMomentArchive(ByVal id_bd As Guid) As DataRow
        Dim dt As DataTable
        Dim dcall As Date

        dt = context.DoQuery("select max(dcall) dcall from " & DBTableName & "  where id_bd='" + id_bd.ToString + "'  And atype='" & MomentArchID.ToString() & "'")
        If dt.Rows.Count > 0 Then
            Try
                dcall = dt.Rows(0)("dcall")
            Catch ex As Exception
                Return Nothing
            End Try
        Else
            Return Nothing
        End If
        dt = context.DoQuery("select * from " & DBTableName & " where id_bd='" + id_bd.ToString + "' And aatype='" & MomentArchID.ToString() & "' And dcall>=" & MSSQLDate(dcall))
        If dt.Rows.Count > 0 Then
            Return dt.Rows(0)
        Else
            Return Nothing
        End If
    End Function




    Public Function WriteErrToDB(ByVal DeviceID As Guid, ByVal ErrDate As Date, ByVal ErrMsg As String) As String
        Dim SSS As String

        Dim dr As DataRow
        Dim useIns As Boolean = True
        Dim DCALL As Date

        dr = GetLastMomentArchive(DeviceID)
        If Not dr Is Nothing Then
            If dr("hc").ToString().Contains(ErrMsg) Then
                DCALL = dr("DCALL")
                If Math.Abs(DateDiff(Microsoft.VisualBasic.DateInterval.Minute, ErrDate, DCALL)) > 59 Then
                    useIns = True
                Else
                    useIns = False
                End If
            End If
        End If

        If Not useIns Then
            Dim hc As String
            Dim passIdx As Integer
            hc = dr("hc").ToString()
            passIdx = hc.IndexOf(". Попытка № ")
            If passIdx > 0 Then
                If Not Integer.TryParse(hc.Substring(passIdx + 12).Trim(), passIdx) Then
                    passIdx = 2
                Else
                    passIdx += 1
                End If
            Else
                passIdx = 2
            End If

            SSS = "update " & DBTableName & " set MSG='" + ErrMsg + ". Попытка № " + passIdx.ToString + "' ,DCOUNTER=getdate()  where id_bd='" + DeviceID.ToString + "' and atype='" & MomentArchID.ToString() & "' and DCOUNTER>=" & MSSQLDate(dr("DCOUNTER"))
            Dim s As String = SSS

            Try
                '' SyncLock context.GetConnection()
                context.DoExec(s)
                '' End SyncLock
                TVD.isArchToDBWrite = False
                Return ""
            Catch ex As Exception
                Log(ex.Message)

                Return ex.Message
            End Try
        Else
            SSS = "INSERT INTO " & DBTableName & "(id_bd,DCOUNTER,DCALL,atype,MSG) values ('"
            SSS = SSS + DeviceID.ToString() + "',"
            SSS = SSS + "getdate()" + ","
            SSS = SSS + MSSQLDate(ErrDate) + ","
            SSS = SSS + "'" & MomentArchID.ToString() & "',"  ' мгновенный архив
            SSS = SSS + "'" & S180(ErrMsg) & "')"

            Dim s As String = SSS

            Try
                '' SyncLock context.GetConnection()
                context.DoExec(s)
                '' End SyncLock
                TVD.isArchToDBWrite = False
                Return ""
            Catch ex As Exception
                Log(ex.Message)

                Return ex.Message
            End Try
        End If


    End Function



    Private Sub TVD_Idle() Handles TVD.Idle
        RaiseEvent Idle()
    End Sub

    Private Sub TVD_TransportStatus(ByVal Action As UnitransportAction, ByVal MSG As String) Handles TVD.TransportStatus
        Select Case Action
            Case ServerMain.UnitransportAction.Connected

            Case ServerMain.UnitransportAction.Connecting

            Case ServerMain.UnitransportAction.Destroy

            Case ServerMain.UnitransportAction.Disconnected

            Case ServerMain.UnitransportAction.Disconnecting

            Case ServerMain.UnitransportAction.ReceivEDATA

            Case ServerMain.UnitransportAction.SendData

            Case ServerMain.UnitransportAction.SettingUp

            Case ServerMain.UnitransportAction.Wait

            Case ServerMain.UnitransportAction.LowLevelStop
                SaveLog(TVD.DeviceID, Guid.Empty, TVD.ComPort, TVD.ComPort + "->" + MSG)

        End Select
        RaiseEvent TransportStatus(Action, MSG)
    End Sub

#Region "Modem_work"

    Private Function TryGetPort(ByVal s As String) As Boolean
        Dim Port As System.IO.Ports.SerialPort
        Port = New System.IO.Ports.SerialPort
        Port.PortName = s
        Try
            Port.Open()
        Catch ex As Exception
            Return False
        End Try
        If Port.IsOpen Then
            Try
                Port.Close()
            Catch ex As Exception
                Return False
            End Try
            Return True
        Else
            Try
                Port.Close()
            Catch ex As Exception

            End Try
            Return False
        End If



    End Function

    Public Function GetNextModem(ByVal TYPECALL As String) As String

        Dim query As String
        Dim sPort As String
        Dim MyName As String
        MyName = Environment.MachineName

        If TYPECALL.ToUpper = "G" Then
            query = "select MONSRV_PORTSID,IPADDR,NAME,MONSRV_PORTS.PORTNAME,CALLTYPE ,MONSRV_PORTS.useduntil 
            from MONSRV_INFO 
            join MONSRV_MODEMS on MONSRV_MODEMS.MONSRV_INFOID=MONSRV_INFO.MONSRV_INFOid
            join MONSRV_PORTS on MONSRV_INFO.MONSRV_INFOID=MONSRV_PORTS.MONSRV_INFOID  
            where CALLTYPE='G' and  ( MONSRV_PORTS.UsedUntil is null or MONSRV_PORTS.UsedUntil < getdate()) and NAME='" & MyName & "'" + "  order by PORTNAME"
        Else
            query = "select MONSRV_PORTSID,IPADDR,NAME,MONSRV_PORTS.PORTNAME,CALLTYPE ,MONSRV_PORTS.useduntil 
            from MONSRV_INFO 
            join MONSRV_MODEMS on MONSRV_MODEMS.MONSRV_INFOID=MONSRV_INFO.MONSRV_INFOid
            join MONSRV_PORTS on MONSRV_INFO.MONSRV_INFOID=MONSRV_PORTS.MONSRV_INFOID  
            where CALLTYPE<>'G' and  ( MONSRV_PORTS.UsedUntil is null or MONSRV_PORTS.UsedUntil < getdate()) and NAME='" & MyName & "'" + "  order by PORTNAME"
        End If


        Dim dt As DataTable
        dt = context.DoQuery(query)
        If dt.Rows.Count > 0 Then
            Dim i As Integer
            For i = 0 To dt.Rows.Count - 1
                sPort = dt.Rows(i)("PORTNAME")
                MyPort = dt.Rows(i)("MONSRV_PORTSID")
                PhoneLineType = dt.Rows(i)("CALLTYPE")
                If TryGetPort(sPort) Then
                    HoldLine(20)
                    Return sPort
                End If
            Next
            MyPort = Guid.Empty

            Return ""
        Else
            MyPort = Guid.Empty

            Return ""
        End If

    End Function


    Private Function GetModemByName(ByVal Name As String) As String

        Dim query As String
        Dim sPort As String
        Dim MyName As String
        MyName = Environment.MachineName

        query = "select MONSRV_PORTSID,IPADDR,NAME,MONSRV_PORTS.PORTNAME,CALLTYPE ,MONSRV_PORTS.useduntil 
        from MONSRV_INFO 
        join MONSRV_MODEMS on MONSRV_MODEMS.MONSRV_INFOID=MONSRV_INFO.MONSRV_INFOid
        join MONSRV_PORTS on MONSRV_INFO.MONSRV_INFOID=MONSRV_PORTS.MONSRV_INFOID  
        where CALLTYPE='G' and  ( MONSRV_PORTS.UsedUntil is null or MONSRV_PORTS.UsedUntil < getdate()) and NAME='" & MyName & "'" + "  and PORTNAME='" + Name + "'  order by PORTNAME"
        Dim dt As DataTable
        dt = context.DoQuery(query)
        If dt.Rows.Count > 0 Then
            Dim i As Integer
            For i = 0 To dt.Rows.Count - 1
                sPort = dt.Rows(i)("PORTNAME")
                MyPort = dt.Rows(i)("MONSRV_PORTSID")
                PhoneLineType = dt.Rows(i)("CALLTYPE")
                If TryGetPort(sPort) Then
                    HoldLine(20)
                    Return sPort
                End If
            Next
            MyPort = Guid.Empty
            Return ""
        Else
            MyPort = Guid.Empty
            Return ""
        End If

    End Function


    Public Function GetStationModemCount() As Integer

        Dim query As String
        Dim MyName As String
        MyName = Environment.MachineName

        query = "select count(*) cnt from MONSRV_INFO 
        join MONSRV_MODEMS on MONSRV_MODEMS.MONSRV_INFOID=MONSRV_INFO.MONSRV_INFOid
        join MONSRV_PORTS on MONSRV_INFO.MONSRV_INFOID=MONSRV_PORTS.MONSRV_INFOID  
        where  NAME='" & MyName & "'"
        Dim dt As DataTable
        dt = context.DoQuery(query)
        If dt.Rows.Count > 0 Then
            Return dt.Rows(0)("cnt")
        Else
            Return 0
        End If

    End Function


    Public Function GetFreeModems() As DataTable

        Dim query As String
        Dim MyName As String
        MyName = Environment.MachineName

        query = "select MONSRV_PORTSID,IPADDR,NAME,MONSRV_PORTS.PORTNAME,CALLTYPE ,MONSRV_PORTS.useduntil 
        from MONSRV_INFO 
        join MONSRV_MODEMS on MONSRV_MODEMS.MONSRV_INFOID=MONSRV_INFO.MONSRV_INFOid
        join MONSRV_PORTS on MONSRV_INFO.MONSRV_INFOID=MONSRV_PORTS.MONSRV_INFOID  
        where CALLTYPE<>'G' and  ( MONSRV_PORTS.UsedUntil is null or MONSRV_PORTS.UsedUntil < getdate()) and NAME='" & MyName & "'"
        Dim dt As DataTable
        dt = context.DoQuery(query)
        If dt.Rows.Count > 0 Then
            Return dt
        Else
            Return Nothing
        End If

    End Function

    Public Function GetModemINIT() As String
        Dim MyName As String
        MyName = Environment.MachineName
        Dim query As String
        Dim dt As DataTable
        Try
            query = "select INITSTRING from MONSRV_PORTS join MONSRV_MODEMS on MONSRV_MODEMS.Portnum =MONSRV_PORTS.PortName and MONSRV_MODEMS.MONSRV_INFOID =MONSRV_PORTS.MONSRV_INFOID
 where MONSRV_PORTSid='" & MyPort.ToString & "'" ' and terminal='" & MyName & "'"
            dt = context.DoQuery(query)
            If dt.Rows.Count > 0 Then
                Return dt.Rows(0)("INITSTRING")
            End If
        Catch ex As Exception
            Return ""
        End Try

        Return ""
    End Function

    Public Sub FreeModem()
        Dim query As String
        If Not MyPort.Equals(Guid.Empty) Then
            query = "update MONSRV_PORTS set useduntil=dateadd(minute,-20,getdate()) where MONSRV_PORTSid='" & MyPort.ToString & "'"
            context.DoExec(query)

        End If
        MyPort = Guid.Empty


    End Sub

    Public Sub HoldLine(Optional ByVal Minutes As Integer = 3)
        Dim query As String
        If Not MyPort.Equals(Guid.Empty) Then
            query = "update MONSRV_PORTS set useduntil=dateadd(minute," + Minutes.ToString + ",getdate()) where MONSRV_PORTSid='" & MyPort.ToString & "'"
            context.DoExec(query)
        End If
    End Sub
#End Region

    Private LastLog As DateTime
    Public Sub ClearDuration()
        LastLog = DateTime.Now
    End Sub

    Private Function S180(ByVal s As String) As String

        Dim outs As String
        outs = s
        If outs.Length <= 180 Then
            Return outs
        End If
        outs = outs.Substring(0, 180)
        Return outs
    End Function

    Public Sub SaveLog(ByVal id_bd As Guid, ByVal atype As Guid, ByVal cport As String, ByVal cresult As String)
        Dim query As String
        Dim duration As Integer = 0
        Try
            duration = DateDiff(DateInterval.Second, LastLog, DateTime.Now)
        Catch ex As Exception

        End Try


        LastLog = DateTime.Now
        query = "insert into logcall(logcallid, ID_BD,  ATYPE ,  CPORT ,   DCALL,  DURATION,   CRESULT) values(newid()," &
        id_bd.ToString() & ",'" & atype.ToString() & "','" & cport & "'," & MSSQLDate(DateTime.Now) & "," & duration.ToString() & ",'" & S180(cresult) & "')"
        context.DoExec(query)

    End Sub


    Protected Overrides Sub Finalize()
        MyBase.Finalize()
        Try


            'If Not context.GetConnection() Is Nothing Then
            '    context.GetConnection().Close()
            '    context.GetConnection().Dispose()

            'End If

        Catch ex As Exception
            Log(ex.Message)
        End Try


    End Sub


    Public Sub New()
        Inited = Init()
    End Sub


End Class
