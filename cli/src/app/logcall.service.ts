import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { monlog} from './monlog';
@Injectable()
export class logcall_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	DCALL:string = '';
	CPORT:string = '';
	DURATION:string = '';
	CRESULT:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all logcalls
    getAll_logcalls(): Observable<monlog.logcall[]> {
		var qry:string;
		qry='';
		
		if(this.DCALL!=''){
			if(qry !='') qry=qry +'&';
			qry='DCALL='+encodeURIComponent(this.DCALL)
		}
		if(this.CPORT!=''){
			if(qry !='') qry=qry +'&';
			qry='CPORT='+encodeURIComponent(this.CPORT)
		}
		if(this.DURATION!=''){
			if(qry !='') qry=qry +'&';
			qry='DURATION='+encodeURIComponent(this.DURATION)
		}
		if(this.CRESULT!=''){
			if(qry !='') qry=qry +'&';
			qry='CRESULT='+encodeURIComponent(this.CRESULT)
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
			return this.http.get<monlog.logcall[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<monlog.logcall[]>(this.serviceURL + '/logcall/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.DCALL = '';
	this.CPORT = '';
	this.DURATION = '';
	this.CRESULT = '';
		
	}
 
	   //Create logcall
    create_logcall(logcall: monlog.logcall): Observable<Object > {
       // logcall.logcallId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/logcall/', logcall, { headers: cpHeaders })
		
    }
	
	//Fetch logcall by id
    get_logcallById(logcallId: string): Observable<monlog.logcall> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/logcall/'+ logcallId)
        return this.http.get<monlog.logcall>(this.serviceURL + '/logcall/' + logcallId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update logcall
    update_logcall(logcall: monlog.logcall):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/logcall/' + logcall.logcallId, logcall, { headers: cpHeaders })
    }
	
    //Delete logcall	
    delete_logcallById(logcallId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/logcall/' + logcallId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:monlog.logcall = null;
	
	public 	get Selected():monlog.logcall{ return this.mSelecetd;}
	
	public  set Selected(_logcall:monlog.logcall){ this.mSelecetd=_logcall; }
 
}
