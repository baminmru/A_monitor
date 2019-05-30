using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace a_srv.models { 
	/* MONUSR -  Сотрудник */ 

 public class  MON_USR { // Данные сотрудника
	 public System.Guid  MON_USRId{ get; set; } // Primary key field
	public System.Guid  theClient { get; set; } //Клиент
	[Required]
	public string  lastname{ get; set; } // Фамилия
	[Required]
	public string  name{ get; set; } // Имя
	public string  surname{ get; set; } // Отчество
	public System.Guid  curRole { get; set; } //Роль
	public string  email{ get; set; } // e-mail
	public string  thephone{ get; set; } // Телефон
	[Required]
	public string  login{ get; set; } // Имя для входа
 }
}