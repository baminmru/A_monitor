import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_Q_Service } from "app/DATA_Q.service";
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
	   selector: 'app-DATA_Q',
    styleUrls: ['./DATA_Q.component.scss'],
    templateUrl: './DATA_Q.component.html',
})
export class DATA_QComponent implements OnInit {

    DATA_QArray: Array<DATA.DATA_Q> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_Q: DATA.DATA_Q = {} as DATA.DATA_Q;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_Q_Service: DATA_Q_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_Q"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_Q(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_Q();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_Q"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_Q() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_Q"); 
     this.currentDATA_Q = {} as DATA.DATA_Q;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_Q_Service.get_DATA_QByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_QArray => { this.DATA_QArray = DATA_QArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_Q_Service.get_DATA_QByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_QArray => { this.DATA_QArray = DATA_QArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_Q_Service.get_DATA_QByParent(item.DATA_RECORDId).subscribe(DATA_QArray => { this.DATA_QArray = DATA_QArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_Q();
		return this.DATA_QArray ;
	   }

    onSelect(item: DATA.DATA_Q) {
        this.currentDATA_Q = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_Q = {} as DATA.DATA_Q;
        this.currentDATA_Q.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_Q) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_Q = item;
    }

    onDelete(item: DATA.DATA_Q) {
        this.confirmOpened = true;
        this.currentDATA_Q = item;
    }

    onConfirmDeletion() {
        this.DATA_Q_Service.delete_DATA_QById(this.currentDATA_Q.DATA_QId).subscribe(data => {this.refreshDATA_Q()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_Q) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_Q_Service.create_DATA_Q(item)
                        .subscribe(data =>{ this.refreshDATA_Q()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_Q_Service.update_DATA_Q( item)
                        .subscribe(data => {this.refreshDATA_Q()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Тепловая энергия канал 1';
            aoa[0][1]='Тепловая энергия канал 2';
            aoa[0][2]='Тепловая энергия канал 3';
            aoa[0][3]='Тепловая энергия канал 4';
            aoa[0][4]='Тепловая энергия канал 5';
            aoa[0][5]='Тепловая энергия потребитель 1';
            aoa[0][6]='Тепловая энергия потребитель 2';
            aoa[0][7]='Расход энергии потребитель 1';
/* fill data to array */
        for(var i = 0; i < this.DATA_QArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.DATA_QArray[i].Q1;
            aoa[i+1][1]=this.DATA_QArray[i].Q2;
            aoa[i+1][2]=this.DATA_QArray[i].Q3;
            aoa[i+1][3]=this.DATA_QArray[i].Q4;
            aoa[i+1][4]=this.DATA_QArray[i].Q5;
            aoa[i+1][5]=this.DATA_QArray[i].DQ12;
            aoa[i+1][6]=this.DATA_QArray[i].DQ45;
            aoa[i+1][7]=this.DATA_QArray[i].DQ;
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
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'DATA_Q');
        

        wb.Props = {
            Title: "Данные::Энергия",
            Subject: "Данные::Энергия",
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
		XLSX.writeFile(wb, 'DATA_Q.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentDATA_Q = {} as DATA.DATA_Q;
    }
}
 
