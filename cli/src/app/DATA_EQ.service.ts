import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { DATA} from './DATA';
@Injectable()
export class DATA_EQ_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	E0:string = '';
	E1:string = '';
	E2:string = '';
	E3:string = '';
	E4:string = '';
	AP:string = '';
	AM:string = '';
	RP:string = '';
	RM:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all DATA_EQs
    getAll_DATA_EQs(): Observable<DATA.DATA_EQ[]> {
		var qry:string;
		qry='';
		
		if(this.E0!=''){
			if(qry !='') qry=qry +'&';
			qry='E0='+encodeURIComponent(this.E0)
		}
		if(this.E1!=''){
			if(qry !='') qry=qry +'&';
			qry='E1='+encodeURIComponent(this.E1)
		}
		if(this.E2!=''){
			if(qry !='') qry=qry +'&';
			qry='E2='+encodeURIComponent(this.E2)
		}
		if(this.E3!=''){
			if(qry !='') qry=qry +'&';
			qry='E3='+encodeURIComponent(this.E3)
		}
		if(this.E4!=''){
			if(qry !='') qry=qry +'&';
			qry='E4='+encodeURIComponent(this.E4)
		}
		if(this.AP!=''){
			if(qry !='') qry=qry +'&';
			qry='AP='+encodeURIComponent(this.AP)
		}
		if(this.AM!=''){
			if(qry !='') qry=qry +'&';
			qry='AM='+encodeURIComponent(this.AM)
		}
		if(this.RP!=''){
			if(qry !='') qry=qry +'&';
			qry='RP='+encodeURIComponent(this.RP)
		}
		if(this.RM!=''){
			if(qry !='') qry=qry +'&';
			qry='RM='+encodeURIComponent(this.RM)
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
			return this.http.get<DATA.DATA_EQ[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<DATA.DATA_EQ[]>(this.serviceURL + '/DATA_EQ/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.E0 = '';
	this.E1 = '';
	this.E2 = '';
	this.E3 = '';
	this.E4 = '';
	this.AP = '';
	this.AM = '';
	this.RP = '';
	this.RM = '';
		
	}
 
	   //Create DATA_EQ
    create_DATA_EQ(DATA_EQ: DATA.DATA_EQ): Observable<Object > {
       // DATA_EQ.DATA_EQId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/DATA_EQ/', DATA_EQ, { headers: cpHeaders })
		
    }
	
	//Fetch DATA_EQ by parent
    get_DATA_EQByParent(parentId: string): Observable<DATA.DATA_EQ[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/DATA_EQ/byparent/'+ parentId)
        return this.http.get<DATA.DATA_EQ[]>(this.serviceURL + '/DATA_EQ/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch DATA_EQ by id
    get_DATA_EQById(DATA_EQId: string): Observable<DATA.DATA_EQ> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/DATA_EQ/'+ DATA_EQId)
        return this.http.get<DATA.DATA_EQ>(this.serviceURL + '/DATA_EQ/' + DATA_EQId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update DATA_EQ
    update_DATA_EQ(DATA_EQ: DATA.DATA_EQ):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/DATA_EQ/' + DATA_EQ.DATA_EQId, DATA_EQ, { headers: cpHeaders })
    }
	
    //Delete DATA_EQ	
    delete_DATA_EQById(DATA_EQId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/DATA_EQ/' + DATA_EQId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:DATA.DATA_EQ = null;
	
	public 	get Selected():DATA.DATA_EQ{ return this.mSelecetd;}
	
	public  set Selected(_DATA_EQ:DATA.DATA_EQ){ this.mSelecetd=_DATA_EQ; }
 
}
