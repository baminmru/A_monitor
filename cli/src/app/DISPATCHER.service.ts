import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { DATA} from './DATA';
import { DISPATCHER} from './DISPATCHER';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';


@Injectable()
export class DISPATCHER_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	DCALL:string = '';
	CHECK_A:string = '';
	DCOUNTER:string = '';
	dstart:string = '';
	dend:string = '';
	PageSize:number=10;
	PageUrl:string='';
	DispatcherTab:string="Данные";
	ChartTab:string="Мгновенные";
	CurrentDevice:DISPATCHER.NodeItem = {"DeviceID":"null"} as DISPATCHER.NodeItem;
	CurretCondition:DISPATCHER.FILTER = {"AType":"null"} as DISPATCHER.FILTER;
	CurrentArchiveM:Array<DISPATCHER.ElectroRecord>=[];
	CurrentArchiveT:Array<DISPATCHER.ElectroRecord>=[];
	CurrentArchiveHH:Array<DISPATCHER.ElectroRecord>=[];
	CurrentChart_I:Array<any>=[
		[{"datatype":"string" ,"label":'Время'},{"datatype":"number" ,"label":'?'}],
		[1,0],	[2,0] ];
	CurrentChart_U:Array<any>=[
		[{"datatype":"string" ,"label":'Время'},{"datatype":"number" ,"label":'?'}],
		[1,0],	[2,0] ];
	CurrentChart_P:Array<any>=[
		[{"datatype":"string" ,"label":'Время'},{"datatype":"number" ,"label":'?'}],
		[1,0],	[2,0] ];
	CurrentChart_T:Array<any>=[
		[{"datatype":"string" ,"label":'Время'},{"datatype":"number" ,"label":'?'}],
		[1,0],	[2,0] ];

		DayChart_P:Array<any>=[
			[{"datatype":"string" ,"label":'Дата'},{"datatype":"number" ,"label":'?'}],
			[1,0],	[2,0] ];
		DayChart_T:Array<any>=[
			[{"datatype":"string" ,"label":'Дата'},{"datatype":"number" ,"label":'?'}],
			[1,0],	[2,0] ];

			WeekChart_P:Array<any>=[
				[{"datatype":"string" ,"label":'Неделя'},{"datatype":"number" ,"label":'?'}],
				[1,0],	[2,0] ];
			WeekChart_T:Array<any>=[
				[{"datatype":"string" ,"label":'Неделя'},{"datatype":"number" ,"label":'?'}],
				[1,0],	[2,0] ];
	
	getNodes(): Observable<DISPATCHER.NodeItem[]> {
		let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<DISPATCHER.NodeItem[]>(this.serviceURL + '/DISPATCHER/nodes', { headers: cpHeaders })
    }

	getCurrentElectroHH(): Observable<DISPATCHER.ElectroRecord[]>{
			if(this.CurrentDevice.DeviceID !="null" ){
				this.CurretCondition.AType ='868BCF44-FB91-47B2-D3DA-08D6D1323977';	
				return this.getElectro(this.CurrentDevice.DeviceID,this.CurretCondition);
			}else
				return null;	
	}
	
	getCurrentElectroM(): Observable<DISPATCHER.ElectroRecord[]>{
			if(this.CurrentDevice.DeviceID !="null" ){
				this.CurretCondition.AType ='19DB21FC-0BD7-47A1-D3D7-08D6D1323977';	
				return this.getElectro(this.CurrentDevice.DeviceID,this.CurretCondition);
			}else
				return null;	
	}
	
	getCurrentElectroT(): Observable<DISPATCHER.ElectroRecord[]>{
			if(this.CurrentDevice.DeviceID !="null" ){
				this.CurretCondition.AType ='904590BC-87D7-4F70-D3D8-08D6D1323977';	
				return this.getElectro(this.CurrentDevice.DeviceID,this.CurretCondition);
			}else
				return null;	
	}

	getCurrentChart(Chart:string ): Observable<any>{
		if(this.CurrentDevice.DeviceID !="null" ){
			if(Chart =='T'){
				this.CurretCondition.AType ='904590BC-87D7-4F70-D3D8-08D6D1323977';	
			}else{
				this.CurretCondition.AType ='19DB21FC-0BD7-47A1-D3D7-08D6D1323977';	
			}
			return this.getChart(Chart,'',this.CurrentDevice.DeviceID,this.CurretCondition);
		}
		else
			return null;	
 }

 getDayChart(Chart:string ): Observable<any>{
	if(this.CurrentDevice.DeviceID !="null" ){
		if(Chart =='T'){
			this.CurretCondition.AType ='904590BC-87D7-4F70-D3D8-08D6D1323977';	
		}else{
			this.CurretCondition.AType ='19DB21FC-0BD7-47A1-D3D7-08D6D1323977';	
		}
		return this.getChart(Chart,'D',this.CurrentDevice.DeviceID,this.CurretCondition);
	}
	else
		return null;	
 }


 getWeekChart(Chart:string ): Observable<any>{
	if(this.CurrentDevice.DeviceID !="null" ){
		if(Chart =='T'){
			this.CurretCondition.AType ='904590BC-87D7-4F70-D3D8-08D6D1323977';	
		}else{
			this.CurretCondition.AType ='19DB21FC-0BD7-47A1-D3D7-08D6D1323977';	
		}
		return this.getChart(Chart,'W',this.CurrentDevice.DeviceID,this.CurretCondition);
	}
	else
		return null;	
 }

  getElectro(id:string, condition:DISPATCHER.FILTER): Observable<DISPATCHER.ElectroRecord[]> {
		  let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
			return this.http.post<DISPATCHER.ElectroRecord[]>(this.serviceURL + '/DISPATCHER/electro/'+id,condition, { headers: cpHeaders })
	}

	getChart(Chart:string, Quant:string, id:string, condition:DISPATCHER.FILTER): Observable<string> {
		let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.post<string>(this.serviceURL + '/DISPATCHER/chart'+Quant+'_'+Chart+'/'+id,condition, { headers: cpHeaders })
  }
	


	refreshElectro() {
		console.log("refreshing Electro"); 
		let obs:Observable<DISPATCHER.ElectroRecord[]>;
		 obs=this.getCurrentElectroHH();
		 if(obs !=null){
		 		obs.subscribe(DATAArray => { this.CurrentArchiveHH = DATAArray; }, error => { console.log(error.message); })
		 }
		 
		 obs=this.getCurrentElectroM();
		 if(obs !=null){
		 		obs.subscribe(DATAArray => { this.CurrentArchiveM = DATAArray; }, error => { console.log(error.message); })
		 }
		 
		 obs=this.getCurrentElectroT();
		 if(obs !=null){
		 		obs.subscribe(DATAArray => { this.CurrentArchiveT = DATAArray; }, error => { console.log(error.message); })
		 }
		 
	}

 refreshCharts() {

	if(this.ChartTab=="Недельные"){
		{
			let obs:Observable<string>;
			 obs=this.getWeekChart('T');
			 if(obs !=null){
					 obs.subscribe(DATA => { 
						 this.WeekChart_T = JSON.parse (DATA);  
						console.log(JSON.stringify(this.CurrentChart_T)); 
					}, error => { console.log(error.message); })
			 }
		}
			
		{
			let obs:Observable<string>;
			 obs=this.getWeekChart('P');
			 if(obs !=null){
					 obs.subscribe(DATA => { 
						 this.WeekChart_P = JSON.parse (DATA);  
						console.log(JSON.stringify(this.CurrentChart_P)); 
					}, error => { console.log(error.message); })
					
			}
		}
	}

	if(this.ChartTab=="Дневные"){
		{
			let obs:Observable<string>;
			 obs=this.getDayChart('T');
			 if(obs !=null){
					 obs.subscribe(DATA => { 
						 this.DayChart_T = JSON.parse (DATA);  
						console.log(JSON.stringify(this.CurrentChart_T)); 
					}, error => { console.log(error.message); })
					
			 }
			}

			
		{
			let obs:Observable<string>;
			 obs=this.getDayChart('P');
			 if(obs !=null){
					 obs.subscribe(DATA => { 
						 this.DayChart_P = JSON.parse (DATA);  
						console.log(JSON.stringify(this.CurrentChart_P)); 
					}, error => { console.log(error.message); })
					
			}
		}
	}

	if(this.ChartTab=="Мгновенные"){
	{
	let obs:Observable<string>;
	 obs=this.getCurrentChart('I');
	 if(obs !=null){
			 obs.subscribe(DATA => { 
				 this.CurrentChart_I = JSON.parse (DATA);  
				console.log(JSON.stringify(this.CurrentChart_I)); 
			}, error => { console.log(error.message); })
			
	 }
	}

	{
		let obs:Observable<string>;
		 obs=this.getCurrentChart('T');
		 if(obs !=null){
				 obs.subscribe(DATA => { 
					 this.CurrentChart_T = JSON.parse (DATA);  
					console.log(JSON.stringify(this.CurrentChart_T)); 
				}, error => { console.log(error.message); })
				
		 }
		}

		{
			let obs:Observable<string>;
			 obs=this.getCurrentChart('U');
			 if(obs !=null){
					 obs.subscribe(DATA => { 
						 this.CurrentChart_U = JSON.parse (DATA);  
						console.log(JSON.stringify(this.CurrentChart_U)); 
					}, error => { console.log(error.message); })
					
			 }
		}


		{
			let obs:Observable<string>;
			 obs=this.getCurrentChart('P');
			 if(obs !=null){
					 obs.subscribe(DATA => { 
						 this.CurrentChart_P = JSON.parse (DATA);  
						console.log(JSON.stringify(this.CurrentChart_P)); 
					}, error => { console.log(error.message); })
					
			}
		}
	 }
		
	 
}
	
	clearSearch():void{
		this.DCALL = '';
		this.CHECK_A = '';
		this.DCOUNTER = '';
		this.dstart = '';
		this.dend = '';
	}
 
	
	
	private mSelecetd:DATA.DATA_RECORD = null;
	
	public 	get Selected():DATA.DATA_RECORD{ return this.mSelecetd;}
	
	public  set Selected(_DISPATCHER:DATA.DATA_RECORD){ this.mSelecetd=_DISPATCHER; }
 
}
