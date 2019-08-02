import { Injectable } from '@angular/core'; 
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable,BehaviorSubject } from 'rxjs'; 
import { environment } from '../environments/environment';

import { DATA } from "app/DATA";
import { MONQ } from "app/MONQ";
import { monlog } from "app/monlog";
import { moncli } from "app/moncli";
import { MONSRV } from "app/MONSRV";
import { MONUSR } from "app/MONUSR";
import { MOND } from "app/MOND";
import { MONSCH } from "app/MONSCH";
import { MONNODE } from "app/MONNODE";
import { MONDEV } from "app/MONDEV";
import { UserProfile } from "app/UserProfile";
	
export class ComboInfo{ 
	id:string; 
	name:string; 
} 
 

 
@Injectable() 
export class AppService { 
	private serviceURL: string = environment.baseAppUrl; 
	 
	public isLoggedIn:boolean=false;
	
	private _newrole:boolean=true;
	private _role:string="";
	
	private _newuser:boolean=true;
	private _user:string="";

	private _newchecker:boolean=true;
	private _checker:string="";
	
	
	private myToken:UserProfile.TokenInfo={} as UserProfile.TokenInfo;
	private authResponce:any;
	private UserInfo: UserProfile.LoggedUserInfo;
	
	
	public GetToken():string {
		return this.myToken.access_token;
		}

	public jwtLogin(email:string,password:string, callback, errorCallback){
		let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		var li:UserProfile.LoginRequest = new UserProfile.LoginRequest();
		li.email = email;
		li.password = password; 
		//console.log("Send: "+JSON.stringify( li));
		this.http.post(this.serviceURL + '/account/login',JSON.stringify( li) , { headers: cpHeaders }).subscribe(
		    Data => {
				this.authResponce=Data;
				//console.log("RcvAuth: " + JSON.stringify(this.authResponce));
				this.myToken=this.authResponce.data;
				if(	  this.myToken != null ){
					 sessionStorage.setItem('auth_token', this.myToken.access_token);
					 //console.log("Rcv: " + JSON.stringify(this.myToken));
					 this.jwtUserInfo(callback);
					  setTimeout(this.jwtRefresh.bind(this),(this.myToken.expires_in-5) * 1000);
				}else{
					if(typeof errorCallback =='function'){
					  errorCallback(this.authResponce.description);
					}
				}
		    }, 
			error => {
				if(typeof errorCallback == 'function'){ 
					errorCallback(error.message); 
				} 
			}
		); 

    }
	
	

	
	
	public jwtLogout(){
		if(this.isLoggedIn){
			 let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
			 
			 this.http.get(this.serviceURL + '/account/logout' , { headers: cpHeaders }).subscribe(Data => {
					 this.authResponce='';
					 this.myToken=null;
					 sessionStorage.setItem('auth_token', '');
					 this.Role ='';
					 this.User ='';
					 this.isLoggedIn=false;
				 }); 
		}

    }
	

	public jwtRefresh(){
	 //console.log("jwtRefresh")
	 let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
	 // let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
	 var li:UserProfile.RefreshTokenRequest = new UserProfile.RefreshTokenRequest();
	 li.RefreshToken = this.myToken.refresh_token
	 //console.log("Send: "+JSON.stringify( li));
	
     this.http.post(this.serviceURL + '/account/refreshtoken',JSON.stringify( li) , { headers: cpHeaders }).subscribe(
		 Data => {
			 
			 this.authResponce=Data;
			 //console.log("RcvAuth: " + JSON.stringify(this.authResponce));
			 this.myToken=this.authResponce.data;
			 
			if(	  this.myToken != null ){
				sessionStorage.setItem('auth_token', this.myToken.access_token);
				//console.log("Rcv: " + JSON.stringify(this.myToken));
				//this.jwtUserInfo(function() {});
				setTimeout(this.jwtRefresh.bind(this),(this.myToken.expires_in-5) * 1000);
			}else{
				this.authResponce='';
				this.myToken=null;
				sessionStorage.setItem('auth_token', '');
				this.Role ='';
				this.User ='';
				this.isLoggedIn=false;
				console.log("Token expiered, Logoff loccally");
			}
		}
		, 
		error => {
				this.authResponce='';
				this.myToken=null;
				sessionStorage.setItem('auth_token', '');
				this.Role ='';
				this.User ='';
				this.isLoggedIn=false;
				console.log("Token refresh error, Logoff loccally");
		}
	 
	 ); 
    }
	
	
	public jwtUserInfo(callback){
	     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ this.myToken.access_token})
         this.http.post(this.serviceURL + '/account/private',"", { headers: cpHeaders }).subscribe(Data => {
			 this.UserInfo=Data as UserProfile.LoggedUserInfo;
			 //console.log("Rcv user info: " + JSON.stringify(this.UserInfo));
			 this.Role =this.UserInfo.roles;
			 this.User =this.UserInfo.id;
			 
			 this.isLoggedIn=true;
			 if(typeof callback =='function'){
				 callback();
			 }
			 
			 
			 /*
			 // add users
			 
			 {
			 let u= new NewUserInfo();
			 u.email="super@ruex.ru";
			 u.password="super_Password";
			 u.role="SUPERADMIN";
			 u.firstName="Акаунт";
			 u.lastName="Администратор";
			 u.OrganizationId ="24053220-C278-4EC2-E975-08D561A3D6EB";
		     this.jwtRegisterUser(u); 
			 }
			 {
			 let u= new NewUserInfo();
			 u.email="admin@ruex.ru";
			 u.password="admin_Password";
			 u.role="Администратор";
			 u.firstName="Системный";
			 u.lastName="Администратор";
		     */
		 
		 }); 
    }
	
	public jwtRegisterUser(u:UserProfile.NewUserInfo){
	 let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
     this.http.post(this.serviceURL + '/account/adduser',JSON.stringify(u) , { headers: cpHeaders }).subscribe(Data => {
		 //console.log("RcvAuth: " + JSON.stringify(Data));
	 }); 
    }


