﻿import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MOND_GRP_Service } from "app/MOND_GRP.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { moncli } from "app/moncli";
import * as XLSX from 'xlsx';

const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MOND_GRP',
    styleUrls: ['./MOND_GRP.component.scss'],
    templateUrl: './MOND_GRP.component.html',
})
export class MOND_GRPComponent implements OnInit {

    MOND_GRPArray: Array<moncli.MOND_GRP> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMOND_GRP: moncli.MOND_GRP = {} as moncli.MOND_GRP;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MOND_GRP_Service: MOND_GRP_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MOND_GRP"); 
        this.subscription=this.AppService.currentmoncli_info.subscribe(si =>{ this.refreshMOND_GRP(); }, error => { this.ShowError(error.message); } );
        this.refreshMOND_GRP();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MOND_GRP"); 
        this.subscription.unsubscribe();
    }

    refreshMOND_GRP() {
		let item:moncli.moncli_info;
		item=this.AppService.Lastmoncli_info;
		console.log("refreshing MOND_GRP"); 
     this.currentMOND_GRP = {} as moncli.MOND_GRP;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MOND_GRP_Service.get_MOND_GRPByParent('00000000-0000-0000-0000-000000000000').subscribe(MOND_GRPArray => { this.MOND_GRPArray = MOND_GRPArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.moncli_infoId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MOND_GRP_Service.get_MOND_GRPByParent('00000000-0000-0000-0000-000000000000').subscribe(MOND_GRPArray => { this.MOND_GRPArray = MOND_GRPArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.moncli_infoId === 'string' ) {
        this.MOND_GRP_Service.get_MOND_GRPByParent(item.moncli_infoId).subscribe(MOND_GRPArray => { this.MOND_GRPArray = MOND_GRPArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMOND_GRP();
		return this.MOND_GRPArray ;
	   }

    onSelect(item: moncli.MOND_GRP) {
        this.currentMOND_GRP = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.Lastmoncli_info.moncli_infoId) === 'string' ) {
        this.currentMOND_GRP = {} as moncli.MOND_GRP;
        this.currentMOND_GRP.moncli_infoId = this.AppService.Lastmoncli_info.moncli_infoId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: moncli.MOND_GRP) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMOND_GRP = item;
    }

    onDelete(item: moncli.MOND_GRP) {
        this.confirmOpened = true;
        this.currentMOND_GRP = item;
    }

    onConfirmDeletion() {
        this.MOND_GRP_Service.delete_MOND_GRPById(this.currentMOND_GRP.MOND_GRPId).subscribe(data => {this.refreshMOND_GRP()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: moncli.MOND_GRP) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MOND_GRP_Service.create_MOND_GRP(item)
                        .subscribe(data =>{ this.refreshMOND_GRP()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MOND_GRP_Service.update_MOND_GRP( item)
                        .subscribe(data => {this.refreshMOND_GRP()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Название группы';
            aoa[0][1]='Описание';
/* fill data to array */
        for(var i = 0; i < this.MOND_GRPArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MOND_GRPArray[i].CGRPNM;
            aoa[i+1][1]=this.MOND_GRPArray[i].CTXT;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 64}
,            {wch: 64}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MOND_GRP');
        

        wb.Props = {
            Title: "Организация::Группа",
            Subject: "Организация::Группа",
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
		XLSX.writeFile(wb, 'MOND_GRP.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMOND_GRP = {} as moncli.MOND_GRP;
    }
}
 
