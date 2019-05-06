import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { DATA} from './DATA';
@Injectable()
export class DATA_EP_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	EP1:string = '';
	EP2:string = '';
	EP3:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all DATA_EPs
    getAll_DATA_EPs(): Observable<DATA.DATA_EP[]> {
		var qry:string;
		qry='';
		
		if(this.EP1!=''){
			if(qry !='') qry=qry +'&';
			qry='EP1='+encodeURIComponent(this.EP1)
		}
		if(this.EP2!=''){
			if(qry !='') qry=qry +'&';
			qry='EP2='+encodeURIComponent(this.EP2)
		}
		if(this.EP3!=''){
			if(qry !='') qry=qry +'&';
			qry='EP3='+encodeURIComponent(this.EP3)
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
			return this.http.get<DATA.DATA_EP[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<DATA.DATA_EP[]>(this.serviceURL + '/DATA_EP/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.EP1 = '';
	this.EP2 = '';
	this.EP3 = '';
		
	}
 
	   //Create DATA_EP
    create_DATA_EP(DATA_EP: DATA.DATA_EP): Observable<Object > {
       // DATA_EP.DATA_EPId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/DATA_EP/', DATA_EP, { headers: cpHeaders })
		
    }
	
	//Fetch DATA_EP by parent
    get_DATA_EPByParent(parentId: string): Observable<DATA.DATA_EP[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/DATA_EP/byparent/'+ parentId)
        return this.http.get<DATA.DATA_EP[]>(this.serviceURL + '/DATA_EP/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch DATA_EP by id
    get_DATA_EPById(DATA_EPId: string): Observable<DATA.DATA_EP> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/DATA_EP/'+ DATA_EPId)
        return this.http.get<DATA.DATA_EP>(this.serviceURL + '/DATA_EP/' + DATA_EPId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update DATA_EP
    update_DATA_EP(DATA_EP: DATA.DATA_EP):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/DATA_EP/' + DATA_EP.DATA_EPId, DATA_EP, { headers: cpHeaders })
    }
	
    //Delete DATA_EP	
    delete_DATA_EPById(DATA_EPId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/DATA_EP/' + DATA_EPId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:DATA.DATA_EP = null;
	
	public 	get Selected():DATA.DATA_EP{ return this.mSelecetd;}
	
	public  set Selected(_DATA_EP:DATA.DATA_EP){ this.mSelecetd=_DATA_EP; }
 
}
