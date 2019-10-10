import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule } from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { AmexioWidgetModule, CommonDataService, AmexioChartsModule,  AmexioDashBoardModule } from 'amexio-ng-extensions';
import { AmexioChartD3Module } from 'amexio-chart-d3';
//import { TelechartComponent} from 'app/telechart/telechart.component';

import {CookieService} from 'ngx-cookie-service'; 
import { NgxWigModule} from 'ngx-wig';
import { CommonModule } from "@angular/common";
import {AppService} from 'app/app.service'; 

import { RemoveHTMLtagPipe} from 'app/pipes';
 
import { AppGuard} from 'app/app.guard'; 
import { AppComponent } from './app.component'; 
import { ROUTING } from './app.routing'; 
import { AboutComponent } from './about/about.component'; 
import { TopnavComponent } from './topnav/topnav.component'; 

import { DISPATCHERComponent } from './DISPATCHER/DISPATCHER.component'; 
import { DISPATCHER_DATAComponent } from './DISPATCHER_DATA/DISPATCHER_DATA.component'; 
import { DISPATCHER_CHARTComponent } from './DISPATCHER_CHART/DISPATCHER_CHART.component'; 
import { DISPATCHER_CHARTMComponent } from './DISPATCHER_CHARTM/DISPATCHER_CHARTM.component'; 
import { DISPATCHER_CHARTDComponent } from './DISPATCHER_CHARTD/DISPATCHER_CHARTD.component'; 
import { DISPATCHER_CHARTWComponent } from './DISPATCHER_CHARTW/DISPATCHER_CHARTW.component'; 
import { DISPATCHER_MSGComponent } from './DISPATCHER_MSG/DISPATCHER_MSG.component'; 
import { DISPATCHER_FILTERComponent } from './DISPATCHER_FILTER/DISPATCHER_FILTER.component'; 
import { DISPATCHER_Service } from 'app/DISPATCHER.service'; 
 
 
import { DATAComponent } from './DATA/DATA.component'; // Данные
import { DATA_RECORDComponent } from './DATA_RECORD/DATA_RECORD.component'; // Запись
import { DATA_RECORD_Service } from 'app/DATA_RECORD.service'; 
import { DATA_VComponent } from './DATA_V/DATA_V.component'; // Объемы
import { DATA_V_Service } from 'app/DATA_V.service'; 
import { DATA_MComponent } from './DATA_M/DATA_M.component'; // Массы
import { DATA_M_Service } from 'app/DATA_M.service'; 
import { DATA_TComponent } from './DATA_T/DATA_T.component'; // Температуры
import { DATA_T_Service } from 'app/DATA_T.service'; 
import { DATA_PComponent } from './DATA_P/DATA_P.component'; // Давления
import { DATA_P_Service } from 'app/DATA_P.service'; 
import { DATA_QComponent } from './DATA_Q/DATA_Q.component'; // Энергия
import { DATA_Q_Service } from 'app/DATA_Q.service'; 
import { DATA_EPComponent } from './DATA_EP/DATA_EP.component'; // Мощность
import { DATA_EP_Service } from 'app/DATA_EP.service'; 
import { DATA_UComponent } from './DATA_U/DATA_U.component'; // Напряжение
import { DATA_U_Service } from 'app/DATA_U.service'; 
import { DATA_IComponent } from './DATA_I/DATA_I.component'; // Ток
import { DATA_I_Service } from 'app/DATA_I.service'; 
import { DATA_EQComponent } from './DATA_EQ/DATA_EQ.component'; // Эл. Энергия
import { DATA_EQ_Service } from 'app/DATA_EQ.service'; 
import { DATA_MSGComponent } from './DATA_MSG/DATA_MSG.component'; // Сообщения
import { DATA_MSG_Service } from 'app/DATA_MSG.service'; 
import { DATA_TIMEComponent } from './DATA_TIME/DATA_TIME.component'; // Времена
import { DATA_TIME_Service } from 'app/DATA_TIME.service'; 
 
