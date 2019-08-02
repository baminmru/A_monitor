using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace a_srv.models { 
	/* monlog -  Логирование */ 

 public class  logcall { // Сообщения
	 public System.Guid  logcallId{ get; set; } // Primary key field
	public System.Guid  ID_BD { get; set; } //Устройство
	[Required]
	public DateTime  DCALL{ get; set; } // Дата опроса
	public System.Guid  AType { get; set; } //Тип архива
	public string  CPORT{ get; set; } // Порт
	public double?  DURATION{ get; set; } // Длительность
	public string  CRESULT{ get; set; } // Результат
 }
}