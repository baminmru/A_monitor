import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_RECORD_Service } from "app/DATA_RECORD.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { DATA } from "app/DATA";
import * as XLSX from 'xlsx';

const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-DATA_RECORD',
    styleUrls: ['./DATA_RECORD.component.scss'],
    templateUrl: './DATA_RECORD.component.html',
})
export class DATA_RECORDComponent implements OnInit {

    DATA_RECORDArray: Array<DATA.DATA_RECORD> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_RECORD: DATA.DATA_RECORD = {} as DATA.DATA_RECORD;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private DATA_RECORD_Service: DATA_RECORD_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshDATA_RECORD();
    }
    refreshCombo() {
     this.AppService.refreshComboMONDEV_BDEVICES();
     this.AppService.refreshComboMOND_ATYPE();
    }
    ngOnDestroy() {
    }

    refreshDATA_RECORD() {
		   console.log("refreshing DATA_RECORD"); 
        this.DATA_RECORD_Service.getAll_DATA_RECORDs().subscribe(DATA_RECORDArray => { this.DATA_RECORDArray = DATA_RECORDArray; }, error => { this.ShowError(error.message); })
        this.currentDATA_RECORD = {} as DATA.DATA_RECORD;
        console.log("clear selection for DATA_RECORD on refresh");
        this.AppService.pushSelectedDATA_RECORD(this.currentDATA_RECORD);
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_RECORD();
		return this.DATA_RECORDArray ;
	   }

    onSelect(item: DATA.DATA_RECORD) {
        this.currentDATA_RECORD = item;
        this.AppService.pushSelectedDATA_RECORD(item);
    }

    onNew() {
    this.refreshCombo(); 
        this.currentDATA_RECORD = {} as DATA.DATA_RECORD;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: DATA.DATA_RECORD) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_RECORD = item;
    }

    onDelete(item: DATA.DATA_RECORD) {
        this.confirmOpened = true;
        this.currentDATA_RECORD = item;
    }

    onConfirmDeletion() {
        this.DATA_RECORD_Service.delete_DATA_RECORDById(this.currentDATA_RECORD.DATA_RECORDId).subscribe(data => {this.refreshDATA_RECORD()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_RECORD) {
        this.valid=true; 
     if(this.currentDATA_RECORD.ID_BD == undefined ) this.valid=false;
     if(this.currentDATA_RECORD.DCALL == undefined ) this.valid=false;
     if(this.currentDATA_RECORD.AType == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_RECORD_Service.create_DATA_RECORD(item)
                        .subscribe(data =>{ this.refreshDATA_RECORD()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_RECORD_Service.update_DATA_RECORD( item)
                        .subscribe(data => {this.refreshDATA_RECORD()}, error => { this.ShowError(error.message); });
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
            aoa[0][3]='Проверка архивных данных на НС (0 - не производилась, 1 - произведена)';
            aoa[0][4]='Дата счетчика';
            aoa[0][5]='Начало интервала';
            aoa[0][6]='Конец интервала';
            aoa[0][7]='Сообщение';
/* fill data to array */
        for(var i = 0; i < this.DATA_RECORDArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.DATA_RECORDArray[i].ID_BD_name;
            aoa[i+1][1]=this.DATA_RECORDArray[i].DCALL;
            aoa[i+1][2]=this.DATA_RECORDArray[i].AType_name;
            aoa[i+1][3]=this.DATA_RECORDArray[i].CHECK_A;
            aoa[i+1][4]=this.DATA_RECORDArray[i].DCOUNTER;
            aoa[i+1][5]=this.DATA_RECORDArray[i].dstart;
            aoa[i+1][6]=this.DATA_RECORDArray[i].dend;
            aoa[i+1][7]=this.DATA_RECORDArray[i].MSG;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 50}
,            {wch: 18}
,            {wch: 50}
,            {wch: 20}
,            {wch: 18}
,            {wch: 18}
,            {wch: 18}
,            {wch: 64}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'DATA_RECORD');
        

        wb.Props = {
            Title: "Данные::Запись",
            Subject: "Данные::Запись",
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
		XLSX.writeFile(wb, 'DATA_RECORD.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentDATA_RECORD = {} as DATA.DATA_RECORD;
        console.log("clear selection for DATA_RECORD");
        this.AppService.pushSelectedDATA_RECORD(this.currentDATA_RECORD);
    }
}
 
