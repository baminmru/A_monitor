import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserProfile_Service } from "app/UserProfile.service";
import { AppService } from "app/app.service";
import { Observable } from "rxjs";

import { UserProfile } from "app/UserProfile";
import {  Validators } from "@angular/forms";




const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;
const MODE_PASSWORD = 3;
const MODE_ROLE = 4;

@Component({
	   selector: 'app-UserProfile',
    styleUrls: ['./UserProfile.component.scss'],
    templateUrl: './UserProfile.component.html',
})
export class UserProfileComponent implements OnInit {

    UserProfileArray: Array<UserProfile.UserProfile> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentUserProfile: UserProfile.UserProfile = {} as UserProfile.UserProfile;
    formMsg: string = '';
	
	
	sRole:string;
	sPassword:string;
	sOldPassword:string;
	errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private UserProfile_Service: UserProfile_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshUserProfile(undefined);
    }

	ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	}
	
	refreshCombo() {
     
     this.AppService.refreshCombomoncli_info();
    }
	
    refreshUserProfile(data:any) {
		if(data!=undefined){
			if(data.data == null){
				this.ShowError(data.message + "; " + data.description); 
			}
		}
		console.log("refreshing UserProfile"); 
		this.UserProfile_Service.getAll_UserProfiles().subscribe(UserProfileArray => { this.UserProfileArray = UserProfileArray; }, error => { this.ShowError(error.message);})
		this.currentUserProfile = {} as UserProfile.UserProfile;
		
    }

	   getData(){
		this.refreshUserProfile(undefined);
		return this.UserProfileArray ;
	   }

    onSelect(item: UserProfile.UserProfile) {
        this.currentUserProfile = item;
    }

    onNew() {
		this.refreshCombo();
        this.currentUserProfile = {} as UserProfile.UserProfile;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: UserProfile.UserProfile) {
		this.refreshCombo();
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentUserProfile = item;
    }
	
	onPassword(item: UserProfile.UserProfile) {
		this.refreshCombo();
        this.opened = true;
        this.formMsg = 'Изменить пароль: ';
        this.mode = MODE_PASSWORD;
        this.currentUserProfile = item;
    }
	
	onRole(item: UserProfile.UserProfile) {
		this.refreshCombo();
        this.opened = true;
        this.formMsg = 'Изменить роль: ';
        this.mode = MODE_ROLE;
        this.currentUserProfile = item;
    }

    onDelete(item: UserProfile.UserProfile) {
        this.confirmOpened = true;
        this.currentUserProfile = item;
    } 

    onConfirmDeletion() {
		let delid :UserProfile.DeleteUserProfileRequest;
		delid= new UserProfile.DeleteUserProfileRequest();
		delid.Id=this.currentUserProfile.id;
        this.UserProfile_Service.delete_UserProfileById(delid).subscribe(data => {this.refreshUserProfile(data)}, error => { this.ShowError(error.message);});
        this.backToList();
    }

    save(item: UserProfile.UserProfile, isValid: boolean) {
        if (isValid) {
            switch (this.mode) {
                case MODE_NEW: {
					let  cr:UserProfile.CreateUserProfileRequest;
					cr = new UserProfile.CreateUserProfileRequest();
					cr.FirstName=item.firstName;
					cr.LastName=item.lastName;
					cr.MiddleName=item.middleName;
					cr.Password=this.sPassword;
					cr.Phone= item.Phone;
					cr.Email= item.email;
					cr.OrganizationId=item.OrganizationId ;
					cr.Role=this.sRole;
                    this.UserProfile_Service.create_UserProfile(cr)
                        .subscribe(data => this.refreshUserProfile(data), error => { this.ShowError(error.message);});
                    break;
                }
                case MODE_EDIT: {
					let cr:UserProfile.UpdateUserProfileRequest;
					cr = new UserProfile.UpdateUserProfileRequest();
					cr.Id=item.id;
					cr.FirstName=item.firstName;
					cr.LastName=item.lastName;
					cr.MiddleName=item.middleName;
					cr.Phone= item.Phone;
                    this.UserProfile_Service.update_UserProfile( cr)
                        .subscribe(data => this.refreshUserProfile(data), error => { this.ShowError(error.message);});
                    break; 
                }
				
				case MODE_PASSWORD: {
					let cr:UserProfile.ChangePasswordRequest;
					cr = new UserProfile.ChangePasswordRequest();
					cr.Id=item.id;
					cr.OldPassword = '' ;
					cr.NewPassword = this.sPassword;
					
                    this.UserProfile_Service.updatePassword_UserProfile( cr)
                        .subscribe(data => this.refreshUserProfile(data), error => { this.ShowError(error.message);});
                    break;
                }
				
				case MODE_ROLE: {
						let  cr:UserProfile.UpdateUserProfileRoleRequest;
					cr = new UserProfile.UpdateUserProfileRoleRequest();
					cr.Id=item.id;
					cr.Role=this.sRole;
                    this.UserProfile_Service.updateRole_UserProfile(cr)
                        .subscribe(data => this.refreshUserProfile(data), error => { this.ShowError(error.message);});
                    break;
                }
				
                default:
                    break;
            }
            this.backToList();
        //} else {
            //alert("invalid form");
        }
    }

    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentUserProfile = {} as UserProfile.UserProfile;
    }
}
 
