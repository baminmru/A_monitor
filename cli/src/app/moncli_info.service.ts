import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { moncli} from './moncli';
@Injectable()
export class moncli_info_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	Name:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all moncli_infos
    getAll_moncli_infos(): Observable<moncli.moncli_info[]> {
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
			return this.http.get<moncli.moncli_info[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<moncli.moncli_info[]>(this.serviceURL + '/moncli_info/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.Name = '';
		
	}
 
	   //Create moncli_info
    create_moncli_info(moncli_info: moncli.moncli_info): Observable<Object > {
       // moncli_info.moncli_infoId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/moncli_info/', moncli_info, { headers: cpHeaders })
		
    }
	
	//Fetch moncli_info by id
    get_moncli_infoById(moncli_infoId: string): Observable<moncli.moncli_info> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/moncli_info/'+ moncli_infoId)
        return this.http.get<moncli.moncli_info>(this.serviceURL + '/moncli_info/' + moncli_infoId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update moncli_info
    update_moncli_info(moncli_info: moncli.moncli_info):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/moncli_info/' + moncli_info.moncli_infoId, moncli_info, { headers: cpHeaders })
    }
	
    //Delete moncli_info	
    delete_moncli_infoById(moncli_infoId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/moncli_info/' + moncli_infoId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:moncli.moncli_info = null;
	
	public 	get Selected():moncli.moncli_info{ return this.mSelecetd;}
	
	public  set Selected(_moncli_info:moncli.moncli_info){ this.mSelecetd=_moncli_info; }
 
}
