import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_MSG_Service } from "app/DATA_MSG.service";
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
	   selector: 'app-DATA_MSG',
    styleUrls: ['./DATA_MSG.component.scss'],
    templateUrl: './DATA_MSG.component.html',
})
export class DATA_MSGComponent implements OnInit {

    DATA_MSGArray: Array<DATA.DATA_MSG> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_MSG: DATA.DATA_MSG = {} as DATA.DATA_MSG;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_MSG_Service: DATA_MSG_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_MSG"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_MSG(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_MSG();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_MSG"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_MSG() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_MSG"); 
     this.currentDATA_MSG = {} as DATA.DATA_MSG;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_MSG_Service.get_DATA_MSGByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_MSGArray => { this.DATA_MSGArray = DATA_MSGArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_MSG_Service.get_DATA_MSGByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_MSGArray => { this.DATA_MSGArray = DATA_MSGArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_MSG_Service.get_DATA_MSGByParent(item.DATA_RECORDId).subscribe(DATA_MSGArray => { this.DATA_MSGArray = DATA_MSGArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_MSG();
		return this.DATA_MSGArray ;
	   }

    onSelect(item: DATA.DATA_MSG) {
        this.currentDATA_MSG = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_MSG = {} as DATA.DATA_MSG;
        this.currentDATA_MSG.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_MSG) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_MSG = item;
    }

    onDelete(item: DATA.DATA_MSG) {
        this.confirmOpened = true;
        this.currentDATA_MSG = item;
    }

    onConfirmDeletion() {
        this.DATA_MSG_Service.delete_DATA_MSGById(this.currentDATA_MSG.DATA_MSGId).subscribe(data => {this.refreshDATA_MSG()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_MSG) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_MSG_Service.create_DATA_MSG(item)
                        .subscribe(data =>{ this.refreshDATA_MSG()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_MSG_Service.update_DATA_MSG( item)
                        .subscribe(data => {this.refreshDATA_MSG()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Нештатная ситуация 1 (ТВ1 или внешняя)';
            aoa[0][1]='Нештатная ситуация 2 (ТВ2 или внутренняя)';
            aoa[0][2]='Ошибки';
            aoa[0][3]='Код нештатной ситуации тепловычислителя';
            aoa[0][4]='Нештатные ситуации общ';
/* fill data to array */
        for(var i = 0; i < this.DATA_MSGArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.DATA_MSGArray[i].HC_1;
            aoa[i+1][1]=this.DATA_MSGArray[i].HC_2;
            aoa[i+1][2]=this.DATA_MSGArray[i].errInfo;
            aoa[i+1][3]=this.DATA_MSGArray[i].HC_CODE;
            aoa[i+1][4]=this.DATA_MSGArray[i].HC;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 64}
,            {wch: 64}
,            {wch: 64}
,            {wch: 64}
,            {wch: 64}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'DATA_MSG');
        

        wb.Props = {
            Title: "Данные::Сообщения",
            Subject: "Данные::Сообщения",
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
		XLSX.writeFile(wb, 'DATA_MSG.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentDATA_MSG = {} as DATA.DATA_MSG;
    }
}
 
