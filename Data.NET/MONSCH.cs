using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace a_srv.models { 
	/* MONSCH -  Схема подключения */ 

 public class  MONSCH_INFO { // Схема подключения
	 public System.Guid  MONSCH_INFOId{ get; set; } // Primary key field
	 public List<MONSCH_PARAM>  monsch_param { get; set; } // Параметры на схеме
	[Required]
	public string  NAME{ get; set; } // Название
	public string  SCHEMA_IMAGEfile{ get; set; } // Путь к  файлу
 }

 public class  MONSCH_PARAM { // Параметры на схеме
	 public System.Guid  MONSCH_PARAMId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  MONSCH_INFOId { get; set; } // Id for Схема подключения
	public System.Guid  ArchType { get; set; } //Тип архива
	public System.Guid  Param { get; set; } //Параметр
	[Required]
	public double  POS_LEFT{ get; set; } // X
	[Required]
	public double  POS_TOP{ get; set; } // Y
	public enum_Boolean  HIDEPARAM{ get; set; } // Скрыть
	public enum_Boolean  HideOnSchema{ get; set; } // Не отображать на схеме
 }
}