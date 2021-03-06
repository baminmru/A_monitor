﻿import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { DATA } from "app/DATA"; 
import { DISPATCHER } from "app/DISPATCHER"; 
import { AppService } from "app/app.service"; 
import { DISPATCHER_Service } from "app/DISPATCHER.service"; 
import {AmexioLayoutModule} from 'amexio-ng-extensions';
import { AmexioGridLayoutService, GridConfig, GridConstants} from 'amexio-ng-extensions';





 
@Component({ 
  selector: 'app-DISPATCHER', 
  templateUrl: './DISPATCHER.component.html', 
  styleUrls: ['./DISPATCHER.component.scss'] 
}) 
export class DISPATCHERComponent implements OnInit { 

  gridDesktop: GridConfig;
  NodeArray:Array<DISPATCHER.NodeItem>= [];
  gVal:boolean=false;

  constructor(public AppService:AppService, public disp_Service:DISPATCHER_Service, private _gridlayoutService : AmexioGridLayoutService) { 
    
  } 
 
  ngOnInit() { 
    this.createLayouts();
    this._gridlayoutService.createLayout(this.gridDesktop);
    this.refreshNodes();
    if(this.NodeArray.length >0){
      this.onNodeSelect(this.NodeArray[0]);
    }
   
  } 
 
  refreshNodes():Array<DISPATCHER.NodeItem> {
     console.log("refreshing Nodes"); 
     this.disp_Service.getNodes().subscribe(NArray => 
      { 
        this.NodeArray = NArray; console.log(JSON.stringify( this.NodeArray) );  
        if(this.NodeArray.length >0){
          this.onNodeSelect(this.NodeArray[0]);
        }  
      }, error => { console.log(error.message); })
     return  this.NodeArray;
 }

 onNodeSelect(item:any){
  item.IsSelected=true;
	console.log("onNodeSelect:" + JSON.stringify( item)) ;
    this.disp_Service.CurrentDevice=item;
	console.log("Selectd Node: "+ JSON.stringify( this.disp_Service.CurrentDevice));
	 if(this.disp_Service.DispatcherTab =="Графики"){
		 console.log("Refreshing charts");
		 this.disp_Service.refreshCharts();
	 }else{
		 console.log("Refreshing grid");
		this.disp_Service.refreshElectro();
	 }
    
 }
 

 
	refreshList(tab:any) {

		this.disp_Service.DispatcherTab=tab.title;
		console.log("Tab: " + tab.title);
		if (this.disp_Service.CurrentDevice.DeviceID != "null"){
		 if(this.disp_Service.DispatcherTab == "Графики"){
			 console.log("Refreshing charts");
			 this.disp_Service.refreshCharts();
		 }else{
			 console.log("Refreshing grid");
			this.disp_Service.refreshElectro();
		 }
	 }
      
    }

/* Nodes():Array<DISPATCHER.NodeItem>{
  console.log("GetNodes: "+JSON.stringify( this.NodeArray));
  //return  this.NodeArray;
  return [{"DeviceID":"16d8a550-2171-43e1-33e7-08d6c2934109","NodeName":"Адрес 1","DeviceName":"Ввод 1"},{"DeviceID":"5bce1630-f6d2-4cca-a198-08d6d0b0d0cf","NodeName":"Адрес 2","DeviceName":"Устройство 2"}];
}
*/
  

  createLayouts() {
    this.gridDesktop = new GridConfig('LayoutSample1', GridConstants.Desktop)
    .addlayout(["gridheader", "gridheader", "gridheader", "gridheader"])
    .addlayout(["gridmenu", "gridfilter", "gridfilter", "gridfilter"])
    .addlayout(["gridmenu", "gridmain", "gridmain", "gridmain"])
    .addlayout(["gridfooter", "gridfooter", "gridfooter", "gridfooter"]);
  }
  
 
}
