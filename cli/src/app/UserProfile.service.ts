import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { enums } from './enums';
import { UserProfile } from "app/UserProfile";

@Injectable()
export class UserProfile_Service {
	private serviceURL: string = environment.baseAppUrl;
 
	//Create constructor to get Http instance
	constructor(private http:HttpClient) { 
	}
	
	
	
	 getAll_UserProfile(UserId:string): Observable<UserProfile.UserProfile[]> {
		let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		if(UserId !='')
			return this.http.get<UserProfile.UserProfile[]>(this.serviceURL + '/TestPersonInfo/'+UserId, { headers: cpHeaders })
		return this.http.get<UserProfile.UserProfile[]>(this.serviceURL + '/TestPersonInfo', { headers: cpHeaders })
        
    }

	//Fetch all TestPersonInfos
    getAll_UserProfiles(): Observable<UserProfile.UserProfile[]> {
		let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<UserProfile.UserProfile[]>(this.serviceURL + '/TestPersonInfo/all', { headers: cpHeaders })
        
    }
	
    /*
    getAll_userUserProfiles(UserId:string): Observable<UserProfile.UserProfile[]> {
		let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		if(UserId !='')
			return this.http.get<UserProfile.UserProfile[]>(this.serviceURL + '/UserProfile/'+UserId, { headers: cpHeaders })
		return this.http.get<UserProfile.UserProfile[]>(this.serviceURL + '/UserProfile/', { headers: cpHeaders })
        
    }

	//Fetch all UserProfiles
    getAll_UserProfiles(): Observable<UserProfile.UserProfile[]> {
		let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		return this.http.get<UserProfile.UserProfile[]>(this.serviceURL + '/UserProfile', { headers: cpHeaders })
      
    }
	
	//Fetch UserProfile by id
    get_UserProfileById(id: string): Observable<UserProfile.UserProfile> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
		console.log(this.serviceURL +'/UserProfile/'+ id)
        return this.http.get<UserProfile.UserProfile>(this.serviceURL + '/UserProfile/' + id, { headers: cpHeaders })//.catch(err => { console.log(err) return Observable.of(err) })
    }	
	*/
	
	   //Create UserProfile
    create_UserProfile(Profile: UserProfile.CreateUserProfileRequest): Observable<Object > {
       
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/usermanagement/createuserprofile', Profile, { headers: cpHeaders });
		
    }
	
	   //Update UserProfile
    update_UserProfile(Profile: UserProfile.UpdateUserProfileRequest):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/usermanagement/updateuserprofile', Profile, { headers: cpHeaders });
    }
	
	
	updatePassword_UserProfile(Profile: UserProfile.ChangePasswordRequest):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/usermanagement/changepassword', Profile, { headers: cpHeaders });
    }
	
	updateRole_UserProfile(Profile: UserProfile.UpdateUserProfileRoleRequest):Observable<Object > {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/usermanagement/updateuserprofilerole', Profile, { headers: cpHeaders });
    }
	


    delete_UserProfileById(delid: UserProfile.DeleteUserProfileRequest): Observable<Object> {
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ sessionStorage.getItem('auth_token') });
        return this.http.post(this.serviceURL + '/usermanagement/deleteuserprofile', delid, { headers: cpHeaders });
            
			
    }	
	
	private mSelecetd:UserProfile.UserProfile = null;
	
	public 	get Selected():UserProfile.UserProfile{ return this.mSelecetd;}
	
	public  set Selected(_UserProfile:UserProfile.UserProfile){ this.mSelecetd=_UserProfile; }
 
}
