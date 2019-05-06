import { enums } from './enums';

export namespace MONSRV { 
	/* MONSRV -  Сервер */ 

 export interface   MONSRV_INFO { // Описание сервера
	MONSRV_INFOId:string; // Primary key field
	name:string; // Имя сервера
	IpAddr:string; // IP сервера
 }

 export interface   MONSRV_MODEMS { // Модемы
	MONSRV_MODEMSId:string; // Primary key field
	  MONSRV_INFOId:string; // Описание сервера
	PortNum:string; // Номер ком порта
	 IsUsable:enums.enum_Boolean; // Может использоваться сервером
	 IsUsable_name :string; // enum to text for Может использоваться сервером
	 IsUsed:enums.enum_Boolean; // Занят
	 IsUsed_name :string; // enum to text for Занят
	UsedUntil:string;  // Занят до
 }

 export interface   MONSRV_PORTS { // Ком порты
	MONSRV_PORTSId:string; // Primary key field
	  MONSRV_INFOId:string; // Описание сервера
	PortName:string; // Номер порта
	 IsUsable:enums.enum_Boolean; // Может использоваться сервером
	 IsUsable_name :string; // enum to text for Может использоваться сервером
	 IsUsed:enums.enum_Boolean; // Занят
	 IsUsed_name :string; // enum to text for Занят
	UsedUntil:string;  // Занят до
 }
}