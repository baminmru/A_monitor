import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MOND} from './MOND';
@Injectable()
export class MOND_ATYPE_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	name:string = '';
	TheCode:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MOND_ATYPEs
    getAll_MOND_ATYPEs(): Observable<MOND.MOND_ATYPE[]> {
		var qry:string;
		qry='';
		
		if(this.name!=''){
			if(qry !='') qry=qry +'&';
			qry='name='+encodeURIComponent(this.name)
		}
		if(this.TheCode!=''){
			if(qry !='') qry=qry +'&';
			qry='TheCode='+encodeURIComponent(this.TheCode)
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
			return this.http.get<MOND.MOND_ATYPE[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MOND.MOND_ATYPE[]>(this.serviceURL + '/MOND_ATYPE/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.name = '';
	this.TheCode = '';
		
	}
 
	   //Create MOND_ATYPE
    create_MOND_ATYPE(MOND_ATYPE: MOND.MOND_ATYPE): Observable<Object > {
       // MOND_ATYPE.MOND_ATYPEId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MOND_ATYPE/', MOND_ATYPE, { headers: cpHeaders })
		
    }
	
	//Fetch MOND_ATYPE by id
    get_MOND_ATYPEById(MOND_ATYPEId: string): Observable<MOND.MOND_ATYPE> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MOND_ATYPE/'+ MOND_ATYPEId)
        return this.http.get<MOND.MOND_ATYPE>(this.serviceURL + '/MOND_ATYPE/' + MOND_ATYPEId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MOND_ATYPE
    update_MOND_ATYPE(MOND_ATYPE: MOND.MOND_ATYPE):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MOND_ATYPE/' + MOND_ATYPE.MOND_ATYPEId, MOND_ATYPE, { headers: cpHeaders })
    }
	
    //Delete MOND_ATYPE	
    delete_MOND_ATYPEById(MOND_ATYPEId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MOND_ATYPE/' + MOND_ATYPEId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MOND.MOND_ATYPE = null;
	
	public 	get Selected():MOND.MOND_ATYPE{ return this.mSelecetd;}
	
	public  set Selected(_MOND_ATYPE:MOND.MOND_ATYPE){ this.mSelecetd=_MOND_ATYPE; }
 
}
