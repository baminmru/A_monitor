import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AppService,ComboInfo } from "app/app.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-jwtlogin',
  templateUrl: './jwtlogin.component.html',
  styleUrls: ['./jwtlogin.component.css']
})
export class jwtLoginComponent implements OnInit {
 opened:boolean=true;
 email:string;
 password:string;
 errorFlag:boolean=false;
 errorMessage:string='';
 

 constructor( public AppService:AppService,private router : Router) { 
 }
 
  
  ngOnInit() {
	  this.opened=true;
	  this.AppService.jwtLogout();
  }
  
  
  ifLogin(){
	this.router.navigate(['/'])
  }
   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

  save(){
	  this.AppService.jwtLogin(this.email,this.password,this.ifLogin.bind(this),this.ShowError.bind(this));
		  
	  
  }
}
