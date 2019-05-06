import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONSRV} from './MONSRV';
@Injectable()
export class MONSRV_PORTS_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	PortName:string = '';
	UsedUntil:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONSRV_PORTSs
    getAll_MONSRV_PORTSs(): Observable<MONSRV.MONSRV_PORTS[]> {
		var qry:string;
		qry='';
		
		if(this.PortName!=''){
			if(qry !='') qry=qry +'&';
			qry='PortName='+encodeURIComponent(this.PortName)
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
			return this.http.get<MONSRV.MONSRV_PORTS[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONSRV.MONSRV_PORTS[]>(this.serviceURL + '/MONSRV_PORTS/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.PortName = '';
	this.UsedUntil = '';
		
	}
 
	   //Create MONSRV_PORTS
    create_MONSRV_PORTS(MONSRV_PORTS: MONSRV.MONSRV_PORTS): Observable<Object > {
       // MONSRV_PORTS.MONSRV_PORTSId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONSRV_PORTS/', MONSRV_PORTS, { headers: cpHeaders })
		
    }
	
	//Fetch MONSRV_PORTS by parent
    get_MONSRV_PORTSByParent(parentId: string): Observable<MONSRV.MONSRV_PORTS[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/MONSRV_PORTS/byparent/'+ parentId)
        return this.http.get<MONSRV.MONSRV_PORTS[]>(this.serviceURL + '/MONSRV_PORTS/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch MONSRV_PORTS by id
    get_MONSRV_PORTSById(MONSRV_PORTSId: string): Observable<MONSRV.MONSRV_PORTS> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONSRV_PORTS/'+ MONSRV_PORTSId)
        return this.http.get<MONSRV.MONSRV_PORTS>(this.serviceURL + '/MONSRV_PORTS/' + MONSRV_PORTSId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONSRV_PORTS
    update_MONSRV_PORTS(MONSRV_PORTS: MONSRV.MONSRV_PORTS):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONSRV_PORTS/' + MONSRV_PORTS.MONSRV_PORTSId, MONSRV_PORTS, { headers: cpHeaders })
    }
	
    //Delete MONSRV_PORTS	
    delete_MONSRV_PORTSById(MONSRV_PORTSId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONSRV_PORTS/' + MONSRV_PORTSId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONSRV.MONSRV_PORTS = null;
	
	public 	get Selected():MONSRV.MONSRV_PORTS{ return this.mSelecetd;}
	
	public  set Selected(_MONSRV_PORTS:MONSRV.MONSRV_PORTS){ this.mSelecetd=_MONSRV_PORTS; }
 
}
