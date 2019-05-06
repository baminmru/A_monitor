import { enums } from './enums';

export namespace MONDEV { 
	/* MONDEV -  Устройство */ 

 export interface   MONDEV_BDEVICES { // Описание
	MONDEV_BDEVICESId:string; // Primary key field
	TheNode:string; //Узел -> MONN_DEF
	Name:string; // Название
	ThePhone:string; // Телефон
	Addr:string; // Адрес
	DEVType:string; //Устройство -> MOND_DEVTYPE
	Shab:string; //Снабжающая орг. -> MOND_SNAB
	DevGrp:string; //Группа -> MOND_GRP
	THESCHEMA:string; //Схема подключения -> MONSCH_INFO
	NPLOCK:string;  // Заблокированно до
	 CONNECTED:enums.enum_Boolean; // Подключен
	 CONNECTED_name :string; // enum to text for Подключен
	// add dereference fields 
	TheNode_name :string; // dereference for MONN_DEF
	DEVType_name :string; // dereference for MOND_DEVTYPE
	Shab_name :string; // dereference for MOND_SNAB
	DevGrp_name :string; // dereference for MOND_GRP
	THESCHEMA_name :string; // dereference for MONSCH_INFO
 }

 export interface   MONDEV_CONNECT { // Параметры соединения
	MONDEV_CONNECTId:string; // Primary key field
	  MONDEV_BDEVICESId:string; // Описание
	 ConnectionEnabled:enums.enum_Boolean; // Подключение разрешено
	 ConnectionEnabled_name :string; // enum to text for Подключение разрешено
	ConnectType:string; //Тип подключения -> MOND_CONNECTTYPE
	CONNECTLIMIT:Number; // Время на соединение
	TheServer:string; //Сервер опроса -> MONSRV_INFO
	netaddr:Number; // Сетевой адрес
	CSPEED:string; // Скорость бод
	CDATABIT:string; // Биты данных
	 CPARITY:enums.enum_ParityType; // Четность
	 CPARITY_name :string; // enum to text for Четность
	CSTOPBITS:Number; // Стоповые биты
	FlowControl:string; // FlowControl
	ComPortNum:string; // Com Port
	IPAddr:string; // IP адрес
	PortNum:Number; // TCP Порт
	UserName:string; // Пользователь
	Password:string; // Пароль
	CTOWNCODE:string; // Код города
	CPHONE:string; // Телефон
	ATCommand:string; // AT команда
	callerID:string; // Идентификатор промеж. устройства
	// add dereference fields 
	ConnectType_name :string; // dereference for MOND_CONNECTTYPE
	TheServer_name :string; // dereference for MONSRV_INFO
 }

 export interface   MONDEV_CONTRACT { // Договорные установки
	MONDEV_CONTRACTId:string; // Primary key field
	  MONDEV_BDEVICESId:string; // Описание
	FLD12:string; // № прибора
	FLD13:string; // №ключа
	FLD14:string; // D20ОБ
	FLD15:string; // D20ПР
	FLD16:string; // DyГВС
	FLD17:string; // DyОБР
	FLD18:string; // DyПР
	FLD19:string; // dРпрОБ
	FLD20:string; // dРпрПР
	FLD21:string; // G(гвс)ПР
	FLD22:string; // Gгвс
	FLD23:string; // Gоб(гвс min)
	FLD24:string; // Gов
	FLD25:string; // Gпр(гвс min)
	FLD26:string; // Gпр_minОБ
	FLD27:string; // Gпр_minПР
	FLD28:string; // GпрОБ
	FLD29:string; // GпрПР
	FLD30:string; // Gут
	FLD31:string; // д20ОБ
	FLD32:string; // д20ПР
	FLD33:string; // Договор
	FLD34:string; // Договор G2
	FLD35:string; // Договор G1
	FLD36:string; // Источник
	FLD37:string; // Магистраль
	FLD40:string; // Расходомер
	FLD41:string; // Расходомер ГВС
	FLD42:string; // Робр
	FLD43:string; // Рпр
	FLD45:string; // Способ отбора
	FLD46:string; // Т_график
	FLD47:string; // Теп_камера
	FLD48:string; // Тип расходомера
	FLD49:string; // тип термометра
	FLD50:string; // Формула
	FLD51:string; // Наименование счетчика
	FLD52:string; // Схема
	FLD53:string; // Qот
	FLD54:string; // Qв
	FLD55:string; // Qгвс
	FLD56:string; // Qну
	FLD57:string; // Gот
	FLD58:string; // Gв
	FLD59:string; // Gну
	FLD60:string; // Часов_архив
	FLD61:string; // Сут_архив
	FLD62:string; // Термопреобр ГВС
	FLD63:string; // Т1
	FLD64:string; // Т2
	FLD65:string; // Т3
	FLD66:string; // Т4
	FLD67:string; // Gтех
	FLD68:string; // Gтех_гвс
	FLD69:string; // Gгвс_м
	FLD70:string; // Qтех
	FLD71:string; // Qвент
	FLD72:string; // Тхв
	FLD73:string; // Расходомер ГВСц
	FLD81:string; // Формула2
	FLD82:string; // Термопреобр
	FLD83:string; // Gвент
	FLD84:string; // Код УУТЭ
	FLD85:string; // Сист_теплопотребления
	FLD86:string; // Qтех_гвс
	FLD87:string; // Qтех_гвс ср
	FLD88:string; // Qгвс ср
	FLD89:string; // Дата поверки
	FLD90:string; // Фамилия
	FLD92:string; // Узел учета
	FLD93:string; // Стр.адрес
	FLD94:string; // G(гвс)ОБР
	FLD95:string; // DyГВСц
	FLD96:string; // Цена_имп_M1
	FLD97:string; // Цена_имп_M2
	FLD98:string; // Цена_имп_M1гв
	FLD99:string; // Цена_имп_M2гв
	FLD100:string; // Доп_погр_изм_M1%
	FLD101:string; // Доп_погр_изм_M2%
	FLD102:string; // Доп_погр_изм_M1гв%
	FLD103:string; // Доп_погр_изм_M2гв%
	FLD104:string; // Расходомер M2
 }

