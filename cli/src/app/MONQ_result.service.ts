import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONQ} from './MONQ';
@Injectable()
export class MONQ_result_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	TextResult:string = '';
	LogMessage:string = '';
	StartTime:string = '';
	EndTime:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONQ_results
    getAll_MONQ_results(): Observable<MONQ.MONQ_result[]> {
		var qry:string;
		qry='';
		
		if(this.TextResult!=''){
			if(qry !='') qry=qry +'&';
			qry='TextResult='+encodeURIComponent(this.TextResult)
		}
		if(this.LogMessage!=''){
			if(qry !='') qry=qry +'&';
			qry='LogMessage='+encodeURIComponent(this.LogMessage)
		}
		if(this.StartTime!=''){
			if(qry !='') qry=qry +'&';
			qry='StartTime='+encodeURIComponent(this.StartTime)
		}
		if(this.EndTime!=''){
			if(qry !='') qry=qry +'&';
			qry='EndTime='+encodeURIComponent(this.EndTime)
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
			return this.http.get<MONQ.MONQ_result[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONQ.MONQ_result[]>(this.serviceURL + '/MONQ_result/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.TextResult = '';
	this.LogMessage = '';
	this.StartTime = '';
	this.EndTime = '';
		
	}
 
	   //Create MONQ_result
    create_MONQ_result(MONQ_result: MONQ.MONQ_result): Observable<Object > {
       // MONQ_result.MONQ_resultId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONQ_result/', MONQ_result, { headers: cpHeaders })
		
    }
	
	//Fetch MONQ_result by parent
    get_MONQ_resultByParent(parentId: string): Observable<MONQ.MONQ_result[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/MONQ_result/byparent/'+ parentId)
        return this.http.get<MONQ.MONQ_result[]>(this.serviceURL + '/MONQ_result/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch MONQ_result by id
    get_MONQ_resultById(MONQ_resultId: string): Observable<MONQ.MONQ_result> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONQ_result/'+ MONQ_resultId)
        return this.http.get<MONQ.MONQ_result>(this.serviceURL + '/MONQ_result/' + MONQ_resultId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONQ_result
    update_MONQ_result(MONQ_result: MONQ.MONQ_result):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONQ_result/' + MONQ_result.MONQ_resultId, MONQ_result, { headers: cpHeaders })
    }
	
    //Delete MONQ_result	
    delete_MONQ_resultById(MONQ_resultId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONQ_result/' + MONQ_resultId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONQ.MONQ_result = null;
	
	public 	get Selected():MONQ.MONQ_result{ return this.mSelecetd;}
	
	public  set Selected(_MONQ_result:MONQ.MONQ_result){ this.mSelecetd=_MONQ_result; }
 
}
