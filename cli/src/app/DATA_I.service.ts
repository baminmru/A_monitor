import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { DATA} from './DATA';
@Injectable()
export class DATA_I_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	I1:string = '';
	I2:string = '';
	I3:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all DATA_Is
    getAll_DATA_Is(): Observable<DATA.DATA_I[]> {
		var qry:string;
		qry='';
		
		if(this.I1!=''){
			if(qry !='') qry=qry +'&';
			qry='I1='+encodeURIComponent(this.I1)
		}
		if(this.I2!=''){
			if(qry !='') qry=qry +'&';
			qry='I2='+encodeURIComponent(this.I2)
		}
		if(this.I3!=''){
			if(qry !='') qry=qry +'&';
			qry='I3='+encodeURIComponent(this.I3)
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
			return this.http.get<DATA.DATA_I[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<DATA.DATA_I[]>(this.serviceURL + '/DATA_I/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.I1 = '';
	this.I2 = '';
	this.I3 = '';
		
	}
 
	   //Create DATA_I
    create_DATA_I(DATA_I: DATA.DATA_I): Observable<Object > {
       // DATA_I.DATA_IId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/DATA_I/', DATA_I, { headers: cpHeaders })
		
    }
	
	//Fetch DATA_I by parent
    get_DATA_IByParent(parentId: string): Observable<DATA.DATA_I[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/DATA_I/byparent/'+ parentId)
        return this.http.get<DATA.DATA_I[]>(this.serviceURL + '/DATA_I/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch DATA_I by id
    get_DATA_IById(DATA_IId: string): Observable<DATA.DATA_I> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/DATA_I/'+ DATA_IId)
        return this.http.get<DATA.DATA_I>(this.serviceURL + '/DATA_I/' + DATA_IId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update DATA_I
    update_DATA_I(DATA_I: DATA.DATA_I):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/DATA_I/' + DATA_I.DATA_IId, DATA_I, { headers: cpHeaders })
    }
	
    //Delete DATA_I	
    delete_DATA_IById(DATA_IId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/DATA_I/' + DATA_IId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:DATA.DATA_I = null;
	
	public 	get Selected():DATA.DATA_I{ return this.mSelecetd;}
	
	public  set Selected(_DATA_I:DATA.DATA_I){ this.mSelecetd=_DATA_I; }
 
}
