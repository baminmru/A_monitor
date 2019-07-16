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

  
  chartTab(tab:any) {

		this.disp_Service.ChartTab=tab.current.header;
		console.log("Chart accordion Tab: " + tab.current.header);
		if (this.disp_Service.CurrentDevice.DeviceID != "null"){
		 if(this.disp_Service.DispatcherTab == "Графики"){
       if(tab.current.active){
			    console.log("Refreshing charts");
          this.disp_Service.refreshCharts();
       }else{
        console.log("Ignore closing chart accordion tab");
       }
		 }else{
			 console.log("Refreshing grid");
			this.disp_Service.refreshElectro();
		 }
	 }
      
    }
  


}