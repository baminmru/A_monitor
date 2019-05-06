import { enums } from './enums';

export namespace MONSCH { 
	/* MONSCH -  Схема подключения */ 

 export interface   MONSCH_INFO { // Схема подключения
	MONSCH_INFOId:string; // Primary key field
	NAME:string; // Название
	SCHEMA_IMAGEfile:string; // Путь к  файлу
 }

 export interface   MONSCH_PARAM { // Параметры на схеме
	MONSCH_PARAMId:string; // Primary key field
	  MONSCH_INFOId:string; // Схема подключения
	ArchType:string; //Тип архива -> MOND_ATYPE
	Param:string; //Параметр -> MOND_PARAM
	POS_LEFT:Number; // X
	POS_TOP:Number; // Y
	 HIDEPARAM:enums.enum_Boolean; // Скрыть
	 HIDEPARAM_name :string; // enum to text for Скрыть
	 HideOnSchema:enums.enum_Boolean; // Не отображать на схеме
	 HideOnSchema_name :string; // enum to text for Не отображать на схеме
	// add dereference fields 
	ArchType_name :string; // dereference for MOND_ATYPE
	Param_name :string; // dereference for MOND_PARAM
 }
}