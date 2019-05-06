import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MOND} from './MOND';
@Injectable()
export class MOND_DEVTYPE_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	Name:string = '';
	DriverLibName:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MOND_DEVTYPEs
    getAll_MOND_DEVTYPEs(): Observable<MOND.MOND_DEVTYPE[]> {
		var qry:string;
		qry='';
		
		if(this.Name!=''){
			if(qry !='') qry=qry +'&';
			qry='Name='+encodeURIComponent(this.Name)
		}
		if(this.DriverLibName!=''){
			if(qry !='') qry=qry +'&';
			qry='DriverLibName='+encodeURIComponent(this.DriverLibName)
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
			return this.http.get<MOND.MOND_DEVTYPE[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MOND.MOND_DEVTYPE[]>(this.serviceURL + '/MOND_DEVTYPE/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.Name = '';
	this.DriverLibName = '';
		
	}
 
	   //Create MOND_DEVTYPE
    create_MOND_DEVTYPE(MOND_DEVTYPE: MOND.MOND_DEVTYPE): Observable<Object > {
       // MOND_DEVTYPE.MOND_DEVTYPEId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MOND_DEVTYPE/', MOND_DEVTYPE, { headers: cpHeaders })
		
    }
	
	//Fetch MOND_DEVTYPE by id
    get_MOND_DEVTYPEById(MOND_DEVTYPEId: string): Observable<MOND.MOND_DEVTYPE> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MOND_DEVTYPE/'+ MOND_DEVTYPEId)
        return this.http.get<MOND.MOND_DEVTYPE>(this.serviceURL + '/MOND_DEVTYPE/' + MOND_DEVTYPEId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MOND_DEVTYPE
    update_MOND_DEVTYPE(MOND_DEVTYPE: MOND.MOND_DEVTYPE):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MOND_DEVTYPE/' + MOND_DEVTYPE.MOND_DEVTYPEId, MOND_DEVTYPE, { headers: cpHeaders })
    }
	
    //Delete MOND_DEVTYPE	
    delete_MOND_DEVTYPEById(MOND_DEVTYPEId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MOND_DEVTYPE/' + MOND_DEVTYPEId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MOND.MOND_DEVTYPE = null;
	
	public 	get Selected():MOND.MOND_DEVTYPE{ return this.mSelecetd;}
	
	public  set Selected(_MOND_DEVTYPE:MOND.MOND_DEVTYPE){ this.mSelecetd=_MOND_DEVTYPE; }
 
}