import { MONQComponent } from './MONQ/MONQ.component'; // Запрос на обработку
import { MONQ_DEFComponent } from './MONQ_DEF/MONQ_DEF.component'; // Описание
import { MONQ_DEF_Service } from 'app/MONQ_DEF.service'; 
import { MONQ_resultComponent } from './MONQ_result/MONQ_result.component'; // Результат обработки
import { MONQ_result_Service } from 'app/MONQ_result.service'; 
 
import { monlogComponent } from './monlog/monlog.component'; // Логирование
import { logcallComponent } from './logcall/logcall.component'; // Сообщения
import { logcall_Service } from 'app/logcall.service'; 
 
import { moncliComponent } from './moncli/moncli.component'; // Организация
import { moncli_infoComponent } from './moncli_info/moncli_info.component'; // Описание
import { moncli_info_Service } from 'app/moncli_info.service'; 
import { MOND_FComponent } from './MOND_F/MOND_F.component'; // Филиал организации
import { MOND_F_Service } from 'app/MOND_F.service'; 
import { MOND_GRPComponent } from './MOND_GRP/MOND_GRP.component'; // Группа
import { MOND_GRP_Service } from 'app/MOND_GRP.service'; 
 
import { MONSRVComponent } from './MONSRV/MONSRV.component'; // Сервер
import { MONSRV_INFOComponent } from './MONSRV_INFO/MONSRV_INFO.component'; // Описание сервера
import { MONSRV_INFO_Service } from 'app/MONSRV_INFO.service'; 
import { MONSRV_MODEMSComponent } from './MONSRV_MODEMS/MONSRV_MODEMS.component'; // Модемы
import { MONSRV_MODEMS_Service } from 'app/MONSRV_MODEMS.service'; 
import { MONSRV_PORTSComponent } from './MONSRV_PORTS/MONSRV_PORTS.component'; // Ком порты
import { MONSRV_PORTS_Service } from 'app/MONSRV_PORTS.service'; 
 
import { MONUSRComponent } from './MONUSR/MONUSR.component'; // Сотрудник
import { MON_USRComponent } from './MON_USR/MON_USR.component'; // Данные сотрудника
import { MON_USR_Service } from 'app/MON_USR.service'; 
 
import { MONDComponent } from './MOND/MOND.component'; // Справочник
import { MOND_PARAMComponent } from './MOND_PARAM/MOND_PARAM.component'; // Параметры
import { MOND_PARAM_Service } from 'app/MOND_PARAM.service'; 
import { MOND_CONNECTTYPEComponent } from './MOND_CONNECTTYPE/MOND_CONNECTTYPE.component'; // Тип подключения
import { MOND_CONNECTTYPE_Service } from 'app/MOND_CONNECTTYPE.service'; 
import { MOND_DEVCLASSComponent } from './MOND_DEVCLASS/MOND_DEVCLASS.component'; // Класс устройства
import { MOND_DEVCLASS_Service } from 'app/MOND_DEVCLASS.service'; 
import { MOND_DEVTYPEComponent } from './MOND_DEVTYPE/MOND_DEVTYPE.component'; // Тип устройства
import { MOND_DEVTYPE_Service } from 'app/MOND_DEVTYPE.service'; 
import { MOND_ATYPEComponent } from './MOND_ATYPE/MOND_ATYPE.component'; // Тип архива
import { MOND_ATYPE_Service } from 'app/MOND_ATYPE.service'; 
import { MOND_SNABTOPComponent } from './MOND_SNABTOP/MOND_SNABTOP.component'; // Поставщик
import { MOND_SNABTOP_Service } from 'app/MOND_SNABTOP.service'; 
import { MOND_SNABComponent } from './MOND_SNAB/MOND_SNAB.component'; // Снабжающая организация
import { MOND_SNAB_Service } from 'app/MOND_SNAB.service'; 
import { MOND_ROLEComponent } from './MOND_ROLE/MOND_ROLE.component'; // Роли
import { MOND_ROLE_Service } from 'app/MOND_ROLE.service'; 
import { MOND_DATAComponent } from './MOND_DATA/MOND_DATA.component'; // Раздел данных
import { MOND_DATA_Service } from 'app/MOND_DATA.service'; 
 
