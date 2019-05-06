import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MOND} from './MOND';
@Injectable()
export class MOND_ROLE_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	Name:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MOND_ROLEs
    getAll_MOND_ROLEs(): Observable<MOND.MOND_ROLE[]> {
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
			return this.http.get<MOND.MOND_ROLE[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MOND.MOND_ROLE[]>(this.serviceURL + '/MOND_ROLE/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.Name = '';
		
	}
 
	   //Create MOND_ROLE
    create_MOND_ROLE(MOND_ROLE: MOND.MOND_ROLE): Observable<Object > {
       // MOND_ROLE.MOND_ROLEId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MOND_ROLE/', MOND_ROLE, { headers: cpHeaders })
		
    }
	
	//Fetch MOND_ROLE by id
    get_MOND_ROLEById(MOND_ROLEId: string): Observable<MOND.MOND_ROLE> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MOND_ROLE/'+ MOND_ROLEId)
        return this.http.get<MOND.MOND_ROLE>(this.serviceURL + '/MOND_ROLE/' + MOND_ROLEId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MOND_ROLE
    update_MOND_ROLE(MOND_ROLE: MOND.MOND_ROLE):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MOND_ROLE/' + MOND_ROLE.MOND_ROLEId, MOND_ROLE, { headers: cpHeaders })
    }
	
    //Delete MOND_ROLE	
    delete_MOND_ROLEById(MOND_ROLEId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MOND_ROLE/' + MOND_ROLEId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MOND.MOND_ROLE = null;
	
	public 	get Selected():MOND.MOND_ROLE{ return this.mSelecetd;}
	
	public  set Selected(_MOND_ROLE:MOND.MOND_ROLE){ this.mSelecetd=_MOND_ROLE; }
 
}
