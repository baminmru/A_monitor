import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_U_Service } from "app/DATA_U.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { DATA } from "app/DATA";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-DATA_U',
    styleUrls: ['./DATA_U.component.scss'],
    templateUrl: './DATA_U.component.html',
})
export class DATA_UComponent implements OnInit {

    DATA_UArray: Array<DATA.DATA_U> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_U: DATA.DATA_U = {} as DATA.DATA_U;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_U_Service: DATA_U_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_U"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_U(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_U();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_U"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_U() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_U"); 
     this.currentDATA_U = {} as DATA.DATA_U;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_U_Service.get_DATA_UByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_UArray => { this.DATA_UArray = DATA_UArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_U_Service.get_DATA_UByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_UArray => { this.DATA_UArray = DATA_UArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_U_Service.get_DATA_UByParent(item.DATA_RECORDId).subscribe(DATA_UArray => { this.DATA_UArray = DATA_UArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_U();
		return this.DATA_UArray ;
	   }

    onSelect(item: DATA.DATA_U) {
        this.currentDATA_U = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_U = {} as DATA.DATA_U;
        this.currentDATA_U.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_U) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_U = item;
    }

    onDelete(item: DATA.DATA_U) {
        this.confirmOpened = true;
        this.currentDATA_U = item;
    }

    onConfirmDeletion() {
        this.DATA_U_Service.delete_DATA_UById(this.currentDATA_U.DATA_UId).subscribe(data => {this.refreshDATA_U()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_U) {
        this.valid=true; 
     if(this.currentDATA_U.U1 == undefined  ) this.valid=false;
     if(this.currentDATA_U.U2 == undefined  ) this.valid=false;
     if(this.currentDATA_U.U3 == undefined  ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_U_Service.create_DATA_U(item)
                        .subscribe(data =>{ this.refreshDATA_U()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_U_Service.update_DATA_U( item)
                        .subscribe(data => {this.refreshDATA_U()}, error => { this.ShowError(error.message); });
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
        this.currentDATA_U = {} as DATA.DATA_U;
    }
}
 
