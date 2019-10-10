import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MOND_SNAB_Service } from "app/MOND_SNAB.service";
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
	   selector: 'app-MOND_SNAB',
    styleUrls: ['./MOND_SNAB.component.scss'],
    templateUrl: './MOND_SNAB.component.html',
})
export class MOND_SNABComponent implements OnInit {

    MOND_SNABArray: Array<MOND.MOND_SNAB> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMOND_SNAB: MOND.MOND_SNAB = {} as MOND.MOND_SNAB;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MOND_SNAB_Service: MOND_SNAB_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMOND_SNAB();
    }
    refreshCombo() {
     this.AppService.refreshComboMOND_SNABTOP();
    }
    ngOnDestroy() {
    }

    refreshMOND_SNAB() {
		   console.log("refreshing MOND_SNAB"); 
        this.MOND_SNAB_Service.getAll_MOND_SNABs().subscribe(MOND_SNABArray => { this.MOND_SNABArray = MOND_SNABArray; }, error => { this.ShowError(error.message); })
        this.currentMOND_SNAB = {} as MOND.MOND_SNAB;
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMOND_SNAB();
		return this.MOND_SNABArray ;
	   }

    onSelect(item: MOND.MOND_SNAB) {
        this.currentMOND_SNAB = item;
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMOND_SNAB = {} as MOND.MOND_SNAB;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MOND.MOND_SNAB) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMOND_SNAB = item;
    }

    onDelete(item: MOND.MOND_SNAB) {
        this.confirmOpened = true;
        this.currentMOND_SNAB = item;
    }

    onConfirmDeletion() {
        this.MOND_SNAB_Service.delete_MOND_SNABById(this.currentMOND_SNAB.MOND_SNABId).subscribe(data => {this.refreshMOND_SNAB()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MOND.MOND_SNAB) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MOND_SNAB_Service.create_MOND_SNAB(item)
                        .subscribe(data =>{ this.refreshMOND_SNAB()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MOND_SNAB_Service.update_MOND_SNAB( item)
                        .subscribe(data => {this.refreshMOND_SNAB()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Название';
            aoa[0][1]='Адрес';
            aoa[0][2]='Контактное лицо';
            aoa[0][3]='Телефон';
            aoa[0][4]='Регион';
            aoa[0][5]='Поставщик';
/* fill data to array */
        for(var i = 0; i < this.MOND_SNABArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MOND_SNABArray[i].CNAME;
            aoa[i+1][1]=this.MOND_SNABArray[i].CADDRESS;
            aoa[i+1][2]=this.MOND_SNABArray[i].CFIO;
            aoa[i+1][3]=this.MOND_SNABArray[i].CPHONE;
            aoa[i+1][4]=this.MOND_SNABArray[i].CREGION;
            aoa[i+1][5]=this.MOND_SNABArray[i].Supplier_name;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 64}
,            {wch: 64}
,            {wch: 64}
,            {wch: 64}
,            {wch: 64}
,            {wch: 50}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MOND_SNAB');
        

        wb.Props = {
            Title: "Справочник::Снабжающая организация",
            Subject: "Справочник::Снабжающая организация",
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
		XLSX.writeFile(wb, 'MOND_SNAB.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMOND_SNAB = {} as MOND.MOND_SNAB;
    }
}
 
