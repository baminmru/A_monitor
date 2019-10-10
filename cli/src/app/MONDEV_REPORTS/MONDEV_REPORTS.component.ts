import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONDEV_REPORTS_Service } from "app/MONDEV_REPORTS.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONDEV } from "app/MONDEV";
import * as XLSX from 'xlsx';

const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONDEV_REPORTS',
    styleUrls: ['./MONDEV_REPORTS.component.scss'],
    templateUrl: './MONDEV_REPORTS.component.html',
})
export class MONDEV_REPORTSComponent implements OnInit {

    MONDEV_REPORTSArray: Array<MONDEV.MONDEV_REPORTS> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONDEV_REPORTS: MONDEV.MONDEV_REPORTS = {} as MONDEV.MONDEV_REPORTS;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONDEV_REPORTS_Service: MONDEV_REPORTS_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONDEV_REPORTS"); 
        this.subscription=this.AppService.currentMONDEV_BDEVICES.subscribe(si =>{ this.refreshMONDEV_REPORTS(); }, error => { this.ShowError(error.message); } );
        this.refreshMONDEV_REPORTS();
    }
    refreshCombo() {
     this.AppService.refreshComboMOND_ATYPE();
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONDEV_REPORTS"); 
        this.subscription.unsubscribe();
    }

    refreshMONDEV_REPORTS() {
		let item:MONDEV.MONDEV_BDEVICES;
		item=this.AppService.LastMONDEV_BDEVICES;
		console.log("refreshing MONDEV_REPORTS"); 
     this.currentMONDEV_REPORTS = {} as MONDEV.MONDEV_REPORTS;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONDEV_REPORTS_Service.get_MONDEV_REPORTSByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_REPORTSArray => { this.MONDEV_REPORTSArray = MONDEV_REPORTSArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONDEV_REPORTS_Service.get_MONDEV_REPORTSByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_REPORTSArray => { this.MONDEV_REPORTSArray = MONDEV_REPORTSArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId === 'string' ) {
        this.MONDEV_REPORTS_Service.get_MONDEV_REPORTSByParent(item.MONDEV_BDEVICESId).subscribe(MONDEV_REPORTSArray => { this.MONDEV_REPORTSArray = MONDEV_REPORTSArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONDEV_REPORTS();
		return this.MONDEV_REPORTSArray ;
	   }

    onSelect(item: MONDEV.MONDEV_REPORTS) {
        this.currentMONDEV_REPORTS = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId) === 'string' ) {
        this.currentMONDEV_REPORTS = {} as MONDEV.MONDEV_REPORTS;
        this.currentMONDEV_REPORTS.MONDEV_BDEVICESId = this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONDEV.MONDEV_REPORTS) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONDEV_REPORTS = item;
    }

    onDelete(item: MONDEV.MONDEV_REPORTS) {
        this.confirmOpened = true;
        this.currentMONDEV_REPORTS = item;
    }

    onConfirmDeletion() {
        this.MONDEV_REPORTS_Service.delete_MONDEV_REPORTSById(this.currentMONDEV_REPORTS.MONDEV_REPORTSId).subscribe(data => {this.refreshMONDEV_REPORTS()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONDEV.MONDEV_REPORTS) {
        this.valid=true; 
     if(this.currentMONDEV_REPORTS.repType == undefined ) this.valid=false;
     if(this.currentMONDEV_REPORTS.Name == undefined || this.currentMONDEV_REPORTS.Name=='') this.valid=false;
     if(this.currentMONDEV_REPORTS.theFile == undefined || this.currentMONDEV_REPORTS.theFile=='') this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONDEV_REPORTS_Service.create_MONDEV_REPORTS(item)
                        .subscribe(data =>{ this.refreshMONDEV_REPORTS()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONDEV_REPORTS_Service.update_MONDEV_REPORTS( item)
                        .subscribe(data => {this.refreshMONDEV_REPORTS()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Данные';
            aoa[0][1]='Название';
            aoa[0][2]='Файл';
/* fill data to array */
        for(var i = 0; i < this.MONDEV_REPORTSArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MONDEV_REPORTSArray[i].repType_name;
            aoa[i+1][1]=this.MONDEV_REPORTSArray[i].Name;
            aoa[i+1][2]=this.MONDEV_REPORTSArray[i].theFile;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 50}
,            {wch: 64}
,            {wch: 64}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MONDEV_REPORTS');
        

        wb.Props = {
            Title: "Устройство::Отчеты",
            Subject: "Устройство::Отчеты",
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
		XLSX.writeFile(wb, 'MONDEV_REPORTS.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMONDEV_REPORTS = {} as MONDEV.MONDEV_REPORTS;
    }
}
 
