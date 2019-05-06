import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { DATA} from './DATA';
import { DISPATCHER} from './DISPATCHER';


@Injectable()
export class DATA_RECORD_Service {
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
    
	//Fetch all DATA_RECORDs
    getAll_DATA_RECORDs(condition:DISPATCHER.FILTER): Observable<DATA.DATA_RECORD[]> {
		var qry:string;
		qry='';
		
		if(this.DCALL!=''){
			if(qry !='') qry=qry +'&';
			qry='DCALL='+encodeURIComponent(this.DCALL)
		}
		if(this.CHECK_A!=''){
			if(qry !='') qry=qry +'&';
			qry='CHECK_A='+encodeURIComponent(this.CHECK_A)
		}
		if(this.DCOUNTER!=''){
			if(qry !='') qry=qry +'&';
			qry='DCOUNTER='+encodeURIComponent(this.DCOUNTER)
		}
		if(this.dstart!=''){
			if(qry !='') qry=qry +'&';
			qry='dstart='+encodeURIComponent(this.dstart)
		}
		if(this.dend!=''){
			if(qry !='') qry=qry +'&';
			qry='dend='+encodeURIComponent(this.dend)
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
			return this.http.get<DATA.DATA_RECORD[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<DATA.DATA_RECORD[]>(this.serviceURL + '/DATA_RECORD/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.DCALL = '';
	this.CHECK_A = '';
	this.DCOUNTER = '';
	this.dstart = '';
	this.dend = '';
		
	}
 
	   //Create DATA_RECORD
    create_DATA_RECORD(DATA_RECORD: DATA.DATA_RECORD): Observable<Object > {
       // DATA_RECORD.DATA_RECORDId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/DATA_RECORD/', DATA_RECORD, { headers: cpHeaders })
		
    }
	
	//Fetch DATA_RECORD by id
    get_DATA_RECORDById(DATA_RECORDId: string): Observable<DATA.DATA_RECORD> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/DATA_RECORD/'+ DATA_RECORDId)
        return this.http.get<DATA.DATA_RECORD>(this.serviceURL + '/DATA_RECORD/' + DATA_RECORDId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update DATA_RECORD
    update_DATA_RECORD(DATA_RECORD: DATA.DATA_RECORD):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/DATA_RECORD/' + DATA_RECORD.DATA_RECORDId, DATA_RECORD, { headers: cpHeaders })
    }
	
    //Delete DATA_RECORD	
    delete_DATA_RECORDById(DATA_RECORDId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/DATA_RECORD/' + DATA_RECORDId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:DATA.DATA_RECORD = null;
	
	public 	get Selected():DATA.DATA_RECORD{ return this.mSelecetd;}
	
	public  set Selected(_DATA_RECORD:DATA.DATA_RECORD){ this.mSelecetd=_DATA_RECORD; }
 
}
