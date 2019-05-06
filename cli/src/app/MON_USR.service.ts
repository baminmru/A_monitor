import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONUSR} from './MONUSR';
@Injectable()
export class MON_USR_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	lastname:string = '';
	name:string = '';
	surname:string = '';
	email:string = '';
	thephone:string = '';
	login:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MON_USRs
    getAll_MON_USRs(): Observable<MONUSR.MON_USR[]> {
		var qry:string;
		qry='';
		
		if(this.lastname!=''){
			if(qry !='') qry=qry +'&';
			qry='lastname='+encodeURIComponent(this.lastname)
		}
		if(this.name!=''){
			if(qry !='') qry=qry +'&';
			qry='name='+encodeURIComponent(this.name)
		}
		if(this.surname!=''){
			if(qry !='') qry=qry +'&';
			qry='surname='+encodeURIComponent(this.surname)
		}
		if(this.email!=''){
			if(qry !='') qry=qry +'&';
			qry='email='+encodeURIComponent(this.email)
		}
		if(this.thephone!=''){
			if(qry !='') qry=qry +'&';
			qry='thephone='+encodeURIComponent(this.thephone)
		}
		if(this.login!=''){
			if(qry !='') qry=qry +'&';
			qry='login='+encodeURIComponent(this.login)
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
			return this.http.get<MONUSR.MON_USR[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONUSR.MON_USR[]>(this.serviceURL + '/MON_USR/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.lastname = '';
	this.name = '';
	this.surname = '';
	this.email = '';
	this.thephone = '';
	this.login = '';
		
	}
 
	   //Create MON_USR
    create_MON_USR(MON_USR: MONUSR.MON_USR): Observable<Object > {
       // MON_USR.MON_USRId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MON_USR/', MON_USR, { headers: cpHeaders })
		
    }
	
	//Fetch MON_USR by id
    get_MON_USRById(MON_USRId: string): Observable<MONUSR.MON_USR> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MON_USR/'+ MON_USRId)
        return this.http.get<MONUSR.MON_USR>(this.serviceURL + '/MON_USR/' + MON_USRId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MON_USR
    update_MON_USR(MON_USR: MONUSR.MON_USR):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MON_USR/' + MON_USR.MON_USRId, MON_USR, { headers: cpHeaders })
    }
	
    //Delete MON_USR	
    delete_MON_USRById(MON_USRId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MON_USR/' + MON_USRId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONUSR.MON_USR = null;
	
	public 	get Selected():MONUSR.MON_USR{ return this.mSelecetd;}
	
	public  set Selected(_MON_USR:MONUSR.MON_USR){ this.mSelecetd=_MON_USR; }
 
}
