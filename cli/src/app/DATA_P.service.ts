import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { DATA} from './DATA';
@Injectable()
export class DATA_P_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	P1:string = '';
	P2:string = '';
	P3:string = '';
	P4:string = '';
	P5:string = '';
	P6:string = '';
	PATM:string = '';
	PXB:string = '';
	DP12:string = '';
	DP45:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all DATA_Ps
    getAll_DATA_Ps(): Observable<DATA.DATA_P[]> {
		var qry:string;
		qry='';
		
		if(this.P1!=''){
			if(qry !='') qry=qry +'&';
			qry='P1='+encodeURIComponent(this.P1)
		}
		if(this.P2!=''){
			if(qry !='') qry=qry +'&';
			qry='P2='+encodeURIComponent(this.P2)
		}
		if(this.P3!=''){
			if(qry !='') qry=qry +'&';
			qry='P3='+encodeURIComponent(this.P3)
		}
		if(this.P4!=''){
			if(qry !='') qry=qry +'&';
			qry='P4='+encodeURIComponent(this.P4)
		}
		if(this.P5!=''){
			if(qry !='') qry=qry +'&';
			qry='P5='+encodeURIComponent(this.P5)
		}
		if(this.P6!=''){
			if(qry !='') qry=qry +'&';
			qry='P6='+encodeURIComponent(this.P6)
		}
		if(this.PATM!=''){
			if(qry !='') qry=qry +'&';
			qry='PATM='+encodeURIComponent(this.PATM)
		}
		if(this.PXB!=''){
			if(qry !='') qry=qry +'&';
			qry='PXB='+encodeURIComponent(this.PXB)
		}
		if(this.DP12!=''){
			if(qry !='') qry=qry +'&';
			qry='DP12='+encodeURIComponent(this.DP12)
		}
		if(this.DP45!=''){
			if(qry !='') qry=qry +'&';
			qry='DP45='+encodeURIComponent(this.DP45)
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
			return this.http.get<DATA.DATA_P[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<DATA.DATA_P[]>(this.serviceURL + '/DATA_P/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.P1 = '';
	this.P2 = '';
	this.P3 = '';
	this.P4 = '';
	this.P5 = '';
	this.P6 = '';
	this.PATM = '';
	this.PXB = '';
	this.DP12 = '';
	this.DP45 = '';
		
	}
 
	   //Create DATA_P
    create_DATA_P(DATA_P: DATA.DATA_P): Observable<Object > {
       // DATA_P.DATA_PId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/DATA_P/', DATA_P, { headers: cpHeaders })
		
    }
	
	//Fetch DATA_P by parent
    get_DATA_PByParent(parentId: string): Observable<DATA.DATA_P[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/DATA_P/byparent/'+ parentId)
        return this.http.get<DATA.DATA_P[]>(this.serviceURL + '/DATA_P/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch DATA_P by id
    get_DATA_PById(DATA_PId: string): Observable<DATA.DATA_P> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/DATA_P/'+ DATA_PId)
        return this.http.get<DATA.DATA_P>(this.serviceURL + '/DATA_P/' + DATA_PId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update DATA_P
    update_DATA_P(DATA_P: DATA.DATA_P):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/DATA_P/' + DATA_P.DATA_PId, DATA_P, { headers: cpHeaders })
    }
	
    //Delete DATA_P	
    delete_DATA_PById(DATA_PId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/DATA_P/' + DATA_PId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:DATA.DATA_P = null;
	
	public 	get Selected():DATA.DATA_P{ return this.mSelecetd;}
	
	public  set Selected(_DATA_P:DATA.DATA_P){ this.mSelecetd=_DATA_P; }
 
}
