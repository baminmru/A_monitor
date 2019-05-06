import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONNODE} from './MONNODE';
@Injectable()
export class MONN_LATLON_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	theDate:string = '';
	Latitude:string = '';
	Longitude:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONN_LATLONs
    getAll_MONN_LATLONs(): Observable<MONNODE.MONN_LATLON[]> {
		var qry:string;
		qry='';
		
		if(this.theDate!=''){
			if(qry !='') qry=qry +'&';
			qry='theDate='+encodeURIComponent(this.theDate)
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
			return this.http.get<MONNODE.MONN_LATLON[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONNODE.MONN_LATLON[]>(this.serviceURL + '/MONN_LATLON/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.theDate = '';
	this.Latitude = '';
	this.Longitude = '';
		
	}
 
	   //Create MONN_LATLON
    create_MONN_LATLON(MONN_LATLON: MONNODE.MONN_LATLON): Observable<Object > {
       // MONN_LATLON.MONN_LATLONId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONN_LATLON/', MONN_LATLON, { headers: cpHeaders })
		
    }
	
	//Fetch MONN_LATLON by parent
    get_MONN_LATLONByParent(parentId: string): Observable<MONNODE.MONN_LATLON[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/MONN_LATLON/byparent/'+ parentId)
        return this.http.get<MONNODE.MONN_LATLON[]>(this.serviceURL + '/MONN_LATLON/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch MONN_LATLON by id
    get_MONN_LATLONById(MONN_LATLONId: string): Observable<MONNODE.MONN_LATLON> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONN_LATLON/'+ MONN_LATLONId)
        return this.http.get<MONNODE.MONN_LATLON>(this.serviceURL + '/MONN_LATLON/' + MONN_LATLONId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONN_LATLON
    update_MONN_LATLON(MONN_LATLON: MONNODE.MONN_LATLON):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONN_LATLON/' + MONN_LATLON.MONN_LATLONId, MONN_LATLON, { headers: cpHeaders })
    }
	
    //Delete MONN_LATLON	
    delete_MONN_LATLONById(MONN_LATLONId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONN_LATLON/' + MONN_LATLONId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONNODE.MONN_LATLON = null;
	
	public 	get Selected():MONNODE.MONN_LATLON{ return this.mSelecetd;}
	
	public  set Selected(_MONN_LATLON:MONNODE.MONN_LATLON){ this.mSelecetd=_MONN_LATLON; }
 
}
