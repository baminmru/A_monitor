import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONSCH} from './MONSCH';
@Injectable()
export class MONSCH_INFO_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	NAME:string = '';
	SCHEMA_IMAGEfile:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONSCH_INFOs
    getAll_MONSCH_INFOs(): Observable<MONSCH.MONSCH_INFO[]> {
		var qry:string;
		qry='';
		
		if(this.NAME!=''){
			if(qry !='') qry=qry +'&';
			qry='NAME='+encodeURIComponent(this.NAME)
		}
		if(this.SCHEMA_IMAGEfile!=''){
			if(qry !='') qry=qry +'&';
			qry='SCHEMA_IMAGEfile='+encodeURIComponent(this.SCHEMA_IMAGEfile)
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
			return this.http.get<MONSCH.MONSCH_INFO[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONSCH.MONSCH_INFO[]>(this.serviceURL + '/MONSCH_INFO/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.NAME = '';
	this.SCHEMA_IMAGEfile = '';
		
	}
 
	   //Create MONSCH_INFO
    create_MONSCH_INFO(MONSCH_INFO: MONSCH.MONSCH_INFO): Observable<Object > {
       // MONSCH_INFO.MONSCH_INFOId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONSCH_INFO/', MONSCH_INFO, { headers: cpHeaders })
		
    }
	
	//Fetch MONSCH_INFO by id
    get_MONSCH_INFOById(MONSCH_INFOId: string): Observable<MONSCH.MONSCH_INFO> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONSCH_INFO/'+ MONSCH_INFOId)
        return this.http.get<MONSCH.MONSCH_INFO>(this.serviceURL + '/MONSCH_INFO/' + MONSCH_INFOId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONSCH_INFO
    update_MONSCH_INFO(MONSCH_INFO: MONSCH.MONSCH_INFO):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONSCH_INFO/' + MONSCH_INFO.MONSCH_INFOId, MONSCH_INFO, { headers: cpHeaders })
    }
	
    //Delete MONSCH_INFO	
    delete_MONSCH_INFOById(MONSCH_INFOId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONSCH_INFO/' + MONSCH_INFOId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONSCH.MONSCH_INFO = null;
	
	public 	get Selected():MONSCH.MONSCH_INFO{ return this.mSelecetd;}
	
	public  set Selected(_MONSCH_INFO:MONSCH.MONSCH_INFO){ this.mSelecetd=_MONSCH_INFO; }
 
}
