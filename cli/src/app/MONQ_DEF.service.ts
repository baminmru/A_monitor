import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONQ} from './MONQ';
@Injectable()
export class MONQ_DEF_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	ArchTime:string = '';
	QueryTime:string = '';
	RepeatTimes:string = '';
	RepeatInterval:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONQ_DEFs
    getAll_MONQ_DEFs(): Observable<MONQ.MONQ_DEF[]> {
		var qry:string;
		qry='';
		
		if(this.ArchTime!=''){
			if(qry !='') qry=qry +'&';
			qry='ArchTime='+encodeURIComponent(this.ArchTime)
		}
		if(this.QueryTime!=''){
			if(qry !='') qry=qry +'&';
			qry='QueryTime='+encodeURIComponent(this.QueryTime)
		}
		if(this.RepeatTimes!=''){
			if(qry !='') qry=qry +'&';
			qry='RepeatTimes='+encodeURIComponent(this.RepeatTimes)
		}
		if(this.RepeatInterval!=''){
			if(qry !='') qry=qry +'&';
			qry='RepeatInterval='+encodeURIComponent(this.RepeatInterval)
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
			return this.http.get<MONQ.MONQ_DEF[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONQ.MONQ_DEF[]>(this.serviceURL + '/MONQ_DEF/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.ArchTime = '';
	this.QueryTime = '';
	this.RepeatTimes = '';
	this.RepeatInterval = '';
		
	}
 
	   //Create MONQ_DEF
    create_MONQ_DEF(MONQ_DEF: MONQ.MONQ_DEF): Observable<Object > {
       // MONQ_DEF.MONQ_DEFId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONQ_DEF/', MONQ_DEF, { headers: cpHeaders })
		
    }
	
	//Fetch MONQ_DEF by id
    get_MONQ_DEFById(MONQ_DEFId: string): Observable<MONQ.MONQ_DEF> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONQ_DEF/'+ MONQ_DEFId)
        return this.http.get<MONQ.MONQ_DEF>(this.serviceURL + '/MONQ_DEF/' + MONQ_DEFId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONQ_DEF
    update_MONQ_DEF(MONQ_DEF: MONQ.MONQ_DEF):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONQ_DEF/' + MONQ_DEF.MONQ_DEFId, MONQ_DEF, { headers: cpHeaders })
    }
	
    //Delete MONQ_DEF	
    delete_MONQ_DEFById(MONQ_DEFId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONQ_DEF/' + MONQ_DEFId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONQ.MONQ_DEF = null;
	
	public 	get Selected():MONQ.MONQ_DEF{ return this.mSelecetd;}
	
	public  set Selected(_MONQ_DEF:MONQ.MONQ_DEF){ this.mSelecetd=_MONQ_DEF; }
 
}
