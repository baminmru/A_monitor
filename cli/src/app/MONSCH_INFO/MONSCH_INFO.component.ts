import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONSCH_INFO_Service } from "app/MONSCH_INFO.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONSCH } from "app/MONSCH";
import * as XLSX from 'xlsx';

const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONSCH_INFO',
    styleUrls: ['./MONSCH_INFO.component.scss'],
    templateUrl: './MONSCH_INFO.component.html',
})
export class MONSCH_INFOComponent implements OnInit {

    MONSCH_INFOArray: Array<MONSCH.MONSCH_INFO> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONSCH_INFO: MONSCH.MONSCH_INFO = {} as MONSCH.MONSCH_INFO;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MONSCH_INFO_Service: MONSCH_INFO_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMONSCH_INFO();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
    }

    refreshMONSCH_INFO() {
		   console.log("refreshing MONSCH_INFO"); 
        this.MONSCH_INFO_Service.getAll_MONSCH_INFOs().subscribe(MONSCH_INFOArray => { this.MONSCH_INFOArray = MONSCH_INFOArray; }, error => { this.ShowError(error.message); })
        this.currentMONSCH_INFO = {} as MONSCH.MONSCH_INFO;
        console.log("clear selection for MONSCH_INFO on refresh");
        this.AppService.pushSelectedMONSCH_INFO(this.currentMONSCH_INFO);
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONSCH_INFO();
		return this.MONSCH_INFOArray ;
	   }

    onSelect(item: MONSCH.MONSCH_INFO) {
        this.currentMONSCH_INFO = item;
        this.AppService.pushSelectedMONSCH_INFO(item);
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMONSCH_INFO = {} as MONSCH.MONSCH_INFO;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MONSCH.MONSCH_INFO) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONSCH_INFO = item;
    }

    onDelete(item: MONSCH.MONSCH_INFO) {
        this.confirmOpened = true;
        this.currentMONSCH_INFO = item;
    }

    onConfirmDeletion() {
        this.MONSCH_INFO_Service.delete_MONSCH_INFOById(this.currentMONSCH_INFO.MONSCH_INFOId).subscribe(data => {this.refreshMONSCH_INFO()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONSCH.MONSCH_INFO) {
        this.valid=true; 
     if(this.currentMONSCH_INFO.NAME == undefined || this.currentMONSCH_INFO.NAME=='') this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONSCH_INFO_Service.create_MONSCH_INFO(item)
                        .subscribe(data =>{ this.refreshMONSCH_INFO()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONSCH_INFO_Service.update_MONSCH_INFO( item)
                        .subscribe(data => {this.refreshMONSCH_INFO()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Название';
            aoa[0][1]='Путь к  файлу';
/* fill data to array */
        for(var i = 0; i < this.MONSCH_INFOArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MONSCH_INFOArray[i].NAME;
            aoa[i+1][1]=this.MONSCH_INFOArray[i].SCHEMA_IMAGEfile;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 64}
,            {wch: 64}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MONSCH_INFO');
        

        wb.Props = {
            Title: "Схема подключения::Схема подключения",
            Subject: "Схема подключения::Схема подключения",
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
		XLSX.writeFile(wb, 'MONSCH_INFO.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMONSCH_INFO = {} as MONSCH.MONSCH_INFO;
        console.log("clear selection for MONSCH_INFO");
        this.AppService.pushSelectedMONSCH_INFO(this.currentMONSCH_INFO);
    }
}
 
