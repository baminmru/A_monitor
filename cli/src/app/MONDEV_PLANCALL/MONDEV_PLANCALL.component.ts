import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONDEV_PLANCALL_Service } from "app/MONDEV_PLANCALL.service";
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
	   selector: 'app-MONDEV_PLANCALL',
    styleUrls: ['./MONDEV_PLANCALL.component.scss'],
    templateUrl: './MONDEV_PLANCALL.component.html',
})
export class MONDEV_PLANCALLComponent implements OnInit {

    MONDEV_PLANCALLArray: Array<MONDEV.MONDEV_PLANCALL> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONDEV_PLANCALL: MONDEV.MONDEV_PLANCALL = {} as MONDEV.MONDEV_PLANCALL;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONDEV_PLANCALL_Service: MONDEV_PLANCALL_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONDEV_PLANCALL"); 
        this.subscription=this.AppService.currentMONDEV_BDEVICES.subscribe(si =>{ this.refreshMONDEV_PLANCALL(); }, error => { this.ShowError(error.message); } );
        this.refreshMONDEV_PLANCALL();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONDEV_PLANCALL"); 
        this.subscription.unsubscribe();
    }

    refreshMONDEV_PLANCALL() {
		let item:MONDEV.MONDEV_BDEVICES;
		item=this.AppService.LastMONDEV_BDEVICES;
		console.log("refreshing MONDEV_PLANCALL"); 
     this.currentMONDEV_PLANCALL = {} as MONDEV.MONDEV_PLANCALL;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONDEV_PLANCALL_Service.get_MONDEV_PLANCALLByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_PLANCALLArray => { this.MONDEV_PLANCALLArray = MONDEV_PLANCALLArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONDEV_PLANCALL_Service.get_MONDEV_PLANCALLByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_PLANCALLArray => { this.MONDEV_PLANCALLArray = MONDEV_PLANCALLArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId === 'string' ) {
        this.MONDEV_PLANCALL_Service.get_MONDEV_PLANCALLByParent(item.MONDEV_BDEVICESId).subscribe(MONDEV_PLANCALLArray => { this.MONDEV_PLANCALLArray = MONDEV_PLANCALLArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONDEV_PLANCALL();
		return this.MONDEV_PLANCALLArray ;
	   }

    onSelect(item: MONDEV.MONDEV_PLANCALL) {
        this.currentMONDEV_PLANCALL = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId) === 'string' ) {
        this.currentMONDEV_PLANCALL = {} as MONDEV.MONDEV_PLANCALL;
        this.currentMONDEV_PLANCALL.MONDEV_BDEVICESId = this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONDEV.MONDEV_PLANCALL) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONDEV_PLANCALL = item;
    }

    onDelete(item: MONDEV.MONDEV_PLANCALL) {
        this.confirmOpened = true;
        this.currentMONDEV_PLANCALL = item;
    }

    onConfirmDeletion() {
        this.MONDEV_PLANCALL_Service.delete_MONDEV_PLANCALLById(this.currentMONDEV_PLANCALL.MONDEV_PLANCALLId).subscribe(data => {this.refreshMONDEV_PLANCALL()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONDEV.MONDEV_PLANCALL) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONDEV_PLANCALL_Service.create_MONDEV_PLANCALL(item)
                        .subscribe(data =>{ this.refreshMONDEV_PLANCALL()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONDEV_PLANCALL_Service.update_MONDEV_PLANCALL( item)
                        .subscribe(data => {this.refreshMONDEV_PLANCALL()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Исключить из опроса';
            aoa[0][1]='Max число попыток дозвона';
            aoa[0][2]='Повторить через (минут)';
            aoa[0][3]='Когда заблокирован';
            aoa[0][4]='Последний опрос';
            aoa[0][5]='Опрашивать текущие';
            aoa[0][6]='Интервал (минут) ';
            aoa[0][7]='Следующий опрос';
            aoa[0][8]='Опрашивать ч.';
            aoa[0][9]='Интервал опроса (минут)';
            aoa[0][10]='За сколько часов';
            aoa[0][11]='Следующий опрос';
            aoa[0][12]='Последний опрос';
            aoa[0][13]='Опрашивать С.';
            aoa[0][14]='Интервал (часов)';
            aoa[0][15]='За сколько суток';
            aoa[0][16]='Следующий опрос';
            aoa[0][17]='Последний опрос';
            aoa[0][18]='Опрашивать Ит.';
            aoa[0][19]='Интервал  (минут) ';
            aoa[0][20]='Следующий опрос';
            aoa[0][21]='Опрашивать Эл.';
            aoa[0][22]='Интервал (мин.)';
            aoa[0][23]='Дата следующего опроса';
/* fill data to array */
        for(var i = 0; i < this.MONDEV_PLANCALLArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MONDEV_PLANCALLArray[i].CSTATUS_name;
            aoa[i+1][1]=this.MONDEV_PLANCALLArray[i].NMAXCALL;
            aoa[i+1][2]=this.MONDEV_PLANCALLArray[i].MINREPEAT;
            aoa[i+1][3]=this.MONDEV_PLANCALLArray[i].DLOCK;
            aoa[i+1][4]=this.MONDEV_PLANCALLArray[i].DLASTCALL;
            aoa[i+1][5]=this.MONDEV_PLANCALLArray[i].CCURR_name;
            aoa[i+1][6]=this.MONDEV_PLANCALLArray[i].ICALLCURR;
            aoa[i+1][7]=this.MONDEV_PLANCALLArray[i].DNEXTCURR;
            aoa[i+1][8]=this.MONDEV_PLANCALLArray[i].CHOUR_name;
            aoa[i+1][9]=this.MONDEV_PLANCALLArray[i].ICALL;
            aoa[i+1][10]=this.MONDEV_PLANCALLArray[i].NUMHOUR;
            aoa[i+1][11]=this.MONDEV_PLANCALLArray[i].DNEXTHOUR;
            aoa[i+1][12]=this.MONDEV_PLANCALLArray[i].DLASTHOUR;
            aoa[i+1][13]=this.MONDEV_PLANCALLArray[i].C24_name;
            aoa[i+1][14]=this.MONDEV_PLANCALLArray[i].ICALL24;
            aoa[i+1][15]=this.MONDEV_PLANCALLArray[i].NUM24;
            aoa[i+1][16]=this.MONDEV_PLANCALLArray[i].DNEXT24;
            aoa[i+1][17]=this.MONDEV_PLANCALLArray[i].DLASTDAY;
            aoa[i+1][18]=this.MONDEV_PLANCALLArray[i].CSUM_name;
            aoa[i+1][19]=this.MONDEV_PLANCALLArray[i].ICALLSUM;
            aoa[i+1][20]=this.MONDEV_PLANCALLArray[i].DNEXTSUM;
            aoa[i+1][21]=this.MONDEV_PLANCALLArray[i].CEL_name;
            aoa[i+1][22]=this.MONDEV_PLANCALLArray[i].IEL;
            aoa[i+1][23]=this.MONDEV_PLANCALLArray[i].DNEXTEL;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 30}
,            {wch: 20}
,            {wch: 20}
,            {wch: 18}
,            {wch: 18}
,            {wch: 30}
,            {wch: 20}
,            {wch: 18}
,            {wch: 30}
,            {wch: 20}
,            {wch: 20}
,            {wch: 18}
,            {wch: 18}
,            {wch: 30}
,            {wch: 20}
,            {wch: 20}
,            {wch: 18}
,            {wch: 18}
,            {wch: 30}
,            {wch: 20}
,            {wch: 18}
,            {wch: 30}
,            {wch: 20}
,            {wch: 18}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MONDEV_PLANCALL');
        

        wb.Props = {
            Title: "Устройство::План опроса устройств",
            Subject: "Устройство::План опроса устройств",
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
		XLSX.writeFile(wb, 'MONDEV_PLANCALL.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMONDEV_PLANCALL = {} as MONDEV.MONDEV_PLANCALL;
    }
}
 
