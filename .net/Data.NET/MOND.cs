using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace a_srv.models { 
	/* MOND -  Справочник */ 

 public class  MOND_PARAM { // Параметры
	 public System.Guid  MOND_PARAMId{ get; set; } // Primary key field
	[Required]
	public string  Name{ get; set; } // Название 
	[Required]
	public string  ParamField{ get; set; } // Поле
	public enum_ColumnSortType  ShowAs{ get; set; } // Отображать как
 }

 public class  MOND_CONNECTTYPE { // Тип подключения
	 public System.Guid  MOND_CONNECTTYPEId{ get; set; } // Primary key field
	[Required]
	public string  Name{ get; set; } // Название 
 }

 public class  MOND_DEVCLASS { // Класс устройства
	 public System.Guid  MOND_DEVCLASSId{ get; set; } // Primary key field
	[Required]
	public string  Name{ get; set; } // Название 
 }

 public class  MOND_DEVTYPE { // Тип устройства
	 public System.Guid  MOND_DEVTYPEId{ get; set; } // Primary key field
	public System.Guid  DevClass { get; set; } //Класс устройства
	[Required]
	public string  Name{ get; set; } // Название 
	public string  DriverLibName{ get; set; } // Библиотека драйвера
 }

 public class  MOND_ATYPE { // Тип архива
	 public System.Guid  MOND_ATYPEId{ get; set; } // Primary key field
	public string  name{ get; set; } // Название
	[Required]
	public string  TheCode{ get; set; } // Код 
 }

 public class  MOND_SNABTOP { // Поставщик
	 public System.Guid  MOND_SNABTOPId{ get; set; } // Primary key field
	public string  CNAME{ get; set; } // Название
	public string  CADDRESS{ get; set; } // Адрес
	public string  CFIO{ get; set; } // Контактное лицо
	public string  CPHONE{ get; set; } // Телефон
	public string  CREGION{ get; set; } // Регион
 }

 public class  MOND_SNAB { // Снабжающая организация
	 public System.Guid  MOND_SNABId{ get; set; } // Primary key field
	public string  CNAME{ get; set; } // Название
	public string  CADDRESS{ get; set; } // Адрес
	public string  CFIO{ get; set; } // Контактное лицо
	public string  CPHONE{ get; set; } // Телефон
	public string  CREGION{ get; set; } // Регион
	public System.Guid  Supplier { get; set; } //Поставщик
 }

 public class  MOND_ROLE { // Роли
	 public System.Guid  MOND_ROLEId{ get; set; } // Primary key field
	[Required]
	public string  Name{ get; set; } // Название 
 }

 public class  MOND_DATA { // Раздел данных
	 public System.Guid  MOND_DATAId{ get; set; } // Primary key field
	[Required]
	public string  name{ get; set; } // Название
 }
}