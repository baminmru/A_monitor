import { enums } from './enums';

export namespace MOND { 
	/* MOND -  Справочник */ 

 export interface   MOND_PARAM { // Параметры
	MOND_PARAMId:string; // Primary key field
	Name:string; // Название 
	ParamField:string; // Поле
	 ShowAs:enums.enum_ColumnSortType; // Отображать как
	 ShowAs_name :string; // enum to text for Отображать как
 }

 export interface   MOND_CONNECTTYPE { // Тип подключения
	MOND_CONNECTTYPEId:string; // Primary key field
	Name:string; // Название 
 }

 export interface   MOND_DEVCLASS { // Класс устройства
	MOND_DEVCLASSId:string; // Primary key field
	Name:string; // Название 
 }

 export interface   MOND_DEVTYPE { // Тип устройства
	MOND_DEVTYPEId:string; // Primary key field
	DevClass:string; //Класс устройства -> MOND_DEVCLASS
	Name:string; // Название 
	DriverLibName:string; // Библиотека драйвера
	// add dereference fields 
	DevClass_name :string; // dereference for MOND_DEVCLASS
 }

 export interface   MOND_ATYPE { // Тип архива
	MOND_ATYPEId:string; // Primary key field
	name:string; // Название
	TheCode:string; // Код 
 }

 export interface   MOND_SNABTOP { // Поставщик
	MOND_SNABTOPId:string; // Primary key field
	CNAME:string; // Название
	CADDRESS:string; // Адрес
	CFIO:string; // Контактное лицо
	CPHONE:string; // Телефон
	CREGION:string; // Регион
 }

 export interface   MOND_SNAB { // Снабжающая организация
	MOND_SNABId:string; // Primary key field
	CNAME:string; // Название
	CADDRESS:string; // Адрес
	CFIO:string; // Контактное лицо
	CPHONE:string; // Телефон
	CREGION:string; // Регион
	Supplier:string; //Поставщик -> MOND_SNABTOP
	// add dereference fields 
	Supplier_name :string; // dereference for MOND_SNABTOP
 }

 export interface   MOND_ROLE { // Роли
	MOND_ROLEId:string; // Primary key field
	Name:string; // Название 
 }

 export interface   MOND_DATA { // Раздел данных
	MOND_DATAId:string; // Primary key field
	name:string; // Название
 }
}