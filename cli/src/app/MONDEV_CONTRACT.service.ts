import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { MONDEV} from './MONDEV';
@Injectable()
export class MONDEV_CONTRACT_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	FLD12:string = '';
	FLD13:string = '';
	FLD14:string = '';
	FLD15:string = '';
	FLD16:string = '';
	FLD17:string = '';
	FLD18:string = '';
	FLD19:string = '';
	FLD20:string = '';
	FLD21:string = '';
	FLD22:string = '';
	FLD23:string = '';
	FLD24:string = '';
	FLD25:string = '';
	FLD26:string = '';
	FLD27:string = '';
	FLD28:string = '';
	FLD29:string = '';
	FLD30:string = '';
	FLD31:string = '';
	FLD32:string = '';
	FLD33:string = '';
	FLD34:string = '';
	FLD35:string = '';
	FLD36:string = '';
	FLD37:string = '';
	FLD40:string = '';
	FLD41:string = '';
	FLD42:string = '';
	FLD43:string = '';
	FLD45:string = '';
	FLD46:string = '';
	FLD47:string = '';
	FLD48:string = '';
	FLD49:string = '';
	FLD50:string = '';
	FLD51:string = '';
	FLD52:string = '';
	FLD53:string = '';
	FLD54:string = '';
	FLD55:string = '';
	FLD56:string = '';
	FLD57:string = '';
	FLD58:string = '';
	FLD59:string = '';
	FLD60:string = '';
	FLD61:string = '';
	FLD62:string = '';
	FLD63:string = '';
	FLD64:string = '';
	FLD65:string = '';
	FLD66:string = '';
	FLD67:string = '';
	FLD68:string = '';
	FLD69:string = '';
	FLD70:string = '';
	FLD71:string = '';
	FLD72:string = '';
	FLD73:string = '';
	FLD81:string = '';
	FLD82:string = '';
	FLD83:string = '';
	FLD84:string = '';
	FLD85:string = '';
	FLD86:string = '';
	FLD87:string = '';
	FLD88:string = '';
	FLD89:string = '';
	FLD90:string = '';
	FLD92:string = '';
	FLD93:string = '';
	FLD94:string = '';
	FLD95:string = '';
	FLD96:string = '';
	FLD97:string = '';
	FLD98:string = '';
	FLD99:string = '';
	FLD100:string = '';
	FLD101:string = '';
	FLD102:string = '';
	FLD103:string = '';
	FLD104:string = '';
	PageSize:number=10;
	PageUrl:string='';
    
	//Fetch all MONDEV_CONTRACTs
    getAll_MONDEV_CONTRACTs(): Observable<MONDEV.MONDEV_CONTRACT[]> {
		var qry:string;
		qry='';
		
		if(this.FLD12!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD12='+encodeURIComponent(this.FLD12)
		}
		if(this.FLD13!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD13='+encodeURIComponent(this.FLD13)
		}
		if(this.FLD14!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD14='+encodeURIComponent(this.FLD14)
		}
		if(this.FLD15!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD15='+encodeURIComponent(this.FLD15)
		}
		if(this.FLD16!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD16='+encodeURIComponent(this.FLD16)
		}
		if(this.FLD17!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD17='+encodeURIComponent(this.FLD17)
		}
		if(this.FLD18!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD18='+encodeURIComponent(this.FLD18)
		}
		if(this.FLD19!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD19='+encodeURIComponent(this.FLD19)
		}
		if(this.FLD20!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD20='+encodeURIComponent(this.FLD20)
		}
		if(this.FLD21!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD21='+encodeURIComponent(this.FLD21)
		}
		if(this.FLD22!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD22='+encodeURIComponent(this.FLD22)
		}
		if(this.FLD23!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD23='+encodeURIComponent(this.FLD23)
		}
		if(this.FLD24!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD24='+encodeURIComponent(this.FLD24)
		}
		if(this.FLD25!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD25='+encodeURIComponent(this.FLD25)
		}
		if(this.FLD26!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD26='+encodeURIComponent(this.FLD26)
		}
		if(this.FLD27!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD27='+encodeURIComponent(this.FLD27)
		}
		if(this.FLD28!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD28='+encodeURIComponent(this.FLD28)
		}
		if(this.FLD29!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD29='+encodeURIComponent(this.FLD29)
		}
		if(this.FLD30!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD30='+encodeURIComponent(this.FLD30)
		}
		if(this.FLD31!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD31='+encodeURIComponent(this.FLD31)
		}
		if(this.FLD32!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD32='+encodeURIComponent(this.FLD32)
		}
		if(this.FLD33!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD33='+encodeURIComponent(this.FLD33)
		}
		if(this.FLD34!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD34='+encodeURIComponent(this.FLD34)
		}
		if(this.FLD35!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD35='+encodeURIComponent(this.FLD35)
		}
		if(this.FLD36!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD36='+encodeURIComponent(this.FLD36)
		}
		if(this.FLD37!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD37='+encodeURIComponent(this.FLD37)
		}
		if(this.FLD40!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD40='+encodeURIComponent(this.FLD40)
		}
		if(this.FLD41!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD41='+encodeURIComponent(this.FLD41)
		}
		if(this.FLD42!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD42='+encodeURIComponent(this.FLD42)
		}
		if(this.FLD43!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD43='+encodeURIComponent(this.FLD43)
		}
		if(this.FLD45!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD45='+encodeURIComponent(this.FLD45)
		}
		if(this.FLD46!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD46='+encodeURIComponent(this.FLD46)
		}
		if(this.FLD47!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD47='+encodeURIComponent(this.FLD47)
		}
		if(this.FLD48!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD48='+encodeURIComponent(this.FLD48)
		}
		if(this.FLD49!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD49='+encodeURIComponent(this.FLD49)
		}
		if(this.FLD50!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD50='+encodeURIComponent(this.FLD50)
		}
		if(this.FLD51!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD51='+encodeURIComponent(this.FLD51)
		}
		if(this.FLD52!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD52='+encodeURIComponent(this.FLD52)
		}
		if(this.FLD53!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD53='+encodeURIComponent(this.FLD53)
		}
		if(this.FLD54!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD54='+encodeURIComponent(this.FLD54)
		}
		if(this.FLD55!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD55='+encodeURIComponent(this.FLD55)
		}
		if(this.FLD56!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD56='+encodeURIComponent(this.FLD56)
		}
		if(this.FLD57!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD57='+encodeURIComponent(this.FLD57)
		}
		if(this.FLD58!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD58='+encodeURIComponent(this.FLD58)
		}
		if(this.FLD59!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD59='+encodeURIComponent(this.FLD59)
		}
		if(this.FLD60!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD60='+encodeURIComponent(this.FLD60)
		}
		if(this.FLD61!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD61='+encodeURIComponent(this.FLD61)
		}
		if(this.FLD62!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD62='+encodeURIComponent(this.FLD62)
		}
		if(this.FLD63!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD63='+encodeURIComponent(this.FLD63)
		}
		if(this.FLD64!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD64='+encodeURIComponent(this.FLD64)
		}
		if(this.FLD65!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD65='+encodeURIComponent(this.FLD65)
		}
		if(this.FLD66!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD66='+encodeURIComponent(this.FLD66)
		}
		if(this.FLD67!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD67='+encodeURIComponent(this.FLD67)
		}
		if(this.FLD68!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD68='+encodeURIComponent(this.FLD68)
		}
		if(this.FLD69!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD69='+encodeURIComponent(this.FLD69)
		}
		if(this.FLD70!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD70='+encodeURIComponent(this.FLD70)
		}
		if(this.FLD71!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD71='+encodeURIComponent(this.FLD71)
		}
		if(this.FLD72!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD72='+encodeURIComponent(this.FLD72)
		}
		if(this.FLD73!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD73='+encodeURIComponent(this.FLD73)
		}
		if(this.FLD81!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD81='+encodeURIComponent(this.FLD81)
		}
		if(this.FLD82!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD82='+encodeURIComponent(this.FLD82)
		}
		if(this.FLD83!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD83='+encodeURIComponent(this.FLD83)
		}
		if(this.FLD84!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD84='+encodeURIComponent(this.FLD84)
		}
		if(this.FLD85!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD85='+encodeURIComponent(this.FLD85)
		}
		if(this.FLD86!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD86='+encodeURIComponent(this.FLD86)
		}
		if(this.FLD87!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD87='+encodeURIComponent(this.FLD87)
		}
		if(this.FLD88!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD88='+encodeURIComponent(this.FLD88)
		}
		if(this.FLD89!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD89='+encodeURIComponent(this.FLD89)
		}
		if(this.FLD90!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD90='+encodeURIComponent(this.FLD90)
		}
		if(this.FLD92!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD92='+encodeURIComponent(this.FLD92)
		}
		if(this.FLD93!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD93='+encodeURIComponent(this.FLD93)
		}
		if(this.FLD94!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD94='+encodeURIComponent(this.FLD94)
		}
		if(this.FLD95!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD95='+encodeURIComponent(this.FLD95)
		}
		if(this.FLD96!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD96='+encodeURIComponent(this.FLD96)
		}
		if(this.FLD97!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD97='+encodeURIComponent(this.FLD97)
		}
		if(this.FLD98!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD98='+encodeURIComponent(this.FLD98)
		}
		if(this.FLD99!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD99='+encodeURIComponent(this.FLD99)
		}
		if(this.FLD100!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD100='+encodeURIComponent(this.FLD100)
		}
		if(this.FLD101!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD101='+encodeURIComponent(this.FLD101)
		}
		if(this.FLD102!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD102='+encodeURIComponent(this.FLD102)
		}
		if(this.FLD103!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD103='+encodeURIComponent(this.FLD103)
		}
		if(this.FLD104!=''){
			if(qry !='') qry=qry +'&';
			qry='FLD104='+encodeURIComponent(this.FLD104)
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
			return this.http.get<MONDEV.MONDEV_CONTRACT[]>(this.PageUrl, { headers: cpHeaders })
		}else{
			if(qry !='')
				qry='?' +qry;
			return this.http.get<MONDEV.MONDEV_CONTRACT[]>(this.serviceURL + '/MONDEV_CONTRACT/view/'+qry, { headers: cpHeaders })
        }
    }
	
	clearSearch():void{
	this.FLD12 = '';
	this.FLD13 = '';
	this.FLD14 = '';
	this.FLD15 = '';
	this.FLD16 = '';
	this.FLD17 = '';
	this.FLD18 = '';
	this.FLD19 = '';
	this.FLD20 = '';
	this.FLD21 = '';
	this.FLD22 = '';
	this.FLD23 = '';
	this.FLD24 = '';
	this.FLD25 = '';
	this.FLD26 = '';
	this.FLD27 = '';
	this.FLD28 = '';
	this.FLD29 = '';
	this.FLD30 = '';
	this.FLD31 = '';
	this.FLD32 = '';
	this.FLD33 = '';
	this.FLD34 = '';
	this.FLD35 = '';
	this.FLD36 = '';
	this.FLD37 = '';
	this.FLD40 = '';
	this.FLD41 = '';
	this.FLD42 = '';
	this.FLD43 = '';
	this.FLD45 = '';
	this.FLD46 = '';
	this.FLD47 = '';
	this.FLD48 = '';
	this.FLD49 = '';
	this.FLD50 = '';
	this.FLD51 = '';
	this.FLD52 = '';
	this.FLD53 = '';
	this.FLD54 = '';
	this.FLD55 = '';
	this.FLD56 = '';
	this.FLD57 = '';
	this.FLD58 = '';
	this.FLD59 = '';
	this.FLD60 = '';
	this.FLD61 = '';
	this.FLD62 = '';
	this.FLD63 = '';
	this.FLD64 = '';
	this.FLD65 = '';
	this.FLD66 = '';
	this.FLD67 = '';
	this.FLD68 = '';
	this.FLD69 = '';
	this.FLD70 = '';
	this.FLD71 = '';
	this.FLD72 = '';
	this.FLD73 = '';
	this.FLD81 = '';
	this.FLD82 = '';
	this.FLD83 = '';
	this.FLD84 = '';
	this.FLD85 = '';
	this.FLD86 = '';
	this.FLD87 = '';
	this.FLD88 = '';
	this.FLD89 = '';
	this.FLD90 = '';
	this.FLD92 = '';
	this.FLD93 = '';
	this.FLD94 = '';
	this.FLD95 = '';
	this.FLD96 = '';
	this.FLD97 = '';
	this.FLD98 = '';
	this.FLD99 = '';
	this.FLD100 = '';
	this.FLD101 = '';
	this.FLD102 = '';
	this.FLD103 = '';
	this.FLD104 = '';
		
	}
 
	   //Create MONDEV_CONTRACT
    create_MONDEV_CONTRACT(MONDEV_CONTRACT: MONDEV.MONDEV_CONTRACT): Observable<Object > {
       // MONDEV_CONTRACT.MONDEV_CONTRACTId = '';
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/MONDEV_CONTRACT/', MONDEV_CONTRACT, { headers: cpHeaders })
		
    }
	
	//Fetch MONDEV_CONTRACT by parent
    get_MONDEV_CONTRACTByParent(parentId: string): Observable<MONDEV.MONDEV_CONTRACT[]> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		   console.log(this.serviceURL +'/MONDEV_CONTRACT/byparent/'+ parentId)
        return this.http.get<MONDEV.MONDEV_CONTRACT[]>(this.serviceURL + '/MONDEV_CONTRACT/byparent/' + parentId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	//Fetch MONDEV_CONTRACT by id
    get_MONDEV_CONTRACTById(MONDEV_CONTRACTId: string): Observable<MONDEV.MONDEV_CONTRACT> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/MONDEV_CONTRACT/'+ MONDEV_CONTRACTId)
        return this.http.get<MONDEV.MONDEV_CONTRACT>(this.serviceURL + '/MONDEV_CONTRACT/' + MONDEV_CONTRACTId, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	
	   //Update MONDEV_CONTRACT
    update_MONDEV_CONTRACT(MONDEV_CONTRACT: MONDEV.MONDEV_CONTRACT):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.put(this.serviceURL + '/MONDEV_CONTRACT/' + MONDEV_CONTRACT.MONDEV_CONTRACTId, MONDEV_CONTRACT, { headers: cpHeaders })
    }
	
    //Delete MONDEV_CONTRACT	
    delete_MONDEV_CONTRACTById(MONDEV_CONTRACTId: string): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.delete(this.serviceURL + '/MONDEV_CONTRACT/' + MONDEV_CONTRACTId, { headers: cpHeaders })
            
			
    }	
	
	private mSelecetd:MONDEV.MONDEV_CONTRACT = null;
	
	public 	get Selected():MONDEV.MONDEV_CONTRACT{ return this.mSelecetd;}
	
	public  set Selected(_MONDEV_CONTRACT:MONDEV.MONDEV_CONTRACT){ this.mSelecetd=_MONDEV_CONTRACT; }
 
}
