import { enums } from './enums';

export namespace MONQ { 
	/* MONQ -  Запрос на обработку */ 

 export interface   MONQ_DEF { // Описание
	MONQ_DEFId:string; // Primary key field
	theUser:string; //Сотрудник -> MON_USR
	TheDevice:string; //Приор -> MONDEV_BDEVICES
	ArchType:string; //Тип архива -> MOND_ATYPE
	ArchTime:string;  // Время
	QueryTime:string;  // Время  постановки запроса
	 IsUrgent:enums.enum_Boolean; // Срочный запрос
	 IsUrgent_name :string; // enum to text for Срочный запрос
	RepeatTimes:Number; // Количество повторений при ошибке
	RepeatInterval:Number; // Интервал между повторами
	// add dereference fields 
	theUser_name :string; // dereference for MON_USR
	TheDevice_name :string; // dereference for MONDEV_BDEVICES
	ArchType_name :string; // dereference for MOND_ATYPE
 }

 export interface   MONQ_result { // Результат обработки
	MONQ_resultId:string; // Primary key field
	  MONQ_DEFId:string; // Описание
	TextResult:string; // Текстовый результат
	RecArch:string; //Запись  -> DATA_RECORD
	 IsError:enums.enum_Boolean; // Обработан с ошибкой
	 IsError_name :string; // enum to text for Обработан с ошибкой
	LogMessage:string; // Протокол
	StartTime:string;  // Время начала обработки
	EndTime:string;  // Время завершения обработки
	// add dereference fields 
	RecArch_name :string; // dereference for DATA_RECORD
 }
}