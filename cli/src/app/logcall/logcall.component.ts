import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { logcall_Service } from "app/logcall.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { monlog } from "app/monlog";
import * as XLSX from 'xlsx';

const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-logcall',
    styleUrls: ['./logcall.component.scss'],
    templateUrl: './logcall.component.html',
})
export class logcallComponent implements OnInit {

    logcallArray: Array<monlog.logcall> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentlogcall: monlog.logcall = {} as monlog.logcall;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private logcall_Service: logcall_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshlogcall();
    }
    refreshCombo() {
     this.AppService.refreshComboMONDEV_BDEVICES();
     this.AppService.refreshComboMOND_ATYPE();
    }
    ngOnDestroy() {
    }

    refreshlogcall() {
		   console.log("refreshing logcall"); 
        this.logcall_Service.getAll_logcalls().subscribe(logcallArray => { this.logcallArray = logcallArray; }, error => { this.ShowError(error.message); })
        this.currentlogcall = {} as monlog.logcall;
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshlogcall();
		return this.logcallArray ;
	   }

    onSelect(item: monlog.logcall) {
        this.currentlogcall = item;
    }

    onNew() {
    this.refreshCombo(); 
        this.currentlogcall = {} as monlog.logcall;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: monlog.logcall) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentlogcall = item;
    }

    onDelete(item: monlog.logcall) {
        this.confirmOpened = true;
        this.currentlogcall = item;
    }

    onConfirmDeletion() {
        this.logcall_Service.delete_logcallById(this.currentlogcall.logcallId).subscribe(data => {this.refreshlogcall()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: monlog.logcall) {
        this.valid=true; 
     if(this.currentlogcall.ID_BD == undefined ) this.valid=false;
     if(this.currentlogcall.DCALL == undefined ) this.valid=false;
     if(this.currentlogcall.AType == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.logcall_Service.create_logcall(item)
                        .subscribe(data =>{ this.refreshlogcall()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.logcall_Service.update_logcall( item)
                        .subscribe(data => {this.refreshlogcall()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Устройство';
            aoa[0][1]='Дата опроса';
            aoa[0][2]='Тип архива';
            aoa[0][3]='Порт';
            aoa[0][4]='Длительность';
            aoa[0][5]='Результат';
/* fill data to array */
        for(var i = 0; i < this.logcallArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.logcallArray[i].ID_BD_name;
            aoa[i+1][1]=this.logcallArray[i].DCALL;
            aoa[i+1][2]=this.logcallArray[i].AType_name;
            aoa[i+1][3]=this.logcallArray[i].CPORT;
            aoa[i+1][4]=this.logcallArray[i].DURATION;
            aoa[i+1][5]=this.logcallArray[i].CRESULT;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 50}
,            {wch: 18}
,            {wch: 50}
,            {wch: 64}
,            {wch: 20}
,            {wch: 64}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'logcall');
        

        wb.Props = {
            Title: "Логирование::Сообщения",
            Subject: "Логирование::Сообщения",
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
		XLSX.writeFile(wb, 'logcall.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentlogcall = {} as monlog.logcall;
    }
}
 
