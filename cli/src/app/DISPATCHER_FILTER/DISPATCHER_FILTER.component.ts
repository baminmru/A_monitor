import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AppService } from "app/app.service";
import { Observable } from "rxjs";

import { DISPATCHER } from "app/DISPATCHER";
import { DATA } from "app/DATA";
import {  Validators } from "@angular/forms";
import { DISPATCHER_Service } from "app/DISPATCHER.service";




const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
  selector: 'DISPATCHER_FILTER',
  templateUrl: './DISPATCHER_FILTER.component.html'
})
export class DISPATCHER_FILTERComponent implements OnInit {
	SubtestId:string='';
	
    recordsArray: Array<DATA.DATA_RECORD> = [];
	openList: boolean = true;
    opened: boolean = false;
	
  condition:DISPATCHER.FILTER;
   

    constructor( public disp_Service: DISPATCHER_Service,  public AppService:AppService ) {
		  this.condition = disp_Service.CurretCondition;
    }

    ngOnInit() {
        this.AppService.refreshComboMOND_ATYPE();
    }

    refreshList() {
		  console.log("refreshing "); 
      this.disp_Service.CurretCondition=this.condition;
      this.disp_Service.refreshElectro();
      this.disp_Service.refreshCharts();
      //this.disp_Service.refreshElectro();
    }



   

    

   
  

  
   
}
