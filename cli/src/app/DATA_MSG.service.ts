import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { DATA} from './DATA';
@Injectable()
export class DATA_MSG_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	HC_1:string = '';
	HC_2:string = '';
	errInfo:string = '';
	HC_CODE:string = '';
	HC:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all DATA_MSGs
    getAll_DATA_MSGs(): Observable<DATA.DATA_MSG[]> {
		var qry:string;
		qry='';
		
		if(this.HC_1!=''){
			if(qry !='') qry=qry +'&';
			qry='HC_1='+encodeURIComponent(this.HC_1)
		}
		if(this.HC_2!=''){
			if(qry !='') qry=qry +'&';
			qry='HC_2='+encodeURIComponent(this.HC_2)
		}
		if(this.errInfo!=''){
			if(qry !='') qry=qry +'&';
			qry='errInfo='+encodeURIComponent(this.errInfo)
		}
		if(this.HC_CODE!=''){
			if(qry !='') qry=qry +'&';
			qry='HC_CODE='+encodeURIComponent(this.HC_CODE)
		}
		if(this.HC!=''){
			if(qry !='') qry=qry +'&';
			qry='HC='+encodeURIComponent(this.HC)
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
			return this.http.get<DATA.DATA_MSG[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<DATA.DATA_MSG[]>(this.serviceURL + '/DATA_MSG/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.HC_1 = '';
	this.HC_2 = '';
	this.errInfo = '';
	this.HC_CODE = '';
	this.HC = '';
		
	}
 
	   //Create DATA_MSG
    create_DATA_MSG(DATA_MSG: DATA.DATA_MSG): Observable<Object > {
       // DATA_MSG.DATA_MSGId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/DATA_MSG/', DATA_MSG, { headers: cpHeaders })
		
    }
	
	//Fetch DATA_MSG by parent
    get_DATA_MSGByParent(parentId: string): Observable<DATA.DATA_MSG[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/DATA_MSG/byparent/'+ parentId)
        return this.http.get<DATA.DATA_MSG[]>(this.serviceURL + '/DATA_MSG/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch DATA_MSG by id
    get_DATA_MSGById(DATA_MSGId: string): Observable<DATA.DATA_MSG> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/DATA_MSG/'+ DATA_MSGId)
        return this.http.get<DATA.DATA_MSG>(this.serviceURL + '/DATA_MSG/' + DATA_MSGId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update DATA_MSG
    update_DATA_MSG(DATA_MSG: DATA.DATA_MSG):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/DATA_MSG/' + DATA_MSG.DATA_MSGId, DATA_MSG, { headers: cpHeaders })
    }
	
    //Delete DATA_MSG	
    delete_DATA_MSGById(DATA_MSGId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/DATA_MSG/' + DATA_MSGId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:DATA.DATA_MSG = null;
	
	public 	get Selected():DATA.DATA_MSG{ return this.mSelecetd;}
	
	public  set Selected(_DATA_MSG:DATA.DATA_MSG){ this.mSelecetd=_DATA_MSG; }
 
}
