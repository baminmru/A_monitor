import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONNODE} from './MONNODE';
@Injectable()
export class MONN_DEF_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	Addr:string = '';
	ThePhone:string = '';
	Latitude:string = '';
	Longitude:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONN_DEFs
    getAll_MONN_DEFs(): Observable<MONNODE.MONN_DEF[]> {
		var qry:string;
		qry='';
		
		if(this.Addr!=''){
			if(qry !='') qry=qry +'&';
			qry='Addr='+encodeURIComponent(this.Addr)
		}
		if(this.ThePhone!=''){
			if(qry !='') qry=qry +'&';
			qry='ThePhone='+encodeURIComponent(this.ThePhone)
		}
		if(this.Latitude!=''){
			if(qry !='') qry=qry +'&';
			qry='Latitude='+encodeURIComponent(this.Latitude)
		}
		if(this.Longitude!=''){
			if(qry !='') qry=qry +'&';
			qry='Longitude='+encodeURIComponent(this.Longitude)
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
			return this.http.get<MONNODE.MONN_DEF[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONNODE.MONN_DEF[]>(this.serviceURL + '/MONN_DEF/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.Addr = '';
	this.ThePhone = '';
	this.Latitude = '';
	this.Longitude = '';
		
	}
 
	   //Create MONN_DEF
    create_MONN_DEF(MONN_DEF: MONNODE.MONN_DEF): Observable<Object > {
       // MONN_DEF.MONN_DEFId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONN_DEF/', MONN_DEF, { headers: cpHeaders })
		
    }
	
	//Fetch MONN_DEF by id
    get_MONN_DEFById(MONN_DEFId: string): Observable<MONNODE.MONN_DEF> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONN_DEF/'+ MONN_DEFId)
        return this.http.get<MONNODE.MONN_DEF>(this.serviceURL + '/MONN_DEF/' + MONN_DEFId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONN_DEF
    update_MONN_DEF(MONN_DEF: MONNODE.MONN_DEF):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONN_DEF/' + MONN_DEF.MONN_DEFId, MONN_DEF, { headers: cpHeaders })
    }
	
    //Delete MONN_DEF	
    delete_MONN_DEFById(MONN_DEFId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONN_DEF/' + MONN_DEFId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONNODE.MONN_DEF = null;
	
	public 	get Selected():MONNODE.MONN_DEF{ return this.mSelecetd;}
	
	public  set Selected(_MONN_DEF:MONNODE.MONN_DEF){ this.mSelecetd=_MONN_DEF; }
 
}
