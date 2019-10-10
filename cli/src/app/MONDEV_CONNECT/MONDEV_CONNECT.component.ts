import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONDEV_CONNECT_Service } from "app/MONDEV_CONNECT.service";
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
	   selector: 'app-MONDEV_CONNECT',
    styleUrls: ['./MONDEV_CONNECT.component.scss'],
    templateUrl: './MONDEV_CONNECT.component.html',
})
export class MONDEV_CONNECTComponent implements OnInit {

    MONDEV_CONNECTArray: Array<MONDEV.MONDEV_CONNECT> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONDEV_CONNECT: MONDEV.MONDEV_CONNECT = {} as MONDEV.MONDEV_CONNECT;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONDEV_CONNECT_Service: MONDEV_CONNECT_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONDEV_CONNECT"); 
        this.subscription=this.AppService.currentMONDEV_BDEVICES.subscribe(si =>{ this.refreshMONDEV_CONNECT(); }, error => { this.ShowError(error.message); } );
        this.refreshMONDEV_CONNECT();
    }
    refreshCombo() {
     this.AppService.refreshComboMOND_CONNECTTYPE();
     this.AppService.refreshComboMONSRV_INFO();
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONDEV_CONNECT"); 
        this.subscription.unsubscribe();
    }

    refreshMONDEV_CONNECT() {
		let item:MONDEV.MONDEV_BDEVICES;
		item=this.AppService.LastMONDEV_BDEVICES;
		console.log("refreshing MONDEV_CONNECT"); 
     this.currentMONDEV_CONNECT = {} as MONDEV.MONDEV_CONNECT;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONDEV_CONNECT_Service.get_MONDEV_CONNECTByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_CONNECTArray => { this.MONDEV_CONNECTArray = MONDEV_CONNECTArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONDEV_CONNECT_Service.get_MONDEV_CONNECTByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_CONNECTArray => { this.MONDEV_CONNECTArray = MONDEV_CONNECTArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId === 'string' ) {
        this.MONDEV_CONNECT_Service.get_MONDEV_CONNECTByParent(item.MONDEV_BDEVICESId).subscribe(MONDEV_CONNECTArray => { this.MONDEV_CONNECTArray = MONDEV_CONNECTArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONDEV_CONNECT();
		return this.MONDEV_CONNECTArray ;
	   }

    onSelect(item: MONDEV.MONDEV_CONNECT) {
        this.currentMONDEV_CONNECT = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId) === 'string' ) {
        this.currentMONDEV_CONNECT = {} as MONDEV.MONDEV_CONNECT;
        this.currentMONDEV_CONNECT.MONDEV_BDEVICESId = this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONDEV.MONDEV_CONNECT) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONDEV_CONNECT = item;
    }

    onDelete(item: MONDEV.MONDEV_CONNECT) {
        this.confirmOpened = true;
        this.currentMONDEV_CONNECT = item;
    }

    onConfirmDeletion() {
        this.MONDEV_CONNECT_Service.delete_MONDEV_CONNECTById(this.currentMONDEV_CONNECT.MONDEV_CONNECTId).subscribe(data => {this.refreshMONDEV_CONNECT()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONDEV.MONDEV_CONNECT) {
        this.valid=true; 
     if(this.currentMONDEV_CONNECT.ConnectType == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONDEV_CONNECT_Service.create_MONDEV_CONNECT(item)
                        .subscribe(data =>{ this.refreshMONDEV_CONNECT()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONDEV_CONNECT_Service.update_MONDEV_CONNECT( item)
                        .subscribe(data => {this.refreshMONDEV_CONNECT()}, error => { this.ShowError(error.message); });
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
            aoa[0][0]='Подключение разрешено';
            aoa[0][1]='Тип подключения';
            aoa[0][2]='Время на соединение';
            aoa[0][3]='Сервер опроса';
            aoa[0][4]='Сетевой адрес';
            aoa[0][5]='Скорость бод';
            aoa[0][6]='Биты данных';
            aoa[0][7]='Четность';
            aoa[0][8]='Стоповые биты';
            aoa[0][9]='FlowControl';
            aoa[0][10]='Com Port';
            aoa[0][11]='IP адрес';
            aoa[0][12]='TCP Порт';
            aoa[0][13]='Пользователь';
            aoa[0][14]='Пароль';
            aoa[0][15]='Код города';
            aoa[0][16]='Телефон';
            aoa[0][17]='AT команда';
            aoa[0][18]='Идентификатор промеж. устройства';
/* fill data to array */
        for(var i = 0; i < this.MONDEV_CONNECTArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MONDEV_CONNECTArray[i].ConnectionEnabled_name;
            aoa[i+1][1]=this.MONDEV_CONNECTArray[i].ConnectType_name;
            aoa[i+1][2]=this.MONDEV_CONNECTArray[i].CONNECTLIMIT;
            aoa[i+1][3]=this.MONDEV_CONNECTArray[i].TheServer_name;
            aoa[i+1][4]=this.MONDEV_CONNECTArray[i].netaddr;
            aoa[i+1][5]=this.MONDEV_CONNECTArray[i].CSPEED;
            aoa[i+1][6]=this.MONDEV_CONNECTArray[i].CDATABIT;
            aoa[i+1][7]=this.MONDEV_CONNECTArray[i].CPARITY_name;
            aoa[i+1][8]=this.MONDEV_CONNECTArray[i].CSTOPBITS;
            aoa[i+1][9]=this.MONDEV_CONNECTArray[i].FlowControl;
            aoa[i+1][10]=this.MONDEV_CONNECTArray[i].ComPortNum;
            aoa[i+1][11]=this.MONDEV_CONNECTArray[i].IPAddr;
            aoa[i+1][12]=this.MONDEV_CONNECTArray[i].PortNum;
            aoa[i+1][13]=this.MONDEV_CONNECTArray[i].UserName;
            aoa[i+1][14]=this.MONDEV_CONNECTArray[i].Password;
            aoa[i+1][15]=this.MONDEV_CONNECTArray[i].CTOWNCODE;
            aoa[i+1][16]=this.MONDEV_CONNECTArray[i].CPHONE;
            aoa[i+1][17]=this.MONDEV_CONNECTArray[i].ATCommand;
            aoa[i+1][18]=this.MONDEV_CONNECTArray[i].callerID;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 30}
,            {wch: 50}
,            {wch: 20}
,            {wch: 50}
,            {wch: 20}
,            {wch: 64}
,            {wch: 64}
,            {wch: 30}
,            {wch: 20}
,            {wch: 64}
,            {wch: 64}
,            {wch: 64}
,            {wch: 20}
,            {wch: 64}
,            {wch: 64}
,            {wch: 64}
,            {wch: 64}
,            {wch: 80}
,            {wch: 64}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MONDEV_CONNECT');
        

        wb.Props = {
            Title: "Устройство::Параметры соединения",
            Subject: "Устройство::Параметры соединения",
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
		XLSX.writeFile(wb, 'MONDEV_CONNECT.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMONDEV_CONNECT = {} as MONDEV.MONDEV_CONNECT;
    }
}
 
