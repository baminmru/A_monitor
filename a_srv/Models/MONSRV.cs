using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace a_srv.models { 
	/* MONSRV -  Сервер */ 

 public class  MONSRV_INFO { // Описание сервера
	 public System.Guid  MONSRV_INFOId{ get; set; } // Primary key field
	[Required]
	public string  name{ get; set; } // Имя сервера
	public string  IpAddr{ get; set; } // IP сервера
 }

 public class  MONSRV_MODEMS { // Модемы
	 public System.Guid  MONSRV_MODEMSId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  MONSRV_INFOId { get; set; } // Id for Описание сервера
	[Required]
	public string  PortNum{ get; set; } // Номер ком порта
	public enum_Boolean  IsUsable{ get; set; } // Может использоваться сервером
	public enum_Boolean  IsUsed{ get; set; } // Занят
	public DateTime?  UsedUntil{ get; set; } // Занят до
 }

 public class  MONSRV_PORTS { // Ком порты
	 public System.Guid  MONSRV_PORTSId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  MONSRV_INFOId { get; set; } // Id for Описание сервера
	[Required]
	public string  PortName{ get; set; } // Номер порта
	public enum_Boolean  IsUsable{ get; set; } // Может использоваться сервером
	public enum_Boolean  IsUsed{ get; set; } // Занят
	public DateTime?  UsedUntil{ get; set; } // Занят до
 }
}