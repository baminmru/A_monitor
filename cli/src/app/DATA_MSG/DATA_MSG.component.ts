import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_MSG_Service } from "app/DATA_MSG.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { DATA } from "app/DATA";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-DATA_MSG',
    styleUrls: ['./DATA_MSG.component.scss'],
    templateUrl: './DATA_MSG.component.html',
})
export class DATA_MSGComponent implements OnInit {

    DATA_MSGArray: Array<DATA.DATA_MSG> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_MSG: DATA.DATA_MSG = {} as DATA.DATA_MSG;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_MSG_Service: DATA_MSG_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_MSG"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_MSG(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_MSG();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_MSG"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_MSG() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_MSG"); 
     this.currentDATA_MSG = {} as DATA.DATA_MSG;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_MSG_Service.get_DATA_MSGByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_MSGArray => { this.DATA_MSGArray = DATA_MSGArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_MSG_Service.get_DATA_MSGByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_MSGArray => { this.DATA_MSGArray = DATA_MSGArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_MSG_Service.get_DATA_MSGByParent(item.DATA_RECORDId).subscribe(DATA_MSGArray => { this.DATA_MSGArray = DATA_MSGArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_MSG();
		return this.DATA_MSGArray ;
	   }

    onSelect(item: DATA.DATA_MSG) {
        this.currentDATA_MSG = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_MSG = {} as DATA.DATA_MSG;
        this.currentDATA_MSG.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_MSG) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_MSG = item;
    }

    onDelete(item: DATA.DATA_MSG) {
        this.confirmOpened = true;
        this.currentDATA_MSG = item;
    }

    onConfirmDeletion() {
        this.DATA_MSG_Service.delete_DATA_MSGById(this.currentDATA_MSG.DATA_MSGId).subscribe(data => {this.refreshDATA_MSG()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_MSG) {
        this.valid=true; 
     if(this.currentDATA_MSG.HC_1 == undefined || this.currentDATA_MSG.HC_1=='') this.valid=false;
     if(this.currentDATA_MSG.HC_2 == undefined || this.currentDATA_MSG.HC_2=='') this.valid=false;
     if(this.currentDATA_MSG.errInfo == undefined || this.currentDATA_MSG.errInfo=='') this.valid=false;
     if(this.currentDATA_MSG.HC_CODE == undefined || this.currentDATA_MSG.HC_CODE=='') this.valid=false;
     if(this.currentDATA_MSG.HC == undefined || this.currentDATA_MSG.HC=='') this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_MSG_Service.create_DATA_MSG(item)
                        .subscribe(data =>{ this.refreshDATA_MSG()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_MSG_Service.update_DATA_MSG( item)
                        .subscribe(data => {this.refreshDATA_MSG()}, error => { this.ShowError(error.message); });
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
        this.currentDATA_MSG = {} as DATA.DATA_MSG;
    }
}
 
