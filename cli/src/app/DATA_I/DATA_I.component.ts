﻿import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_I_Service } from "app/DATA_I.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { DATA } from "app/DATA";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-DATA_I',
    styleUrls: ['./DATA_I.component.scss'],
    templateUrl: './DATA_I.component.html',
})
export class DATA_IComponent implements OnInit {

    DATA_IArray: Array<DATA.DATA_I> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_I: DATA.DATA_I = {} as DATA.DATA_I;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_I_Service: DATA_I_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_I"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_I(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_I();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_I"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_I() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_I"); 
     this.currentDATA_I = {} as DATA.DATA_I;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_I_Service.get_DATA_IByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_IArray => { this.DATA_IArray = DATA_IArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_I_Service.get_DATA_IByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_IArray => { this.DATA_IArray = DATA_IArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_I_Service.get_DATA_IByParent(item.DATA_RECORDId).subscribe(DATA_IArray => { this.DATA_IArray = DATA_IArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_I();
		return this.DATA_IArray ;
	   }

    onSelect(item: DATA.DATA_I) {
        this.currentDATA_I = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_I = {} as DATA.DATA_I;
        this.currentDATA_I.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_I) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_I = item;
    }

    onDelete(item: DATA.DATA_I) {
        this.confirmOpened = true;
        this.currentDATA_I = item;
    }

    onConfirmDeletion() {
        this.DATA_I_Service.delete_DATA_IById(this.currentDATA_I.DATA_IId).subscribe(data => {this.refreshDATA_I()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_I) {
        this.valid=true; 
     if(this.currentDATA_I.I1 == undefined  ) this.valid=false;
     if(this.currentDATA_I.I2 == undefined  ) this.valid=false;
     if(this.currentDATA_I.I3 == undefined  ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_I_Service.create_DATA_I(item)
                        .subscribe(data =>{ this.refreshDATA_I()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_I_Service.update_DATA_I( item)
                        .subscribe(data => {this.refreshDATA_I()}, error => { this.ShowError(error.message); });
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
        this.currentDATA_I = {} as DATA.DATA_I;
    }
}
 
