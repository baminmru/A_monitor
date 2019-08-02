import { enums } from './enums';

export namespace monlog { 
	/* monlog -  Логирование */ 

 export interface   logcall { // Сообщения
	logcallId:string; // Primary key field
	ID_BD:string; //Устройство -> MONDEV_BDEVICES
	DCALL:string;  // Дата опроса
	AType:string; //Тип архива -> MOND_ATYPE
	CPORT:string; // Порт
	DURATION:Number; // Длительность
	CRESULT:string; // Результат
	// add dereference fields 
	ID_BD_name :string; // dereference for MONDEV_BDEVICES
	AType_name :string; // dereference for MOND_ATYPE
 }
}