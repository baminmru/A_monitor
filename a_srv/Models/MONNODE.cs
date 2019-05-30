using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace a_srv.models { 
	/* MONNODE -  Узел */ 

 public class  MONN_DEF { // Описание
	 public System.Guid  MONN_DEFId{ get; set; } // Primary key field
	public string  Addr{ get; set; } // Адрес
	public string  ThePhone{ get; set; } // Телефон
	public System.Guid  OrgUnit { get; set; } //Филиал
	public enum_Boolean  isMovable{ get; set; } // Мобильный узел
	[Required]
	public double  Latitude{ get; set; } // Широта
	[Required]
	public double  Longitude{ get; set; } // Долгота
	public System.Guid  theClient { get; set; } //Клиент
 }

 public class  MONN_LATLON { // Координаты
	 public System.Guid  MONN_LATLONId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  MONN_DEFId { get; set; } // Id for Описание
	[Required]
	public DateTime  theDate{ get; set; } // Дата фиксации
	[Required]
	public double  Latitude{ get; set; } // Широта
	[Required]
	public double  Longitude{ get; set; } // Долгота
 }
}