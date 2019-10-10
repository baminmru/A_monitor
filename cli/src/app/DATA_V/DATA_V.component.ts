import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_V_Service } from "app/DATA_V.service";
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
	   selector: 'app-DATA_V',
    styleUrls: ['./DATA_V.component.scss'],
    templateUrl: './DATA_V.component.html',
})
export class DATA_VComponent implements OnInit {

    DATA_VArray: Array<DATA.DATA_V> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_V: DATA.DATA_V = {} as DATA.DATA_V;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_V_Service: DATA_V_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_V"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_V(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_V();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_V"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_V() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_V"); 
     this.currentDATA_V = {} as DATA.DATA_V;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_V_Service.get_DATA_VByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_VArray => { this.DATA_VArray = DATA_VArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_V_Service.get_DATA_VByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_VArray => { this.DATA_VArray = DATA_VArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_V_Service.get_DATA_VByParent(item.DATA_RECORDId).subscribe(DATA_VArray => { this.DATA_VArray = DATA_VArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_V();
		return this.DATA_VArray ;
	   }

    onSelect(item: DATA.DATA_V) {
        this.currentDATA_V = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_V = {} as DATA.DATA_V;
        this.currentDATA_V.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_V) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_V = item;
    }

    onDelete(item: DATA.DATA_V) {
        this.confirmOpened = true;
        this.currentDATA_V = item;
    }

    onConfirmDeletion() {
        this.DATA_V_Service.delete_DATA_VById(this.currentDATA_V.DATA_VId).subscribe(data => {this.refreshDATA_V()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_V) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_V_Service.create_DATA_V(item)
                        .subscribe(data =>{ this.refreshDATA_V()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_V_Service.update_DATA_V( item)
                        .subscribe(data => {this.refreshDATA_V()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Объемный расход воды по каналу 1';
            aoa[0][1]='Объемный расход воды по каналу 2';
            aoa[0][2]='Объемный расход воды по каналу 3';
            aoa[0][3]='Объемный расход воды по каналу 4';
            aoa[0][4]='Объемный расход воды по каналу 5';
            aoa[0][5]='Объемный расход воды по каналу 6';
            aoa[0][6]='Разность объемов канал 1  (расход ГВС)';
            aoa[0][7]='Разность объемов канал 2';
/* fill data to array */
        for(var i = 0; i < this.DATA_VArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.DATA_VArray[i].V1;
            aoa[i+1][1]=this.DATA_VArray[i].V2;
            aoa[i+1][2]=this.DATA_VArray[i].V3;
            aoa[i+1][3]=this.DATA_VArray[i].V4;
            aoa[i+1][4]=this.DATA_VArray[i].V5;
            aoa[i+1][5]=this.DATA_VArray[i].V6;
            aoa[i+1][6]=this.DATA_VArray[i].DV12;
            aoa[i+1][7]=this.DATA_VArray[i].DV45;
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
        XLSX.utils.book_append_sheet(wb, ws, 'DATA_V');
        

        wb.Props = {
            Title: "Данные::Объемы",
            Subject: "Данные::Объемы",
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
		XLSX.writeFile(wb, 'DATA_V.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentDATA_V = {} as DATA.DATA_V;
    }
}
 
