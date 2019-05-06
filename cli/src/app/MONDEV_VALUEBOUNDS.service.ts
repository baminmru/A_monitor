import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONDEV} from './MONDEV';
@Injectable()
export class MONDEV_VALUEBOUNDS_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	PMIN:string = '';
	PMAX:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONDEV_VALUEBOUNDSs
    getAll_MONDEV_VALUEBOUNDSs(): Observable<MONDEV.MONDEV_VALUEBOUNDS[]> {
		var qry:string;
		qry='';
		
		if(this.PMIN!=''){
			if(qry !='') qry=qry +'&';
			qry='PMIN='+encodeURIComponent(this.PMIN)
		}
		if(this.PMAX!=''){
			if(qry !='') qry=qry +'&';
			qry='PMAX='+encodeURIComponent(this.PMAX)
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
			return this.http.get<MONDEV.MONDEV_VALUEBOUNDS[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONDEV.MONDEV_VALUEBOUNDS[]>(this.serviceURL + '/MONDEV_VALUEBOUNDS/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.PMIN = '';
	this.PMAX = '';
		
	}
 
	   //Create MONDEV_VALUEBOUNDS
    create_MONDEV_VALUEBOUNDS(MONDEV_VALUEBOUNDS: MONDEV.MONDEV_VALUEBOUNDS): Observable<Object > {
       // MONDEV_VALUEBOUNDS.MONDEV_VALUEBOUNDSId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONDEV_VALUEBOUNDS/', MONDEV_VALUEBOUNDS, { headers: cpHeaders })
		
    }
	
	//Fetch MONDEV_VALUEBOUNDS by parent
    get_MONDEV_VALUEBOUNDSByParent(parentId: string): Observable<MONDEV.MONDEV_VALUEBOUNDS[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/MONDEV_VALUEBOUNDS/byparent/'+ parentId)
        return this.http.get<MONDEV.MONDEV_VALUEBOUNDS[]>(this.serviceURL + '/MONDEV_VALUEBOUNDS/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch MONDEV_VALUEBOUNDS by id
    get_MONDEV_VALUEBOUNDSById(MONDEV_VALUEBOUNDSId: string): Observable<MONDEV.MONDEV_VALUEBOUNDS> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONDEV_VALUEBOUNDS/'+ MONDEV_VALUEBOUNDSId)
        return this.http.get<MONDEV.MONDEV_VALUEBOUNDS>(this.serviceURL + '/MONDEV_VALUEBOUNDS/' + MONDEV_VALUEBOUNDSId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONDEV_VALUEBOUNDS
    update_MONDEV_VALUEBOUNDS(MONDEV_VALUEBOUNDS: MONDEV.MONDEV_VALUEBOUNDS):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONDEV_VALUEBOUNDS/' + MONDEV_VALUEBOUNDS.MONDEV_VALUEBOUNDSId, MONDEV_VALUEBOUNDS, { headers: cpHeaders })
    }
	
    //Delete MONDEV_VALUEBOUNDS	
    delete_MONDEV_VALUEBOUNDSById(MONDEV_VALUEBOUNDSId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONDEV_VALUEBOUNDS/' + MONDEV_VALUEBOUNDSId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONDEV.MONDEV_VALUEBOUNDS = null;
	
	public 	get Selected():MONDEV.MONDEV_VALUEBOUNDS{ return this.mSelecetd;}
	
	public  set Selected(_MONDEV_VALUEBOUNDS:MONDEV.MONDEV_VALUEBOUNDS){ this.mSelecetd=_MONDEV_VALUEBOUNDS; }
 
}
