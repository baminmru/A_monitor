using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace a_srv.models { 
	/* DATA -  Данные */ 

 public class  DATA_RECORD { // Запись
	 public System.Guid  DATA_RECORDId{ get; set; } // Primary key field
	 public List<DATA_V>  data_v { get; set; } // Объемы
	 public List<DATA_M>  data_m { get; set; } // Массы
	 public List<DATA_T>  data_t { get; set; } // Температуры
	 public List<DATA_P>  data_p { get; set; } // Давления
	 public List<DATA_Q>  data_q { get; set; } // Энергия
	 public List<DATA_EP>  data_ep { get; set; } // Мощность
	 public List<DATA_U>  data_u { get; set; } // Напряжение
	 public List<DATA_I>  data_i { get; set; } // Ток
	 public List<DATA_EQ>  data_eq { get; set; } // Эл. Энергия
	 public List<DATA_MSG>  data_msg { get; set; } // Сообщения
	 public List<DATA_TIME>  data_time { get; set; } // Времена
	public System.Guid  ID_BD { get; set; } //Устройство
	[Required]
	public DateTime  DCALL{ get; set; } // Дата опроса
	public System.Guid  AType { get; set; } //Тип архива
	public double?  CHECK_A{ get; set; } // Проверка архивных данных на НС (0 - не производилась, 1 - произведена)
	public DateTime?  DCOUNTER{ get; set; } // Дата счетчика
	public DateTime?  dstart{ get; set; } // Начало интервала
	public DateTime?  dend{ get; set; } // Конец интервала
	public string  MSG{ get; set; } // Сообщение
 }

 public class  DATA_V { // Объемы
	 public System.Guid  DATA_VId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  DATA_RECORDId { get; set; } // Id for Запись
	public double?  V1{ get; set; } // Объемный расход воды по каналу 1
	public double?  V2{ get; set; } // Объемный расход воды по каналу 2
	public double?  V3{ get; set; } // Объемный расход воды по каналу 3
	public double?  V4{ get; set; } // Объемный расход воды по каналу 4
	public double?  V5{ get; set; } // Объемный расход воды по каналу 5
	public double?  V6{ get; set; } // Объемный расход воды по каналу 6
	public double?  DV12{ get; set; } // Разность объемов канал 1  (расход ГВС)
	public double?  DV45{ get; set; } // Разность объемов канал 2
 }

 public class  DATA_M { // Массы
	 public System.Guid  DATA_MId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  DATA_RECORDId { get; set; } // Id for Запись
	public double?  M1{ get; set; } // Масса воды по каналу 1
	public double?  M2{ get; set; } // Масса воды по каналу 2
	public double?  M3{ get; set; } // Масса воды по каналу 3
	public double?  M4{ get; set; } // Масса воды по каналу 4
	public double?  M5{ get; set; } // Масса воды по каналу 5
	public double?  M6{ get; set; } // Масса воды по каналу 6
	public double?  DM45{ get; set; } // Разность масс канал 2
	public double?  DM12{ get; set; } // Разность масс канал 1  (расход ГВС)
 }

 public class  DATA_T { // Температуры
	 public System.Guid  DATA_TId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  DATA_RECORDId { get; set; } // Id for Запись
	public double?  T1{ get; set; } // Температура по каналу 1
	public double?  T2{ get; set; } // Температура по каналу 2
	public double?  T3{ get; set; } // Температура по каналу 3
	public double?  T4{ get; set; } // Температура по каналу 4
	public double?  T5{ get; set; } // Температура по каналу 5
	public double?  T6{ get; set; } // Температура по каналу 6
	public double?  DT12{ get; set; } // Разность Температур по каналу 1 и 2
	public double?  DT45{ get; set; } // Разность Температур по каналу 4 и 5
	public double?  THOT{ get; set; } // Температура горячей воды
	public double?  TCOOL{ get; set; } // Температура холодной воды
	public double?  TCE1{ get; set; } // Температура холодного конца канал 1
	public double?  TCE2{ get; set; } // Температура холодного конца канал 2
	public double?  TAIR1{ get; set; } // Температура воздуха канал 1
	public double?  TAIR2{ get; set; } // Температура воздуха канал 2
 }

 public class  DATA_P { // Давления
	 public System.Guid  DATA_PId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  DATA_RECORDId { get; set; } // Id for Запись
	public double?  P1{ get; set; } // Давление в трубопроводе 1
	public double?  P2{ get; set; } // Давление в трубопроводе 2
	public double?  P3{ get; set; } // Давление в трубопроводе 3
	public double?  P4{ get; set; } // Давление в трубопроводе 4
	public double?  P5{ get; set; } // Давление в трубопроводе 5
	public double?  P6{ get; set; } // Давление в трубопроводе 6
	public double?  PATM{ get; set; } // Атмосферное давление
	public double?  PXB{ get; set; } // Давление холодной воды
	public double?  DP12{ get; set; } // P1-P2
	public double?  DP45{ get; set; } // P4-P5
 }

 public class  DATA_Q { // Энергия
	 public System.Guid  DATA_QId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  DATA_RECORDId { get; set; } // Id for Запись
	public double?  Q1{ get; set; } // Тепловая энергия канал 1
	public double?  Q2{ get; set; } // Тепловая энергия канал 2
	public double?  Q3{ get; set; } // Тепловая энергия канал 3
	public double?  Q4{ get; set; } // Тепловая энергия канал 4
	public double?  Q5{ get; set; } // Тепловая энергия канал 5
	public double?  DQ12{ get; set; } // Тепловая энергия потребитель 1
	public double?  DQ45{ get; set; } // Тепловая энергия потребитель 2
	public double?  DQ{ get; set; } // Расход энергии потребитель 1
 }

 public class  DATA_EP { // Мощность
	 public System.Guid  DATA_EPId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  DATA_RECORDId { get; set; } // Id for Запись
	public double?  EP1{ get; set; } // Мощность по  фазе 1
	public double?  EP2{ get; set; } // Мощность по  фазе 2
	public double?  EP3{ get; set; } // Мощность по  фазе 3
 }

 public class  DATA_U { // Напряжение
	 public System.Guid  DATA_UId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  DATA_RECORDId { get; set; } // Id for Запись
	public double?  U1{ get; set; } // Напряжение Ф1
	public double?  U2{ get; set; } // Напряжение Ф2
	public double?  U3{ get; set; } // Напряжение Ф3
 }

 public class  DATA_I { // Ток
	 public System.Guid  DATA_IId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  DATA_RECORDId { get; set; } // Id for Запись
	public double?  I1{ get; set; } // Ток Ф1
	public double?  I2{ get; set; } // Ток Ф2
	public double?  I3{ get; set; } // Ток Ф3
 }

 public class  DATA_EQ { // Эл. Энергия
	 public System.Guid  DATA_EQId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  DATA_RECORDId { get; set; } // Id for Запись
	public double?  E0{ get; set; } // Энергия общ.
	public double?  E1{ get; set; } // Энергия тариф 1
	public double?  E2{ get; set; } // Энергия тариф 2
	public double?  E3{ get; set; } // Энергия тариф 3
	public double?  E4{ get; set; } // Энергия тариф 4
	public double?  AP{ get; set; } // Активная +
	public double?  AM{ get; set; } // Активная - 
	public double?  RP{ get; set; } // Реактивная +
	public double?  RM{ get; set; } // Реактивная -
 }

 public class  DATA_MSG { // Сообщения
	 public System.Guid  DATA_MSGId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  DATA_RECORDId { get; set; } // Id for Запись
	public string  HC_1{ get; set; } // Нештатная ситуация 1 (ТВ1 или внешняя)
	public string  HC_2{ get; set; } // Нештатная ситуация 2 (ТВ2 или внутренняя)
	public string  errInfo{ get; set; } // Ошибки
	public string  HC_CODE{ get; set; } // Код нештатной ситуации тепловычислителя
	public string  HC{ get; set; } // Нештатные ситуации общ
 }

 public class  DATA_TIME { // Времена
	 public System.Guid  DATA_TIMEId{ get; set; } // Primary key field
	[Required]
	 public System.Guid  DATA_RECORDId { get; set; } // Id for Запись
	public double?  TSUM1{ get; set; } // Тотальное время счета TB1
	public double?  TSUM2{ get; set; } // Тотальное время счета TB2
	public double?  ERRTIME{ get; set; } // Время аварии
	public double?  OKTIME{ get; set; } // Время безошиб.работы
	public double?  WORKTIME{ get; set; } // Время работы
 }
}