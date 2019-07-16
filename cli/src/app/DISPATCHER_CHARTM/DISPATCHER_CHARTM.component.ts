import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AppService } from "app/app.service";
import { Observable } from "rxjs";

import { DISPATCHER } from "app/DISPATCHER";
import { DATA } from "app/DATA";
import {  Validators } from "@angular/forms";
import { DISPATCHER_Service } from "app/DISPATCHER.service";

@Component({
  selector: 'DISPATCHER_CHARTM',
  templateUrl: './DISPATCHER_CHARTM.component.html'
})
export class DISPATCHER_CHARTMComponent implements OnInit {


  constructor(public disp_Service: DISPATCHER_Service,public AppService:AppService) { } 

  ngOnInit() {
   
  }

  
  
  sdate():string{
    if(this.disp_Service.CurretCondition.dstart !=''){
    var d:Date;

    d=new Date(this.disp_Service.CurretCondition.dstart);
    return (d.getDate() + "/" + ((d.getMonth() + 1)) + "/" +d.getFullYear() ) ;
    }else{
      return '?';
    }
  }





 onDefaultLegendClick(event: any) {

   // this.sourceData = event;

  }

  onUserDefineChartClick(event: any) {
   // this.userDataSource = event; 
  }

  onUserDefineLegendClick(event: any) {

    //this.userDataSource = event;
  }

  onDefaultChartClick(event: any) {
   // this.sourceData = event;
  }

  onLineLegendClick(event: any) {
    //this.userDataSource3 = event;
  }

  onLineChartClick(event: any) {
    //this.userDataSource3 = event;
  }


}