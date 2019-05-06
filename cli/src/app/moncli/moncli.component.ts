import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { moncli } from "app/moncli"; 
import { AppService } from "app/app.service"; 
 
@Component({ 
  selector: 'app-moncli', 
  templateUrl: './moncli.component.html', 
  styleUrls: ['./moncli.component.scss'] 
}) 
export class moncliComponent implements OnInit { 
 
  constructor(public AppService:AppService) { } 
 
  ngOnInit() { 
  } 
 
}
