import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { monlog } from "app/monlog"; 
import { AppService } from "app/app.service"; 
 
@Component({ 
  selector: 'app-monlog', 
  templateUrl: './monlog.component.html', 
  styleUrls: ['./monlog.component.scss'] 
}) 
export class monlogComponent implements OnInit { 
 
  constructor(public AppService:AppService) { } 
 
  ngOnInit() { 
  } 
 
}
