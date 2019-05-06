import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { DATA } from "app/DATA"; 
import { AppService } from "app/app.service"; 
 
@Component({ 
  selector: 'app-DATA', 
  templateUrl: './DATA.component.html', 
  styleUrls: ['./DATA.component.scss'] 
}) 
export class DATAComponent implements OnInit { 
 
  constructor(public AppService:AppService) { } 
 
  ngOnInit() { 
  } 
 
}
