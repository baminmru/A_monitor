import { enums } from './enums';

export namespace MONNODE { 
	/* MONNODE -  Узел */ 

 export interface   MONN_DEF { // Описание
	MONN_DEFId:string; // Primary key field
	Addr:string; // Адрес
	ThePhone:string; // Телефон
	OrgUnit:string; //Филиал -> MOND_F
	 isMovable:enums.enum_Boolean; // Мобильный узел
	 isMovable_name :string; // enum to text for Мобильный узел
	Latitude:Number; // Широта
	Longitude:Number; // Долгота
	theClient:string; //Клиент -> moncli_info
	// add dereference fields 
	OrgUnit_name :string; // dereference for MOND_F
	theClient_name :string; // dereference for moncli_info
 }

 export interface   MONN_LATLON { // Координаты
	MONN_LATLONId:string; // Primary key field
	  MONN_DEFId:string; // Описание
	theDate:string;  // Дата фиксации
	Latitude:Number; // Широта
	Longitude:Number; // Долгота
 }
}