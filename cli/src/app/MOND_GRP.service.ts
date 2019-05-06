import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { moncli} from './moncli';
@Injectable()
export class MOND_GRP_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	CGRPNM:string = '';
	CTXT:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MOND_GRPs
    getAll_MOND_GRPs(): Observable<moncli.MOND_GRP[]> {
		var qry:string;
		qry='';
		
		if(this.CGRPNM!=''){
			if(qry !='') qry=qry +'&';
			qry='CGRPNM='+encodeURIComponent(this.CGRPNM)
		}
		if(this.CTXT!=''){
			if(qry !='') qry=qry +'&';
			qry='CTXT='+encodeURIComponent(this.CTXT)
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
			return this.http.get<moncli.MOND_GRP[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<moncli.MOND_GRP[]>(this.serviceURL + '/MOND_GRP/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.CGRPNM = '';
	this.CTXT = '';
		
	}
 
	   //Create MOND_GRP
    create_MOND_GRP(MOND_GRP: moncli.MOND_GRP): Observable<Object > {
       // MOND_GRP.MOND_GRPId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MOND_GRP/', MOND_GRP, { headers: cpHeaders })
		
    }
	
	//Fetch MOND_GRP by parent
    get_MOND_GRPByParent(parentId: string): Observable<moncli.MOND_GRP[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/MOND_GRP/byparent/'+ parentId)
        return this.http.get<moncli.MOND_GRP[]>(this.serviceURL + '/MOND_GRP/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch MOND_GRP by id
    get_MOND_GRPById(MOND_GRPId: string): Observable<moncli.MOND_GRP> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MOND_GRP/'+ MOND_GRPId)
        return this.http.get<moncli.MOND_GRP>(this.serviceURL + '/MOND_GRP/' + MOND_GRPId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MOND_GRP
    update_MOND_GRP(MOND_GRP: moncli.MOND_GRP):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MOND_GRP/' + MOND_GRP.MOND_GRPId, MOND_GRP, { headers: cpHeaders })
    }
	
    //Delete MOND_GRP	
    delete_MOND_GRPById(MOND_GRPId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MOND_GRP/' + MOND_GRPId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:moncli.MOND_GRP = null;
	
	public 	get Selected():moncli.MOND_GRP{ return this.mSelecetd;}
	
	public  set Selected(_MOND_GRP:moncli.MOND_GRP){ this.mSelecetd=_MOND_GRP; }
 
}
