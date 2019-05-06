import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MOND} from './MOND';
@Injectable()
export class MOND_SNABTOP_Service {
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
    
	//Fetch all MOND_SNABTOPs
    getAll_MOND_SNABTOPs(): Observable<MOND.MOND_SNABTOP[]> {
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
			return this.http.get<MOND.MOND_SNABTOP[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MOND.MOND_SNABTOP[]>(this.serviceURL + '/MOND_SNABTOP/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.CNAME = '';
	this.CADDRESS = '';
	this.CFIO = '';
	this.CPHONE = '';
	this.CREGION = '';
		
	}
 
	   //Create MOND_SNABTOP
    create_MOND_SNABTOP(MOND_SNABTOP: MOND.MOND_SNABTOP): Observable<Object > {
       // MOND_SNABTOP.MOND_SNABTOPId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MOND_SNABTOP/', MOND_SNABTOP, { headers: cpHeaders })
		
    }
	
	//Fetch MOND_SNABTOP by id
    get_MOND_SNABTOPById(MOND_SNABTOPId: string): Observable<MOND.MOND_SNABTOP> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MOND_SNABTOP/'+ MOND_SNABTOPId)
        return this.http.get<MOND.MOND_SNABTOP>(this.serviceURL + '/MOND_SNABTOP/' + MOND_SNABTOPId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MOND_SNABTOP
    update_MOND_SNABTOP(MOND_SNABTOP: MOND.MOND_SNABTOP):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MOND_SNABTOP/' + MOND_SNABTOP.MOND_SNABTOPId, MOND_SNABTOP, { headers: cpHeaders })
    }
	
    //Delete MOND_SNABTOP	
    delete_MOND_SNABTOPById(MOND_SNABTOPId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MOND_SNABTOP/' + MOND_SNABTOPId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MOND.MOND_SNABTOP = null;
	
	public 	get Selected():MOND.MOND_SNABTOP{ return this.mSelecetd;}
	
	public  set Selected(_MOND_SNABTOP:MOND.MOND_SNABTOP){ this.mSelecetd=_MOND_SNABTOP; }
 
}
