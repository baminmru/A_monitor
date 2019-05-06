import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_T_Service } from "app/DATA_T.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { DATA } from "app/DATA";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-DATA_T',
    styleUrls: ['./DATA_T.component.scss'],
    templateUrl: './DATA_T.component.html',
})
export class DATA_TComponent implements OnInit {

    DATA_TArray: Array<DATA.DATA_T> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_T: DATA.DATA_T = {} as DATA.DATA_T;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_T_Service: DATA_T_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_T"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_T(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_T();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_T"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_T() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_T"); 
     this.currentDATA_T = {} as DATA.DATA_T;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_T_Service.get_DATA_TByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_TArray => { this.DATA_TArray = DATA_TArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_T_Service.get_DATA_TByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_TArray => { this.DATA_TArray = DATA_TArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_T_Service.get_DATA_TByParent(item.DATA_RECORDId).subscribe(DATA_TArray => { this.DATA_TArray = DATA_TArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_T();
		return this.DATA_TArray ;
	   }

    onSelect(item: DATA.DATA_T) {
        this.currentDATA_T = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_T = {} as DATA.DATA_T;
        this.currentDATA_T.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_T) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_T = item;
    }

    onDelete(item: DATA.DATA_T) {
        this.confirmOpened = true;
        this.currentDATA_T = item;
    }

    onConfirmDeletion() {
        this.DATA_T_Service.delete_DATA_TById(this.currentDATA_T.DATA_TId).subscribe(data => {this.refreshDATA_T()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_T) {
        this.valid=true; 
     if(this.currentDATA_T.T1 == undefined  ) this.valid=false;
     if(this.currentDATA_T.T2 == undefined  ) this.valid=false;
     if(this.currentDATA_T.T3 == undefined  ) this.valid=false;
     if(this.currentDATA_T.T4 == undefined  ) this.valid=false;
     if(this.currentDATA_T.T5 == undefined  ) this.valid=false;
     if(this.currentDATA_T.T6 == undefined  ) this.valid=false;
     if(this.currentDATA_T.DT12 == undefined  ) this.valid=false;
     if(this.currentDATA_T.DT45 == undefined  ) this.valid=false;
     if(this.currentDATA_T.THOT == undefined  ) this.valid=false;
     if(this.currentDATA_T.TCOOL == undefined  ) this.valid=false;
     if(this.currentDATA_T.TCE1 == undefined  ) this.valid=false;
     if(this.currentDATA_T.TCE2 == undefined  ) this.valid=false;
     if(this.currentDATA_T.TAIR1 == undefined  ) this.valid=false;
     if(this.currentDATA_T.TAIR2 == undefined  ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_T_Service.create_DATA_T(item)
                        .subscribe(data =>{ this.refreshDATA_T()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_T_Service.update_DATA_T( item)
                        .subscribe(data => {this.refreshDATA_T()}, error => { this.ShowError(error.message); });
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
        this.currentDATA_T = {} as DATA.DATA_T;
    }
}
 
