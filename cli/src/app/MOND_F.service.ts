import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { moncli} from './moncli';
@Injectable()
export class MOND_F_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	Name:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MOND_Fs
    getAll_MOND_Fs(): Observable<moncli.MOND_F[]> {
		var qry:string;
		qry='';
		
		if(this.Name!=''){
			if(qry !='') qry=qry +'&';
			qry='Name='+encodeURIComponent(this.Name)
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
			return this.http.get<moncli.MOND_F[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<moncli.MOND_F[]>(this.serviceURL + '/MOND_F/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.Name = '';
		
	}
 
	   //Create MOND_F
    create_MOND_F(MOND_F: moncli.MOND_F): Observable<Object > {
       // MOND_F.MOND_FId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MOND_F/', MOND_F, { headers: cpHeaders })
		
    }
	
	//Fetch MOND_F by parent
    get_MOND_FByParent(parentId: string): Observable<moncli.MOND_F[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/MOND_F/byparent/'+ parentId)
        return this.http.get<moncli.MOND_F[]>(this.serviceURL + '/MOND_F/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch MOND_F by id
    get_MOND_FById(MOND_FId: string): Observable<moncli.MOND_F> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MOND_F/'+ MOND_FId)
        return this.http.get<moncli.MOND_F>(this.serviceURL + '/MOND_F/' + MOND_FId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MOND_F
    update_MOND_F(MOND_F: moncli.MOND_F):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MOND_F/' + MOND_F.MOND_FId, MOND_F, { headers: cpHeaders })
    }
	
    //Delete MOND_F	
    delete_MOND_FById(MOND_FId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MOND_F/' + MOND_FId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:moncli.MOND_F = null;
	
	public 	get Selected():moncli.MOND_F{ return this.mSelecetd;}
	
	public  set Selected(_MOND_F:moncli.MOND_F){ this.mSelecetd=_MOND_F; }
 
}
