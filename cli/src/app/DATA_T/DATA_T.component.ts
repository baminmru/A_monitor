import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_T_Service } from "app/DATA_T.service";
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
	   selector: 'app-DATA_T',
    styleUrls: ['./DATA_T.component.scss'],
    templateUrl: './DATA_T.component.html',
})
export class DATA_TComponent implements OnInit {

    DATA_TArray: Array<DATA.DATA_T> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_T: DATA.DATA_T = {} as DATA.DATA_T;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_T_Service: DATA_T_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_T"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_T(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_T();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_T"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_T() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_T"); 
     this.currentDATA_T = {} as DATA.DATA_T;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_T_Service.get_DATA_TByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_TArray => { this.DATA_TArray = DATA_TArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_T_Service.get_DATA_TByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_TArray => { this.DATA_TArray = DATA_TArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_T_Service.get_DATA_TByParent(item.DATA_RECORDId).subscribe(DATA_TArray => { this.DATA_TArray = DATA_TArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_T();
		return this.DATA_TArray ;
	   }

    onSelect(item: DATA.DATA_T) {
        this.currentDATA_T = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_T = {} as DATA.DATA_T;
        this.currentDATA_T.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_T) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_T = item;
    }

    onDelete(item: DATA.DATA_T) {
        this.confirmOpened = true;
        this.currentDATA_T = item;
    }

    onConfirmDeletion() {
        this.DATA_T_Service.delete_DATA_TById(this.currentDATA_T.DATA_TId).subscribe(data => {this.refreshDATA_T()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_T) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_T_Service.create_DATA_T(item)
                        .subscribe(data =>{ this.refreshDATA_T()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_T_Service.update_DATA_T( item)
                        .subscribe(data => {this.refreshDATA_T()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Температура по каналу 1';
            aoa[0][1]='Температура по каналу 2';
            aoa[0][2]='Температура по каналу 3';
            aoa[0][3]='Температура по каналу 4';
            aoa[0][4]='Температура по каналу 5';
            aoa[0][5]='Температура по каналу 6';
            aoa[0][6]='Разность Температур по каналу 1 и 2';
            aoa[0][7]='Разность Температур по каналу 4 и 5';
            aoa[0][8]='Температура горячей воды';
            aoa[0][9]='Температура холодной воды';
            aoa[0][10]='Температура холодного конца канал 1';
            aoa[0][11]='Температура холодного конца канал 2';
            aoa[0][12]='Температура воздуха канал 1';
            aoa[0][13]='Температура воздуха канал 2';
/* fill data to array */
        for(var i = 0; i < this.DATA_TArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.DATA_TArray[i].T1;
            aoa[i+1][1]=this.DATA_TArray[i].T2;
            aoa[i+1][2]=this.DATA_TArray[i].T3;
            aoa[i+1][3]=this.DATA_TArray[i].T4;
            aoa[i+1][4]=this.DATA_TArray[i].T5;
            aoa[i+1][5]=this.DATA_TArray[i].T6;
            aoa[i+1][6]=this.DATA_TArray[i].DT12;
            aoa[i+1][7]=this.DATA_TArray[i].DT45;
            aoa[i+1][8]=this.DATA_TArray[i].THOT;
            aoa[i+1][9]=this.DATA_TArray[i].TCOOL;
            aoa[i+1][10]=this.DATA_TArray[i].TCE1;
            aoa[i+1][11]=this.DATA_TArray[i].TCE2;
            aoa[i+1][12]=this.DATA_TArray[i].TAIR1;
            aoa[i+1][13]=this.DATA_TArray[i].TAIR2;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 20}
,            {wch: 20}
,            {wch: 20}
,            {wch: 20}
,            {wch: 20}
,            {wch: 20}
,            {wch: 20}
,            {wch: 20}
,            {wch: 20}
,            {wch: 20}
,            {wch: 20}
,            {wch: 20}
,            {wch: 20}
,            {wch: 20}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'DATA_T');
        

        wb.Props = {
            Title: "Данные::Температуры",
            Subject: "Данные::Температуры",
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
		XLSX.writeFile(wb, 'DATA_T.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentDATA_T = {} as DATA.DATA_T;
    }
}
 
