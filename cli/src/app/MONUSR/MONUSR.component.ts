import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { MONUSR } from "app/MONUSR"; 
import { AppService } from "app/app.service"; 
 
@Component({ 
  selector: 'app-MONUSR', 
  templateUrl: './MONUSR.component.html', 
  styleUrls: ['./MONUSR.component.scss'] 
}) 
export class MONUSRComponent implements OnInit { 
 
  constructor(public AppService:AppService) { } 
 
  ngOnInit() { 
  } 
 
}
