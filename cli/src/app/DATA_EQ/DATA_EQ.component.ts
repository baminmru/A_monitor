import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_EQ_Service } from "app/DATA_EQ.service";
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
	   selector: 'app-DATA_EQ',
    styleUrls: ['./DATA_EQ.component.scss'],
    templateUrl: './DATA_EQ.component.html',
})
export class DATA_EQComponent implements OnInit {

    DATA_EQArray: Array<DATA.DATA_EQ> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_EQ: DATA.DATA_EQ = {} as DATA.DATA_EQ;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_EQ_Service: DATA_EQ_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_EQ"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_EQ(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_EQ();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_EQ"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_EQ() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_EQ"); 
     this.currentDATA_EQ = {} as DATA.DATA_EQ;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_EQ_Service.get_DATA_EQByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_EQArray => { this.DATA_EQArray = DATA_EQArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_EQ_Service.get_DATA_EQByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_EQArray => { this.DATA_EQArray = DATA_EQArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_EQ_Service.get_DATA_EQByParent(item.DATA_RECORDId).subscribe(DATA_EQArray => { this.DATA_EQArray = DATA_EQArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_EQ();
		return this.DATA_EQArray ;
	   }

    onSelect(item: DATA.DATA_EQ) {
        this.currentDATA_EQ = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_EQ = {} as DATA.DATA_EQ;
        this.currentDATA_EQ.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_EQ) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_EQ = item;
    }

    onDelete(item: DATA.DATA_EQ) {
        this.confirmOpened = true;
        this.currentDATA_EQ = item;
    }

    onConfirmDeletion() {
        this.DATA_EQ_Service.delete_DATA_EQById(this.currentDATA_EQ.DATA_EQId).subscribe(data => {this.refreshDATA_EQ()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_EQ) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_EQ_Service.create_DATA_EQ(item)
                        .subscribe(data =>{ this.refreshDATA_EQ()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_EQ_Service.update_DATA_EQ( item)
                        .subscribe(data => {this.refreshDATA_EQ()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Энергия общ.';
            aoa[0][1]='Энергия тариф 1';
            aoa[0][2]='Энергия тариф 2';
            aoa[0][3]='Энергия тариф 3';
            aoa[0][4]='Энергия тариф 4';
            aoa[0][5]='Активная +';
            aoa[0][6]='Активная - ';
            aoa[0][7]='Реактивная +';
            aoa[0][8]='Реактивная -';
/* fill data to array */
        for(var i = 0; i < this.DATA_EQArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.DATA_EQArray[i].E0;
            aoa[i+1][1]=this.DATA_EQArray[i].E1;
            aoa[i+1][2]=this.DATA_EQArray[i].E2;
            aoa[i+1][3]=this.DATA_EQArray[i].E3;
            aoa[i+1][4]=this.DATA_EQArray[i].E4;
            aoa[i+1][5]=this.DATA_EQArray[i].AP;
            aoa[i+1][6]=this.DATA_EQArray[i].AM;
            aoa[i+1][7]=this.DATA_EQArray[i].RP;
            aoa[i+1][8]=this.DATA_EQArray[i].RM;
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
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'DATA_EQ');
        

        wb.Props = {
            Title: "Данные::Эл. Энергия",
            Subject: "Данные::Эл. Энергия",
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
		XLSX.writeFile(wb, 'DATA_EQ.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentDATA_EQ = {} as DATA.DATA_EQ;
    }
}
 
