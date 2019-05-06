import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { MONDEV } from "app/MONDEV"; 
import { AppService } from "app/app.service"; 
 
@Component({ 
  selector: 'app-MONDEV', 
  templateUrl: './MONDEV.component.html', 
  styleUrls: ['./MONDEV.component.scss'] 
}) 
export class MONDEVComponent implements OnInit { 
 
  constructor(public AppService:AppService) { } 
 
  ngOnInit() { 
  } 
 
}
