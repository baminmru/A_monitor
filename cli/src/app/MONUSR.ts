import { enums } from './enums';

export namespace MONUSR { 
	/* MONUSR -  Сотрудник */ 

 export interface   MON_USR { // Данные сотрудника
	MON_USRId:string; // Primary key field
	theClient:string; //Клиент -> moncli_info
	lastname:string; // Фамилия
	name:string; // Имя
	surname:string; // Отчество
	curRole:string; //Роль -> MOND_ROLE
	email:string; // e-mail
	thephone:string; // Телефон
	login:string; // Имя для входа
	// add dereference fields 
	theClient_name :string; // dereference for moncli_info
	curRole_name :string; // dereference for MOND_ROLE
 }
}