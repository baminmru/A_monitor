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
	CurrentDevice:DISPATCHER.NodeItem = {"DeviceID":"null"} as DISPATCHER.NodeItem;
	CurretCondition:DISPATCHER.FILTER = {"AType":"null"} as DISPATCHER.FILTER;
	CurrentArchive:Array<DISPATCHER.ElectroRecord>=[];
	CurrentChart_I:Array<any>=[
		[{"datatype":"number" ,"label":'Info'},{"datatype":"number" ,"label":'?'}],
		[1,0],	[2,0] ];
	CurrentChart_U:Array<any>=[
		[{"datatype":"number" ,"label":'Info'},{"datatype":"number" ,"label":'?'}],
		[1,0],	[2,0] ];
	CurrentChart_P:Array<any>=[
		[{"datatype":"number" ,"label":'Info'},{"datatype":"number" ,"label":'?'}],
		[1,0],	[2,0] ];
	CurrentChart_T:Array<any>=[
		[{"datatype":"number" ,"label":'Info'},{"datatype":"number" ,"label":'?'}],
		[1,0],	[2,0] ];

	
	
	getNodes(): Observable<DISPATCHER.NodeItem[]> {
		let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<DISPATCHER.NodeItem[]>(this.serviceURL + '/DISPATCHER/nodes', { headers: cpHeaders })
    }

	getCurrentElectro(): Observable<DISPATCHER.ElectroRecord[]>{
			if(this.CurrentDevice.DeviceID !="null" &&  this.CurretCondition.AType !="null")
				return this.getElectro(this.CurrentDevice.DeviceID,this.CurretCondition);
			else
				return null;	
	}

	getCurrentChart(Chart:string ): Observable<any>{
		if(this.CurrentDevice.DeviceID !="null" &&  this.CurretCondition.AType !="null")
			return this.getChart(Chart,this.CurrentDevice.DeviceID,this.CurretCondition);
		else
			return null;	
}

  getElectro(id:string, condition:DISPATCHER.FILTER): Observable<DISPATCHER.ElectroRecord[]> {
		  let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
			return this.http.post<DISPATCHER.ElectroRecord[]>(this.serviceURL + '/DISPATCHER/electro/'+id,condition, { headers: cpHeaders })
	}

	getChart(Chart:string, id:string, condition:DISPATCHER.FILTER): Observable<string> {
		let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.post<string>(this.serviceURL + '/DISPATCHER/chart_'+Chart+'/'+id,condition, { headers: cpHeaders })
}
	

	refreshElectro() {
		console.log("refreshing Electro"); 
		let obs:Observable<DISPATCHER.ElectroRecord[]>;
		 obs=this.getCurrentElectro();
		 if(obs !=null){
		 		obs.subscribe(DATAArray => { this.CurrentArchive = DATAArray; }, error => { console.log(error.message); })
		 }
		 
 }

 refreshCharts() {
	console.log("refreshing Chart_I"); 
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
