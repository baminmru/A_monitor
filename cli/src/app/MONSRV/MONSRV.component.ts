import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { MONSRV } from "app/MONSRV"; 
import { AppService } from "app/app.service"; 
 
@Component({ 
  selector: 'app-MONSRV', 
  templateUrl: './MONSRV.component.html', 
  styleUrls: ['./MONSRV.component.scss'] 
}) 
export class MONSRVComponent implements OnInit { 
 
  constructor(public AppService:AppService) { } 
 
  ngOnInit() { 
  } 
 
}
