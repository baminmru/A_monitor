import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { DATA} from './DATA';
@Injectable()
export class DATA_Q_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	Q1:string = '';
	Q2:string = '';
	Q3:string = '';
	Q4:string = '';
	Q5:string = '';
	DQ12:string = '';
	DQ45:string = '';
	DQ:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all DATA_Qs
    getAll_DATA_Qs(): Observable<DATA.DATA_Q[]> {
		var qry:string;
		qry='';
		
		if(this.Q1!=''){
			if(qry !='') qry=qry +'&';
			qry='Q1='+encodeURIComponent(this.Q1)
		}
		if(this.Q2!=''){
			if(qry !='') qry=qry +'&';
			qry='Q2='+encodeURIComponent(this.Q2)
		}
		if(this.Q3!=''){
			if(qry !='') qry=qry +'&';
			qry='Q3='+encodeURIComponent(this.Q3)
		}
		if(this.Q4!=''){
			if(qry !='') qry=qry +'&';
			qry='Q4='+encodeURIComponent(this.Q4)
		}
		if(this.Q5!=''){
			if(qry !='') qry=qry +'&';
			qry='Q5='+encodeURIComponent(this.Q5)
		}
		if(this.DQ12!=''){
			if(qry !='') qry=qry +'&';
			qry='DQ12='+encodeURIComponent(this.DQ12)
		}
		if(this.DQ45!=''){
			if(qry !='') qry=qry +'&';
			qry='DQ45='+encodeURIComponent(this.DQ45)
		}
		if(this.DQ!=''){
			if(qry !='') qry=qry +'&';
			qry='DQ='+encodeURIComponent(this.DQ)
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
			return this.http.get<DATA.DATA_Q[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<DATA.DATA_Q[]>(this.serviceURL + '/DATA_Q/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.Q1 = '';
	this.Q2 = '';
	this.Q3 = '';
	this.Q4 = '';
	this.Q5 = '';
	this.DQ12 = '';
	this.DQ45 = '';
	this.DQ = '';
		
	}
 
	   //Create DATA_Q
    create_DATA_Q(DATA_Q: DATA.DATA_Q): Observable<Object > {
       // DATA_Q.DATA_QId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/DATA_Q/', DATA_Q, { headers: cpHeaders })
		
    }
	
	//Fetch DATA_Q by parent
    get_DATA_QByParent(parentId: string): Observable<DATA.DATA_Q[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/DATA_Q/byparent/'+ parentId)
        return this.http.get<DATA.DATA_Q[]>(this.serviceURL + '/DATA_Q/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch DATA_Q by id
    get_DATA_QById(DATA_QId: string): Observable<DATA.DATA_Q> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/DATA_Q/'+ DATA_QId)
        return this.http.get<DATA.DATA_Q>(this.serviceURL + '/DATA_Q/' + DATA_QId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update DATA_Q
    update_DATA_Q(DATA_Q: DATA.DATA_Q):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/DATA_Q/' + DATA_Q.DATA_QId, DATA_Q, { headers: cpHeaders })
    }
	
    //Delete DATA_Q	
    delete_DATA_QById(DATA_QId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/DATA_Q/' + DATA_QId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:DATA.DATA_Q = null;
	
	public 	get Selected():DATA.DATA_Q{ return this.mSelecetd;}
	
	public  set Selected(_DATA_Q:DATA.DATA_Q){ this.mSelecetd=_DATA_Q; }
 
}