 export interface   MONDEV_PLANCALL { // План опроса устройств
	MONDEV_PLANCALLId:string; // Primary key field
	  MONDEV_BDEVICESId:string; // Описание
	 CSTATUS:enums.enum_Boolean; // Исключить из опроса
	 CSTATUS_name :string; // enum to text for Исключить из опроса
	NMAXCALL:Number; // Max число попыток дозвона
	MINREPEAT:Number; // Повторить через (минут)
	DLOCK:string;  // Когда заблокирован
	DLASTCALL:string;  // Последний опрос
	 CCURR:enums.enum_Boolean; // Опрашивать текущие
	 CCURR_name :string; // enum to text for Опрашивать текущие
	ICALLCURR:Number; // Интервал (минут) 
	DNEXTCURR:string;  // Следующий опрос
	 CHOUR:enums.enum_Boolean; // Опрашивать ч.
	 CHOUR_name :string; // enum to text for Опрашивать ч.
	ICALL:Number; // Интервал опроса (минут)
	NUMHOUR:Number; // За сколько часов
	DNEXTHOUR:string;  // Следующий опрос
	DLASTHOUR:string;  // Последний опрос
	 C24:enums.enum_Boolean; // Опрашивать С.
	 C24_name :string; // enum to text for Опрашивать С.
	ICALL24:Number; // Интервал (часов)
	NUM24:Number; // За сколько суток
	DNEXT24:string;  // Следующий опрос
	DLASTDAY:string;  // Последний опрос
	 CSUM:enums.enum_Boolean; // Опрашивать Ит.
	 CSUM_name :string; // enum to text for Опрашивать Ит.
	ICALLSUM:Number; // Интервал  (минут) 
	DNEXTSUM:string;  // Следующий опрос
	 CEL:enums.enum_Boolean; // Опрашивать Эл.
	 CEL_name :string; // enum to text for Опрашивать Эл.
	IEL:Number; // Интервал (мин.)
	DNEXTEL:string; // Дата следующего опроса
 }

 export interface   MONDEV_VALUEBOUNDS { // Граничные значения
	MONDEV_VALUEBOUNDSId:string; // Primary key field
	  MONDEV_BDEVICESId:string; // Описание
	PNAME:string; //Параметр -> MOND_PARAM
	PTYPE:string; //Тип архива -> MOND_ATYPE
	PMIN:Number; // Минимальное значение
	PMAX:Number; // Максимальное значение
	 ISMIN:enums.enum_Boolean; // Проверять на минимум
	 ISMIN_name :string; // enum to text for Проверять на минимум
	 ISMAX:enums.enum_Boolean; // Проверять на максимум
	 ISMAX_name :string; // enum to text for Проверять на максимум
	// add dereference fields 
	PNAME_name :string; // dereference for MOND_PARAM
	PTYPE_name :string; // dereference for MOND_ATYPE
 }

 export interface   MONDEV_REPORTS { // Отчеты
	MONDEV_REPORTSId:string; // Primary key field
	  MONDEV_BDEVICESId:string; // Описание
	repType:string; //Данные -> MOND_ATYPE
	Name:string; // Название
	theFile:string; // Файл
	// add dereference fields 
	repType_name :string; // dereference for MOND_ATYPE
 }

 export interface   MONDEV_MASK { // Параметры для вывода
	MONDEV_MASKId:string; // Primary key field
	  MONDEV_BDEVICESId:string; // Описание
	PTYPE:string; //Тип архива -> MOND_ATYPE
	sequence:Number; // Порядок вывода
	PNAME:string; //Параметр -> MOND_PARAM
	paramFormat:string; // Формат
	colWidth:Number; // Ширина
	 phide:enums.enum_Boolean; // Скрыть
	 phide_name :string; // enum to text for Скрыть
	// add dereference fields 
	PTYPE_name :string; // dereference for MOND_ATYPE
	PNAME_name :string; // dereference for MOND_PARAM
 }
}