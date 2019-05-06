import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONDEV} from './MONDEV';
@Injectable()
export class MONDEV_CONNECT_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	CONNECTLIMIT:string = '';
	netaddr:string = '';
	CSPEED:string = '';
	CDATABIT:string = '';
	CSTOPBITS:string = '';
	FlowControl:string = '';
	ComPortNum:string = '';
	IPAddr:string = '';
	PortNum:string = '';
	UserName:string = '';
	Password:string = '';
	CTOWNCODE:string = '';
	CPHONE:string = '';
	ATCommand:string = '';
	callerID:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONDEV_CONNECTs
    getAll_MONDEV_CONNECTs(): Observable<MONDEV.MONDEV_CONNECT[]> {
		var qry:string;
		qry='';
		
		if(this.CONNECTLIMIT!=''){
			if(qry !='') qry=qry +'&';
			qry='CONNECTLIMIT='+encodeURIComponent(this.CONNECTLIMIT)
		}
		if(this.netaddr!=''){
			if(qry !='') qry=qry +'&';
			qry='netaddr='+encodeURIComponent(this.netaddr)
		}
		if(this.CSPEED!=''){
			if(qry !='') qry=qry +'&';
			qry='CSPEED='+encodeURIComponent(this.CSPEED)
		}
		if(this.CDATABIT!=''){
			if(qry !='') qry=qry +'&';
			qry='CDATABIT='+encodeURIComponent(this.CDATABIT)
		}
		if(this.CSTOPBITS!=''){
			if(qry !='') qry=qry +'&';
			qry='CSTOPBITS='+encodeURIComponent(this.CSTOPBITS)
		}
		if(this.FlowControl!=''){
			if(qry !='') qry=qry +'&';
			qry='FlowControl='+encodeURIComponent(this.FlowControl)
		}
		if(this.ComPortNum!=''){
			if(qry !='') qry=qry +'&';
			qry='ComPortNum='+encodeURIComponent(this.ComPortNum)
		}
		if(this.IPAddr!=''){
			if(qry !='') qry=qry +'&';
			qry='IPAddr='+encodeURIComponent(this.IPAddr)
		}
		if(this.PortNum!=''){
			if(qry !='') qry=qry +'&';
			qry='PortNum='+encodeURIComponent(this.PortNum)
		}
		if(this.UserName!=''){
			if(qry !='') qry=qry +'&';
			qry='UserName='+encodeURIComponent(this.UserName)
		}
		if(this.Password!=''){
			if(qry !='') qry=qry +'&';
			qry='Password='+encodeURIComponent(this.Password)
		}
		if(this.CTOWNCODE!=''){
			if(qry !='') qry=qry +'&';
			qry='CTOWNCODE='+encodeURIComponent(this.CTOWNCODE)
		}
		if(this.CPHONE!=''){
			if(qry !='') qry=qry +'&';
			qry='CPHONE='+encodeURIComponent(this.CPHONE)
		}
		if(this.ATCommand!=''){
			if(qry !='') qry=qry +'&';
			qry='ATCommand='+encodeURIComponent(this.ATCommand)
		}
		if(this.callerID!=''){
			if(qry !='') qry=qry +'&';
			qry='callerID='+encodeURIComponent(this.callerID)
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
			return this.http.get<MONDEV.MONDEV_CONNECT[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONDEV.MONDEV_CONNECT[]>(this.serviceURL + '/MONDEV_CONNECT/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.CONNECTLIMIT = '';
	this.netaddr = '';
	this.CSPEED = '';
	this.CDATABIT = '';
	this.CSTOPBITS = '';
	this.FlowControl = '';
	this.ComPortNum = '';
	this.IPAddr = '';
	this.PortNum = '';
	this.UserName = '';
	this.Password = '';
	this.CTOWNCODE = '';
	this.CPHONE = '';
	this.ATCommand = '';
	this.callerID = '';
		
	}
 
	   //Create MONDEV_CONNECT
    create_MONDEV_CONNECT(MONDEV_CONNECT: MONDEV.MONDEV_CONNECT): Observable<Object > {
       // MONDEV_CONNECT.MONDEV_CONNECTId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONDEV_CONNECT/', MONDEV_CONNECT, { headers: cpHeaders })
		
    }
	
	//Fetch MONDEV_CONNECT by parent
    get_MONDEV_CONNECTByParent(parentId: string): Observable<MONDEV.MONDEV_CONNECT[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/MONDEV_CONNECT/byparent/'+ parentId)
        return this.http.get<MONDEV.MONDEV_CONNECT[]>(this.serviceURL + '/MONDEV_CONNECT/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch MONDEV_CONNECT by id
    get_MONDEV_CONNECTById(MONDEV_CONNECTId: string): Observable<MONDEV.MONDEV_CONNECT> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONDEV_CONNECT/'+ MONDEV_CONNECTId)
        return this.http.get<MONDEV.MONDEV_CONNECT>(this.serviceURL + '/MONDEV_CONNECT/' + MONDEV_CONNECTId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONDEV_CONNECT
    update_MONDEV_CONNECT(MONDEV_CONNECT: MONDEV.MONDEV_CONNECT):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONDEV_CONNECT/' + MONDEV_CONNECT.MONDEV_CONNECTId, MONDEV_CONNECT, { headers: cpHeaders })
    }
	
    //Delete MONDEV_CONNECT	
    delete_MONDEV_CONNECTById(MONDEV_CONNECTId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONDEV_CONNECT/' + MONDEV_CONNECTId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONDEV.MONDEV_CONNECT = null;
	
	public 	get Selected():MONDEV.MONDEV_CONNECT{ return this.mSelecetd;}
	
	public  set Selected(_MONDEV_CONNECT:MONDEV.MONDEV_CONNECT){ this.mSelecetd=_MONDEV_CONNECT; }
 
}