import { MONSCHComponent } from './MONSCH/MONSCH.component'; // Схема подключения
import { MONSCH_INFOComponent } from './MONSCH_INFO/MONSCH_INFO.component'; // Схема подключения
import { MONSCH_INFO_Service } from 'app/MONSCH_INFO.service'; 
import { MONSCH_PARAMComponent } from './MONSCH_PARAM/MONSCH_PARAM.component'; // Параметры на схеме
import { MONSCH_PARAM_Service } from 'app/MONSCH_PARAM.service'; 
 
import { MONNODEComponent } from './MONNODE/MONNODE.component'; // Узел
import { MONN_DEFComponent } from './MONN_DEF/MONN_DEF.component'; // Описание
import { MONN_DEF_Service } from 'app/MONN_DEF.service'; 
import { MONN_LATLONComponent } from './MONN_LATLON/MONN_LATLON.component'; // Координаты
import { MONN_LATLON_Service } from 'app/MONN_LATLON.service'; 
 
import { MONDEVComponent } from './MONDEV/MONDEV.component'; // Устройство
import { MONDEV_BDEVICESComponent } from './MONDEV_BDEVICES/MONDEV_BDEVICES.component'; // Описание
import { MONDEV_BDEVICES_Service } from 'app/MONDEV_BDEVICES.service'; 
import { MONDEV_CONNECTComponent } from './MONDEV_CONNECT/MONDEV_CONNECT.component'; // Параметры соединения
import { MONDEV_CONNECT_Service } from 'app/MONDEV_CONNECT.service'; 
import { MONDEV_CONTRACTComponent } from './MONDEV_CONTRACT/MONDEV_CONTRACT.component'; // Договорные установки
import { MONDEV_CONTRACT_Service } from 'app/MONDEV_CONTRACT.service'; 
import { MONDEV_PLANCALLComponent } from './MONDEV_PLANCALL/MONDEV_PLANCALL.component'; // План опроса устройств
import { MONDEV_PLANCALL_Service } from 'app/MONDEV_PLANCALL.service'; 
import { MONDEV_VALUEBOUNDSComponent } from './MONDEV_VALUEBOUNDS/MONDEV_VALUEBOUNDS.component'; // Граничные значения
import { MONDEV_VALUEBOUNDS_Service } from 'app/MONDEV_VALUEBOUNDS.service'; 
import { MONDEV_REPORTSComponent } from './MONDEV_REPORTS/MONDEV_REPORTS.component'; // Отчеты
import { MONDEV_REPORTS_Service } from 'app/MONDEV_REPORTS.service'; 
import { MONDEV_MASKComponent } from './MONDEV_MASK/MONDEV_MASK.component'; // Параметры для вывода
import { MONDEV_MASK_Service } from 'app/MONDEV_MASK.service'; 

import { UserProfileComponent } from './UserProfile/UserProfile.component';
import { jwtLoginComponent } from './jwtlogin/jwtlogin.component';

