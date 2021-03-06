﻿import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONN_LATLON_Service } from "app/MONN_LATLON.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONNODE } from "app/MONNODE";
import * as XLSX from 'xlsx';

const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONN_LATLON',
    styleUrls: ['./MONN_LATLON.component.scss'],
    templateUrl: './MONN_LATLON.component.html',
})
export class MONN_LATLONComponent implements OnInit {

    MONN_LATLONArray: Array<MONNODE.MONN_LATLON> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONN_LATLON: MONNODE.MONN_LATLON = {} as MONNODE.MONN_LATLON;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONN_LATLON_Service: MONN_LATLON_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONN_LATLON"); 
        this.subscription=this.AppService.currentMONN_DEF.subscribe(si =>{ this.refreshMONN_LATLON(); }, error => { this.ShowError(error.message); } );
        this.refreshMONN_LATLON();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONN_LATLON"); 
        this.subscription.unsubscribe();
    }

    refreshMONN_LATLON() {
		let item:MONNODE.MONN_DEF;
		item=this.AppService.LastMONN_DEF;
		console.log("refreshing MONN_LATLON"); 
     this.currentMONN_LATLON = {} as MONNODE.MONN_LATLON;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONN_LATLON_Service.get_MONN_LATLONByParent('00000000-0000-0000-0000-000000000000').subscribe(MONN_LATLONArray => { this.MONN_LATLONArray = MONN_LATLONArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONN_DEFId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONN_LATLON_Service.get_MONN_LATLONByParent('00000000-0000-0000-0000-000000000000').subscribe(MONN_LATLONArray => { this.MONN_LATLONArray = MONN_LATLONArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONN_DEFId === 'string' ) {
        this.MONN_LATLON_Service.get_MONN_LATLONByParent(item.MONN_DEFId).subscribe(MONN_LATLONArray => { this.MONN_LATLONArray = MONN_LATLONArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONN_LATLON();
		return this.MONN_LATLONArray ;
	   }

    onSelect(item: MONNODE.MONN_LATLON) {
        this.currentMONN_LATLON = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONN_DEF.MONN_DEFId) === 'string' ) {
        this.currentMONN_LATLON = {} as MONNODE.MONN_LATLON;
        this.currentMONN_LATLON.MONN_DEFId = this.AppService.LastMONN_DEF.MONN_DEFId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONNODE.MONN_LATLON) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONN_LATLON = item;
    }

    onDelete(item: MONNODE.MONN_LATLON) {
        this.confirmOpened = true;
        this.currentMONN_LATLON = item;
    }

    onConfirmDeletion() {
        this.MONN_LATLON_Service.delete_MONN_LATLONById(this.currentMONN_LATLON.MONN_LATLONId).subscribe(data => {this.refreshMONN_LATLON()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONNODE.MONN_LATLON) {
        this.valid=true; 
     if(this.currentMONN_LATLON.theDate == undefined ) this.valid=false;
     if(this.currentMONN_LATLON.Latitude == undefined  ) this.valid=false;
     if(this.currentMONN_LATLON.Longitude == undefined  ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONN_LATLON_Service.create_MONN_LATLON(item)
                        .subscribe(data =>{ this.refreshMONN_LATLON()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONN_LATLON_Service.update_MONN_LATLON( item)
                        .subscribe(data => {this.refreshMONN_LATLON()}, error => { this.ShowError(error.message); });
                    break;
                }
                default:
                    break;
            }
            this.backToList();
        //} else {
        //    this.ShowError("Ошибка заполнения формы");
        }
    }

 exportXSLX(): void {
        var aoa = [];
/* set column headers at first line */
        if(!aoa[0]) aoa[0] = [];
            aoa[0][0]='Дата фиксации';
            aoa[0][1]='Широта';
            aoa[0][2]='Долгота';
/* fill data to array */
        for(var i = 0; i < this.MONN_LATLONArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MONN_LATLONArray[i].theDate;
            aoa[i+1][1]=this.MONN_LATLONArray[i].Latitude;
            aoa[i+1][2]=this.MONN_LATLONArray[i].Longitude;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 18}
,            {wch: 20}
,            {wch: 20}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MONN_LATLON');
        

        wb.Props = {
            Title: "Узел::Координаты",
            Subject: "Узел::Координаты",
            Company: "master.bami",
            Category: "Experimentation",
            Keywords: "Export service",
            Author: "master.bami",
	           Manager: "master.bami",
	           Comments: "Raw data export",
	           LastAuthor: "master.bami",
            CreatedDate: new Date(Date.now())
        }

		/* save to file */
		XLSX.writeFile(wb, 'MONN_LATLON.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMONN_LATLON = {} as MONNODE.MONN_LATLON;
    }
}
 
