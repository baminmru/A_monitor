import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MOND} from './MOND';
@Injectable()
export class MOND_SNAB_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	CNAME:string = '';
	CADDRESS:string = '';
	CFIO:string = '';
	CPHONE:string = '';
	CREGION:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MOND_SNABs
    getAll_MOND_SNABs(): Observable<MOND.MOND_SNAB[]> {
		var qry:string;
		qry='';
		
		if(this.CNAME!=''){
			if(qry !='') qry=qry +'&';
			qry='CNAME='+encodeURIComponent(this.CNAME)
		}
		if(this.CADDRESS!=''){
			if(qry !='') qry=qry +'&';
			qry='CADDRESS='+encodeURIComponent(this.CADDRESS)
		}
		if(this.CFIO!=''){
			if(qry !='') qry=qry +'&';
			qry='CFIO='+encodeURIComponent(this.CFIO)
		}
		if(this.CPHONE!=''){
			if(qry !='') qry=qry +'&';
			qry='CPHONE='+encodeURIComponent(this.CPHONE)
		}
		if(this.CREGION!=''){
			if(qry !='') qry=qry +'&';
			qry='CREGION='+encodeURIComponent(this.CREGION)
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
			return this.http.get<MOND.MOND_SNAB[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MOND.MOND_SNAB[]>(this.serviceURL + '/MOND_SNAB/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.CNAME = '';
	this.CADDRESS = '';
	this.CFIO = '';
	this.CPHONE = '';
	this.CREGION = '';
		
	}
 
	   //Create MOND_SNAB
    create_MOND_SNAB(MOND_SNAB: MOND.MOND_SNAB): Observable<Object > {
       // MOND_SNAB.MOND_SNABId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MOND_SNAB/', MOND_SNAB, { headers: cpHeaders })
		
    }
	
	//Fetch MOND_SNAB by id
    get_MOND_SNABById(MOND_SNABId: string): Observable<MOND.MOND_SNAB> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MOND_SNAB/'+ MOND_SNABId)
        return this.http.get<MOND.MOND_SNAB>(this.serviceURL + '/MOND_SNAB/' + MOND_SNABId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MOND_SNAB
    update_MOND_SNAB(MOND_SNAB: MOND.MOND_SNAB):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MOND_SNAB/' + MOND_SNAB.MOND_SNABId, MOND_SNAB, { headers: cpHeaders })
    }
	
    //Delete MOND_SNAB	
    delete_MOND_SNABById(MOND_SNABId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MOND_SNAB/' + MOND_SNABId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MOND.MOND_SNAB = null;
	
	public 	get Selected():MOND.MOND_SNAB{ return this.mSelecetd;}
	
	public  set Selected(_MOND_SNAB:MOND.MOND_SNAB){ this.mSelecetd=_MOND_SNAB; }
 
}
