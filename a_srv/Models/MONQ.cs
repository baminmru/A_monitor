using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace a_srv.models { 
	/* MONQ -  Запрос на обработку */ 

 public class  MONQ_DEF { // Описание
	 public System.Guid  MONQ_DEFId{ get; set; } // Primary key field
	public System.Guid  theUser { get; set; } //Сотрудник
	public System.Guid  TheDevice { get; set; } //Приор
	public System.Guid  ArchType { get; set; } //Тип архива
	public DateTime?  ArchTime{ get; set; } // Время
	[Required]
	public DateTime  QueryTime{ get; set; } // Время  постановки запроса
	public enum_Boolean  IsUrgent{ get; set; } // Срочный запрос
	public double?  RepeatTimes{ get; set; } // Количество повторений при ошибке
	public double?  RepeatInterval{ get; set; } // Интервал между повторами
 }

 public class  MONQ_result { // Результат обработки
	 public System.Guid  MONQ_resultId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  MONQ_DEFId { get; set; } // Id for Описание
	[Required]
	public string  TextResult{ get; set; } // Текстовый результат
	public System.Guid  RecArch { get; set; } //Запись 
	public enum_Boolean  IsError{ get; set; } // Обработан с ошибкой
	public string  LogMessage{ get; set; } // Протокол
	public DateTime?  StartTime{ get; set; } // Время начала обработки
	public DateTime?  EndTime{ get; set; } // Время завершения обработки
 }
}