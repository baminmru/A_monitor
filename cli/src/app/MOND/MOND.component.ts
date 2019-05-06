import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { MOND } from "app/MOND"; 
import { AppService } from "app/app.service"; 
 
@Component({ 
  selector: 'app-MOND', 
  templateUrl: './MOND.component.html', 
  styleUrls: ['./MOND.component.scss'] 
}) 
export class MONDComponent implements OnInit { 
 
  constructor(public AppService:AppService) { } 
 
  ngOnInit() { 
  } 
 
}