public SelectedRole = new BehaviorSubject<string>(""); 
	
	
	public get Role()
    {
        return this._role;
    }
    public set Role(value)
    {
		this._newrole=true;
        this._role = value;
		console.log("AppService: role set to " + this._role);
		this.SelectedRole.next(this._role); 
    }
	
	public currentRole = this.SelectedRole.asObservable(); 
	
	
	
	public get User()
    {
        return this._user;
    }
    public set User(value)
    {
		this._newuser=true;
        this._user = value;
		//console.log("AppService: user set to " + this._user);
		
    }
	
	
	
	 constructor(private http:HttpClient) {  
		//this.RefreshCombo(); 
	} 

	// support for Selected DATA.DATA_RECORD; 
	public LastDATA_RECORD:DATA.DATA_RECORD = {} as DATA.DATA_RECORD; 
	public SelectedDATA_RECORD = new BehaviorSubject<DATA.DATA_RECORD>({} as DATA.DATA_RECORD); 
	public pushSelectedDATA_RECORD(item:DATA.DATA_RECORD){ 
		console.log("change Selected DATA_RECORD"); 
		this.LastDATA_RECORD=item; 
		this.SelectedDATA_RECORD.next(item); 
		 
	} 
	public currentDATA_RECORD = this.SelectedDATA_RECORD.asObservable(); 

	// support for Selected DATA.DATA_V; 
	public LastDATA_V:DATA.DATA_V = {} as DATA.DATA_V; 
	public SelectedDATA_V = new BehaviorSubject<DATA.DATA_V>({} as DATA.DATA_V); 
	public pushSelectedDATA_V(item:DATA.DATA_V){ 
		console.log("change Selected DATA_V"); 
		this.LastDATA_V=item; 
		this.SelectedDATA_V.next(item); 
		 
	} 
	public currentDATA_V = this.SelectedDATA_V.asObservable(); 

	// support for Selected DATA.DATA_M; 
	public LastDATA_M:DATA.DATA_M = {} as DATA.DATA_M; 
	public SelectedDATA_M = new BehaviorSubject<DATA.DATA_M>({} as DATA.DATA_M); 
	public pushSelectedDATA_M(item:DATA.DATA_M){ 
		console.log("change Selected DATA_M"); 
		this.LastDATA_M=item; 
		this.SelectedDATA_M.next(item); 
		 
	} 
	public currentDATA_M = this.SelectedDATA_M.asObservable(); 

	// support for Selected DATA.DATA_T; 
	public LastDATA_T:DATA.DATA_T = {} as DATA.DATA_T; 
	public SelectedDATA_T = new BehaviorSubject<DATA.DATA_T>({} as DATA.DATA_T); 
	public pushSelectedDATA_T(item:DATA.DATA_T){ 
		console.log("change Selected DATA_T"); 
		this.LastDATA_T=item; 
		this.SelectedDATA_T.next(item); 
		 
	} 
	public currentDATA_T = this.SelectedDATA_T.asObservable(); 

	// support for Selected DATA.DATA_P; 
	public LastDATA_P:DATA.DATA_P = {} as DATA.DATA_P; 
	public SelectedDATA_P = new BehaviorSubject<DATA.DATA_P>({} as DATA.DATA_P); 
	public pushSelectedDATA_P(item:DATA.DATA_P){ 
		console.log("change Selected DATA_P"); 
		this.LastDATA_P=item; 
		this.SelectedDATA_P.next(item); 
		 
	} 
	public currentDATA_P = this.SelectedDATA_P.asObservable(); 

	// support for Selected DATA.DATA_Q; 
	public LastDATA_Q:DATA.DATA_Q = {} as DATA.DATA_Q; 
	public SelectedDATA_Q = new BehaviorSubject<DATA.DATA_Q>({} as DATA.DATA_Q); 
	public pushSelectedDATA_Q(item:DATA.DATA_Q){ 
		console.log("change Selected DATA_Q"); 
		this.LastDATA_Q=item; 
		this.SelectedDATA_Q.next(item); 
		 
	} 
	public currentDATA_Q = this.SelectedDATA_Q.asObservable(); 

	// support for Selected DATA.DATA_EP; 
	public LastDATA_EP:DATA.DATA_EP = {} as DATA.DATA_EP; 
	public SelectedDATA_EP = new BehaviorSubject<DATA.DATA_EP>({} as DATA.DATA_EP); 
	public pushSelectedDATA_EP(item:DATA.DATA_EP){ 
		console.log("change Selected DATA_EP"); 
		this.LastDATA_EP=item; 
		this.SelectedDATA_EP.next(item); 
		 
	} 
	public currentDATA_EP = this.SelectedDATA_EP.asObservable(); 

	// support for Selected DATA.DATA_U; 
	public LastDATA_U:DATA.DATA_U = {} as DATA.DATA_U; 
	public SelectedDATA_U = new BehaviorSubject<DATA.DATA_U>({} as DATA.DATA_U); 
	public pushSelectedDATA_U(item:DATA.DATA_U){ 
		console.log("change Selected DATA_U"); 
		this.LastDATA_U=item; 
		this.SelectedDATA_U.next(item); 
		 
	} 
	public currentDATA_U = this.SelectedDATA_U.asObservable(); 

	// support for Selected DATA.DATA_I; 
	public LastDATA_I:DATA.DATA_I = {} as DATA.DATA_I; 
	public SelectedDATA_I = new BehaviorSubject<DATA.DATA_I>({} as DATA.DATA_I); 
	public pushSelectedDATA_I(item:DATA.DATA_I){ 
		console.log("change Selected DATA_I"); 
		this.LastDATA_I=item; 
		this.SelectedDATA_I.next(item); 
		 
	} 
	public currentDATA_I = this.SelectedDATA_I.asObservable(); 

	// support for Selected DATA.DATA_EQ; 
	public LastDATA_EQ:DATA.DATA_EQ = {} as DATA.DATA_EQ; 
	public SelectedDATA_EQ = new BehaviorSubject<DATA.DATA_EQ>({} as DATA.DATA_EQ); 
	public pushSelectedDATA_EQ(item:DATA.DATA_EQ){ 
		console.log("change Selected DATA_EQ"); 
		this.LastDATA_EQ=item; 
		this.SelectedDATA_EQ.next(item); 
		 
	} 
	public currentDATA_EQ = this.SelectedDATA_EQ.asObservable(); 

	// support for Selected DATA.DATA_MSG; 
	public LastDATA_MSG:DATA.DATA_MSG = {} as DATA.DATA_MSG; 
	public SelectedDATA_MSG = new BehaviorSubject<DATA.DATA_MSG>({} as DATA.DATA_MSG); 
	public pushSelectedDATA_MSG(item:DATA.DATA_MSG){ 
		console.log("change Selected DATA_MSG"); 
		this.LastDATA_MSG=item; 
		this.SelectedDATA_MSG.next(item); 
		 
	} 
	public currentDATA_MSG = this.SelectedDATA_MSG.asObservable(); 

	// support for Selected DATA.DATA_TIME; 
	public LastDATA_TIME:DATA.DATA_TIME = {} as DATA.DATA_TIME; 
	public SelectedDATA_TIME = new BehaviorSubject<DATA.DATA_TIME>({} as DATA.DATA_TIME); 
	public pushSelectedDATA_TIME(item:DATA.DATA_TIME){ 
		console.log("change Selected DATA_TIME"); 
		this.LastDATA_TIME=item; 
		this.SelectedDATA_TIME.next(item); 
		 
	} 
	public currentDATA_TIME = this.SelectedDATA_TIME.asObservable(); 


	// support for Selected MONQ.MONQ_DEF; 
	public LastMONQ_DEF:MONQ.MONQ_DEF = {} as MONQ.MONQ_DEF; 
	public SelectedMONQ_DEF = new BehaviorSubject<MONQ.MONQ_DEF>({} as MONQ.MONQ_DEF); 
	public pushSelectedMONQ_DEF(item:MONQ.MONQ_DEF){ 
		console.log("change Selected MONQ_DEF"); 
		this.LastMONQ_DEF=item; 
		this.SelectedMONQ_DEF.next(item); 
		 
	} 
	public currentMONQ_DEF = this.SelectedMONQ_DEF.asObservable(); 

	// support for Selected MONQ.MONQ_result; 
	public LastMONQ_result:MONQ.MONQ_result = {} as MONQ.MONQ_result; 
	public SelectedMONQ_result = new BehaviorSubject<MONQ.MONQ_result>({} as MONQ.MONQ_result); 
	public pushSelectedMONQ_result(item:MONQ.MONQ_result){ 
		console.log("change Selected MONQ_result"); 
		this.LastMONQ_result=item; 
		this.SelectedMONQ_result.next(item); 
		 
	} 
	public currentMONQ_result = this.SelectedMONQ_result.asObservable(); 


	// support for Selected monlog.logcall; 
	public Lastlogcall:monlog.logcall = {} as monlog.logcall; 
	public Selectedlogcall = new BehaviorSubject<monlog.logcall>({} as monlog.logcall); 
	public pushSelectedlogcall(item:monlog.logcall){ 
		console.log("change Selected logcall"); 
		this.Lastlogcall=item; 
		this.Selectedlogcall.next(item); 
		 
	} 
	public currentlogcall = this.Selectedlogcall.asObservable(); 


	// support for Selected moncli.moncli_info; 
	public Lastmoncli_info:moncli.moncli_info = {} as moncli.moncli_info; 
	public Selectedmoncli_info = new BehaviorSubject<moncli.moncli_info>({} as moncli.moncli_info); 
	public pushSelectedmoncli_info(item:moncli.moncli_info){ 
		console.log("change Selected moncli_info"); 
		this.Lastmoncli_info=item; 
		this.Selectedmoncli_info.next(item); 
		 
	} 
	public currentmoncli_info = this.Selectedmoncli_info.asObservable(); 

	// support for Selected moncli.MOND_F; 
	public LastMOND_F:moncli.MOND_F = {} as moncli.MOND_F; 
	public SelectedMOND_F = new BehaviorSubject<moncli.MOND_F>({} as moncli.MOND_F); 
	public pushSelectedMOND_F(item:moncli.MOND_F){ 
		console.log("change Selected MOND_F"); 
		this.LastMOND_F=item; 
		this.SelectedMOND_F.next(item); 

	} 
	public currentMOND_F = this.SelectedMOND_F.asObservable(); 

	// support for Selected moncli.MOND_GRP; 
	public LastMOND_GRP:moncli.MOND_GRP = {} as moncli.MOND_GRP; 
	public SelectedMOND_GRP = new BehaviorSubject<moncli.MOND_GRP>({} as moncli.MOND_GRP); 
	public pushSelectedMOND_GRP(item:moncli.MOND_GRP){ 
		console.log("change Selected MOND_GRP"); 
		this.LastMOND_GRP=item; 
		this.SelectedMOND_GRP.next(item); 
		 
	} 
	public currentMOND_GRP = this.SelectedMOND_GRP.asObservable(); 


	// support for Selected MONSRV.MONSRV_INFO; 
	public LastMONSRV_INFO:MONSRV.MONSRV_INFO = {} as MONSRV.MONSRV_INFO; 
	public SelectedMONSRV_INFO = new BehaviorSubject<MONSRV.MONSRV_INFO>({} as MONSRV.MONSRV_INFO); 
	public pushSelectedMONSRV_INFO(item:MONSRV.MONSRV_INFO){ 
		console.log("change Selected MONSRV_INFO"); 
		this.LastMONSRV_INFO=item; 
		this.SelectedMONSRV_INFO.next(item); 
		 
	} 
	public currentMONSRV_INFO = this.SelectedMONSRV_INFO.asObservable(); 

	// support for Selected MONSRV.MONSRV_MODEMS; 
	public LastMONSRV_MODEMS:MONSRV.MONSRV_MODEMS = {} as MONSRV.MONSRV_MODEMS; 
	public SelectedMONSRV_MODEMS = new BehaviorSubject<MONSRV.MONSRV_MODEMS>({} as MONSRV.MONSRV_MODEMS); 
	public pushSelectedMONSRV_MODEMS(item:MONSRV.MONSRV_MODEMS){ 
		console.log("change Selected MONSRV_MODEMS"); 
		this.LastMONSRV_MODEMS=item; 
		this.SelectedMONSRV_MODEMS.next(item); 
		 
	} 
	public currentMONSRV_MODEMS = this.SelectedMONSRV_MODEMS.asObservable(); 

	// support for Selected MONSRV.MONSRV_PORTS; 
	public LastMONSRV_PORTS:MONSRV.MONSRV_PORTS = {} as MONSRV.MONSRV_PORTS; 
	public SelectedMONSRV_PORTS = new BehaviorSubject<MONSRV.MONSRV_PORTS>({} as MONSRV.MONSRV_PORTS); 
	public pushSelectedMONSRV_PORTS(item:MONSRV.MONSRV_PORTS){ 
		console.log("change Selected MONSRV_PORTS"); 
		this.LastMONSRV_PORTS=item; 
		this.SelectedMONSRV_PORTS.next(item); 
		 
	} 
	public currentMONSRV_PORTS = this.SelectedMONSRV_PORTS.asObservable(); 


	// support for Selected MONUSR.MON_USR; 
	public LastMON_USR:MONUSR.MON_USR = {} as MONUSR.MON_USR; 
	public SelectedMON_USR = new BehaviorSubject<MONUSR.MON_USR>({} as MONUSR.MON_USR); 
	public pushSelectedMON_USR(item:MONUSR.MON_USR){ 
		console.log("change Selected MON_USR"); 
		this.LastMON_USR=item; 
		this.SelectedMON_USR.next(item); 
		 
	} 
	public currentMON_USR = this.SelectedMON_USR.asObservable(); 


	// support for Selected MOND.MOND_PARAM; 
	public LastMOND_PARAM:MOND.MOND_PARAM = {} as MOND.MOND_PARAM; 
	public SelectedMOND_PARAM = new BehaviorSubject<MOND.MOND_PARAM>({} as MOND.MOND_PARAM); 
	public pushSelectedMOND_PARAM(item:MOND.MOND_PARAM){ 
		console.log("change Selected MOND_PARAM"); 
		this.LastMOND_PARAM=item; 
		this.SelectedMOND_PARAM.next(item); 
		 
	} 
	public currentMOND_PARAM = this.SelectedMOND_PARAM.asObservable(); 

	// support for Selected MOND.MOND_CONNECTTYPE; 
	public LastMOND_CONNECTTYPE:MOND.MOND_CONNECTTYPE = {} as MOND.MOND_CONNECTTYPE; 
	public SelectedMOND_CONNECTTYPE = new BehaviorSubject<MOND.MOND_CONNECTTYPE>({} as MOND.MOND_CONNECTTYPE); 
	public pushSelectedMOND_CONNECTTYPE(item:MOND.MOND_CONNECTTYPE){ 
		console.log("change Selected MOND_CONNECTTYPE"); 
		this.LastMOND_CONNECTTYPE=item; 
		this.SelectedMOND_CONNECTTYPE.next(item); 
		 
	} 
	public currentMOND_CONNECTTYPE = this.SelectedMOND_CONNECTTYPE.asObservable(); 

	// support for Selected MOND.MOND_DEVCLASS; 
	public LastMOND_DEVCLASS:MOND.MOND_DEVCLASS = {} as MOND.MOND_DEVCLASS; 
	public SelectedMOND_DEVCLASS = new BehaviorSubject<MOND.MOND_DEVCLASS>({} as MOND.MOND_DEVCLASS); 
	public pushSelectedMOND_DEVCLASS(item:MOND.MOND_DEVCLASS){ 
		console.log("change Selected MOND_DEVCLASS"); 
		this.LastMOND_DEVCLASS=item; 
		this.SelectedMOND_DEVCLASS.next(item); 
		 
	} 
	public currentMOND_DEVCLASS = this.SelectedMOND_DEVCLASS.asObservable(); 

	// support for Selected MOND.MOND_DEVTYPE; 
	public LastMOND_DEVTYPE:MOND.MOND_DEVTYPE = {} as MOND.MOND_DEVTYPE; 
	public SelectedMOND_DEVTYPE = new BehaviorSubject<MOND.MOND_DEVTYPE>({} as MOND.MOND_DEVTYPE); 
	public pushSelectedMOND_DEVTYPE(item:MOND.MOND_DEVTYPE){ 
		console.log("change Selected MOND_DEVTYPE"); 
		this.LastMOND_DEVTYPE=item; 
		this.SelectedMOND_DEVTYPE.next(item); 
		 
	} 
	public currentMOND_DEVTYPE = this.SelectedMOND_DEVTYPE.asObservable(); 

	// support for Selected MOND.MOND_ATYPE; 
	public LastMOND_ATYPE:MOND.MOND_ATYPE = {} as MOND.MOND_ATYPE; 
	public SelectedMOND_ATYPE = new BehaviorSubject<MOND.MOND_ATYPE>({} as MOND.MOND_ATYPE); 
	public pushSelectedMOND_ATYPE(item:MOND.MOND_ATYPE){ 
		console.log("change Selected MOND_ATYPE"); 
		this.LastMOND_ATYPE=item; 
		this.SelectedMOND_ATYPE.next(item); 
		 
	} 
	public currentMOND_ATYPE = this.SelectedMOND_ATYPE.asObservable(); 

	// support for Selected MOND.MOND_SNABTOP; 
	public LastMOND_SNABTOP:MOND.MOND_SNABTOP = {} as MOND.MOND_SNABTOP; 
	public SelectedMOND_SNABTOP = new BehaviorSubject<MOND.MOND_SNABTOP>({} as MOND.MOND_SNABTOP); 
	public pushSelectedMOND_SNABTOP(item:MOND.MOND_SNABTOP){ 
		console.log("change Selected MOND_SNABTOP"); 
		this.LastMOND_SNABTOP=item; 
		this.SelectedMOND_SNABTOP.next(item); 
		 
	} 
	public currentMOND_SNABTOP = this.SelectedMOND_SNABTOP.asObservable(); 

	// support for Selected MOND.MOND_SNAB; 
	public LastMOND_SNAB:MOND.MOND_SNAB = {} as MOND.MOND_SNAB; 
	public SelectedMOND_SNAB = new BehaviorSubject<MOND.MOND_SNAB>({} as MOND.MOND_SNAB); 
	public pushSelectedMOND_SNAB(item:MOND.MOND_SNAB){ 
		console.log("change Selected MOND_SNAB"); 
		this.LastMOND_SNAB=item; 
		this.SelectedMOND_SNAB.next(item); 
		 
	} 
	public currentMOND_SNAB = this.SelectedMOND_SNAB.asObservable(); 

	// support for Selected MOND.MOND_ROLE; 
	public LastMOND_ROLE:MOND.MOND_ROLE = {} as MOND.MOND_ROLE; 
	public SelectedMOND_ROLE = new BehaviorSubject<MOND.MOND_ROLE>({} as MOND.MOND_ROLE); 
	public pushSelectedMOND_ROLE(item:MOND.MOND_ROLE){ 
		console.log("change Selected MOND_ROLE"); 
		this.LastMOND_ROLE=item; 
		this.SelectedMOND_ROLE.next(item); 
		 
	} 
	public currentMOND_ROLE = this.SelectedMOND_ROLE.asObservable(); 

	// support for Selected MOND.MOND_DATA; 
	public LastMOND_DATA:MOND.MOND_DATA = {} as MOND.MOND_DATA; 
	public SelectedMOND_DATA = new BehaviorSubject<MOND.MOND_DATA>({} as MOND.MOND_DATA); 
	public pushSelectedMOND_DATA(item:MOND.MOND_DATA){ 
		console.log("change Selected MOND_DATA"); 
		this.LastMOND_DATA=item; 
		this.SelectedMOND_DATA.next(item); 
		 
	} 
	public currentMOND_DATA = this.SelectedMOND_DATA.asObservable(); 


	// support for Selected MONSCH.MONSCH_INFO; 
	public LastMONSCH_INFO:MONSCH.MONSCH_INFO = {} as MONSCH.MONSCH_INFO; 
	public SelectedMONSCH_INFO = new BehaviorSubject<MONSCH.MONSCH_INFO>({} as MONSCH.MONSCH_INFO); 
	public pushSelectedMONSCH_INFO(item:MONSCH.MONSCH_INFO){ 
		console.log("change Selected MONSCH_INFO"); 
		this.LastMONSCH_INFO=item; 
		this.SelectedMONSCH_INFO.next(item); 
		 
	} 
	public currentMONSCH_INFO = this.SelectedMONSCH_INFO.asObservable(); 

	// support for Selected MONSCH.MONSCH_PARAM; 
	public LastMONSCH_PARAM:MONSCH.MONSCH_PARAM = {} as MONSCH.MONSCH_PARAM; 
	public SelectedMONSCH_PARAM = new BehaviorSubject<MONSCH.MONSCH_PARAM>({} as MONSCH.MONSCH_PARAM); 
	public pushSelectedMONSCH_PARAM(item:MONSCH.MONSCH_PARAM){ 
		console.log("change Selected MONSCH_PARAM"); 
		this.LastMONSCH_PARAM=item; 
		this.SelectedMONSCH_PARAM.next(item); 
		 
	} 
	public currentMONSCH_PARAM = this.SelectedMONSCH_PARAM.asObservable(); 


	// support for Selected MONNODE.MONN_DEF; 
	public LastMONN_DEF:MONNODE.MONN_DEF = {} as MONNODE.MONN_DEF; 
	public SelectedMONN_DEF = new BehaviorSubject<MONNODE.MONN_DEF>({} as MONNODE.MONN_DEF); 
	public pushSelectedMONN_DEF(item:MONNODE.MONN_DEF){ 
		console.log("change Selected MONN_DEF"); 
		this.LastMONN_DEF=item; 
		this.SelectedMONN_DEF.next(item); 
		 
	} 
	public currentMONN_DEF = this.SelectedMONN_DEF.asObservable(); 

	// support for Selected MONNODE.MONN_LATLON; 
	public LastMONN_LATLON:MONNODE.MONN_LATLON = {} as MONNODE.MONN_LATLON; 
	public SelectedMONN_LATLON = new BehaviorSubject<MONNODE.MONN_LATLON>({} as MONNODE.MONN_LATLON); 
	public pushSelectedMONN_LATLON(item:MONNODE.MONN_LATLON){ 
		console.log("change Selected MONN_LATLON"); 
		this.LastMONN_LATLON=item; 
		this.SelectedMONN_LATLON.next(item); 
		 
	} 
	public currentMONN_LATLON = this.SelectedMONN_LATLON.asObservable(); 


	// support for Selected MONDEV.MONDEV_BDEVICES; 
	public LastMONDEV_BDEVICES:MONDEV.MONDEV_BDEVICES = {} as MONDEV.MONDEV_BDEVICES; 
	public SelectedMONDEV_BDEVICES = new BehaviorSubject<MONDEV.MONDEV_BDEVICES>({} as MONDEV.MONDEV_BDEVICES); 
	public pushSelectedMONDEV_BDEVICES(item:MONDEV.MONDEV_BDEVICES){ 
		console.log("change Selected MONDEV_BDEVICES"); 
		this.LastMONDEV_BDEVICES=item; 
		this.SelectedMONDEV_BDEVICES.next(item); 
		 
	} 
	public currentMONDEV_BDEVICES = this.SelectedMONDEV_BDEVICES.asObservable(); 

	// support for Selected MONDEV.MONDEV_CONNECT; 
	public LastMONDEV_CONNECT:MONDEV.MONDEV_CONNECT = {} as MONDEV.MONDEV_CONNECT; 
	public SelectedMONDEV_CONNECT = new BehaviorSubject<MONDEV.MONDEV_CONNECT>({} as MONDEV.MONDEV_CONNECT); 
	public pushSelectedMONDEV_CONNECT(item:MONDEV.MONDEV_CONNECT){ 
		console.log("change Selected MONDEV_CONNECT"); 
		this.LastMONDEV_CONNECT=item; 
		this.SelectedMONDEV_CONNECT.next(item); 
		 
	} 
	public currentMONDEV_CONNECT = this.SelectedMONDEV_CONNECT.asObservable(); 

	// support for Selected MONDEV.MONDEV_CONTRACT; 
	public LastMONDEV_CONTRACT:MONDEV.MONDEV_CONTRACT = {} as MONDEV.MONDEV_CONTRACT; 
	public SelectedMONDEV_CONTRACT = new BehaviorSubject<MONDEV.MONDEV_CONTRACT>({} as MONDEV.MONDEV_CONTRACT); 
	public pushSelectedMONDEV_CONTRACT(item:MONDEV.MONDEV_CONTRACT){ 
		console.log("change Selected MONDEV_CONTRACT"); 
		this.LastMONDEV_CONTRACT=item; 
		this.SelectedMONDEV_CONTRACT.next(item); 
		 
	} 
	public currentMONDEV_CONTRACT = this.SelectedMONDEV_CONTRACT.asObservable(); 

	// support for Selected MONDEV.MONDEV_PLANCALL; 
	public LastMONDEV_PLANCALL:MONDEV.MONDEV_PLANCALL = {} as MONDEV.MONDEV_PLANCALL; 
	public SelectedMONDEV_PLANCALL = new BehaviorSubject<MONDEV.MONDEV_PLANCALL>({} as MONDEV.MONDEV_PLANCALL); 
	public pushSelectedMONDEV_PLANCALL(item:MONDEV.MONDEV_PLANCALL){ 
		console.log("change Selected MONDEV_PLANCALL"); 
		this.LastMONDEV_PLANCALL=item; 
		this.SelectedMONDEV_PLANCALL.next(item); 
		 
	} 
	public currentMONDEV_PLANCALL = this.SelectedMONDEV_PLANCALL.asObservable(); 

	// support for Selected MONDEV.MONDEV_VALUEBOUNDS; 
	public LastMONDEV_VALUEBOUNDS:MONDEV.MONDEV_VALUEBOUNDS = {} as MONDEV.MONDEV_VALUEBOUNDS; 
	public SelectedMONDEV_VALUEBOUNDS = new BehaviorSubject<MONDEV.MONDEV_VALUEBOUNDS>({} as MONDEV.MONDEV_VALUEBOUNDS); 
	public pushSelectedMONDEV_VALUEBOUNDS(item:MONDEV.MONDEV_VALUEBOUNDS){ 
		console.log("change Selected MONDEV_VALUEBOUNDS"); 
		this.LastMONDEV_VALUEBOUNDS=item; 
		this.SelectedMONDEV_VALUEBOUNDS.next(item); 
		 
	} 
	public currentMONDEV_VALUEBOUNDS = this.SelectedMONDEV_VALUEBOUNDS.asObservable(); 

	// support for Selected MONDEV.MONDEV_REPORTS; 
	public LastMONDEV_REPORTS:MONDEV.MONDEV_REPORTS = {} as MONDEV.MONDEV_REPORTS; 
	public SelectedMONDEV_REPORTS = new BehaviorSubject<MONDEV.MONDEV_REPORTS>({} as MONDEV.MONDEV_REPORTS); 
	public pushSelectedMONDEV_REPORTS(item:MONDEV.MONDEV_REPORTS){ 
		console.log("change Selected MONDEV_REPORTS"); 
		this.LastMONDEV_REPORTS=item; 
		this.SelectedMONDEV_REPORTS.next(item); 
		 
	} 
	public currentMONDEV_REPORTS = this.SelectedMONDEV_REPORTS.asObservable(); 

	// support for Selected MONDEV.MONDEV_MASK; 
	public LastMONDEV_MASK:MONDEV.MONDEV_MASK = {} as MONDEV.MONDEV_MASK; 
	public SelectedMONDEV_MASK = new BehaviorSubject<MONDEV.MONDEV_MASK>({} as MONDEV.MONDEV_MASK); 
	public pushSelectedMONDEV_MASK(item:MONDEV.MONDEV_MASK){ 
		console.log("change Selected MONDEV_MASK"); 
		this.LastMONDEV_MASK=item; 
		this.SelectedMONDEV_MASK.next(item); 
		 
	} 
	public currentMONDEV_MASK = this.SelectedMONDEV_MASK.asObservable(); 

 
	public ComboDATA_RECORD:Array<ComboInfo> = []; 
	public getDATA_RECORD(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/DATA_RECORD/Combo', { headers: cpHeaders }); 
 }
	public refreshComboDATA_RECORD() { 
	this.getDATA_RECORD().subscribe(Data => {this.ComboDATA_RECORD=Data;});
 }
	public ComboDATA_V:Array<ComboInfo> = []; 
	public getDATA_V(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/DATA_V/Combo', { headers: cpHeaders }); 
 }
	public refreshComboDATA_V() { 
	this.getDATA_V().subscribe(Data => {this.ComboDATA_V=Data;});
 }
	public ComboDATA_M:Array<ComboInfo> = []; 
	public getDATA_M(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/DATA_M/Combo', { headers: cpHeaders }); 
 }
	public refreshComboDATA_M() { 
	this.getDATA_M().subscribe(Data => {this.ComboDATA_M=Data;});
 }
	public ComboDATA_T:Array<ComboInfo> = []; 
	public getDATA_T(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/DATA_T/Combo', { headers: cpHeaders }); 
 }
	public refreshComboDATA_T() { 
	this.getDATA_T().subscribe(Data => {this.ComboDATA_T=Data;});
 }
	public ComboDATA_P:Array<ComboInfo> = []; 
	public getDATA_P(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/DATA_P/Combo', { headers: cpHeaders }); 
 }
	public refreshComboDATA_P() { 
	this.getDATA_P().subscribe(Data => {this.ComboDATA_P=Data;});
 }
	public ComboDATA_Q:Array<ComboInfo> = []; 
	public getDATA_Q(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/DATA_Q/Combo', { headers: cpHeaders }); 
 }
	public refreshComboDATA_Q() { 
	this.getDATA_Q().subscribe(Data => {this.ComboDATA_Q=Data;});
 }
	public ComboDATA_EP:Array<ComboInfo> = []; 
	public getDATA_EP(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/DATA_EP/Combo', { headers: cpHeaders }); 
 }
	public refreshComboDATA_EP() { 
	this.getDATA_EP().subscribe(Data => {this.ComboDATA_EP=Data;});
 }
	public ComboDATA_U:Array<ComboInfo> = []; 
	public getDATA_U(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/DATA_U/Combo', { headers: cpHeaders }); 
 }
	public refreshComboDATA_U() { 
	this.getDATA_U().subscribe(Data => {this.ComboDATA_U=Data;});
 }
	public ComboDATA_I:Array<ComboInfo> = []; 
	public getDATA_I(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/DATA_I/Combo', { headers: cpHeaders }); 
 }
	public refreshComboDATA_I() { 
	this.getDATA_I().subscribe(Data => {this.ComboDATA_I=Data;});
 }
	public ComboDATA_EQ:Array<ComboInfo> = []; 
	public getDATA_EQ(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/DATA_EQ/Combo', { headers: cpHeaders }); 
 }
	public refreshComboDATA_EQ() { 
	this.getDATA_EQ().subscribe(Data => {this.ComboDATA_EQ=Data;});
 }
	public ComboDATA_MSG:Array<ComboInfo> = []; 
	public getDATA_MSG(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/DATA_MSG/Combo', { headers: cpHeaders }); 
 }
	public refreshComboDATA_MSG() { 
	this.getDATA_MSG().subscribe(Data => {this.ComboDATA_MSG=Data;});
 }
	public ComboDATA_TIME:Array<ComboInfo> = []; 
	public getDATA_TIME(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/DATA_TIME/Combo', { headers: cpHeaders }); 
 }
	public refreshComboDATA_TIME() { 
	this.getDATA_TIME().subscribe(Data => {this.ComboDATA_TIME=Data;});
 }

	public ComboMONQ_DEF:Array<ComboInfo> = []; 
	public getMONQ_DEF(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONQ_DEF/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONQ_DEF() { 
	this.getMONQ_DEF().subscribe(Data => {this.ComboMONQ_DEF=Data;});
 }
	public ComboMONQ_result:Array<ComboInfo> = []; 
	public getMONQ_result(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONQ_result/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONQ_result() { 
	this.getMONQ_result().subscribe(Data => {this.ComboMONQ_result=Data;});
 }

	public Combologcall:Array<ComboInfo> = []; 
	public getlogcall(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/logcall/Combo', { headers: cpHeaders }); 
 }
	public refreshCombologcall() { 
	this.getlogcall().subscribe(Data => {this.Combologcall=Data;});
 }

	public Combomoncli_info:Array<ComboInfo> = []; 
	public getmoncli_info(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/moncli_info/Combo', { headers: cpHeaders }); 
 }
	public refreshCombomoncli_info() { 
	this.getmoncli_info().subscribe(Data => {this.Combomoncli_info=Data;});
 }
	public ComboMOND_F:Array<ComboInfo> = []; 
	public getMOND_F(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MOND_F/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMOND_F() { 
	this.getMOND_F().subscribe(Data => {this.ComboMOND_F=Data;});
 }
	public ComboMOND_GRP:Array<ComboInfo> = []; 
	public getMOND_GRP(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MOND_GRP/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMOND_GRP() { 
	this.getMOND_GRP().subscribe(Data => {this.ComboMOND_GRP=Data;});
 }

	public ComboMONSRV_INFO:Array<ComboInfo> = []; 
	public getMONSRV_INFO(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONSRV_INFO/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONSRV_INFO() { 
	this.getMONSRV_INFO().subscribe(Data => {this.ComboMONSRV_INFO=Data;});
 }
	public ComboMONSRV_MODEMS:Array<ComboInfo> = []; 
	public getMONSRV_MODEMS(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONSRV_MODEMS/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONSRV_MODEMS() { 
	this.getMONSRV_MODEMS().subscribe(Data => {this.ComboMONSRV_MODEMS=Data;});
 }
	public ComboMONSRV_PORTS:Array<ComboInfo> = []; 
	public getMONSRV_PORTS(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONSRV_PORTS/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONSRV_PORTS() { 
	this.getMONSRV_PORTS().subscribe(Data => {this.ComboMONSRV_PORTS=Data;});
 }

	public ComboMON_USR:Array<ComboInfo> = []; 
	public getMON_USR(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MON_USR/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMON_USR() { 
	this.getMON_USR().subscribe(Data => {this.ComboMON_USR=Data;});
 }

	public ComboMOND_PARAM:Array<ComboInfo> = []; 
	public getMOND_PARAM(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MOND_PARAM/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMOND_PARAM() { 
	this.getMOND_PARAM().subscribe(Data => {this.ComboMOND_PARAM=Data;});
 }
	public ComboMOND_CONNECTTYPE:Array<ComboInfo> = []; 
	public getMOND_CONNECTTYPE(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MOND_CONNECTTYPE/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMOND_CONNECTTYPE() { 
	this.getMOND_CONNECTTYPE().subscribe(Data => {this.ComboMOND_CONNECTTYPE=Data;});
 }
	public ComboMOND_DEVCLASS:Array<ComboInfo> = []; 
	public getMOND_DEVCLASS(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MOND_DEVCLASS/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMOND_DEVCLASS() { 
	this.getMOND_DEVCLASS().subscribe(Data => {this.ComboMOND_DEVCLASS=Data;});
 }
	public ComboMOND_DEVTYPE:Array<ComboInfo> = []; 
	public getMOND_DEVTYPE(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MOND_DEVTYPE/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMOND_DEVTYPE() { 
	this.getMOND_DEVTYPE().subscribe(Data => {this.ComboMOND_DEVTYPE=Data;});
 }
	public ComboMOND_ATYPE:Array<ComboInfo> = []; 
	public getMOND_ATYPE(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MOND_ATYPE/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMOND_ATYPE() { 
	this.getMOND_ATYPE().subscribe(Data => {this.ComboMOND_ATYPE=Data;});
 }
	public ComboMOND_SNABTOP:Array<ComboInfo> = []; 
	public getMOND_SNABTOP(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MOND_SNABTOP/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMOND_SNABTOP() { 
	this.getMOND_SNABTOP().subscribe(Data => {this.ComboMOND_SNABTOP=Data;});
 }
	public ComboMOND_SNAB:Array<ComboInfo> = []; 
	public getMOND_SNAB(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MOND_SNAB/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMOND_SNAB() { 
	this.getMOND_SNAB().subscribe(Data => {this.ComboMOND_SNAB=Data;});
 }
	public ComboMOND_ROLE:Array<ComboInfo> = []; 
	public getMOND_ROLE(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MOND_ROLE/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMOND_ROLE() { 
	this.getMOND_ROLE().subscribe(Data => {this.ComboMOND_ROLE=Data;});
 }
	public ComboMOND_DATA:Array<ComboInfo> = []; 
	public getMOND_DATA(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MOND_DATA/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMOND_DATA() { 
	this.getMOND_DATA().subscribe(Data => {this.ComboMOND_DATA=Data;});
 }

	public ComboMONSCH_INFO:Array<ComboInfo> = []; 
	public getMONSCH_INFO(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONSCH_INFO/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONSCH_INFO() { 
	this.getMONSCH_INFO().subscribe(Data => {this.ComboMONSCH_INFO=Data;});
 }
	public ComboMONSCH_PARAM:Array<ComboInfo> = []; 
	public getMONSCH_PARAM(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONSCH_PARAM/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONSCH_PARAM() { 
	this.getMONSCH_PARAM().subscribe(Data => {this.ComboMONSCH_PARAM=Data;});
 }

	public ComboMONN_DEF:Array<ComboInfo> = []; 
	public getMONN_DEF(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONN_DEF/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONN_DEF() { 
	this.getMONN_DEF().subscribe(Data => {this.ComboMONN_DEF=Data;});
 }
	public ComboMONN_LATLON:Array<ComboInfo> = []; 
	public getMONN_LATLON(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONN_LATLON/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONN_LATLON() { 
	this.getMONN_LATLON().subscribe(Data => {this.ComboMONN_LATLON=Data;});
 }

	public ComboMONDEV_BDEVICES:Array<ComboInfo> = []; 
	public getMONDEV_BDEVICES(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONDEV_BDEVICES/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONDEV_BDEVICES() { 
	this.getMONDEV_BDEVICES().subscribe(Data => {this.ComboMONDEV_BDEVICES=Data;});
 }
	public ComboMONDEV_CONNECT:Array<ComboInfo> = []; 
	public getMONDEV_CONNECT(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONDEV_CONNECT/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONDEV_CONNECT() { 
	this.getMONDEV_CONNECT().subscribe(Data => {this.ComboMONDEV_CONNECT=Data;});
 }
	public ComboMONDEV_CONTRACT:Array<ComboInfo> = []; 
	public getMONDEV_CONTRACT(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONDEV_CONTRACT/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONDEV_CONTRACT() { 
	this.getMONDEV_CONTRACT().subscribe(Data => {this.ComboMONDEV_CONTRACT=Data;});
 }
	public ComboMONDEV_PLANCALL:Array<ComboInfo> = []; 
	public getMONDEV_PLANCALL(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONDEV_PLANCALL/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONDEV_PLANCALL() { 
	this.getMONDEV_PLANCALL().subscribe(Data => {this.ComboMONDEV_PLANCALL=Data;});
 }
	public ComboMONDEV_VALUEBOUNDS:Array<ComboInfo> = []; 
	public getMONDEV_VALUEBOUNDS(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONDEV_VALUEBOUNDS/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONDEV_VALUEBOUNDS() { 
	this.getMONDEV_VALUEBOUNDS().subscribe(Data => {this.ComboMONDEV_VALUEBOUNDS=Data;});
 }
	public ComboMONDEV_REPORTS:Array<ComboInfo> = []; 
	public getMONDEV_REPORTS(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONDEV_REPORTS/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONDEV_REPORTS() { 
	this.getMONDEV_REPORTS().subscribe(Data => {this.ComboMONDEV_REPORTS=Data;});
 }
	public ComboMONDEV_MASK:Array<ComboInfo> = []; 
	public getMONDEV_MASK(): Observable<ComboInfo[]> { 
     let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<ComboInfo[]>(this.serviceURL + '/MONDEV_MASK/Combo', { headers: cpHeaders }); 
 }
	public refreshComboMONDEV_MASK() { 
	this.getMONDEV_MASK().subscribe(Data => {this.ComboMONDEV_MASK=Data;});
 }

 
public RefreshCombo(){
	this.getDATA_RECORD().subscribe(data => {this.ComboDATA_RECORD=data;}); 
	this.getDATA_V().subscribe(data => {this.ComboDATA_V=data;}); 
	this.getDATA_M().subscribe(data => {this.ComboDATA_M=data;}); 
	this.getDATA_T().subscribe(data => {this.ComboDATA_T=data;}); 
	this.getDATA_P().subscribe(data => {this.ComboDATA_P=data;}); 
	this.getDATA_Q().subscribe(data => {this.ComboDATA_Q=data;}); 
	this.getDATA_EP().subscribe(data => {this.ComboDATA_EP=data;}); 
	this.getDATA_U().subscribe(data => {this.ComboDATA_U=data;}); 
	this.getDATA_I().subscribe(data => {this.ComboDATA_I=data;}); 
	this.getDATA_EQ().subscribe(data => {this.ComboDATA_EQ=data;}); 
	this.getDATA_MSG().subscribe(data => {this.ComboDATA_MSG=data;}); 
	this.getDATA_TIME().subscribe(data => {this.ComboDATA_TIME=data;}); 

	this.getMONQ_DEF().subscribe(data => {this.ComboMONQ_DEF=data;}); 
	this.getMONQ_result().subscribe(data => {this.ComboMONQ_result=data;}); 

	this.getlogcall().subscribe(data => {this.Combologcall=data;}); 

	this.getmoncli_info().subscribe(data => {this.Combomoncli_info=data;}); 
	this.getMOND_F().subscribe(data => {this.ComboMOND_F=data;}); 
	this.getMOND_GRP().subscribe(data => {this.ComboMOND_GRP=data;}); 

	this.getMONSRV_INFO().subscribe(data => {this.ComboMONSRV_INFO=data;}); 
	this.getMONSRV_MODEMS().subscribe(data => {this.ComboMONSRV_MODEMS=data;}); 
	this.getMONSRV_PORTS().subscribe(data => {this.ComboMONSRV_PORTS=data;}); 

	this.getMON_USR().subscribe(data => {this.ComboMON_USR=data;}); 

	this.getMOND_PARAM().subscribe(data => {this.ComboMOND_PARAM=data;}); 
	this.getMOND_CONNECTTYPE().subscribe(data => {this.ComboMOND_CONNECTTYPE=data;}); 
	this.getMOND_DEVCLASS().subscribe(data => {this.ComboMOND_DEVCLASS=data;}); 
	this.getMOND_DEVTYPE().subscribe(data => {this.ComboMOND_DEVTYPE=data;}); 
	this.getMOND_ATYPE().subscribe(data => {this.ComboMOND_ATYPE=data;}); 
	this.getMOND_SNABTOP().subscribe(data => {this.ComboMOND_SNABTOP=data;}); 
	this.getMOND_SNAB().subscribe(data => {this.ComboMOND_SNAB=data;}); 
	this.getMOND_ROLE().subscribe(data => {this.ComboMOND_ROLE=data;}); 
	this.getMOND_DATA().subscribe(data => {this.ComboMOND_DATA=data;}); 

	this.getMONSCH_INFO().subscribe(data => {this.ComboMONSCH_INFO=data;}); 
	this.getMONSCH_PARAM().subscribe(data => {this.ComboMONSCH_PARAM=data;}); 

	this.getMONN_DEF().subscribe(data => {this.ComboMONN_DEF=data;}); 
	this.getMONN_LATLON().subscribe(data => {this.ComboMONN_LATLON=data;}); 

	this.getMONDEV_BDEVICES().subscribe(data => {this.ComboMONDEV_BDEVICES=data;}); 
	this.getMONDEV_CONNECT().subscribe(data => {this.ComboMONDEV_CONNECT=data;}); 
	this.getMONDEV_CONTRACT().subscribe(data => {this.ComboMONDEV_CONTRACT=data;}); 
	this.getMONDEV_PLANCALL().subscribe(data => {this.ComboMONDEV_PLANCALL=data;}); 
	this.getMONDEV_VALUEBOUNDS().subscribe(data => {this.ComboMONDEV_VALUEBOUNDS=data;}); 
	this.getMONDEV_REPORTS().subscribe(data => {this.ComboMONDEV_REPORTS=data;}); 
	this.getMONDEV_MASK().subscribe(data => {this.ComboMONDEV_MASK=data;}); 

}
 
 // enum support

	/* StructType - Тип раздела */ 
	public enumStructTypeCombo(){
		return this.enumStructType;
	}
	enumStructType:Array<ComboInfo> =[

	 {id:'0',name:'Строка атрибутов'}
	, {id:'1',name:'Коллекция'}
	, {id:'2',name:'Дерево'}	];

	/* WFFuncParam - Вариант расшифровки параметра функции */ 
	public enumWFFuncParamCombo(){
		return this.enumWFFuncParam;
	}
	enumWFFuncParam:Array<ComboInfo> =[

	 {id:'8',name:'Роль'}
	, {id:'2',name:'Выражение'}
	, {id:'5',name:'Документ'}
	, {id:'7',name:'Поле'}
	, {id:'9',name:'Тип документа'}
	, {id:'0',name:'Значение'}
	, {id:'6',name:'Раздел'}
	, {id:'4',name:'Документ процесса'}
	, {id:'3',name:'Папка'}
	, {id:'1',name:'Значение из параметра'}	];

	/* ReportType - Вариант отчета */ 
	public enumReportTypeCombo(){
		return this.enumReportType;
	}
	enumReportType:Array<ComboInfo> =[

	 {id:'4',name:'Экспорт по Excel шаблону'}
	, {id:'0',name:'Таблица'}
	, {id:'3',name:'Экспорт по WORD шаблону'}
	, {id:'1',name:'Двумерная матрица'}
	, {id:'2',name:'Только расчет'}	];

	/* Education - Образование */ 
	public enumEducationCombo(){
		return this.enumEducation;
	}
	enumEducation:Array<ComboInfo> =[

	 {id:'-1',name:'Не важно'}
	, {id:'1',name:'Среднее'}
	, {id:'4',name:'Высшее'}
	, {id:'3',name:'Неполное высшее'}
	, {id:'0',name:'Неполное среднее'}
	, {id:'5',name:'Несколько высших'}
	, {id:'2',name:'Среднее специальное'}	];

	/* TypeStyle - Вариант трактовки типа поля */ 
	public enumTypeStyleCombo(){
		return this.enumTypeStyle;
	}
	enumTypeStyle:Array<ComboInfo> =[

	 {id:'4',name:'Ссылка'}
	, {id:'1',name:'Выражение'}
	, {id:'5',name:'Элемент оформления'}
	, {id:'3',name:'Интервал'}
	, {id:'2',name:'Перечисление'}
	, {id:'0',name:'Скалярный тип'}	];

	/* ReplicationType - Вариант репликации докуента */ 
	public enumReplicationTypeCombo(){
		return this.enumReplicationType;
	}
	enumReplicationType:Array<ComboInfo> =[

	 {id:'1',name:'Построчно'}
	, {id:'0',name:'Весь документ'}
	, {id:'2',name:'Локальный'}	];

	/* NumerationRule - Правило нумерации */ 
	public enumNumerationRuleCombo(){
		return this.enumNumerationRule;
	}
	enumNumerationRule:Array<ComboInfo> =[

	 {id:'2',name:'По кварталу'}
	, {id:'3',name:'По месяцу'}
	, {id:'0',name:'Единая зона'}
	, {id:'4',name:'По дню'}
	, {id:'1',name:'По году'}
	, {id:'10',name:'Произвольные зоны'}	];

	/* WFProcessState - Состояния процесса */ 
	public enumWFProcessStateCombo(){
		return this.enumWFProcessState;
	}
	enumWFProcessState:Array<ComboInfo> =[

	 {id:'3',name:'Pause'}
	, {id:'2',name:'Active'}
	, {id:'4',name:'Done'}
	, {id:'1',name:'Prepare'}
	, {id:'0',name:'Initial'}
	, {id:'5',name:'Processed'}	];

	/* MenuActionType - Вариант действия при выборе пункта меню */ 
	public enumMenuActionTypeCombo(){
		return this.enumMenuActionType;
	}
	enumMenuActionType:Array<ComboInfo> =[

	 {id:'4',name:'Запустить АРМ'}
	, {id:'2',name:'Выполнить метод'}
	, {id:'5',name:'Открыть отчет'}
	, {id:'0',name:'Ничего не делать'}
	, {id:'1',name:'Открыть документ'}
	, {id:'3',name:'Открыть журнал'}	];

	/* WFShortcutType - Варианты ярлыков, которые может размещать процесс */ 
	public enumWFShortcutTypeCombo(){
		return this.enumWFShortcutType;
	}
	enumWFShortcutType:Array<ComboInfo> =[

	 {id:'0',name:'Document'}
	, {id:'2',name:'Process'}
	, {id:'1',name:'Function'}	];

	/* VHAlignment - Выравнивание */ 
	public enumVHAlignmentCombo(){
		return this.enumVHAlignment;
	}
	enumVHAlignment:Array<ComboInfo> =[

	 {id:'6',name:'Right Top'}
	, {id:'7',name:'Right Center'}
	, {id:'8',name:'Right Bottom'}
	, {id:'3',name:'Center Top'}
	, {id:'0',name:'Left Top'}
	, {id:'4',name:'Center Center'}
	, {id:'1',name:'Left Center'}
	, {id:'5',name:'Center Bottom'}
	, {id:'2',name:'Left Bottom'}	];

	/* CurrencyType - Валюта платежа */ 
	public enumCurrencyTypeCombo(){
		return this.enumCurrencyType;
	}
	enumCurrencyType:Array<ComboInfo> =[

	 {id:'2',name:'Евро'}
	, {id:'0',name:'Рубль'}
	, {id:'1',name:'Доллар'}	];

	/* InfoStoreType - Тип каталога */ 
	public enumInfoStoreTypeCombo(){
		return this.enumInfoStoreType;
	}
	enumInfoStoreType:Array<ComboInfo> =[

	 {id:'2',name:'Групповой'}
	, {id:'0',name:' Общий'}
	, {id:'1',name:'Персональный'}	];

	/* DevelopmentBase - Платформа разработки */ 
	public enumDevelopmentBaseCombo(){
		return this.enumDevelopmentBase;
	}
	enumDevelopmentBase:Array<ComboInfo> =[

	 {id:'3',name:'OTHER'}
	, {id:'1',name:'DOTNET'}
	, {id:'2',name:'JAVA'}
	, {id:'0',name:'VB6'}	];

	/* Quarter - Квартал */ 
	public enumQuarterCombo(){
		return this.enumQuarter;
	}
	enumQuarter:Array<ComboInfo> =[

	 {id:'1',name:'I'}
	, {id:'4',name:'IV'}
	, {id:'0',name:'?'}
	, {id:'2',name:'II'}
	, {id:'3',name:'III'}	];

	/* Months - Месяцы */ 
	public enumMonthsCombo(){
		return this.enumMonths;
	}
	enumMonths:Array<ComboInfo> =[

	 {id:'5',name:'Май'}
	, {id:'9',name:'Сентябрь'}
	, {id:'6',name:'Июнь'}
	, {id:'12',name:'Декабрь'}
	, {id:'1',name:'Январь'}
	, {id:'8',name:'Август'}
	, {id:'2',name:'Февраль'}
	, {id:'4',name:'Апрель'}
	, {id:'7',name:'Июль'}
	, {id:'10',name:'Октябрь'}
	, {id:'3',name:'Март'}
	, {id:'11',name:'Ноябрь'}	];

	/* ColumnSortType - Вариант сортиовки данных колонки */ 
	public enumColumnSortTypeCombo(){
		return this.enumColumnSortType;
	}
	enumColumnSortType:Array<ComboInfo> =[

	 {id:'0',name:'As String'}
	, {id:'1',name:'As Numeric'}
	, {id:'2',name:'As Date'}	];

	/* Boolean - Да / Нет */ 
	public enumBooleanCombo(){
		return this.enumBoolean;
	}
	enumBoolean:Array<ComboInfo> =[

	 {id:'-1',name:'Да'}
	, {id:'0',name:'Нет'}	];

	/* JournalLinkType - Для связи журналов друг с другом */ 
	public enumJournalLinkTypeCombo(){
		return this.enumJournalLinkType;
	}
	enumJournalLinkType:Array<ComboInfo> =[

	 {id:'0',name:'Нет'}
	, {id:'4',name:'Связка ParentStructRowID  (в передлах объекта)'}
	, {id:'3',name:'Связка InstanceID (в передлах объекта)'}
	, {id:'1',name:'Ссылка на объект'}
	, {id:'2',name:'Ссылка на строку'}	];

	/* TargetType - Вариант уровня приложения, куда может генерироваться код */ 
	public enumTargetTypeCombo(){
		return this.enumTargetType;
	}
	enumTargetType:Array<ComboInfo> =[

	 {id:'0',name:'СУБД'}
	, {id:'3',name:'Документация'}
	, {id:'1',name:'МОДЕЛЬ'}
	, {id:'2',name:'Приложение'}
	, {id:'4',name:'АРМ'}	];

	/* ParityType - Четность */ 
	public enumParityTypeCombo(){
		return this.enumParityType;
	}
	enumParityType:Array<ComboInfo> =[

	 {id:'4',name:'Space'}
	, {id:'3',name:'Mark'}
	, {id:'2',name:'Odd'}
	, {id:'0',name:'None'}
	, {id:'1',name:'Even'}	];

	/* MesureFormat - Формат индикатора */ 
	public enumMesureFormatCombo(){
		return this.enumMesureFormat;
	}
	enumMesureFormat:Array<ComboInfo> =[

	 {id:'0',name:'Число'}
	, {id:'1',name:'Дата'}
	, {id:'4',name:'Объект'}
	, {id:'2',name:'Справочник'}
	, {id:'5',name:'Текст'}	];

	/* ExportType - Тип экспорта */ 
	public enumExportTypeCombo(){
		return this.enumExportType;
	}
	enumExportType:Array<ComboInfo> =[

	 {id:'3',name:'Сайт и МБ'}
	, {id:'1',name:'Сайт'}
	, {id:'0',name:'Нет'}	];

	/* WFStepClass - Тип шага процесса */ 
	public enumWFStepClassCombo(){
		return this.enumWFStepClass;
	}
	enumWFStepClass:Array<ComboInfo> =[

	 {id:'3',name:'PeriodicFunction'}
	, {id:'0',name:'SimpleFunction'}
	, {id:'2',name:'StopFunction'}
	, {id:'1',name:'StartFunction'}	];

	/* DayInWeek - День недели */ 
	public enumDayInWeekCombo(){
		return this.enumDayInWeek;
	}
	enumDayInWeek:Array<ComboInfo> =[

	 {id:'4',name:'Четверг'}
	, {id:'6',name:'Суббота'}
	, {id:'1',name:'Понедельник'}
	, {id:'7',name:'Воскресенье'}
	, {id:'2',name:'Вторник'}
	, {id:'5',name:'Пятница'}
	, {id:'3',name:'Среда'}	];

	/* GeneratorStyle - GeneratorStyle */ 
	public enumGeneratorStyleCombo(){
		return this.enumGeneratorStyle;
	}
	enumGeneratorStyle:Array<ComboInfo> =[

	 {id:'0',name:'Один тип'}
	, {id:'1',name:'Все типы сразу'}	];

	/* PlatType - Тип плательщика */ 
	public enumPlatTypeCombo(){
		return this.enumPlatType;
	}
	enumPlatType:Array<ComboInfo> =[

	 {id:'1',name:'Получатель'}
	, {id:'0',name:'Отправитель'}
	, {id:'2',name:'Другой'}	];

	/* msgState - Состояние заявки */ 
	public enummsgStateCombo(){
		return this.enummsgState;
	}
	enummsgState:Array<ComboInfo> =[

	 {id:'1',name:'Сообщено абоненту'}
	, {id:'3',name:'Промежуточный ответ'}
	, {id:'0',name:'Состояние заявки'}
	, {id:'2',name:'Абонент не ответил'}	];

	/* OnJournalRowClick - действие при открытии строки журнала */ 
	public enumOnJournalRowClickCombo(){
		return this.enumOnJournalRowClick;
	}
	enumOnJournalRowClick:Array<ComboInfo> =[

	 {id:'2',name:'Открыть документ'}
	, {id:'0',name:'Ничего не делать'}
	, {id:'1',name:'Открыть строку'}	];

	/* PartType - PartType */ 
	public enumPartTypeCombo(){
		return this.enumPartType;
	}
	enumPartType:Array<ComboInfo> =[

	 {id:'1',name:'Коллекция'}
	, {id:'2',name:'Дерево'}
	, {id:'0',name:'Строка'}
	, {id:'4',name:'Расширение с данными'}
	, {id:'3',name:'Расширение'}	];

	/* ReferenceType - ReferenceType */ 
	public enumReferenceTypeCombo(){
		return this.enumReferenceType;
	}
	enumReferenceType:Array<ComboInfo> =[

	 {id:'3',name:'На источник данных'}
	, {id:'0',name:'Скалярное поле ( не ссылка)'}
	, {id:'2',name:'На строку раздела'}
	, {id:'1',name:'На объект '}	];

	/* stateNomen -  */ 
	public enumstateNomenCombo(){
		return this.enumstateNomen;
	}
	enumstateNomen:Array<ComboInfo> =[

	 {id:'4',name:'Доставлено'}
	, {id:'2',name:'Принято'}
	, {id:'3',name:'В процессе'}
	, {id:'6',name:'Переадресация'}
	, {id:'0',name:'Оформляется'}
	, {id:'5',name:'Возврат'}	];

	/* ConditionType - Варианты условий */ 
	public enumConditionTypeCombo(){
		return this.enumConditionType;
	}
	enumConditionType:Array<ComboInfo> =[

	 {id:'6',name:'<'}
	, {id:'4',name:'>='}
	, {id:'7',name:'<='}
	, {id:'0',name:'none'}
	, {id:'1',name:'='}
	, {id:'8',name:'like'}
	, {id:'3',name:'>'}
	, {id:'2',name:'<>'}	];

	/* FolderType - Тип папки */ 
	public enumFolderTypeCombo(){
		return this.enumFolderType;
	}
	enumFolderType:Array<ComboInfo> =[

	 {id:'3',name:'Удаленные'}
	, {id:'1',name:'Входящие'}
	, {id:'9',name:'Отложенные'}
	, {id:'4',name:'Журнал'}
	, {id:'2',name:'Исходящие'}
	, {id:'7',name:'Черновики'}
	, {id:'6',name:'Отправленные'}
	, {id:'8',name:'В работе'}
	, {id:'5',name:'Календарь'}
	, {id:'10',name:'Завершенные'}
	, {id:'0',name:'cls__'}	];

	/* msgResult - Результат */ 
	public enummsgResultCombo(){
		return this.enummsgResult;
	}
	enummsgResult:Array<ComboInfo> =[

	 {id:'2',name:'Выполнено'}
	, {id:'1',name:'В работе'}
	, {id:'0',name:'Результат'}	];

	/* PartAddBehaivor - Поведение при добавлении строки раздела */ 
	public enumPartAddBehaivorCombo(){
		return this.enumPartAddBehaivor;
	}
	enumPartAddBehaivor:Array<ComboInfo> =[

	 {id:'0',name:'AddForm'}
	, {id:'2',name:'RunAction'}
	, {id:'1',name:'RefreshOnly'}	];

	/* ExtentionType - Тип расширения */ 
	public enumExtentionTypeCombo(){
		return this.enumExtentionType;
	}
	enumExtentionType:Array<ComboInfo> =[

	 {id:'6',name:'VerifyRowExt'}
	, {id:'7',name:'CodeGenerator'}
	, {id:'5',name:'DefaultExt'}
	, {id:'0',name:'StatusExt'}
	, {id:'4',name:'JrnlRunExt'}
	, {id:'2',name:'CustomExt'}
	, {id:'8',name:'ARMGenerator'}
	, {id:'1',name:'OnFormExt'}
	, {id:'3',name:'JrnlAddExt'}	];

	/* Sex - Мужской / Женский */ 
	public enumSexCombo(){
		return this.enumSex;
	}
	enumSex:Array<ComboInfo> =[

	 {id:'0',name:'Не существенно'}
	, {id:'1',name:'Мужской'}
	, {id:'-1',name:'Женский'}	];

	/* YesNo - Да / Нет (0 или 1) */ 
	public enumYesNoCombo(){
		return this.enumYesNo;
	}
	enumYesNo:Array<ComboInfo> =[

	 {id:'1',name:'Да'}
	, {id:'0',name:'Нет'}	];

	/* AggregationType - Вариант агрегации по полю */ 
	public enumAggregationTypeCombo(){
		return this.enumAggregationType;
	}
	enumAggregationType:Array<ComboInfo> =[

	 {id:'3',name:'SUM'}
	, {id:'1',name:'AVG'}
	, {id:'6',name:'CUSTOM'}
	, {id:'0',name:'none'}
	, {id:'2',name:'COUNT'}
	, {id:'5',name:'MAX'}
	, {id:'4',name:'MIN'}	];

	/* WFFuncState - Состояние функции в бизнес процессе */ 
	public enumWFFuncStateCombo(){
		return this.enumWFFuncState;
	}
	enumWFFuncState:Array<ComboInfo> =[

	 {id:'8',name:'Processed'}
	, {id:'3',name:'InWork'}
	, {id:'4',name:'Pause'}
	, {id:'6',name:'InControl'}
	, {id:'2',name:'Active'}
	, {id:'5',name:'Ready'}
	, {id:'7',name:'Done'}
	, {id:'1',name:'Prepare'}
	, {id:'0',name:'Initial'}	];

	/* Employment - Занятость */ 
	public enumEmploymentCombo(){
		return this.enumEmployment;
	}
	enumEmployment:Array<ComboInfo> =[

	 {id:'1',name:'Частичная'}
	, {id:'-1',name:'Не важно'}
	, {id:'0',name:'Полная'}	];

	/* TriState - Да / Нет / Не определено */ 
	public enumTriStateCombo(){
		return this.enumTriState;
	}
	enumTriState:Array<ComboInfo> =[

	 {id:'-1',name:'Не существенно'}
	, {id:'1',name:'Да'}
	, {id:'0',name:'Нет'}	];
 
}
