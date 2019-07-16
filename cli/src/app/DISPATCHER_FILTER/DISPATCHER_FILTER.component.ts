import { Component, OnInit, Input, Output, EventEmitter,ChangeDetectionStrategy,ChangeDetectorRef } from "@angular/core";
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
  ,
  changeDetection: ChangeDetectionStrategy.Default

})
export class DISPATCHER_FILTERComponent implements OnInit {
	SubtestId:string='';
	
    recordsArray: Array<DATA.DATA_RECORD> = [];
	openList: boolean = true;
    opened: boolean = false;
	
   
    dstart:string="06-Jun-2019";  // Начало интервала
    dend:string="06-Jul-2019";  // Конец интервала
   

    constructor( public cdRef:ChangeDetectorRef,public disp_Service: DISPATCHER_Service,  public AppService:AppService ) {
		this.dstart = disp_Service.CurretCondition.dstart;  
		this.dend = disp_Service.CurretCondition.dend;  

    }

    ngOnInit() {
		//this.cdRef.markForCheck();
		//this.AppService.refreshComboMOND_ATYPE();
		
    }

    refreshData() {
		  
      this.disp_Service.CurretCondition.dstart=this.dstart;
	  this.disp_Service.CurretCondition.dend=this.dend;
	     if(this.disp_Service.DispatcherTab =="Графики"){
			 console.log("Refreshing charts");
			 this.disp_Service.refreshCharts();
		 }else{
			 console.log("Refreshing grid");
			this.disp_Service.refreshElectro();
		 }
    }



   

    

   
  

  
   
}
