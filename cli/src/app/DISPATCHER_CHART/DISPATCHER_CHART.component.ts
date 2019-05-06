import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AppService } from "app/app.service";
import { Observable } from "rxjs";

import { DISPATCHER } from "app/DISPATCHER";
import { DATA } from "app/DATA";
import {  Validators } from "@angular/forms";
import { DISPATCHER_Service } from "app/DISPATCHER.service";

@Component({
  selector: 'DISPATCHER_CHART',
  templateUrl: './DISPATCHER_CHART.component.html'
})
export class DISPATCHER_CHARTComponent implements OnInit {


  constructor(public disp_Service: DISPATCHER_Service,public AppService:AppService) { } 

  ngOnInit() {
   
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