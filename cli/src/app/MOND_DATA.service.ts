import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MOND} from './MOND';
@Injectable()
export class MOND_DATA_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	name:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MOND_DATAs
    getAll_MOND_DATAs(): Observable<MOND.MOND_DATA[]> {
		var qry:string;
		qry='';
		
		if(this.name!=''){
			if(qry !='') qry=qry +'&';
			qry='name='+encodeURIComponent(this.name)
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
			return this.http.get<MOND.MOND_DATA[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MOND.MOND_DATA[]>(this.serviceURL + '/MOND_DATA/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.name = '';
		
	}
 
	   //Create MOND_DATA
    create_MOND_DATA(MOND_DATA: MOND.MOND_DATA): Observable<Object > {
       // MOND_DATA.MOND_DATAId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MOND_DATA/', MOND_DATA, { headers: cpHeaders })
		
    }
	
	//Fetch MOND_DATA by id
    get_MOND_DATAById(MOND_DATAId: string): Observable<MOND.MOND_DATA> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MOND_DATA/'+ MOND_DATAId)
        return this.http.get<MOND.MOND_DATA>(this.serviceURL + '/MOND_DATA/' + MOND_DATAId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MOND_DATA
    update_MOND_DATA(MOND_DATA: MOND.MOND_DATA):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MOND_DATA/' + MOND_DATA.MOND_DATAId, MOND_DATA, { headers: cpHeaders })
    }
	
    //Delete MOND_DATA	
    delete_MOND_DATAById(MOND_DATAId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MOND_DATA/' + MOND_DATAId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MOND.MOND_DATA = null;
	
	public 	get Selected():MOND.MOND_DATA{ return this.mSelecetd;}
	
	public  set Selected(_MOND_DATA:MOND.MOND_DATA){ this.mSelecetd=_MOND_DATA; }
 
}
