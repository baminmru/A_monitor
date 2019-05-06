import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { DATA} from './DATA';
@Injectable()
export class DATA_U_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	U1:string = '';
	U2:string = '';
	U3:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all DATA_Us
    getAll_DATA_Us(): Observable<DATA.DATA_U[]> {
		var qry:string;
		qry='';
		
		if(this.U1!=''){
			if(qry !='') qry=qry +'&';
			qry='U1='+encodeURIComponent(this.U1)
		}
		if(this.U2!=''){
			if(qry !='') qry=qry +'&';
			qry='U2='+encodeURIComponent(this.U2)
		}
		if(this.U3!=''){
			if(qry !='') qry=qry +'&';
			qry='U3='+encodeURIComponent(this.U3)
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
			return this.http.get<DATA.DATA_U[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<DATA.DATA_U[]>(this.serviceURL + '/DATA_U/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.U1 = '';
	this.U2 = '';
	this.U3 = '';
		
	}
 
	   //Create DATA_U
    create_DATA_U(DATA_U: DATA.DATA_U): Observable<Object > {
       // DATA_U.DATA_UId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/DATA_U/', DATA_U, { headers: cpHeaders })
		
    }
	
	//Fetch DATA_U by parent
    get_DATA_UByParent(parentId: string): Observable<DATA.DATA_U[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/DATA_U/byparent/'+ parentId)
        return this.http.get<DATA.DATA_U[]>(this.serviceURL + '/DATA_U/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch DATA_U by id
    get_DATA_UById(DATA_UId: string): Observable<DATA.DATA_U> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/DATA_U/'+ DATA_UId)
        return this.http.get<DATA.DATA_U>(this.serviceURL + '/DATA_U/' + DATA_UId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update DATA_U
    update_DATA_U(DATA_U: DATA.DATA_U):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/DATA_U/' + DATA_U.DATA_UId, DATA_U, { headers: cpHeaders })
    }
	
    //Delete DATA_U	
    delete_DATA_UById(DATA_UId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/DATA_U/' + DATA_UId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:DATA.DATA_U = null;
	
	public 	get Selected():DATA.DATA_U{ return this.mSelecetd;}
	
	public  set Selected(_DATA_U:DATA.DATA_U){ this.mSelecetd=_DATA_U; }
 
}
