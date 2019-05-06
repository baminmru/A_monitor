import { enums } from './enums';

export namespace UserProfile { 
	/* TestPerson -  Персонал */ 

	export interface   UserProfile { // Идентификация
		id:string; // Primary key field
		lastName:string; // Фамилия
		firstName:string; // Имя
		middleName:string; // Отчество
		email:string; // E-mail
		Phone:string; // Телефон
		LoginId:string; // Идентификатор
		OrganizationId:string;
		Organization:string;
	 }
	 
	export class ChangePasswordRequest
	{
		Id:string;
		OldPassword:string ;
		NewPassword:string ;
	}

	export class TokenInfo
	{
		access_token :string;
		expires_in:number;
		token_type:string;
		refresh_token:string;
	}
		
	export class UserDeviceData
	{
		DeviceOS:string;
		DeviceToken:string;
		AppVersion:string;
	}
	export  class LoginRequest
	{
		appsecret:string;
		clientid:string;
		email :string;
		password:string;
		Device:UserDeviceData ;
	}
	
	export class ClassLoginRequest
    {
        Passcode:string;
    }

	export class RefreshTokenRequest
	{
			RefreshToken:string;
	}

	export class NewUserInfo
	{
		email:string;
		password:string;
		role:string;
		firstName:string;
		lastName:string;
		OrganizationId:string;
	}

	export class CreateUserProfileRequest
	{
		FirstName:string;
		LastName:string;
		MiddleName:string;
		Password:string;
		Phone:string;
		Email:string;
		OrganizationId:string;
		Role:string;
	}
		
	export class DeleteUserProfileRequest
	{
		Id:string;
	}

	export class LoggedUserInfo{
		id:string;
		roles:string;
	}
	
	export class UpdateUserProfileRoleRequest
    {
        Id:string;
		Role:string;
    }
	
	export class UpdateUserProfileRequest
    {
        Id:string;
		FirstName:string;
		LastName:string;
		MiddleName:string;
		Phone:string;
    }
 
}