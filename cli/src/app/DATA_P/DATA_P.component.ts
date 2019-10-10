import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_P_Service } from "app/DATA_P.service";
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
	   selector: 'app-DATA_P',
    styleUrls: ['./DATA_P.component.scss'],
    templateUrl: './DATA_P.component.html',
})
export class DATA_PComponent implements OnInit {

    DATA_PArray: Array<DATA.DATA_P> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_P: DATA.DATA_P = {} as DATA.DATA_P;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_P_Service: DATA_P_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_P"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_P(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_P();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_P"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_P() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_P"); 
     this.currentDATA_P = {} as DATA.DATA_P;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_P_Service.get_DATA_PByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_PArray => { this.DATA_PArray = DATA_PArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_P_Service.get_DATA_PByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_PArray => { this.DATA_PArray = DATA_PArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_P_Service.get_DATA_PByParent(item.DATA_RECORDId).subscribe(DATA_PArray => { this.DATA_PArray = DATA_PArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_P();
		return this.DATA_PArray ;
	   }

    onSelect(item: DATA.DATA_P) {
        this.currentDATA_P = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_P = {} as DATA.DATA_P;
        this.currentDATA_P.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_P) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_P = item;
    }

    onDelete(item: DATA.DATA_P) {
        this.confirmOpened = true;
        this.currentDATA_P = item;
    }

    onConfirmDeletion() {
        this.DATA_P_Service.delete_DATA_PById(this.currentDATA_P.DATA_PId).subscribe(data => {this.refreshDATA_P()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_P) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_P_Service.create_DATA_P(item)
                        .subscribe(data =>{ this.refreshDATA_P()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_P_Service.update_DATA_P( item)
                        .subscribe(data => {this.refreshDATA_P()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Давление в трубопроводе 1';
            aoa[0][1]='Давление в трубопроводе 2';
            aoa[0][2]='Давление в трубопроводе 3';
            aoa[0][3]='Давление в трубопроводе 4';
            aoa[0][4]='Давление в трубопроводе 5';
            aoa[0][5]='Давление в трубопроводе 6';
            aoa[0][6]='Атмосферное давление';
            aoa[0][7]='Давление холодной воды';
            aoa[0][8]='P1-P2';
            aoa[0][9]='P4-P5';
/* fill data to array */
        for(var i = 0; i < this.DATA_PArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.DATA_PArray[i].P1;
            aoa[i+1][1]=this.DATA_PArray[i].P2;
            aoa[i+1][2]=this.DATA_PArray[i].P3;
            aoa[i+1][3]=this.DATA_PArray[i].P4;
            aoa[i+1][4]=this.DATA_PArray[i].P5;
            aoa[i+1][5]=this.DATA_PArray[i].P6;
            aoa[i+1][6]=this.DATA_PArray[i].PATM;
            aoa[i+1][7]=this.DATA_PArray[i].PXB;
            aoa[i+1][8]=this.DATA_PArray[i].DP12;
            aoa[i+1][9]=this.DATA_PArray[i].DP45;
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
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'DATA_P');
        

        wb.Props = {
            Title: "Данные::Давления",
            Subject: "Данные::Давления",
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
		XLSX.writeFile(wb, 'DATA_P.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentDATA_P = {} as DATA.DATA_P;
    }
}
 
