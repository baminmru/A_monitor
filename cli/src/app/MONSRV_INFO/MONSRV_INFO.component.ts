import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONSRV_INFO_Service } from "app/MONSRV_INFO.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONSRV } from "app/MONSRV";
import * as XLSX from 'xlsx';

const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONSRV_INFO',
    styleUrls: ['./MONSRV_INFO.component.scss'],
    templateUrl: './MONSRV_INFO.component.html',
})
export class MONSRV_INFOComponent implements OnInit {

    MONSRV_INFOArray: Array<MONSRV.MONSRV_INFO> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONSRV_INFO: MONSRV.MONSRV_INFO = {} as MONSRV.MONSRV_INFO;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MONSRV_INFO_Service: MONSRV_INFO_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMONSRV_INFO();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
    }

    refreshMONSRV_INFO() {
		   console.log("refreshing MONSRV_INFO"); 
        this.MONSRV_INFO_Service.getAll_MONSRV_INFOs().subscribe(MONSRV_INFOArray => { this.MONSRV_INFOArray = MONSRV_INFOArray; }, error => { this.ShowError(error.message); })
        this.currentMONSRV_INFO = {} as MONSRV.MONSRV_INFO;
        console.log("clear selection for MONSRV_INFO on refresh");
        this.AppService.pushSelectedMONSRV_INFO(this.currentMONSRV_INFO);
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONSRV_INFO();
		return this.MONSRV_INFOArray ;
	   }

    onSelect(item: MONSRV.MONSRV_INFO) {
        this.currentMONSRV_INFO = item;
        this.AppService.pushSelectedMONSRV_INFO(item);
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMONSRV_INFO = {} as MONSRV.MONSRV_INFO;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MONSRV.MONSRV_INFO) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONSRV_INFO = item;
    }

    onDelete(item: MONSRV.MONSRV_INFO) {
        this.confirmOpened = true;
        this.currentMONSRV_INFO = item;
    }

    onConfirmDeletion() {
        this.MONSRV_INFO_Service.delete_MONSRV_INFOById(this.currentMONSRV_INFO.MONSRV_INFOId).subscribe(data => {this.refreshMONSRV_INFO()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONSRV.MONSRV_INFO) {
        this.valid=true; 
     if(this.currentMONSRV_INFO.name == undefined || this.currentMONSRV_INFO.name=='') this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONSRV_INFO_Service.create_MONSRV_INFO(item)
                        .subscribe(data =>{ this.refreshMONSRV_INFO()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONSRV_INFO_Service.update_MONSRV_INFO( item)
                        .subscribe(data => {this.refreshMONSRV_INFO()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Имя сервера';
            aoa[0][1]='IP сервера';
/* fill data to array */
        for(var i = 0; i < this.MONSRV_INFOArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MONSRV_INFOArray[i].name;
            aoa[i+1][1]=this.MONSRV_INFOArray[i].IpAddr;
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
        XLSX.utils.book_append_sheet(wb, ws, 'MONSRV_INFO');
        

        wb.Props = {
            Title: "Сервер::Описание сервера",
            Subject: "Сервер::Описание сервера",
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
		XLSX.writeFile(wb, 'MONSRV_INFO.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMONSRV_INFO = {} as MONSRV.MONSRV_INFO;
        console.log("clear selection for MONSRV_INFO");
        this.AppService.pushSelectedMONSRV_INFO(this.currentMONSRV_INFO);
    }
}
 
