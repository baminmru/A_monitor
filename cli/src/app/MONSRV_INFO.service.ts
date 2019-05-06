import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONSRV} from './MONSRV';
@Injectable()
export class MONSRV_INFO_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	name:string = '';
	IpAddr:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONSRV_INFOs
    getAll_MONSRV_INFOs(): Observable<MONSRV.MONSRV_INFO[]> {
		var qry:string;
		qry='';
		
		if(this.name!=''){
			if(qry !='') qry=qry +'&';
			qry='name='+encodeURIComponent(this.name)
		}
		if(this.IpAddr!=''){
			if(qry !='') qry=qry +'&';
			qry='IpAddr='+encodeURIComponent(this.IpAddr)
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
			return this.http.get<MONSRV.MONSRV_INFO[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONSRV.MONSRV_INFO[]>(this.serviceURL + '/MONSRV_INFO/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.name = '';
	this.IpAddr = '';
		
	}
 
	   //Create MONSRV_INFO
    create_MONSRV_INFO(MONSRV_INFO: MONSRV.MONSRV_INFO): Observable<Object > {
       // MONSRV_INFO.MONSRV_INFOId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONSRV_INFO/', MONSRV_INFO, { headers: cpHeaders })
		
    }
	
	//Fetch MONSRV_INFO by id
    get_MONSRV_INFOById(MONSRV_INFOId: string): Observable<MONSRV.MONSRV_INFO> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONSRV_INFO/'+ MONSRV_INFOId)
        return this.http.get<MONSRV.MONSRV_INFO>(this.serviceURL + '/MONSRV_INFO/' + MONSRV_INFOId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONSRV_INFO
    update_MONSRV_INFO(MONSRV_INFO: MONSRV.MONSRV_INFO):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONSRV_INFO/' + MONSRV_INFO.MONSRV_INFOId, MONSRV_INFO, { headers: cpHeaders })
    }
	
    //Delete MONSRV_INFO	
    delete_MONSRV_INFOById(MONSRV_INFOId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONSRV_INFO/' + MONSRV_INFOId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONSRV.MONSRV_INFO = null;
	
	public 	get Selected():MONSRV.MONSRV_INFO{ return this.mSelecetd;}
	
	public  set Selected(_MONSRV_INFO:MONSRV.MONSRV_INFO){ this.mSelecetd=_MONSRV_INFO; }
 
}
