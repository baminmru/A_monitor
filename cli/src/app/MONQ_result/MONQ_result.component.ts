import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONQ_result_Service } from "app/MONQ_result.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONQ } from "app/MONQ";
import * as XLSX from 'xlsx';

const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONQ_result',
    styleUrls: ['./MONQ_result.component.scss'],
    templateUrl: './MONQ_result.component.html',
})
export class MONQ_resultComponent implements OnInit {

    MONQ_resultArray: Array<MONQ.MONQ_result> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONQ_result: MONQ.MONQ_result = {} as MONQ.MONQ_result;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONQ_result_Service: MONQ_result_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONQ_result"); 
        this.subscription=this.AppService.currentMONQ_DEF.subscribe(si =>{ this.refreshMONQ_result(); }, error => { this.ShowError(error.message); } );
        this.refreshMONQ_result();
    }
    refreshCombo() {
     this.AppService.refreshComboDATA_RECORD();
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONQ_result"); 
        this.subscription.unsubscribe();
    }

    refreshMONQ_result() {
		let item:MONQ.MONQ_DEF;
		item=this.AppService.LastMONQ_DEF;
		console.log("refreshing MONQ_result"); 
     this.currentMONQ_result = {} as MONQ.MONQ_result;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONQ_result_Service.get_MONQ_resultByParent('00000000-0000-0000-0000-000000000000').subscribe(MONQ_resultArray => { this.MONQ_resultArray = MONQ_resultArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONQ_DEFId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONQ_result_Service.get_MONQ_resultByParent('00000000-0000-0000-0000-000000000000').subscribe(MONQ_resultArray => { this.MONQ_resultArray = MONQ_resultArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONQ_DEFId === 'string' ) {
        this.MONQ_result_Service.get_MONQ_resultByParent(item.MONQ_DEFId).subscribe(MONQ_resultArray => { this.MONQ_resultArray = MONQ_resultArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONQ_result();
		return this.MONQ_resultArray ;
	   }

    onSelect(item: MONQ.MONQ_result) {
        this.currentMONQ_result = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONQ_DEF.MONQ_DEFId) === 'string' ) {
        this.currentMONQ_result = {} as MONQ.MONQ_result;
        this.currentMONQ_result.MONQ_DEFId = this.AppService.LastMONQ_DEF.MONQ_DEFId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONQ.MONQ_result) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONQ_result = item;
    }

    onDelete(item: MONQ.MONQ_result) {
        this.confirmOpened = true;
        this.currentMONQ_result = item;
    }

    onConfirmDeletion() {
        this.MONQ_result_Service.delete_MONQ_resultById(this.currentMONQ_result.MONQ_resultId).subscribe(data => {this.refreshMONQ_result()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONQ.MONQ_result) {
        this.valid=true; 
     if(this.currentMONQ_result.TextResult == undefined || this.currentMONQ_result.TextResult=='') this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONQ_result_Service.create_MONQ_result(item)
                        .subscribe(data =>{ this.refreshMONQ_result()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONQ_result_Service.update_MONQ_result( item)
                        .subscribe(data => {this.refreshMONQ_result()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Текстовый результат';
            aoa[0][1]='Запись ';
            aoa[0][2]='Обработан с ошибкой';
            aoa[0][3]='Протокол';
            aoa[0][4]='Время начала обработки';
            aoa[0][5]='Время завершения обработки';
/* fill data to array */
        for(var i = 0; i < this.MONQ_resultArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MONQ_resultArray[i].TextResult;
            aoa[i+1][1]=this.MONQ_resultArray[i].RecArch_name;
            aoa[i+1][2]=this.MONQ_resultArray[i].IsError_name;
            aoa[i+1][3]=this.MONQ_resultArray[i].LogMessage;
            aoa[i+1][4]=this.MONQ_resultArray[i].StartTime;
            aoa[i+1][5]=this.MONQ_resultArray[i].EndTime;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 64}
,            {wch: 50}
,            {wch: 30}
,            {wch: 80}
,            {wch: 18}
,            {wch: 18}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MONQ_result');
        

        wb.Props = {
            Title: "Запрос на обработку::Результат обработки",
            Subject: "Запрос на обработку::Результат обработки",
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
		XLSX.writeFile(wb, 'MONQ_result.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMONQ_result = {} as MONQ.MONQ_result;
    }
}
 