@NgModule({ 
    declarations: [ 
        AppComponent, 
jwtLoginComponent,

DISPATCHERComponent,
DISPATCHER_DATAComponent,
DISPATCHER_CHARTComponent,
DISPATCHER_CHARTMComponent,
DISPATCHER_CHARTDComponent,
DISPATCHER_CHARTWComponent,
DISPATCHER_MSGComponent,
DISPATCHER_FILTERComponent,

 RemoveHTMLtagPipe,
 DATAComponent ,  // Данные
  DATA_RECORDComponent, // Запись
  DATA_VComponent, // Объемы
  DATA_MComponent, // Массы
  DATA_TComponent, // Температуры
  DATA_PComponent, // Давления
  DATA_QComponent, // Энергия
  DATA_EPComponent, // Мощность
  DATA_UComponent, // Напряжение
  DATA_IComponent, // Ток
  DATA_EQComponent, // Эл. Энергия
  DATA_MSGComponent, // Сообщения
  DATA_TIMEComponent, // Времена
 
 MONQComponent ,  // Запрос на обработку
  MONQ_DEFComponent, // Описание
  MONQ_resultComponent, // Результат обработки
 
 monlogComponent ,  // Логирование
  logcallComponent, // Сообщения
 
 moncliComponent ,  // Организация
  moncli_infoComponent, // Описание
MOND_FComponent, // Филиал организации
  MOND_GRPComponent, // Группа
 
 MONSRVComponent ,  // Сервер
  MONSRV_INFOComponent, // Описание сервера
  MONSRV_MODEMSComponent, // Модемы
  MONSRV_PORTSComponent, // Ком порты
 
 MONUSRComponent ,  // Сотрудник
  MON_USRComponent, // Данные сотрудника
 
 MONDComponent ,  // Справочник
  MOND_PARAMComponent, // Параметры
  MOND_CONNECTTYPEComponent, // Тип подключения
  MOND_DEVCLASSComponent, // Класс устройства
  MOND_DEVTYPEComponent, // Тип устройства
  MOND_ATYPEComponent, // Тип архива
  MOND_SNABTOPComponent, // Поставщик
  MOND_SNABComponent, // Снабжающая организация
  MOND_ROLEComponent, // Роли
  MOND_DATAComponent, // Раздел данных
 
 MONSCHComponent ,  // Схема подключения
  MONSCH_INFOComponent, // Схема подключения
  MONSCH_PARAMComponent, // Параметры на схеме
 
 MONNODEComponent ,  // Узел
  MONN_DEFComponent, // Описание
  MONN_LATLONComponent, // Координаты
 
 MONDEVComponent ,  // Устройство
  MONDEV_BDEVICESComponent, // Описание
  MONDEV_CONNECTComponent, // Параметры соединения
  MONDEV_CONTRACTComponent, // Договорные установки
  MONDEV_PLANCALLComponent, // План опроса устройств
  MONDEV_VALUEBOUNDSComponent, // Граничные значения
  MONDEV_REPORTSComponent, // Отчеты
  MONDEV_MASKComponent, // Параметры для вывода
		 
		UserProfileComponent,
		//TelechartComponent,		
        AboutComponent, 
        TopnavComponent 
		 
    ], 
    imports: [ 
        BrowserAnimationsModule, 
        BrowserModule, 
        FormsModule, 
        HttpClientModule, 
		
		// AMEXIO 
        AmexioWidgetModule, 
		AmexioChartsModule,  
		AmexioDashBoardModule, 
		AmexioChartD3Module,
		
 NgxWigModule,
	CommonModule,
        ROUTING 
    ], 
    providers: [HttpClient 
  ,DISPATCHER_Service
  ,DATA_RECORD_Service
  ,DATA_V_Service
  ,DATA_M_Service
  ,DATA_T_Service
  ,DATA_P_Service
  ,DATA_Q_Service
  ,DATA_EP_Service
  ,DATA_U_Service
  ,DATA_I_Service
  ,DATA_EQ_Service
  ,DATA_MSG_Service
  ,DATA_TIME_Service
  ,MONQ_DEF_Service
  ,MONQ_result_Service
  ,logcall_Service
  ,moncli_info_Service
  ,MOND_F_Service
  ,MOND_GRP_Service
  ,MONSRV_INFO_Service
  ,MONSRV_MODEMS_Service
  ,MONSRV_PORTS_Service
  ,MON_USR_Service
  ,MOND_PARAM_Service
  ,MOND_CONNECTTYPE_Service
  ,MOND_DEVCLASS_Service
  ,MOND_DEVTYPE_Service
  ,MOND_ATYPE_Service
  ,MOND_SNABTOP_Service
  ,MOND_SNAB_Service
  ,MOND_ROLE_Service
  ,MOND_DATA_Service
  ,MONSCH_INFO_Service
  ,MONSCH_PARAM_Service
  ,MONN_DEF_Service
  ,MONN_LATLON_Service
  ,MONDEV_BDEVICES_Service
  ,MONDEV_CONNECT_Service
  ,MONDEV_CONTRACT_Service
  ,MONDEV_PLANCALL_Service
  ,MONDEV_VALUEBOUNDS_Service
  ,MONDEV_REPORTS_Service
  ,MONDEV_MASK_Service
	,AppService 
	  ,AppGuard
	,CookieService 
	], 
    bootstrap: [AppComponent] 
}) 
export class AppModule { 
} 
