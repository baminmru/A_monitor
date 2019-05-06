import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONSRV} from './MONSRV';
@Injectable()
export class MONSRV_MODEMS_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	PortNum:string = '';
	UsedUntil:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONSRV_MODEMSs
    getAll_MONSRV_MODEMSs(): Observable<MONSRV.MONSRV_MODEMS[]> {
		var qry:string;
		qry='';
		
		if(this.PortNum!=''){
			if(qry !='') qry=qry +'&';
			qry='PortNum='+encodeURIComponent(this.PortNum)
		}
		if(this.UsedUntil!=''){
			if(qry !='') qry=qry +'&';
			qry='UsedUntil='+encodeURIComponent(this.UsedUntil)
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
			return this.http.get<MONSRV.MONSRV_MODEMS[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONSRV.MONSRV_MODEMS[]>(this.serviceURL + '/MONSRV_MODEMS/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.PortNum = '';
	this.UsedUntil = '';
		
	}
 
	   //Create MONSRV_MODEMS
    create_MONSRV_MODEMS(MONSRV_MODEMS: MONSRV.MONSRV_MODEMS): Observable<Object > {
       // MONSRV_MODEMS.MONSRV_MODEMSId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONSRV_MODEMS/', MONSRV_MODEMS, { headers: cpHeaders })
		
    }
	
	//Fetch MONSRV_MODEMS by parent
    get_MONSRV_MODEMSByParent(parentId: string): Observable<MONSRV.MONSRV_MODEMS[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/MONSRV_MODEMS/byparent/'+ parentId)
        return this.http.get<MONSRV.MONSRV_MODEMS[]>(this.serviceURL + '/MONSRV_MODEMS/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch MONSRV_MODEMS by id
    get_MONSRV_MODEMSById(MONSRV_MODEMSId: string): Observable<MONSRV.MONSRV_MODEMS> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONSRV_MODEMS/'+ MONSRV_MODEMSId)
        return this.http.get<MONSRV.MONSRV_MODEMS>(this.serviceURL + '/MONSRV_MODEMS/' + MONSRV_MODEMSId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONSRV_MODEMS
    update_MONSRV_MODEMS(MONSRV_MODEMS: MONSRV.MONSRV_MODEMS):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONSRV_MODEMS/' + MONSRV_MODEMS.MONSRV_MODEMSId, MONSRV_MODEMS, { headers: cpHeaders })
    }
	
    //Delete MONSRV_MODEMS	
    delete_MONSRV_MODEMSById(MONSRV_MODEMSId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONSRV_MODEMS/' + MONSRV_MODEMSId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONSRV.MONSRV_MODEMS = null;
	
	public 	get Selected():MONSRV.MONSRV_MODEMS{ return this.mSelecetd;}
	
	public  set Selected(_MONSRV_MODEMS:MONSRV.MONSRV_MODEMS){ this.mSelecetd=_MONSRV_MODEMS; }
 
}
