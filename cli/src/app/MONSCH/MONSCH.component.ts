import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { MONSCH } from "app/MONSCH"; 
import { AppService } from "app/app.service"; 
 
@Component({ 
  selector: 'app-MONSCH', 
  templateUrl: './MONSCH.component.html', 
  styleUrls: ['./MONSCH.component.scss'] 
}) 
export class MONSCHComponent implements OnInit { 
 
  constructor(public AppService:AppService) { } 
 
  ngOnInit() { 
  } 
 
}
