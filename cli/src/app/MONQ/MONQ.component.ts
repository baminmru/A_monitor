import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { MONQ } from "app/MONQ"; 
import { AppService } from "app/app.service"; 
 
@Component({ 
  selector: 'app-MONQ', 
  templateUrl: './MONQ.component.html', 
  styleUrls: ['./MONQ.component.scss'] 
}) 
export class MONQComponent implements OnInit { 
 
  constructor(public AppService:AppService) { } 
 
  ngOnInit() { 
  } 
 
}
