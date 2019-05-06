import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_RECORD_Service } from "app/DATA_RECORD.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { DATA } from "app/DATA";
import { DISPATCHER } from "app/DISPATCHER";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-DATA_RECORD',
    styleUrls: ['./DATA_RECORD.component.scss'],
    templateUrl: './DATA_RECORD.component.html',
})
export class DATA_RECORDComponent implements OnInit {

    DATA_RECORDArray: Array<DATA.DATA_RECORD> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_RECORD: DATA.DATA_RECORD = {} as DATA.DATA_RECORD;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private DATA_RECORD_Service: DATA_RECORD_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshDATA_RECORD();
    }
    refreshCombo() {
     this.AppService.refreshComboMONDEV_BDEVICES();
     this.AppService.refreshComboMOND_ATYPE();
    }
    ngOnDestroy() {
    }

    refreshDATA_RECORD() {
		   console.log("refreshing DATA_RECORD"); 
        this.DATA_RECORD_Service.getAll_DATA_RECORDs({} as DISPATCHER.FILTER).subscribe(DATA_RECORDArray => { this.DATA_RECORDArray = DATA_RECORDArray; }, error => { this.ShowError(error.message); })
        this.currentDATA_RECORD = {} as DATA.DATA_RECORD;
        console.log("clear selection for DATA_RECORD on refresh");
        this.AppService.pushSelectedDATA_RECORD(this.currentDATA_RECORD);
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_RECORD();
		return this.DATA_RECORDArray ;
	   }

    onSelect(item: DATA.DATA_RECORD) {
        this.currentDATA_RECORD = item;
        this.AppService.pushSelectedDATA_RECORD(item);
    }

    onNew() {
    this.refreshCombo(); 
        this.currentDATA_RECORD = {} as DATA.DATA_RECORD;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: DATA.DATA_RECORD) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_RECORD = item;
    }

    onDelete(item: DATA.DATA_RECORD) {
        this.confirmOpened = true;
        this.currentDATA_RECORD = item;
    }

    onConfirmDeletion() {
        this.DATA_RECORD_Service.delete_DATA_RECORDById(this.currentDATA_RECORD.DATA_RECORDId).subscribe(data => {this.refreshDATA_RECORD()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_RECORD) {
        this.valid=true; 
     if(this.currentDATA_RECORD.ID_BD == undefined ) this.valid=false;
     if(this.currentDATA_RECORD.AType == undefined ) this.valid=false;
     if(this.currentDATA_RECORD.CHECK_A == undefined  ) this.valid=false;
     if(this.currentDATA_RECORD.DCOUNTER == undefined ) this.valid=false;
     if(this.currentDATA_RECORD.dstart == undefined ) this.valid=false;
     if(this.currentDATA_RECORD.dend == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_RECORD_Service.create_DATA_RECORD(item)
                        .subscribe(data =>{ this.refreshDATA_RECORD()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_RECORD_Service.update_DATA_RECORD( item)
                        .subscribe(data => {this.refreshDATA_RECORD()}, error => { this.ShowError(error.message); });
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

    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentDATA_RECORD = {} as DATA.DATA_RECORD;
        console.log("clear selection for DATA_RECORD");
        this.AppService.pushSelectedDATA_RECORD(this.currentDATA_RECORD);
    }
}
 
