import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONDEV} from './MONDEV';
@Injectable()
export class MONDEV_PLANCALL_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	NMAXCALL:string = '';
	MINREPEAT:string = '';
	DLOCK:string = '';
	DLASTCALL:string = '';
	ICALLCURR:string = '';
	DNEXTCURR:string = '';
	ICALL:string = '';
	NUMHOUR:string = '';
	DNEXTHOUR:string = '';
	DLASTHOUR:string = '';
	ICALL24:string = '';
	NUM24:string = '';
	DNEXT24:string = '';
	DLASTDAY:string = '';
	ICALLSUM:string = '';
	DNEXTSUM:string = '';
	IEL:string = '';
	DNEXTEL:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONDEV_PLANCALLs
    getAll_MONDEV_PLANCALLs(): Observable<MONDEV.MONDEV_PLANCALL[]> {
		var qry:string;
		qry='';
		
		if(this.NMAXCALL!=''){
			if(qry !='') qry=qry +'&';
			qry='NMAXCALL='+encodeURIComponent(this.NMAXCALL)
		}
		if(this.MINREPEAT!=''){
			if(qry !='') qry=qry +'&';
			qry='MINREPEAT='+encodeURIComponent(this.MINREPEAT)
		}
		if(this.DLOCK!=''){
			if(qry !='') qry=qry +'&';
			qry='DLOCK='+encodeURIComponent(this.DLOCK)
		}
		if(this.DLASTCALL!=''){
			if(qry !='') qry=qry +'&';
			qry='DLASTCALL='+encodeURIComponent(this.DLASTCALL)
		}
		if(this.ICALLCURR!=''){
			if(qry !='') qry=qry +'&';
			qry='ICALLCURR='+encodeURIComponent(this.ICALLCURR)
		}
		if(this.DNEXTCURR!=''){
			if(qry !='') qry=qry +'&';
			qry='DNEXTCURR='+encodeURIComponent(this.DNEXTCURR)
		}
		if(this.ICALL!=''){
			if(qry !='') qry=qry +'&';
			qry='ICALL='+encodeURIComponent(this.ICALL)
		}
		if(this.NUMHOUR!=''){
			if(qry !='') qry=qry +'&';
			qry='NUMHOUR='+encodeURIComponent(this.NUMHOUR)
		}
		if(this.DNEXTHOUR!=''){
			if(qry !='') qry=qry +'&';
			qry='DNEXTHOUR='+encodeURIComponent(this.DNEXTHOUR)
		}
		if(this.DLASTHOUR!=''){
			if(qry !='') qry=qry +'&';
			qry='DLASTHOUR='+encodeURIComponent(this.DLASTHOUR)
		}
		if(this.ICALL24!=''){
			if(qry !='') qry=qry +'&';
			qry='ICALL24='+encodeURIComponent(this.ICALL24)
		}
		if(this.NUM24!=''){
			if(qry !='') qry=qry +'&';
			qry='NUM24='+encodeURIComponent(this.NUM24)
		}
		if(this.DNEXT24!=''){
			if(qry !='') qry=qry +'&';
			qry='DNEXT24='+encodeURIComponent(this.DNEXT24)
		}
		if(this.DLASTDAY!=''){
			if(qry !='') qry=qry +'&';
			qry='DLASTDAY='+encodeURIComponent(this.DLASTDAY)
		}
		if(this.ICALLSUM!=''){
			if(qry !='') qry=qry +'&';
			qry='ICALLSUM='+encodeURIComponent(this.ICALLSUM)
		}
		if(this.DNEXTSUM!=''){
			if(qry !='') qry=qry +'&';
			qry='DNEXTSUM='+encodeURIComponent(this.DNEXTSUM)
		}
		if(this.IEL!=''){
			if(qry !='') qry=qry +'&';
			qry='IEL='+encodeURIComponent(this.IEL)
		}
		if(this.DNEXTEL!=''){
			if(qry !='') qry=qry +'&';
			qry='DNEXTEL='+encodeURIComponent(this.DNEXTEL)
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
			return this.http.get<MONDEV.MONDEV_PLANCALL[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONDEV.MONDEV_PLANCALL[]>(this.serviceURL + '/MONDEV_PLANCALL/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.NMAXCALL = '';
	this.MINREPEAT = '';
	this.DLOCK = '';
	this.DLASTCALL = '';
	this.ICALLCURR = '';
	this.DNEXTCURR = '';
	this.ICALL = '';
	this.NUMHOUR = '';
	this.DNEXTHOUR = '';
	this.DLASTHOUR = '';
	this.ICALL24 = '';
	this.NUM24 = '';
	this.DNEXT24 = '';
	this.DLASTDAY = '';
	this.ICALLSUM = '';
	this.DNEXTSUM = '';
	this.IEL = '';
	this.DNEXTEL = '';
		
	}
 
	   //Create MONDEV_PLANCALL
    create_MONDEV_PLANCALL(MONDEV_PLANCALL: MONDEV.MONDEV_PLANCALL): Observable<Object > {
       // MONDEV_PLANCALL.MONDEV_PLANCALLId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONDEV_PLANCALL/', MONDEV_PLANCALL, { headers: cpHeaders })
		
    }
	
	//Fetch MONDEV_PLANCALL by parent
    get_MONDEV_PLANCALLByParent(parentId: string): Observable<MONDEV.MONDEV_PLANCALL[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/MONDEV_PLANCALL/byparent/'+ parentId)
        return this.http.get<MONDEV.MONDEV_PLANCALL[]>(this.serviceURL + '/MONDEV_PLANCALL/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch MONDEV_PLANCALL by id
    get_MONDEV_PLANCALLById(MONDEV_PLANCALLId: string): Observable<MONDEV.MONDEV_PLANCALL> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONDEV_PLANCALL/'+ MONDEV_PLANCALLId)
        return this.http.get<MONDEV.MONDEV_PLANCALL>(this.serviceURL + '/MONDEV_PLANCALL/' + MONDEV_PLANCALLId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONDEV_PLANCALL
    update_MONDEV_PLANCALL(MONDEV_PLANCALL: MONDEV.MONDEV_PLANCALL):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONDEV_PLANCALL/' + MONDEV_PLANCALL.MONDEV_PLANCALLId, MONDEV_PLANCALL, { headers: cpHeaders })
    }
	
    //Delete MONDEV_PLANCALL	
    delete_MONDEV_PLANCALLById(MONDEV_PLANCALLId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONDEV_PLANCALL/' + MONDEV_PLANCALLId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONDEV.MONDEV_PLANCALL = null;
	
	public 	get Selected():MONDEV.MONDEV_PLANCALL{ return this.mSelecetd;}
	
	public  set Selected(_MONDEV_PLANCALL:MONDEV.MONDEV_PLANCALL){ this.mSelecetd=_MONDEV_PLANCALL; }
 
}
