import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_EP_Service } from "app/DATA_EP.service";
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
	   selector: 'app-DATA_EP',
    styleUrls: ['./DATA_EP.component.scss'],
    templateUrl: './DATA_EP.component.html',
})
export class DATA_EPComponent implements OnInit {

    DATA_EPArray: Array<DATA.DATA_EP> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_EP: DATA.DATA_EP = {} as DATA.DATA_EP;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_EP_Service: DATA_EP_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_EP"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_EP(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_EP();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_EP"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_EP() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_EP"); 
     this.currentDATA_EP = {} as DATA.DATA_EP;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_EP_Service.get_DATA_EPByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_EPArray => { this.DATA_EPArray = DATA_EPArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_EP_Service.get_DATA_EPByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_EPArray => { this.DATA_EPArray = DATA_EPArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_EP_Service.get_DATA_EPByParent(item.DATA_RECORDId).subscribe(DATA_EPArray => { this.DATA_EPArray = DATA_EPArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_EP();
		return this.DATA_EPArray ;
	   }

    onSelect(item: DATA.DATA_EP) {
        this.currentDATA_EP = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_EP = {} as DATA.DATA_EP;
        this.currentDATA_EP.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_EP) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_EP = item;
    }

    onDelete(item: DATA.DATA_EP) {
        this.confirmOpened = true;
        this.currentDATA_EP = item;
    }

    onConfirmDeletion() {
        this.DATA_EP_Service.delete_DATA_EPById(this.currentDATA_EP.DATA_EPId).subscribe(data => {this.refreshDATA_EP()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_EP) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_EP_Service.create_DATA_EP(item)
                        .subscribe(data =>{ this.refreshDATA_EP()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_EP_Service.update_DATA_EP( item)
                        .subscribe(data => {this.refreshDATA_EP()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Мощность по  фазе 1';
            aoa[0][1]='Мощность по  фазе 2';
            aoa[0][2]='Мощность по  фазе 3';
/* fill data to array */
        for(var i = 0; i < this.DATA_EPArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.DATA_EPArray[i].EP1;
            aoa[i+1][1]=this.DATA_EPArray[i].EP2;
            aoa[i+1][2]=this.DATA_EPArray[i].EP3;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 20}
,            {wch: 20}
,            {wch: 20}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'DATA_EP');
        

        wb.Props = {
            Title: "Данные::Мощность",
            Subject: "Данные::Мощность",
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
		XLSX.writeFile(wb, 'DATA_EP.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentDATA_EP = {} as DATA.DATA_EP;
    }
}
 
