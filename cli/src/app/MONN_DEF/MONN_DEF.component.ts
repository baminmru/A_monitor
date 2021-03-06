﻿import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONN_DEF_Service } from "app/MONN_DEF.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONNODE } from "app/MONNODE";
import * as XLSX from 'xlsx';

const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONN_DEF',
    styleUrls: ['./MONN_DEF.component.scss'],
    templateUrl: './MONN_DEF.component.html',
})
export class MONN_DEFComponent implements OnInit {

    MONN_DEFArray: Array<MONNODE.MONN_DEF> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONN_DEF: MONNODE.MONN_DEF = {} as MONNODE.MONN_DEF;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MONN_DEF_Service: MONN_DEF_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMONN_DEF();
    }
    refreshCombo() {
     this.AppService.refreshComboMOND_F();
     this.AppService.refreshCombomoncli_info();
    }
    ngOnDestroy() {
    }

    refreshMONN_DEF() {
		   console.log("refreshing MONN_DEF"); 
        this.MONN_DEF_Service.getAll_MONN_DEFs().subscribe(MONN_DEFArray => { this.MONN_DEFArray = MONN_DEFArray; }, error => { this.ShowError(error.message); })
        this.currentMONN_DEF = {} as MONNODE.MONN_DEF;
        console.log("clear selection for MONN_DEF on refresh");
        this.AppService.pushSelectedMONN_DEF(this.currentMONN_DEF);
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONN_DEF();
		return this.MONN_DEFArray ;
	   }

    onSelect(item: MONNODE.MONN_DEF) {
        this.currentMONN_DEF = item;
        this.AppService.pushSelectedMONN_DEF(item);
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMONN_DEF = {} as MONNODE.MONN_DEF;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MONNODE.MONN_DEF) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONN_DEF = item;
    }

    onDelete(item: MONNODE.MONN_DEF) {
        this.confirmOpened = true;
        this.currentMONN_DEF = item;
    }

    onConfirmDeletion() {
        this.MONN_DEF_Service.delete_MONN_DEFById(this.currentMONN_DEF.MONN_DEFId).subscribe(data => {this.refreshMONN_DEF()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONNODE.MONN_DEF) {
        this.valid=true; 
     if(this.currentMONN_DEF.OrgUnit == undefined ) this.valid=false;
     if(this.currentMONN_DEF.isMovable == undefined ) this.valid=false;
     if(this.currentMONN_DEF.Latitude == undefined  ) this.valid=false;
     if(this.currentMONN_DEF.Longitude == undefined  ) this.valid=false;
     if(this.currentMONN_DEF.theClient == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONN_DEF_Service.create_MONN_DEF(item)
                        .subscribe(data =>{ this.refreshMONN_DEF()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONN_DEF_Service.update_MONN_DEF( item)
                        .subscribe(data => {this.refreshMONN_DEF()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Адрес';
            aoa[0][1]='Телефон';
            aoa[0][2]='Филиал';
            aoa[0][3]='Мобильный узел';
            aoa[0][4]='Широта';
            aoa[0][5]='Долгота';
            aoa[0][6]='Клиент';
/* fill data to array */
        for(var i = 0; i < this.MONN_DEFArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MONN_DEFArray[i].Addr;
            aoa[i+1][1]=this.MONN_DEFArray[i].ThePhone;
            aoa[i+1][2]=this.MONN_DEFArray[i].OrgUnit_name;
            aoa[i+1][3]=this.MONN_DEFArray[i].isMovable_name;
            aoa[i+1][4]=this.MONN_DEFArray[i].Latitude;
            aoa[i+1][5]=this.MONN_DEFArray[i].Longitude;
            aoa[i+1][6]=this.MONN_DEFArray[i].theClient_name;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 64}
,            {wch: 64}
,            {wch: 50}
,            {wch: 30}
,            {wch: 20}
,            {wch: 20}
,            {wch: 50}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MONN_DEF');
        

        wb.Props = {
            Title: "Узел::Описание",
            Subject: "Узел::Описание",
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
		XLSX.writeFile(wb, 'MONN_DEF.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMONN_DEF = {} as MONNODE.MONN_DEF;
        console.log("clear selection for MONN_DEF");
        this.AppService.pushSelectedMONN_DEF(this.currentMONN_DEF);
    }
}
 
