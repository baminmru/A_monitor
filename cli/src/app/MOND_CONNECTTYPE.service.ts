import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MOND} from './MOND';
@Injectable()
export class MOND_CONNECTTYPE_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	Name:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MOND_CONNECTTYPEs
    getAll_MOND_CONNECTTYPEs(): Observable<MOND.MOND_CONNECTTYPE[]> {
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
			return this.http.get<MOND.MOND_CONNECTTYPE[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MOND.MOND_CONNECTTYPE[]>(this.serviceURL + '/MOND_CONNECTTYPE/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.Name = '';
		
	}
 
	   //Create MOND_CONNECTTYPE
    create_MOND_CONNECTTYPE(MOND_CONNECTTYPE: MOND.MOND_CONNECTTYPE): Observable<Object > {
       // MOND_CONNECTTYPE.MOND_CONNECTTYPEId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MOND_CONNECTTYPE/', MOND_CONNECTTYPE, { headers: cpHeaders })
		
    }
	
	//Fetch MOND_CONNECTTYPE by id
    get_MOND_CONNECTTYPEById(MOND_CONNECTTYPEId: string): Observable<MOND.MOND_CONNECTTYPE> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MOND_CONNECTTYPE/'+ MOND_CONNECTTYPEId)
        return this.http.get<MOND.MOND_CONNECTTYPE>(this.serviceURL + '/MOND_CONNECTTYPE/' + MOND_CONNECTTYPEId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MOND_CONNECTTYPE
    update_MOND_CONNECTTYPE(MOND_CONNECTTYPE: MOND.MOND_CONNECTTYPE):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MOND_CONNECTTYPE/' + MOND_CONNECTTYPE.MOND_CONNECTTYPEId, MOND_CONNECTTYPE, { headers: cpHeaders })
    }
	
    //Delete MOND_CONNECTTYPE	
    delete_MOND_CONNECTTYPEById(MOND_CONNECTTYPEId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MOND_CONNECTTYPE/' + MOND_CONNECTTYPEId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MOND.MOND_CONNECTTYPE = null;
	
	public 	get Selected():MOND.MOND_CONNECTTYPE{ return this.mSelecetd;}
	
	public  set Selected(_MOND_CONNECTTYPE:MOND.MOND_CONNECTTYPE){ this.mSelecetd=_MOND_CONNECTTYPE; }
 
}
