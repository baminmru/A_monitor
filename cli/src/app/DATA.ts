import { enums } from './enums';

export namespace DATA { 
	/* DATA -  Данные */ 

 export interface   DATA_RECORD { // Запись
	DATA_RECORDId:string; // Primary key field
	ID_BD:string; //Устройство -> MONDEV_BDEVICES
	DCALL:string;  // Дата опроса
	AType:string; //Тип архива -> MOND_ATYPE
	CHECK_A:Number; // Проверка архивных данных на НС (0 - не производилась, 1 - произведена)
	DCOUNTER:string;  // Дата счетчика
	dstart:string;  // Начало интервала
	dend:string;  // Конец интервала
	// add dereference fields 
	ID_BD_name :string; // dereference for MONDEV_BDEVICES
	AType_name :string; // dereference for MOND_ATYPE
 }

 export interface   DATA_V { // Объемы
	DATA_VId:string; // Primary key field
	  DATA_RECORDId:string; // Запись
	V1:Number; // Объемный расход воды по каналу 1
	V2:Number; // Объемный расход воды по каналу 2
	V3:Number; // Объемный расход воды по каналу 3
	V4:Number; // Объемный расход воды по каналу 4
	V5:Number; // Объемный расход воды по каналу 5
	V6:Number; // Объемный расход воды по каналу 6
	DV12:Number; // Разность объемов канал 1  (расход ГВС)
	DV45:Number; // Разность объемов канал 2
 }

 export interface   DATA_M { // Массы
	DATA_MId:string; // Primary key field
	  DATA_RECORDId:string; // Запись
	M1:Number; // Масса воды по каналу 1
	M2:Number; // Масса воды по каналу 2
	M3:Number; // Масса воды по каналу 3
	M4:Number; // Масса воды по каналу 4
	M5:Number; // Масса воды по каналу 5
	M6:Number; // Масса воды по каналу 6
	DM45:Number; // Разность масс канал 2
	DM12:Number; // Разность масс канал 1  (расход ГВС)
 }

 export interface   DATA_T { // Температуры
	DATA_TId:string; // Primary key field
	  DATA_RECORDId:string; // Запись
	T1:Number; // Температура по каналу 1
	T2:Number; // Температура по каналу 2
	T3:Number; // Температура по каналу 3
	T4:Number; // Температура по каналу 4
	T5:Number; // Температура по каналу 5
	T6:Number; // Температура по каналу 6
	DT12:Number; // Разность Температур по каналу 1 и 2
	DT45:Number; // Разность Температур по каналу 4 и 5
	THOT:Number; // Температура горячей воды
	TCOOL:Number; // Температура холодной воды
	TCE1:Number; // Температура холодного конца канал 1
	TCE2:Number; // Температура холодного конца канал 2
	TAIR1:Number; // Температура воздуха канал 1
	TAIR2:Number; // Температура воздуха канал 2
 }

 export interface   DATA_P { // Давления
	DATA_PId:string; // Primary key field
	  DATA_RECORDId:string; // Запись
	P1:Number; // Давление в трубопроводе 1
	P2:Number; // Давление в трубопроводе 2
	P3:Number; // Давление в трубопроводе 3
	P4:Number; // Давление в трубопроводе 4
	P5:Number; // Давление в трубопроводе 5
	P6:Number; // Давление в трубопроводе 6
	PATM:Number; // Атмосферное давление
	PXB:Number; // Давление холодной воды
	DP12:Number; // P1-P2
	DP45:Number; // P4-P5
 }

 export interface   DATA_Q { // Энергия
	DATA_QId:string; // Primary key field
	  DATA_RECORDId:string; // Запись
	Q1:Number; // Тепловая энергия канал 1
	Q2:Number; // Тепловая энергия канал 2
	Q3:Number; // Тепловая энергия канал 3
	Q4:Number; // Тепловая энергия канал 4
	Q5:Number; // Тепловая энергия канал 5
	DQ12:Number; // Тепловая энергия потребитель 1
	DQ45:Number; // Тепловая энергия потребитель 2
	DQ:Number; // Расход энергии потребитель 1
 }

 export interface   DATA_EP { // Мощность
	DATA_EPId:string; // Primary key field
	  DATA_RECORDId:string; // Запись
	EP1:Number; // Мощность по  фазе 1
	EP2:Number; // Мощность по  фазе 2
	EP3:Number; // Мощность по  фазе 3
 }

 export interface   DATA_U { // Напряжение
	DATA_UId:string; // Primary key field
	  DATA_RECORDId:string; // Запись
	U1:Number; // Напряжение Ф1
	U2:Number; // Напряжение Ф2
	U3:Number; // Напряжение Ф3
 }

 export interface   DATA_I { // Ток
	DATA_IId:string; // Primary key field
	  DATA_RECORDId:string; // Запись
	I1:Number; // Ток Ф1
	I2:Number; // Ток Ф2
	I3:Number; // Ток Ф3
 }

 export interface   DATA_EQ { // Эл. Энергия
	DATA_EQId:string; // Primary key field
	  DATA_RECORDId:string; // Запись
	E0:Number; // Энергия общ.
	E1:Number; // Энергия тариф 1
	E2:Number; // Энергия тариф 2
	E3:Number; // Энергия тариф 3
	E4:Number; // Энергия тариф 4
	AP:Number; // Активная +
	AM:Number; // Активная - 
	RP:Number; // Реактивная +
	RM:Number; // Реактивная -
 }

 export interface   DATA_MSG { // Сообщения
	DATA_MSGId:string; // Primary key field
	  DATA_RECORDId:string; // Запись
	HC_1:string; // Нештатная ситуация 1 (ТВ1 или внешняя)
	HC_2:string; // Нештатная ситуация 2 (ТВ2 или внутренняя)
	errInfo:string; // Ошибки
	HC_CODE:string; // Код нештатной ситуации тепловычислителя
	HC:string; // Нештатные ситуации общ
 }

 export interface   DATA_TIME { // Времена
	DATA_TIMEId:string; // Primary key field
	  DATA_RECORDId:string; // Запись
	TSUM1:Number; // Тотальное время счета TB1
	TSUM2:Number; // Тотальное время счета TB2
	ERRTIME:Number; // Время аварии
	OKTIME:Number; // Время безошиб.работы
	WORKTIME:Number; // Время работы
 }
}