import { Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service"; 
import {Router} from "@angular/router";

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent  {

  constructor(public AppService:AppService,private _router : Router){
  }
  
  Role(){
	  return this.AppService.Role;
  }
  
		
	

  onClick(link:string){
    if( link !="")
      this._router.navigate([link]);
  }

}
