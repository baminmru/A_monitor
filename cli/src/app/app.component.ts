import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService }      from './app.service';

declare var $;
const CSS_LOCATION : string = 'assets/themes/';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    isMobile : boolean;
  deviceHeight : any;
  deviceWidth : any;
 
  
  constructor(private _router : Router,  public AppService: AppService){
	   
  }
  
  Role(){
	  return this.AppService.Role;
  }
  onClick(menuItem:any){
	console.log("onClick: " + menuItem.text);
    if( menuItem.link)
      this._router.navigate([menuItem.link]);
  }
  
  routeToLink(data: any){
    if(!data.hasOwnProperty('childrens') && data.routerLink)
      this._router.navigate([data.routerLink]);
  }
  
  reAdjust(){
    this.deviceHeight = $(window).height();
    this.deviceWidth = $(window).width();
    if(this.deviceWidth < 995){
      this.isMobile = true;
    }
  }
  
  
  onResize(event:any){
    
    if (event.target.innerWidth < 995) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
	this.reAdjust();
  }
 
 
  ngOnInit(){
    this.reAdjust();
  }
}
