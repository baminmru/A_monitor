import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONSCH_PARAM_Service } from "app/MONSCH_PARAM.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONSCH } from "app/MONSCH";
import * as XLSX from 'xlsx';

const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONSCH_PARAM',
    styleUrls: ['./MONSCH_PARAM.component.scss'],
    templateUrl: './MONSCH_PARAM.component.html',
})
export class MONSCH_PARAMComponent implements OnInit {

    MONSCH_PARAMArray: Array<MONSCH.MONSCH_PARAM> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONSCH_PARAM: MONSCH.MONSCH_PARAM = {} as MONSCH.MONSCH_PARAM;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONSCH_PARAM_Service: MONSCH_PARAM_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONSCH_PARAM"); 
        this.subscription=this.AppService.currentMONSCH_INFO.subscribe(si =>{ this.refreshMONSCH_PARAM(); }, error => { this.ShowError(error.message); } );
        this.refreshMONSCH_PARAM();
    }
    refreshCombo() {
     this.AppService.refreshComboMOND_ATYPE();
     this.AppService.refreshComboMOND_PARAM();
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONSCH_PARAM"); 
        this.subscription.unsubscribe();
    }

    refreshMONSCH_PARAM() {
		let item:MONSCH.MONSCH_INFO;
		item=this.AppService.LastMONSCH_INFO;
		console.log("refreshing MONSCH_PARAM"); 
     this.currentMONSCH_PARAM = {} as MONSCH.MONSCH_PARAM;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONSCH_PARAM_Service.get_MONSCH_PARAMByParent('00000000-0000-0000-0000-000000000000').subscribe(MONSCH_PARAMArray => { this.MONSCH_PARAMArray = MONSCH_PARAMArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONSCH_INFOId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONSCH_PARAM_Service.get_MONSCH_PARAMByParent('00000000-0000-0000-0000-000000000000').subscribe(MONSCH_PARAMArray => { this.MONSCH_PARAMArray = MONSCH_PARAMArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONSCH_INFOId === 'string' ) {
        this.MONSCH_PARAM_Service.get_MONSCH_PARAMByParent(item.MONSCH_INFOId).subscribe(MONSCH_PARAMArray => { this.MONSCH_PARAMArray = MONSCH_PARAMArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONSCH_PARAM();
		return this.MONSCH_PARAMArray ;
	   }

    onSelect(item: MONSCH.MONSCH_PARAM) {
        this.currentMONSCH_PARAM = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONSCH_INFO.MONSCH_INFOId) === 'string' ) {
        this.currentMONSCH_PARAM = {} as MONSCH.MONSCH_PARAM;
        this.currentMONSCH_PARAM.MONSCH_INFOId = this.AppService.LastMONSCH_INFO.MONSCH_INFOId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONSCH.MONSCH_PARAM) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONSCH_PARAM = item;
    }

    onDelete(item: MONSCH.MONSCH_PARAM) {
        this.confirmOpened = true;
        this.currentMONSCH_PARAM = item;
    }

    onConfirmDeletion() {
        this.MONSCH_PARAM_Service.delete_MONSCH_PARAMById(this.currentMONSCH_PARAM.MONSCH_PARAMId).subscribe(data => {this.refreshMONSCH_PARAM()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONSCH.MONSCH_PARAM) {
        this.valid=true; 
     if(this.currentMONSCH_PARAM.ArchType == undefined ) this.valid=false;
     if(this.currentMONSCH_PARAM.Param == undefined ) this.valid=false;
     if(this.currentMONSCH_PARAM.POS_LEFT == undefined  ) this.valid=false;
     if(this.currentMONSCH_PARAM.POS_TOP == undefined  ) this.valid=false;
     if(this.currentMONSCH_PARAM.HIDEPARAM == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONSCH_PARAM_Service.create_MONSCH_PARAM(item)
                        .subscribe(data =>{ this.refreshMONSCH_PARAM()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONSCH_PARAM_Service.update_MONSCH_PARAM( item)
                        .subscribe(data => {this.refreshMONSCH_PARAM()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Тип архива';
            aoa[0][1]='Параметр';
            aoa[0][2]='X';
            aoa[0][3]='Y';
            aoa[0][4]='Скрыть';
            aoa[0][5]='Не отображать на схеме';
/* fill data to array */
        for(var i = 0; i < this.MONSCH_PARAMArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MONSCH_PARAMArray[i].ArchType_name;
            aoa[i+1][1]=this.MONSCH_PARAMArray[i].Param_name;
            aoa[i+1][2]=this.MONSCH_PARAMArray[i].POS_LEFT;
            aoa[i+1][3]=this.MONSCH_PARAMArray[i].POS_TOP;
            aoa[i+1][4]=this.MONSCH_PARAMArray[i].HIDEPARAM_name;
            aoa[i+1][5]=this.MONSCH_PARAMArray[i].HideOnSchema_name;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 50}
,            {wch: 50}
,            {wch: 20}
,            {wch: 20}
,            {wch: 30}
,            {wch: 30}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MONSCH_PARAM');
        

        wb.Props = {
            Title: "Схема подключения::Параметры на схеме",
            Subject: "Схема подключения::Параметры на схеме",
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
		XLSX.writeFile(wb, 'MONSCH_PARAM.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMONSCH_PARAM = {} as MONSCH.MONSCH_PARAM;
    }
}
 
