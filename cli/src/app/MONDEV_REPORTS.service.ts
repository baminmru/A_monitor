import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONDEV} from './MONDEV';
@Injectable()
export class MONDEV_REPORTS_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	Name:string = '';
	theFile:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONDEV_REPORTSs
    getAll_MONDEV_REPORTSs(): Observable<MONDEV.MONDEV_REPORTS[]> {
		var qry:string;
		qry='';
		
		if(this.Name!=''){
			if(qry !='') qry=qry +'&';
			qry='Name='+encodeURIComponent(this.Name)
		}
		if(this.theFile!=''){
			if(qry !='') qry=qry +'&';
			qry='theFile='+encodeURIComponent(this.theFile)
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
			return this.http.get<MONDEV.MONDEV_REPORTS[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONDEV.MONDEV_REPORTS[]>(this.serviceURL + '/MONDEV_REPORTS/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.Name = '';
	this.theFile = '';
		
	}
 
	   //Create MONDEV_REPORTS
    create_MONDEV_REPORTS(MONDEV_REPORTS: MONDEV.MONDEV_REPORTS): Observable<Object > {
       // MONDEV_REPORTS.MONDEV_REPORTSId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONDEV_REPORTS/', MONDEV_REPORTS, { headers: cpHeaders })
		
    }
	
	//Fetch MONDEV_REPORTS by parent
    get_MONDEV_REPORTSByParent(parentId: string): Observable<MONDEV.MONDEV_REPORTS[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/MONDEV_REPORTS/byparent/'+ parentId)
        return this.http.get<MONDEV.MONDEV_REPORTS[]>(this.serviceURL + '/MONDEV_REPORTS/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch MONDEV_REPORTS by id
    get_MONDEV_REPORTSById(MONDEV_REPORTSId: string): Observable<MONDEV.MONDEV_REPORTS> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONDEV_REPORTS/'+ MONDEV_REPORTSId)
        return this.http.get<MONDEV.MONDEV_REPORTS>(this.serviceURL + '/MONDEV_REPORTS/' + MONDEV_REPORTSId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONDEV_REPORTS
    update_MONDEV_REPORTS(MONDEV_REPORTS: MONDEV.MONDEV_REPORTS):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONDEV_REPORTS/' + MONDEV_REPORTS.MONDEV_REPORTSId, MONDEV_REPORTS, { headers: cpHeaders })
    }
	
    //Delete MONDEV_REPORTS	
    delete_MONDEV_REPORTSById(MONDEV_REPORTSId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONDEV_REPORTS/' + MONDEV_REPORTSId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONDEV.MONDEV_REPORTS = null;
	
	public 	get Selected():MONDEV.MONDEV_REPORTS{ return this.mSelecetd;}
	
	public  set Selected(_MONDEV_REPORTS:MONDEV.MONDEV_REPORTS){ this.mSelecetd=_MONDEV_REPORTS; }
 
}
