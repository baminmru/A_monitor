import { enums } from './enums';

export namespace DISPATCHER { 

 export interface   FILTER { // Запись
	AType:string; //Тип архива -> MOND_ATYPE
	dstart:string;  // Начало интервала
	dend:string;  // Конец интервала
		
 }

 export  class TreeItem{
	public  text:string;
	public  icon:string;
	public  mdaIcon:string;
	public  link:string;
	public  selected:boolean;
	public  expand:boolean;
	public  active:boolean;
	public  leaf:boolean;
	public  badge:string;
	public  children: Array<TreeItem>;

}

export  interface NodeItem{
	DeviceID:string;
	NodeName:string;
  	DeviceName:string;
}


export  interface ElectroRecord{
	   ID_BD :string;
       ATYPE :string;
       DCALL :number;
       DCOUNTER :Date;
       dstart :Date;
       dend :Date;
       name :string;
       U1 :number;
       U2 :number;
       U3 :number;
       I1 :number;
       I2 :number;
       I3 :number;
       EP1 :number;
       EP2 :number;
       EP3 :number;
       E0 :number;
       E1 :number;
       E2 :number;
       E3 :number;
       AP :number;
       AM :number;
       RP :number;
       RM :number;
}


}