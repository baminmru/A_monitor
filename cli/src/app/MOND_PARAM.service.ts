import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MOND} from './MOND';
@Injectable()
export class MOND_PARAM_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	Name:string = '';
	ParamField:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MOND_PARAMs
    getAll_MOND_PARAMs(): Observable<MOND.MOND_PARAM[]> {
		var qry:string;
		qry='';
		
		if(this.Name!=''){
			if(qry !='') qry=qry +'&';
			qry='Name='+encodeURIComponent(this.Name)
		}
		if(this.ParamField!=''){
			if(qry !='') qry=qry +'&';
			qry='ParamField='+encodeURIComponent(this.ParamField)
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
			return this.http.get<MOND.MOND_PARAM[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MOND.MOND_PARAM[]>(this.serviceURL + '/MOND_PARAM/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.Name = '';
	this.ParamField = '';
		
	}
 
	   //Create MOND_PARAM
    create_MOND_PARAM(MOND_PARAM: MOND.MOND_PARAM): Observable<Object > {
       // MOND_PARAM.MOND_PARAMId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MOND_PARAM/', MOND_PARAM, { headers: cpHeaders })
		
    }
	
	//Fetch MOND_PARAM by id
    get_MOND_PARAMById(MOND_PARAMId: string): Observable<MOND.MOND_PARAM> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MOND_PARAM/'+ MOND_PARAMId)
        return this.http.get<MOND.MOND_PARAM>(this.serviceURL + '/MOND_PARAM/' + MOND_PARAMId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MOND_PARAM
    update_MOND_PARAM(MOND_PARAM: MOND.MOND_PARAM):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MOND_PARAM/' + MOND_PARAM.MOND_PARAMId, MOND_PARAM, { headers: cpHeaders })
    }
	
    //Delete MOND_PARAM	
    delete_MOND_PARAMById(MOND_PARAMId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MOND_PARAM/' + MOND_PARAMId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MOND.MOND_PARAM = null;
	
	public 	get Selected():MOND.MOND_PARAM{ return this.mSelecetd;}
	
	public  set Selected(_MOND_PARAM:MOND.MOND_PARAM){ this.mSelecetd=_MOND_PARAM; }
 
}
