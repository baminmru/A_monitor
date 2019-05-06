import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { DATA} from './DATA';
@Injectable()
export class DATA_M_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	M1:string = '';
	M2:string = '';
	M3:string = '';
	M4:string = '';
	M5:string = '';
	M6:string = '';
	DM45:string = '';
	DM12:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all DATA_Ms
    getAll_DATA_Ms(): Observable<DATA.DATA_M[]> {
		var qry:string;
		qry='';
		
		if(this.M1!=''){
			if(qry !='') qry=qry +'&';
			qry='M1='+encodeURIComponent(this.M1)
		}
		if(this.M2!=''){
			if(qry !='') qry=qry +'&';
			qry='M2='+encodeURIComponent(this.M2)
		}
		if(this.M3!=''){
			if(qry !='') qry=qry +'&';
			qry='M3='+encodeURIComponent(this.M3)
		}
		if(this.M4!=''){
			if(qry !='') qry=qry +'&';
			qry='M4='+encodeURIComponent(this.M4)
		}
		if(this.M5!=''){
			if(qry !='') qry=qry +'&';
			qry='M5='+encodeURIComponent(this.M5)
		}
		if(this.M6!=''){
			if(qry !='') qry=qry +'&';
			qry='M6='+encodeURIComponent(this.M6)
		}
		if(this.DM45!=''){
			if(qry !='') qry=qry +'&';
			qry='DM45='+encodeURIComponent(this.DM45)
		}
		if(this.DM12!=''){
			if(qry !='') qry=qry +'&';
			qry='DM12='+encodeURIComponent(this.DM12)
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
			return this.http.get<DATA.DATA_M[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<DATA.DATA_M[]>(this.serviceURL + '/DATA_M/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.M1 = '';
	this.M2 = '';
	this.M3 = '';
	this.M4 = '';
	this.M5 = '';
	this.M6 = '';
	this.DM45 = '';
	this.DM12 = '';
		
	}
 
	   //Create DATA_M
    create_DATA_M(DATA_M: DATA.DATA_M): Observable<Object > {
       // DATA_M.DATA_MId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/DATA_M/', DATA_M, { headers: cpHeaders })
		
    }
	
	//Fetch DATA_M by parent
    get_DATA_MByParent(parentId: string): Observable<DATA.DATA_M[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/DATA_M/byparent/'+ parentId)
        return this.http.get<DATA.DATA_M[]>(this.serviceURL + '/DATA_M/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch DATA_M by id
    get_DATA_MById(DATA_MId: string): Observable<DATA.DATA_M> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/DATA_M/'+ DATA_MId)
        return this.http.get<DATA.DATA_M>(this.serviceURL + '/DATA_M/' + DATA_MId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update DATA_M
    update_DATA_M(DATA_M: DATA.DATA_M):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/DATA_M/' + DATA_M.DATA_MId, DATA_M, { headers: cpHeaders })
    }
	
    //Delete DATA_M	
    delete_DATA_MById(DATA_MId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/DATA_M/' + DATA_MId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:DATA.DATA_M = null;
	
	public 	get Selected():DATA.DATA_M{ return this.mSelecetd;}
	
	public  set Selected(_DATA_M:DATA.DATA_M){ this.mSelecetd=_DATA_M; }
 
}
