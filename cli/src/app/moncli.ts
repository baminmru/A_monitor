import { enums } from './enums';

export namespace moncli { 
	/* moncli -  Организация */ 

 export interface   moncli_info { // Описание
	moncli_infoId:string; // Primary key field
	Name:string; // Название
 }

 export interface   MOND_F { // Филиал организации
	MOND_FId:string; // Primary key field
	  moncli_infoId:string; // Описание
	Name:string; // Название 
 }

 export interface   MOND_GRP { // Группа
	MOND_GRPId:string; // Primary key field
	  moncli_infoId:string; // Описание
	CGRPNM:string; // Название группы
	CTXT:string; // Описание
 }
}