import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONDEV} from './MONDEV';
@Injectable()
export class MONDEV_BDEVICES_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	Name:string = '';
	ThePhone:string = '';
	Addr:string = '';
	NPLOCK:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONDEV_BDEVICESs
    getAll_MONDEV_BDEVICESs(): Observable<MONDEV.MONDEV_BDEVICES[]> {
		var qry:string;
		qry='';
		
		if(this.Name!=''){
			if(qry !='') qry=qry +'&';
			qry='Name='+encodeURIComponent(this.Name)
		}
		if(this.ThePhone!=''){
			if(qry !='') qry=qry +'&';
			qry='ThePhone='+encodeURIComponent(this.ThePhone)
		}
		if(this.Addr!=''){
			if(qry !='') qry=qry +'&';
			qry='Addr='+encodeURIComponent(this.Addr)
		}
		if(this.NPLOCK!=''){
			if(qry !='') qry=qry +'&';
			qry='NPLOCK='+encodeURIComponent(this.NPLOCK)
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
			return this.http.get<MONDEV.MONDEV_BDEVICES[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONDEV.MONDEV_BDEVICES[]>(this.serviceURL + '/MONDEV_BDEVICES/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.Name = '';
	this.ThePhone = '';
	this.Addr = '';
	this.NPLOCK = '';
		
	}
 
	   //Create MONDEV_BDEVICES
    create_MONDEV_BDEVICES(MONDEV_BDEVICES: MONDEV.MONDEV_BDEVICES): Observable<Object > {
       // MONDEV_BDEVICES.MONDEV_BDEVICESId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONDEV_BDEVICES/', MONDEV_BDEVICES, { headers: cpHeaders })
		
    }
	
	//Fetch MONDEV_BDEVICES by id
    get_MONDEV_BDEVICESById(MONDEV_BDEVICESId: string): Observable<MONDEV.MONDEV_BDEVICES> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONDEV_BDEVICES/'+ MONDEV_BDEVICESId)
        return this.http.get<MONDEV.MONDEV_BDEVICES>(this.serviceURL + '/MONDEV_BDEVICES/' + MONDEV_BDEVICESId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONDEV_BDEVICES
    update_MONDEV_BDEVICES(MONDEV_BDEVICES: MONDEV.MONDEV_BDEVICES):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONDEV_BDEVICES/' + MONDEV_BDEVICES.MONDEV_BDEVICESId, MONDEV_BDEVICES, { headers: cpHeaders })
    }
	
    //Delete MONDEV_BDEVICES	
    delete_MONDEV_BDEVICESById(MONDEV_BDEVICESId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONDEV_BDEVICES/' + MONDEV_BDEVICESId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONDEV.MONDEV_BDEVICES = null;
	
	public 	get Selected():MONDEV.MONDEV_BDEVICES{ return this.mSelecetd;}
	
	public  set Selected(_MONDEV_BDEVICES:MONDEV.MONDEV_BDEVICES){ this.mSelecetd=_MONDEV_BDEVICES; }
 
}
