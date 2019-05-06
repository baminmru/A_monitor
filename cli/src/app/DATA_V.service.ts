import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { DATA} from './DATA';
@Injectable()
export class DATA_V_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	V1:string = '';
	V2:string = '';
	V3:string = '';
	V4:string = '';
	V5:string = '';
	V6:string = '';
	DV12:string = '';
	DV45:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all DATA_Vs
    getAll_DATA_Vs(): Observable<DATA.DATA_V[]> {
		var qry:string;
		qry='';
		
		if(this.V1!=''){
			if(qry !='') qry=qry +'&';
			qry='V1='+encodeURIComponent(this.V1)
		}
		if(this.V2!=''){
			if(qry !='') qry=qry +'&';
			qry='V2='+encodeURIComponent(this.V2)
		}
		if(this.V3!=''){
			if(qry !='') qry=qry +'&';
			qry='V3='+encodeURIComponent(this.V3)
		}
		if(this.V4!=''){
			if(qry !='') qry=qry +'&';
			qry='V4='+encodeURIComponent(this.V4)
		}
		if(this.V5!=''){
			if(qry !='') qry=qry +'&';
			qry='V5='+encodeURIComponent(this.V5)
		}
		if(this.V6!=''){
			if(qry !='') qry=qry +'&';
			qry='V6='+encodeURIComponent(this.V6)
		}
		if(this.DV12!=''){
			if(qry !='') qry=qry +'&';
			qry='DV12='+encodeURIComponent(this.DV12)
		}
		if(this.DV45!=''){
			if(qry !='') qry=qry +'&';
			qry='DV45='+encodeURIComponent(this.DV45)
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
			return this.http.get<DATA.DATA_V[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<DATA.DATA_V[]>(this.serviceURL + '/DATA_V/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.V1 = '';
	this.V2 = '';
	this.V3 = '';
	this.V4 = '';
	this.V5 = '';
	this.V6 = '';
	this.DV12 = '';
	this.DV45 = '';
		
	}
 
	   //Create DATA_V
    create_DATA_V(DATA_V: DATA.DATA_V): Observable<Object > {
       // DATA_V.DATA_VId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/DATA_V/', DATA_V, { headers: cpHeaders })
		
    }
	
	//Fetch DATA_V by parent
    get_DATA_VByParent(parentId: string): Observable<DATA.DATA_V[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/DATA_V/byparent/'+ parentId)
        return this.http.get<DATA.DATA_V[]>(this.serviceURL + '/DATA_V/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch DATA_V by id
    get_DATA_VById(DATA_VId: string): Observable<DATA.DATA_V> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/DATA_V/'+ DATA_VId)
        return this.http.get<DATA.DATA_V>(this.serviceURL + '/DATA_V/' + DATA_VId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update DATA_V
    update_DATA_V(DATA_V: DATA.DATA_V):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/DATA_V/' + DATA_V.DATA_VId, DATA_V, { headers: cpHeaders })
    }
	
    //Delete DATA_V	
    delete_DATA_VById(DATA_VId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/DATA_V/' + DATA_VId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:DATA.DATA_V = null;
	
	public 	get Selected():DATA.DATA_V{ return this.mSelecetd;}
	
	public  set Selected(_DATA_V:DATA.DATA_V){ this.mSelecetd=_DATA_V; }
 
}
