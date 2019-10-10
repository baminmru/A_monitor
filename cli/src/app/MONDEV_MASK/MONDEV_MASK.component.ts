import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONDEV_MASK_Service } from "app/MONDEV_MASK.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONDEV } from "app/MONDEV";
import * as XLSX from 'xlsx';

const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONDEV_MASK',
    styleUrls: ['./MONDEV_MASK.component.scss'],
    templateUrl: './MONDEV_MASK.component.html',
})
export class MONDEV_MASKComponent implements OnInit {

    MONDEV_MASKArray: Array<MONDEV.MONDEV_MASK> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONDEV_MASK: MONDEV.MONDEV_MASK = {} as MONDEV.MONDEV_MASK;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONDEV_MASK_Service: MONDEV_MASK_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONDEV_MASK"); 
        this.subscription=this.AppService.currentMONDEV_BDEVICES.subscribe(si =>{ this.refreshMONDEV_MASK(); }, error => { this.ShowError(error.message); } );
        this.refreshMONDEV_MASK();
    }
    refreshCombo() {
     this.AppService.refreshComboMOND_ATYPE();
     this.AppService.refreshComboMOND_PARAM();
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONDEV_MASK"); 
        this.subscription.unsubscribe();
    }

    refreshMONDEV_MASK() {
		let item:MONDEV.MONDEV_BDEVICES;
		item=this.AppService.LastMONDEV_BDEVICES;
		console.log("refreshing MONDEV_MASK"); 
     this.currentMONDEV_MASK = {} as MONDEV.MONDEV_MASK;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONDEV_MASK_Service.get_MONDEV_MASKByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_MASKArray => { this.MONDEV_MASKArray = MONDEV_MASKArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONDEV_MASK_Service.get_MONDEV_MASKByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_MASKArray => { this.MONDEV_MASKArray = MONDEV_MASKArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId === 'string' ) {
        this.MONDEV_MASK_Service.get_MONDEV_MASKByParent(item.MONDEV_BDEVICESId).subscribe(MONDEV_MASKArray => { this.MONDEV_MASKArray = MONDEV_MASKArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONDEV_MASK();
		return this.MONDEV_MASKArray ;
	   }

    onSelect(item: MONDEV.MONDEV_MASK) {
        this.currentMONDEV_MASK = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId) === 'string' ) {
        this.currentMONDEV_MASK = {} as MONDEV.MONDEV_MASK;
        this.currentMONDEV_MASK.MONDEV_BDEVICESId = this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONDEV.MONDEV_MASK) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONDEV_MASK = item;
    }

    onDelete(item: MONDEV.MONDEV_MASK) {
        this.confirmOpened = true;
        this.currentMONDEV_MASK = item;
    }

    onConfirmDeletion() {
        this.MONDEV_MASK_Service.delete_MONDEV_MASKById(this.currentMONDEV_MASK.MONDEV_MASKId).subscribe(data => {this.refreshMONDEV_MASK()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONDEV.MONDEV_MASK) {
        this.valid=true; 
     if(this.currentMONDEV_MASK.PTYPE == undefined ) this.valid=false;
     if(this.currentMONDEV_MASK.sequence == undefined  ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONDEV_MASK_Service.create_MONDEV_MASK(item)
                        .subscribe(data =>{ this.refreshMONDEV_MASK()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONDEV_MASK_Service.update_MONDEV_MASK( item)
                        .subscribe(data => {this.refreshMONDEV_MASK()}, error => { this.ShowError(error.message); });
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
            aoa[0][1]='Порядок вывода';
            aoa[0][2]='Параметр';
            aoa[0][3]='Формат';
            aoa[0][4]='Ширина';
            aoa[0][5]='Скрыть';
/* fill data to array */
        for(var i = 0; i < this.MONDEV_MASKArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MONDEV_MASKArray[i].PTYPE_name;
            aoa[i+1][1]=this.MONDEV_MASKArray[i].sequence;
            aoa[i+1][2]=this.MONDEV_MASKArray[i].PNAME_name;
            aoa[i+1][3]=this.MONDEV_MASKArray[i].paramFormat;
            aoa[i+1][4]=this.MONDEV_MASKArray[i].colWidth;
            aoa[i+1][5]=this.MONDEV_MASKArray[i].phide_name;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 50}
,            {wch: 20}
,            {wch: 50}
,            {wch: 64}
,            {wch: 20}
,            {wch: 30}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MONDEV_MASK');
        

        wb.Props = {
            Title: "Устройство::Параметры для вывода",
            Subject: "Устройство::Параметры для вывода",
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
		XLSX.writeFile(wb, 'MONDEV_MASK.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMONDEV_MASK = {} as MONDEV.MONDEV_MASK;
    }
}
 
