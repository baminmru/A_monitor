import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MOND_PARAM_Service } from "app/MOND_PARAM.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MOND } from "app/MOND";
import * as XLSX from 'xlsx';

const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MOND_PARAM',
    styleUrls: ['./MOND_PARAM.component.scss'],
    templateUrl: './MOND_PARAM.component.html',
})
export class MOND_PARAMComponent implements OnInit {

    MOND_PARAMArray: Array<MOND.MOND_PARAM> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMOND_PARAM: MOND.MOND_PARAM = {} as MOND.MOND_PARAM;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MOND_PARAM_Service: MOND_PARAM_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMOND_PARAM();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
    }

    refreshMOND_PARAM() {
		   console.log("refreshing MOND_PARAM"); 
        this.MOND_PARAM_Service.getAll_MOND_PARAMs().subscribe(MOND_PARAMArray => { this.MOND_PARAMArray = MOND_PARAMArray; }, error => { this.ShowError(error.message); })
        this.currentMOND_PARAM = {} as MOND.MOND_PARAM;
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMOND_PARAM();
		return this.MOND_PARAMArray ;
	   }

    onSelect(item: MOND.MOND_PARAM) {
        this.currentMOND_PARAM = item;
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMOND_PARAM = {} as MOND.MOND_PARAM;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MOND.MOND_PARAM) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMOND_PARAM = item;
    }

    onDelete(item: MOND.MOND_PARAM) {
        this.confirmOpened = true;
        this.currentMOND_PARAM = item;
    }

    onConfirmDeletion() {
        this.MOND_PARAM_Service.delete_MOND_PARAMById(this.currentMOND_PARAM.MOND_PARAMId).subscribe(data => {this.refreshMOND_PARAM()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MOND.MOND_PARAM) {
        this.valid=true; 
     if(this.currentMOND_PARAM.Name == undefined || this.currentMOND_PARAM.Name=='') this.valid=false;
     if(this.currentMOND_PARAM.ParamField == undefined || this.currentMOND_PARAM.ParamField=='') this.valid=false;
     if(this.currentMOND_PARAM.ShowAs == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MOND_PARAM_Service.create_MOND_PARAM(item)
                        .subscribe(data =>{ this.refreshMOND_PARAM()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MOND_PARAM_Service.update_MOND_PARAM( item)
                        .subscribe(data => {this.refreshMOND_PARAM()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Название ';
            aoa[0][1]='Поле';
            aoa[0][2]='Отображать как';
/* fill data to array */
        for(var i = 0; i < this.MOND_PARAMArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MOND_PARAMArray[i].Name;
            aoa[i+1][1]=this.MOND_PARAMArray[i].ParamField;
            aoa[i+1][2]=this.MOND_PARAMArray[i].ShowAs_name;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 64}
,            {wch: 64}
,            {wch: 30}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MOND_PARAM');
        

        wb.Props = {
            Title: "Справочник::Параметры",
            Subject: "Справочник::Параметры",
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
		XLSX.writeFile(wb, 'MOND_PARAM.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMOND_PARAM = {} as MOND.MOND_PARAM;
    }
}
 
