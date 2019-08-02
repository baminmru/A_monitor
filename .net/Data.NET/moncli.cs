using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace a_srv.models { 
	/* moncli -  Организация */ 

 public class  moncli_info { // Описание
	 public System.Guid  moncli_infoId{ get; set; } // Primary key field
	 public List<MOND_F>  mond_f { get; set; } // Филиал организации
	 public List<MOND_GRP>  mond_grp { get; set; } // Группа
	[Required]
	public string  Name{ get; set; } // Название
 }

 public class  MOND_F { // Филиал организации
	 public System.Guid  MOND_FId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  moncli_infoId { get; set; } // Id for Описание
	[Required]
	public string  Name{ get; set; } // Название 
 }

 public class  MOND_GRP { // Группа
	 public System.Guid  MOND_GRPId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  moncli_infoId { get; set; } // Id for Описание
	public string  CGRPNM{ get; set; } // Название группы
	public string  CTXT{ get; set; } // Описание
 }
}