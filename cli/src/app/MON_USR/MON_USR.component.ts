import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MON_USR_Service } from "app/MON_USR.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONUSR } from "app/MONUSR";
import * as XLSX from 'xlsx';

const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MON_USR',
    styleUrls: ['./MON_USR.component.scss'],
    templateUrl: './MON_USR.component.html',
})
export class MON_USRComponent implements OnInit {

    MON_USRArray: Array<MONUSR.MON_USR> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMON_USR: MONUSR.MON_USR = {} as MONUSR.MON_USR;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MON_USR_Service: MON_USR_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMON_USR();
    }
    refreshCombo() {
     this.AppService.refreshCombomoncli_info();
     this.AppService.refreshComboMOND_ROLE();
    }
    ngOnDestroy() {
    }

    refreshMON_USR() {
		   console.log("refreshing MON_USR"); 
        this.MON_USR_Service.getAll_MON_USRs().subscribe(MON_USRArray => { this.MON_USRArray = MON_USRArray; }, error => { this.ShowError(error.message); })
        this.currentMON_USR = {} as MONUSR.MON_USR;
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMON_USR();
		return this.MON_USRArray ;
	   }

    onSelect(item: MONUSR.MON_USR) {
        this.currentMON_USR = item;
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMON_USR = {} as MONUSR.MON_USR;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MONUSR.MON_USR) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMON_USR = item;
    }

    onDelete(item: MONUSR.MON_USR) {
        this.confirmOpened = true;
        this.currentMON_USR = item;
    }

    onConfirmDeletion() {
        this.MON_USR_Service.delete_MON_USRById(this.currentMON_USR.MON_USRId).subscribe(data => {this.refreshMON_USR()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONUSR.MON_USR) {
        this.valid=true; 
     if(this.currentMON_USR.theClient == undefined ) this.valid=false;
     if(this.currentMON_USR.lastname == undefined || this.currentMON_USR.lastname=='') this.valid=false;
     if(this.currentMON_USR.name == undefined || this.currentMON_USR.name=='') this.valid=false;
     if(this.currentMON_USR.curRole == undefined ) this.valid=false;
     if(this.currentMON_USR.login == undefined || this.currentMON_USR.login=='') this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MON_USR_Service.create_MON_USR(item)
                        .subscribe(data =>{ this.refreshMON_USR()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MON_USR_Service.update_MON_USR( item)
                        .subscribe(data => {this.refreshMON_USR()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Клиент';
            aoa[0][1]='Фамилия';
            aoa[0][2]='Имя';
            aoa[0][3]='Отчество';
            aoa[0][4]='Роль';
            aoa[0][5]='e-mail';
            aoa[0][6]='Телефон';
            aoa[0][7]='Имя для входа';
/* fill data to array */
        for(var i = 0; i < this.MON_USRArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MON_USRArray[i].theClient_name;
            aoa[i+1][1]=this.MON_USRArray[i].lastname;
            aoa[i+1][2]=this.MON_USRArray[i].name;
            aoa[i+1][3]=this.MON_USRArray[i].surname;
            aoa[i+1][4]=this.MON_USRArray[i].curRole_name;
            aoa[i+1][5]=this.MON_USRArray[i].email;
            aoa[i+1][6]=this.MON_USRArray[i].thephone;
            aoa[i+1][7]=this.MON_USRArray[i].login;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 50}
,            {wch: 64}
,            {wch: 64}
,            {wch: 64}
,            {wch: 50}
,            {wch: 64}
,            {wch: 64}
,            {wch: 64}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MON_USR');
        

        wb.Props = {
            Title: "Сотрудник::Данные сотрудника",
            Subject: "Сотрудник::Данные сотрудника",
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
		XLSX.writeFile(wb, 'MON_USR.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMON_USR = {} as MONUSR.MON_USR;
    }
}
 
