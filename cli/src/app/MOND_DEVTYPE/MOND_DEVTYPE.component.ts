import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MOND_DEVTYPE_Service } from "app/MOND_DEVTYPE.service";
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
	   selector: 'app-MOND_DEVTYPE',
    styleUrls: ['./MOND_DEVTYPE.component.scss'],
    templateUrl: './MOND_DEVTYPE.component.html',
})
export class MOND_DEVTYPEComponent implements OnInit {

    MOND_DEVTYPEArray: Array<MOND.MOND_DEVTYPE> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMOND_DEVTYPE: MOND.MOND_DEVTYPE = {} as MOND.MOND_DEVTYPE;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MOND_DEVTYPE_Service: MOND_DEVTYPE_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMOND_DEVTYPE();
    }
    refreshCombo() {
     this.AppService.refreshComboMOND_DEVCLASS();
    }
    ngOnDestroy() {
    }

    refreshMOND_DEVTYPE() {
		   console.log("refreshing MOND_DEVTYPE"); 
        this.MOND_DEVTYPE_Service.getAll_MOND_DEVTYPEs().subscribe(MOND_DEVTYPEArray => { this.MOND_DEVTYPEArray = MOND_DEVTYPEArray; }, error => { this.ShowError(error.message); })
        this.currentMOND_DEVTYPE = {} as MOND.MOND_DEVTYPE;
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMOND_DEVTYPE();
		return this.MOND_DEVTYPEArray ;
	   }

    onSelect(item: MOND.MOND_DEVTYPE) {
        this.currentMOND_DEVTYPE = item;
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMOND_DEVTYPE = {} as MOND.MOND_DEVTYPE;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MOND.MOND_DEVTYPE) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMOND_DEVTYPE = item;
    }

    onDelete(item: MOND.MOND_DEVTYPE) {
        this.confirmOpened = true;
        this.currentMOND_DEVTYPE = item;
    }

    onConfirmDeletion() {
        this.MOND_DEVTYPE_Service.delete_MOND_DEVTYPEById(this.currentMOND_DEVTYPE.MOND_DEVTYPEId).subscribe(data => {this.refreshMOND_DEVTYPE()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MOND.MOND_DEVTYPE) {
        this.valid=true; 
     if(this.currentMOND_DEVTYPE.DevClass == undefined ) this.valid=false;
     if(this.currentMOND_DEVTYPE.Name == undefined || this.currentMOND_DEVTYPE.Name=='') this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MOND_DEVTYPE_Service.create_MOND_DEVTYPE(item)
                        .subscribe(data =>{ this.refreshMOND_DEVTYPE()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MOND_DEVTYPE_Service.update_MOND_DEVTYPE( item)
                        .subscribe(data => {this.refreshMOND_DEVTYPE()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Класс устройства';
            aoa[0][1]='Название ';
            aoa[0][2]='Библиотека драйвера';
/* fill data to array */
        for(var i = 0; i < this.MOND_DEVTYPEArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MOND_DEVTYPEArray[i].DevClass_name;
            aoa[i+1][1]=this.MOND_DEVTYPEArray[i].Name;
            aoa[i+1][2]=this.MOND_DEVTYPEArray[i].DriverLibName;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 50}
,            {wch: 64}
,            {wch: 64}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MOND_DEVTYPE');
        

        wb.Props = {
            Title: "Справочник::Тип устройства",
            Subject: "Справочник::Тип устройства",
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
		XLSX.writeFile(wb, 'MOND_DEVTYPE.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMOND_DEVTYPE = {} as MOND.MOND_DEVTYPE;
    }
}
 
