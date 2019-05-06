import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { MONNODE } from "app/MONNODE"; 
import { AppService } from "app/app.service"; 
 
@Component({ 
  selector: 'app-MONNODE', 
  templateUrl: './MONNODE.component.html', 
  styleUrls: ['./MONNODE.component.scss'] 
}) 
export class MONNODEComponent implements OnInit { 
 
  constructor(public AppService:AppService) { } 
 
  ngOnInit() { 
  } 
 
}
