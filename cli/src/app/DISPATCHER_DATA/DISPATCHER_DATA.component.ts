import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 

import { DISPATCHER } from "app/DISPATCHER";
import { DATA } from "app/DATA";
import {  Validators } from "@angular/forms";
import { DISPATCHER_Service } from "app/DISPATCHER.service";
import { AppService } from "app/app.service";

 
@Component({ 
  selector: 'DISPATCHER_DATA', 
  templateUrl: './DISPATCHER_DATA.component.html', 
  styleUrls: ['./DISPATCHER_DATA.component.scss'] 
}) 
export class DISPATCHER_DATAComponent implements OnInit { 
 
  constructor(public disp_Service: DISPATCHER_Service,public AppService:AppService) { } 
 
  ngOnInit() { 
    this.disp_Service.refreshElectro();
  } 
 
 
  onSelect($event:any){}
}
