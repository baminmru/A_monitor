import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONDEV} from './MONDEV';
@Injectable()
export class MONDEV_MASK_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	sequence:string = '';
	paramFormat:string = '';
	colWidth:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONDEV_MASKs
    getAll_MONDEV_MASKs(): Observable<MONDEV.MONDEV_MASK[]> {
		var qry:string;
		qry='';
		
		if(this.sequence!=''){
			if(qry !='') qry=qry +'&';
			qry='sequence='+encodeURIComponent(this.sequence)
		}
		if(this.paramFormat!=''){
			if(qry !='') qry=qry +'&';
			qry='paramFormat='+encodeURIComponent(this.paramFormat)
		}
		if(this.colWidth!=''){
			if(qry !='') qry=qry +'&';
			qry='colWidth='+encodeURIComponent(this.colWidth)
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
			return this.http.get<MONDEV.MONDEV_MASK[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONDEV.MONDEV_MASK[]>(this.serviceURL + '/MONDEV_MASK/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.sequence = '';
	this.paramFormat = '';
	this.colWidth = '';
		
	}
 
	   //Create MONDEV_MASK
    create_MONDEV_MASK(MONDEV_MASK: MONDEV.MONDEV_MASK): Observable<Object > {
       // MONDEV_MASK.MONDEV_MASKId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONDEV_MASK/', MONDEV_MASK, { headers: cpHeaders })
		
    }
	
	//Fetch MONDEV_MASK by parent
    get_MONDEV_MASKByParent(parentId: string): Observable<MONDEV.MONDEV_MASK[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/MONDEV_MASK/byparent/'+ parentId)
        return this.http.get<MONDEV.MONDEV_MASK[]>(this.serviceURL + '/MONDEV_MASK/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch MONDEV_MASK by id
    get_MONDEV_MASKById(MONDEV_MASKId: string): Observable<MONDEV.MONDEV_MASK> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONDEV_MASK/'+ MONDEV_MASKId)
        return this.http.get<MONDEV.MONDEV_MASK>(this.serviceURL + '/MONDEV_MASK/' + MONDEV_MASKId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONDEV_MASK
    update_MONDEV_MASK(MONDEV_MASK: MONDEV.MONDEV_MASK):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONDEV_MASK/' + MONDEV_MASK.MONDEV_MASKId, MONDEV_MASK, { headers: cpHeaders })
    }
	
    //Delete MONDEV_MASK	
    delete_MONDEV_MASKById(MONDEV_MASKId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONDEV_MASK/' + MONDEV_MASKId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONDEV.MONDEV_MASK = null;
	
	public 	get Selected():MONDEV.MONDEV_MASK{ return this.mSelecetd;}
	
	public  set Selected(_MONDEV_MASK:MONDEV.MONDEV_MASK){ this.mSelecetd=_MONDEV_MASK; }
 
}
