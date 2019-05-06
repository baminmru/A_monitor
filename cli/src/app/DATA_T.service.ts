import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { DATA} from './DATA';
@Injectable()
export class DATA_T_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	T1:string = '';
	T2:string = '';
	T3:string = '';
	T4:string = '';
	T5:string = '';
	T6:string = '';
	DT12:string = '';
	DT45:string = '';
	THOT:string = '';
	TCOOL:string = '';
	TCE1:string = '';
	TCE2:string = '';
	TAIR1:string = '';
	TAIR2:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all DATA_Ts
    getAll_DATA_Ts(): Observable<DATA.DATA_T[]> {
		var qry:string;
		qry='';
		
		if(this.T1!=''){
			if(qry !='') qry=qry +'&';
			qry='T1='+encodeURIComponent(this.T1)
		}
		if(this.T2!=''){
			if(qry !='') qry=qry +'&';
			qry='T2='+encodeURIComponent(this.T2)
		}
		if(this.T3!=''){
			if(qry !='') qry=qry +'&';
			qry='T3='+encodeURIComponent(this.T3)
		}
		if(this.T4!=''){
			if(qry !='') qry=qry +'&';
			qry='T4='+encodeURIComponent(this.T4)
		}
		if(this.T5!=''){
			if(qry !='') qry=qry +'&';
			qry='T5='+encodeURIComponent(this.T5)
		}
		if(this.T6!=''){
			if(qry !='') qry=qry +'&';
			qry='T6='+encodeURIComponent(this.T6)
		}
		if(this.DT12!=''){
			if(qry !='') qry=qry +'&';
			qry='DT12='+encodeURIComponent(this.DT12)
		}
		if(this.DT45!=''){
			if(qry !='') qry=qry +'&';
			qry='DT45='+encodeURIComponent(this.DT45)
		}
		if(this.THOT!=''){
			if(qry !='') qry=qry +'&';
			qry='THOT='+encodeURIComponent(this.THOT)
		}
		if(this.TCOOL!=''){
			if(qry !='') qry=qry +'&';
			qry='TCOOL='+encodeURIComponent(this.TCOOL)
		}
		if(this.TCE1!=''){
			if(qry !='') qry=qry +'&';
			qry='TCE1='+encodeURIComponent(this.TCE1)
		}
		if(this.TCE2!=''){
			if(qry !='') qry=qry +'&';
			qry='TCE2='+encodeURIComponent(this.TCE2)
		}
		if(this.TAIR1!=''){
			if(qry !='') qry=qry +'&';
			qry='TAIR1='+encodeURIComponent(this.TAIR1)
		}
		if(this.TAIR2!=''){
			if(qry !='') qry=qry +'&';
			qry='TAIR2='+encodeURIComponent(this.TAIR2)
		}
		/*
		if(this.PageNo!=null){
			if(qry !='') qry=qry +;
			//qry='page='+this.PageNo;
			qry='_getpagesoffset=' + ((this.PageNo-1) * this.PageSize)+'&_count=' +this.PageSize;
		}
		*/
		
		let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		if(this.PageUrl!=''){
			return this.http.get<DATA.DATA_T[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<DATA.DATA_T[]>(this.serviceURL + '/DATA_T/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.T1 = '';
	this.T2 = '';
	this.T3 = '';
	this.T4 = '';
	this.T5 = '';
	this.T6 = '';
	this.DT12 = '';
	this.DT45 = '';
	this.THOT = '';
	this.TCOOL = '';
	this.TCE1 = '';
	this.TCE2 = '';
	this.TAIR1 = '';
	this.TAIR2 = '';
		
	}
 
	   //Create DATA_T
    create_DATA_T(DATA_T: DATA.DATA_T): Observable<Object > {
       // DATA_T.DATA_TId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/DATA_T/', DATA_T, { headers: cpHeaders })
		
    }
	
	//Fetch DATA_T by parent
    get_DATA_TByParent(parentId: string): Observable<DATA.DATA_T[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/DATA_T/byparent/'+ parentId)
        return this.http.get<DATA.DATA_T[]>(this.serviceURL + '/DATA_T/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch DATA_T by id
    get_DATA_TById(DATA_TId: string): Observable<DATA.DATA_T> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/DATA_T/'+ DATA_TId)
        return this.http.get<DATA.DATA_T>(this.serviceURL + '/DATA_T/' + DATA_TId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update DATA_T
    update_DATA_T(DATA_T: DATA.DATA_T):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/DATA_T/' + DATA_T.DATA_TId, DATA_T, { headers: cpHeaders })
    }
	
    //Delete DATA_T	
    delete_DATA_TById(DATA_TId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/DATA_T/' + DATA_TId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:DATA.DATA_T = null;
	
	public 	get Selected():DATA.DATA_T{ return this.mSelecetd;}
	
	public  set Selected(_DATA_T:DATA.DATA_T){ this.mSelecetd=_DATA_T; }
 
}
