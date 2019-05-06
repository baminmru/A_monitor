import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_TIME_Service } from "app/DATA_TIME.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { DATA } from "app/DATA";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-DATA_TIME',
    styleUrls: ['./DATA_TIME.component.scss'],
    templateUrl: './DATA_TIME.component.html',
})
export class DATA_TIMEComponent implements OnInit {

    DATA_TIMEArray: Array<DATA.DATA_TIME> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_TIME: DATA.DATA_TIME = {} as DATA.DATA_TIME;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_TIME_Service: DATA_TIME_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_TIME"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_TIME(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_TIME();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_TIME"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_TIME() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_TIME"); 
     this.currentDATA_TIME = {} as DATA.DATA_TIME;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_TIME_Service.get_DATA_TIMEByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_TIMEArray => { this.DATA_TIMEArray = DATA_TIMEArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_TIME_Service.get_DATA_TIMEByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_TIMEArray => { this.DATA_TIMEArray = DATA_TIMEArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_TIME_Service.get_DATA_TIMEByParent(item.DATA_RECORDId).subscribe(DATA_TIMEArray => { this.DATA_TIMEArray = DATA_TIMEArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_TIME();
		return this.DATA_TIMEArray ;
	   }

    onSelect(item: DATA.DATA_TIME) {
        this.currentDATA_TIME = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_TIME = {} as DATA.DATA_TIME;
        this.currentDATA_TIME.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_TIME) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_TIME = item;
    }

    onDelete(item: DATA.DATA_TIME) {
        this.confirmOpened = true;
        this.currentDATA_TIME = item;
    }

    onConfirmDeletion() {
        this.DATA_TIME_Service.delete_DATA_TIMEById(this.currentDATA_TIME.DATA_TIMEId).subscribe(data => {this.refreshDATA_TIME()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_TIME) {
        this.valid=true; 
     if(this.currentDATA_TIME.TSUM1 == undefined  ) this.valid=false;
     if(this.currentDATA_TIME.TSUM2 == undefined  ) this.valid=false;
     if(this.currentDATA_TIME.ERRTIME == undefined  ) this.valid=false;
     if(this.currentDATA_TIME.OKTIME == undefined  ) this.valid=false;
     if(this.currentDATA_TIME.WORKTIME == undefined  ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_TIME_Service.create_DATA_TIME(item)
                        .subscribe(data =>{ this.refreshDATA_TIME()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_TIME_Service.update_DATA_TIME( item)
                        .subscribe(data => {this.refreshDATA_TIME()}, error => { this.ShowError(error.message); });
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
        this.currentDATA_TIME = {} as DATA.DATA_TIME;
    }
}
 
