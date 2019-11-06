using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace a_srv.models { 
	/* MONDEV -  Устройство */ 

 public class  MONDEV_BDEVICES { // Описание
	 public System.Guid  MONDEV_BDEVICESId{ get; set; } // Primary key field
	 public List<MONDEV_CONNECT>  mondev_connect { get; set; } // Параметры соединения
	 public List<MONDEV_CONTRACT>  mondev_contract { get; set; } // Договорные установки
	 public List<MONDEV_PLANCALL>  mondev_plancall { get; set; } // План опроса устройств
	 public List<MONDEV_VALUEBOUNDS>  mondev_valuebounds { get; set; } // Граничные значения
	 public List<MONDEV_REPORTS>  mondev_reports { get; set; } // Отчеты
	 public List<MONDEV_MASK>  mondev_mask { get; set; } // Параметры для вывода
	public System.Guid  TheNode { get; set; } //Узел
	[Required]
	public string  Name{ get; set; } // Название
	public string  ThePhone{ get; set; } // Телефон
	public string  Addr{ get; set; } // Адрес
	public System.Guid  DEVType { get; set; } //Устройство
	public System.Guid  Shab { get; set; } //Снабжающая орг.
	public System.Guid  DevGrp { get; set; } //Группа
	public System.Guid  THESCHEMA { get; set; } //Схема подключения
	public DateTime?  NPLOCK{ get; set; } // Заблокированно до
	public enum_Boolean  CONNECTED{ get; set; } // Подключен
 }

 public class  MONDEV_CONNECT { // Параметры соединения
	 public System.Guid  MONDEV_CONNECTId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  MONDEV_BDEVICESId { get; set; } // Id for Описание
	public enum_Boolean  ConnectionEnabled{ get; set; } // Подключение разрешено
	public System.Guid  ConnectType { get; set; } //Тип подключения
	public double?  CONNECTLIMIT{ get; set; } // Время на соединение
	public System.Guid  TheServer { get; set; } //Сервер опроса
	public int?  netaddr{ get; set; } // Сетевой адрес
	public string  CSPEED{ get; set; } // Скорость бод
	public string  CDATABIT{ get; set; } // Биты данных
	public enum_ParityType  CPARITY{ get; set; } // Четность
	public int?  CSTOPBITS{ get; set; } // Стоповые биты
	public string  FlowControl{ get; set; } // FlowControl
	public string  ComPortNum{ get; set; } // Com Port
	public string  IPAddr{ get; set; } // IP адрес
	public int?  PortNum{ get; set; } // TCP Порт
	public string  UserName{ get; set; } // Пользователь
	public string  Password{ get; set; } // Пароль
	public string  CTOWNCODE{ get; set; } // Код города
	public string  CPHONE{ get; set; } // Телефон
	public string  ATCommand{ get; set; } // AT команда
	public string  callerID{ get; set; } // Идентификатор промеж. устройства
 }

 public class  MONDEV_CONTRACT { // Договорные установки
	 public System.Guid  MONDEV_CONTRACTId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  MONDEV_BDEVICESId { get; set; } // Id for Описание
	public string  FLD12{ get; set; } // № прибора
	public string  FLD13{ get; set; } // №ключа
	public string  FLD14{ get; set; } // D20ОБ
	public string  FLD15{ get; set; } // D20ПР
	public string  FLD16{ get; set; } // DyГВС
	public string  FLD17{ get; set; } // DyОБР
	public string  FLD18{ get; set; } // DyПР
	public string  FLD19{ get; set; } // dРпрОБ
	public string  FLD20{ get; set; } // dРпрПР
	public string  FLD21{ get; set; } // G(гвс)ПР
	public string  FLD22{ get; set; } // Gгвс
	public string  FLD23{ get; set; } // Gоб(гвс min)
	public string  FLD24{ get; set; } // Gов
	public string  FLD25{ get; set; } // Gпр(гвс min)
	public string  FLD26{ get; set; } // Gпр_minОБ
	public string  FLD27{ get; set; } // Gпр_minПР
	public string  FLD28{ get; set; } // GпрОБ
	public string  FLD29{ get; set; } // GпрПР
	public string  FLD30{ get; set; } // Gут
	public string  FLD31{ get; set; } // д20ОБ
	public string  FLD32{ get; set; } // д20ПР
	public string  FLD33{ get; set; } // Договор
	public string  FLD34{ get; set; } // Договор G2
	public string  FLD35{ get; set; } // Договор G1
	public string  FLD36{ get; set; } // Источник
	public string  FLD37{ get; set; } // Магистраль
	public string  FLD40{ get; set; } // Расходомер
	public string  FLD41{ get; set; } // Расходомер ГВС
	public string  FLD42{ get; set; } // Робр
	public string  FLD43{ get; set; } // Рпр
	public string  FLD45{ get; set; } // Способ отбора
	public string  FLD46{ get; set; } // Т_график
	public string  FLD47{ get; set; } // Теп_камера
	public string  FLD48{ get; set; } // Тип расходомера
	public string  FLD49{ get; set; } // тип термометра
	public string  FLD50{ get; set; } // Формула
	public string  FLD51{ get; set; } // Наименование счетчика
	public string  FLD52{ get; set; } // Схема
	public string  FLD53{ get; set; } // Qот
	public string  FLD54{ get; set; } // Qв
	public string  FLD55{ get; set; } // Qгвс
	public string  FLD56{ get; set; } // Qну
	public string  FLD57{ get; set; } // Gот
	public string  FLD58{ get; set; } // Gв
	public string  FLD59{ get; set; } // Gну
	public string  FLD60{ get; set; } // Часов_архив
	public string  FLD61{ get; set; } // Сут_архив
	public string  FLD62{ get; set; } // Термопреобр ГВС
	public string  FLD63{ get; set; } // Т1
	public string  FLD64{ get; set; } // Т2
	public string  FLD65{ get; set; } // Т3
	public string  FLD66{ get; set; } // Т4
	public string  FLD67{ get; set; } // Gтех
	public string  FLD68{ get; set; } // Gтех_гвс
	public string  FLD69{ get; set; } // Gгвс_м
	public string  FLD70{ get; set; } // Qтех
	public string  FLD71{ get; set; } // Qвент
	public string  FLD72{ get; set; } // Тхв
	public string  FLD73{ get; set; } // Расходомер ГВСц
	public string  FLD81{ get; set; } // Формула2
	public string  FLD82{ get; set; } // Термопреобр
	public string  FLD83{ get; set; } // Gвент
	public string  FLD84{ get; set; } // Код УУТЭ
	public string  FLD85{ get; set; } // Сист_теплопотребления
	public string  FLD86{ get; set; } // Qтех_гвс
	public string  FLD87{ get; set; } // Qтех_гвс ср
	public string  FLD88{ get; set; } // Qгвс ср
	public string  FLD89{ get; set; } // Дата поверки
	public string  FLD90{ get; set; } // Фамилия
	public string  FLD92{ get; set; } // Узел учета
	public string  FLD93{ get; set; } // Стр.адрес
	public string  FLD94{ get; set; } // G(гвс)ОБР
	public string  FLD95{ get; set; } // DyГВСц
	public string  FLD96{ get; set; } // Цена_имп_M1
	public string  FLD97{ get; set; } // Цена_имп_M2
	public string  FLD98{ get; set; } // Цена_имп_M1гв
	public string  FLD99{ get; set; } // Цена_имп_M2гв
	public string  FLD100{ get; set; } // Доп_погр_изм_M1%
	public string  FLD101{ get; set; } // Доп_погр_изм_M2%
	public string  FLD102{ get; set; } // Доп_погр_изм_M1гв%
	public string  FLD103{ get; set; } // Доп_погр_изм_M2гв%
	public string  FLD104{ get; set; } // Расходомер M2
 }

 public class  MONDEV_PLANCALL { // План опроса устройств
	 public System.Guid  MONDEV_PLANCALLId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  MONDEV_BDEVICESId { get; set; } // Id for Описание
	public enum_Boolean  CSTATUS{ get; set; } // Исключить из опроса
	public double?  NMAXCALL{ get; set; } // Max число попыток дозвона
	public double?  MINREPEAT{ get; set; } // Повторить через (минут)
	public DateTime?  DLOCK{ get; set; } // Когда заблокирован
	public DateTime?  DLASTCALL{ get; set; } // Последний опрос
	public enum_Boolean  CCURR{ get; set; } // Опрашивать текущие
	public double?  ICALLCURR{ get; set; } // Интервал (минут) 
	public DateTime?  DNEXTCURR{ get; set; } // Следующий опрос
	public enum_Boolean  CHOUR{ get; set; } // Опрашивать ч.
	public double?  ICALL{ get; set; } // Интервал опроса (минут)
	public double?  NUMHOUR{ get; set; } // За сколько часов
	public DateTime?  DNEXTHOUR{ get; set; } // Следующий опрос
	public DateTime?  DLASTHOUR{ get; set; } // Последний опрос
	public enum_Boolean  C24{ get; set; } // Опрашивать С.
	public double?  ICALL24{ get; set; } // Интервал (часов)
	public double?  NUM24{ get; set; } // За сколько суток
	public DateTime?  DNEXT24{ get; set; } // Следующий опрос
	public DateTime?  DLASTDAY{ get; set; } // Последний опрос
	public enum_Boolean  CSUM{ get; set; } // Опрашивать Ит.
	public double?  ICALLSUM{ get; set; } // Интервал  (минут) 
	public DateTime?  DNEXTSUM{ get; set; } // Следующий опрос
	public enum_Boolean  CEL{ get; set; } // Опрашивать Эл.
	public double?  IEL{ get; set; } // Интервал (мин.)
	public DateTime?  DNEXTEL{ get; set; } // Дата следующего опроса
 }

 public class  MONDEV_VALUEBOUNDS { // Граничные значения
	 public System.Guid  MONDEV_VALUEBOUNDSId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  MONDEV_BDEVICESId { get; set; } // Id for Описание
	public System.Guid  PNAME { get; set; } //Параметр
	public System.Guid  PTYPE { get; set; } //Тип архива
	public double?  PMIN{ get; set; } // Минимальное значение
	public double?  PMAX{ get; set; } // Максимальное значение
	public enum_Boolean  ISMIN{ get; set; } // Проверять на минимум
	public enum_Boolean  ISMAX{ get; set; } // Проверять на максимум
 }

 public class  MONDEV_REPORTS { // Отчеты
	 public System.Guid  MONDEV_REPORTSId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  MONDEV_BDEVICESId { get; set; } // Id for Описание
	public System.Guid  repType { get; set; } //Данные
	[Required]
	public string  Name{ get; set; } // Название
	[Required]
	public string theFile{ get; set; } // Файл
 }

 public class  MONDEV_MASK { // Параметры для вывода
	 public System.Guid  MONDEV_MASKId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  MONDEV_BDEVICESId { get; set; } // Id for Описание
	public System.Guid  PTYPE { get; set; } //Тип архива
	[Required]
	public double  sequence{ get; set; } // Порядок вывода
	public System.Guid  PNAME { get; set; } //Параметр
	public string  paramFormat{ get; set; } // Формат
	public double?  colWidth{ get; set; } // Ширина
	public enum_Boolean  phide{ get; set; } // Скрыть
 }
}