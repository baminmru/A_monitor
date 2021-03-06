﻿import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONQ_DEF_Service } from "app/MONQ_DEF.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONQ } from "app/MONQ";
import * as XLSX from 'xlsx';

const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONQ_DEF',
    styleUrls: ['./MONQ_DEF.component.scss'],
    templateUrl: './MONQ_DEF.component.html',
})
export class MONQ_DEFComponent implements OnInit {

    MONQ_DEFArray: Array<MONQ.MONQ_DEF> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONQ_DEF: MONQ.MONQ_DEF = {} as MONQ.MONQ_DEF;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MONQ_DEF_Service: MONQ_DEF_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMONQ_DEF();
    }
    refreshCombo() {
     this.AppService.refreshComboMON_USR();
     this.AppService.refreshComboMONDEV_BDEVICES();
     this.AppService.refreshComboMOND_ATYPE();
    }
    ngOnDestroy() {
    }

    refreshMONQ_DEF() {
		   console.log("refreshing MONQ_DEF"); 
        this.MONQ_DEF_Service.getAll_MONQ_DEFs().subscribe(MONQ_DEFArray => { this.MONQ_DEFArray = MONQ_DEFArray; }, error => { this.ShowError(error.message); })
        this.currentMONQ_DEF = {} as MONQ.MONQ_DEF;
        console.log("clear selection for MONQ_DEF on refresh");
        this.AppService.pushSelectedMONQ_DEF(this.currentMONQ_DEF);
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONQ_DEF();
		return this.MONQ_DEFArray ;
	   }

    onSelect(item: MONQ.MONQ_DEF) {
        this.currentMONQ_DEF = item;
        this.AppService.pushSelectedMONQ_DEF(item);
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMONQ_DEF = {} as MONQ.MONQ_DEF;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MONQ.MONQ_DEF) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONQ_DEF = item;
    }

    onDelete(item: MONQ.MONQ_DEF) {
        this.confirmOpened = true;
        this.currentMONQ_DEF = item;
    }

    onConfirmDeletion() {
        this.MONQ_DEF_Service.delete_MONQ_DEFById(this.currentMONQ_DEF.MONQ_DEFId).subscribe(data => {this.refreshMONQ_DEF()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONQ.MONQ_DEF) {
        this.valid=true; 
     if(this.currentMONQ_DEF.theUser == undefined ) this.valid=false;
     if(this.currentMONQ_DEF.TheDevice == undefined ) this.valid=false;
     if(this.currentMONQ_DEF.ArchType == undefined ) this.valid=false;
     if(this.currentMONQ_DEF.QueryTime == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONQ_DEF_Service.create_MONQ_DEF(item)
                        .subscribe(data =>{ this.refreshMONQ_DEF()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONQ_DEF_Service.update_MONQ_DEF( item)
                        .subscribe(data => {this.refreshMONQ_DEF()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Сотрудник';
            aoa[0][1]='Приор';
            aoa[0][2]='Тип архива';
            aoa[0][3]='Время';
            aoa[0][4]='Время  постановки запроса';
            aoa[0][5]='Срочный запрос';
            aoa[0][6]='Количество повторений при ошибке';
            aoa[0][7]='Интервал между повторами';
/* fill data to array */
        for(var i = 0; i < this.MONQ_DEFArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MONQ_DEFArray[i].theUser_name;
            aoa[i+1][1]=this.MONQ_DEFArray[i].TheDevice_name;
            aoa[i+1][2]=this.MONQ_DEFArray[i].ArchType_name;
            aoa[i+1][3]=this.MONQ_DEFArray[i].ArchTime;
            aoa[i+1][4]=this.MONQ_DEFArray[i].QueryTime;
            aoa[i+1][5]=this.MONQ_DEFArray[i].IsUrgent_name;
            aoa[i+1][6]=this.MONQ_DEFArray[i].RepeatTimes;
            aoa[i+1][7]=this.MONQ_DEFArray[i].RepeatInterval;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 50}
,            {wch: 50}
,            {wch: 50}
,            {wch: 18}
,            {wch: 18}
,            {wch: 30}
,            {wch: 20}
,            {wch: 20}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MONQ_DEF');
        

        wb.Props = {
            Title: "Запрос на обработку::Описание",
            Subject: "Запрос на обработку::Описание",
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
		XLSX.writeFile(wb, 'MONQ_DEF.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMONQ_DEF = {} as MONQ.MONQ_DEF;
        console.log("clear selection for MONQ_DEF");
        this.AppService.pushSelectedMONQ_DEF(this.currentMONQ_DEF);
    }
}
 
