import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONSCH} from './MONSCH';
@Injectable()
export class MONSCH_PARAM_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	POS_LEFT:string = '';
	POS_TOP:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONSCH_PARAMs
    getAll_MONSCH_PARAMs(): Observable<MONSCH.MONSCH_PARAM[]> {
		var qry:string;
		qry='';
		
		if(this.POS_LEFT!=''){
			if(qry !='') qry=qry +'&';
			qry='POS_LEFT='+encodeURIComponent(this.POS_LEFT)
		}
		if(this.POS_TOP!=''){
			if(qry !='') qry=qry +'&';
			qry='POS_TOP='+encodeURIComponent(this.POS_TOP)
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
			return this.http.get<MONSCH.MONSCH_PARAM[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONSCH.MONSCH_PARAM[]>(this.serviceURL + '/MONSCH_PARAM/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.POS_LEFT = '';
	this.POS_TOP = '';
		
	}
 
	   //Create MONSCH_PARAM
    create_MONSCH_PARAM(MONSCH_PARAM: MONSCH.MONSCH_PARAM): Observable<Object > {
       // MONSCH_PARAM.MONSCH_PARAMId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONSCH_PARAM/', MONSCH_PARAM, { headers: cpHeaders })
		
    }
	
	//Fetch MONSCH_PARAM by parent
    get_MONSCH_PARAMByParent(parentId: string): Observable<MONSCH.MONSCH_PARAM[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/MONSCH_PARAM/byparent/'+ parentId)
        return this.http.get<MONSCH.MONSCH_PARAM[]>(this.serviceURL + '/MONSCH_PARAM/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch MONSCH_PARAM by id
    get_MONSCH_PARAMById(MONSCH_PARAMId: string): Observable<MONSCH.MONSCH_PARAM> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONSCH_PARAM/'+ MONSCH_PARAMId)
        return this.http.get<MONSCH.MONSCH_PARAM>(this.serviceURL + '/MONSCH_PARAM/' + MONSCH_PARAMId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONSCH_PARAM
    update_MONSCH_PARAM(MONSCH_PARAM: MONSCH.MONSCH_PARAM):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONSCH_PARAM/' + MONSCH_PARAM.MONSCH_PARAMId, MONSCH_PARAM, { headers: cpHeaders })
    }
	
    //Delete MONSCH_PARAM	
    delete_MONSCH_PARAMById(MONSCH_PARAMId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONSCH_PARAM/' + MONSCH_PARAMId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONSCH.MONSCH_PARAM = null;
	
	public 	get Selected():MONSCH.MONSCH_PARAM{ return this.mSelecetd;}
	
	public  set Selected(_MONSCH_PARAM:MONSCH.MONSCH_PARAM){ this.mSelecetd=_MONSCH_PARAM; }
 
}
