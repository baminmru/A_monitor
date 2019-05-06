import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MOND} from './MOND';
@Injectable()
export class MOND_DEVCLASS_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	Name:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MOND_DEVCLASSs
    getAll_MOND_DEVCLASSs(): Observable<MOND.MOND_DEVCLASS[]> {
		var qry:string;
		qry='';
		
		if(this.Name!=''){
			if(qry !='') qry=qry +'&';
			qry='Name='+encodeURIComponent(this.Name)
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
			return this.http.get<MOND.MOND_DEVCLASS[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MOND.MOND_DEVCLASS[]>(this.serviceURL + '/MOND_DEVCLASS/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.Name = '';
		
	}
 
	   //Create MOND_DEVCLASS
    create_MOND_DEVCLASS(MOND_DEVCLASS: MOND.MOND_DEVCLASS): Observable<Object > {
       // MOND_DEVCLASS.MOND_DEVCLASSId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MOND_DEVCLASS/', MOND_DEVCLASS, { headers: cpHeaders })
		
    }
	
	//Fetch MOND_DEVCLASS by id
    get_MOND_DEVCLASSById(MOND_DEVCLASSId: string): Observable<MOND.MOND_DEVCLASS> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MOND_DEVCLASS/'+ MOND_DEVCLASSId)
        return this.http.get<MOND.MOND_DEVCLASS>(this.serviceURL + '/MOND_DEVCLASS/' + MOND_DEVCLASSId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MOND_DEVCLASS
    update_MOND_DEVCLASS(MOND_DEVCLASS: MOND.MOND_DEVCLASS):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MOND_DEVCLASS/' + MOND_DEVCLASS.MOND_DEVCLASSId, MOND_DEVCLASS, { headers: cpHeaders })
    }
	
    //Delete MOND_DEVCLASS	
    delete_MOND_DEVCLASSById(MOND_DEVCLASSId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MOND_DEVCLASS/' + MOND_DEVCLASSId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MOND.MOND_DEVCLASS = null;
	
	public 	get Selected():MOND.MOND_DEVCLASS{ return this.mSelecetd;}
	
	public  set Selected(_MOND_DEVCLASS:MOND.MOND_DEVCLASS){ this.mSelecetd=_MOND_DEVCLASS; }
 
}
