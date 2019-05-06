import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { DATA} from './DATA';
@Injectable()
export class DATA_TIME_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	TSUM1:string = '';
	TSUM2:string = '';
	ERRTIME:string = '';
	OKTIME:string = '';
	WORKTIME:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all DATA_TIMEs
    getAll_DATA_TIMEs(): Observable<DATA.DATA_TIME[]> {
		var qry:string;
		qry='';
		
		if(this.TSUM1!=''){
			if(qry !='') qry=qry +'&';
			qry='TSUM1='+encodeURIComponent(this.TSUM1)
		}
		if(this.TSUM2!=''){
			if(qry !='') qry=qry +'&';
			qry='TSUM2='+encodeURIComponent(this.TSUM2)
		}
		if(this.ERRTIME!=''){
			if(qry !='') qry=qry +'&';
			qry='ERRTIME='+encodeURIComponent(this.ERRTIME)
		}
		if(this.OKTIME!=''){
			if(qry !='') qry=qry +'&';
			qry='OKTIME='+encodeURIComponent(this.OKTIME)
		}
		if(this.WORKTIME!=''){
			if(qry !='') qry=qry +'&';
			qry='WORKTIME='+encodeURIComponent(this.WORKTIME)
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
			return this.http.get<DATA.DATA_TIME[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<DATA.DATA_TIME[]>(this.serviceURL + '/DATA_TIME/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.TSUM1 = '';
	this.TSUM2 = '';
	this.ERRTIME = '';
	this.OKTIME = '';
	this.WORKTIME = '';
		
	}
 
	   //Create DATA_TIME
    create_DATA_TIME(DATA_TIME: DATA.DATA_TIME): Observable<Object > {
       // DATA_TIME.DATA_TIMEId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/DATA_TIME/', DATA_TIME, { headers: cpHeaders })
		
    }
	
	//Fetch DATA_TIME by parent
    get_DATA_TIMEByParent(parentId: string): Observable<DATA.DATA_TIME[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/DATA_TIME/byparent/'+ parentId)
        return this.http.get<DATA.DATA_TIME[]>(this.serviceURL + '/DATA_TIME/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch DATA_TIME by id
    get_DATA_TIMEById(DATA_TIMEId: string): Observable<DATA.DATA_TIME> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/DATA_TIME/'+ DATA_TIMEId)
        return this.http.get<DATA.DATA_TIME>(this.serviceURL + '/DATA_TIME/' + DATA_TIMEId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update DATA_TIME
    update_DATA_TIME(DATA_TIME: DATA.DATA_TIME):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/DATA_TIME/' + DATA_TIME.DATA_TIMEId, DATA_TIME, { headers: cpHeaders })
    }
	
    //Delete DATA_TIME	
    delete_DATA_TIMEById(DATA_TIMEId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/DATA_TIME/' + DATA_TIMEId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:DATA.DATA_TIME = null;
	
	public 	get Selected():DATA.DATA_TIME{ return this.mSelecetd;}
	
	public  set Selected(_DATA_TIME:DATA.DATA_TIME){ this.mSelecetd=_DATA_TIME; }
 
}
