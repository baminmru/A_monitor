import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_P_Service } from "app/DATA_P.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { DATA } from "app/DATA";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-DATA_P',
    styleUrls: ['./DATA_P.component.scss'],
    templateUrl: './DATA_P.component.html',
})
export class DATA_PComponent implements OnInit {

    DATA_PArray: Array<DATA.DATA_P> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_P: DATA.DATA_P = {} as DATA.DATA_P;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_P_Service: DATA_P_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_P"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_P(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_P();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_P"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_P() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_P"); 
     this.currentDATA_P = {} as DATA.DATA_P;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_P_Service.get_DATA_PByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_PArray => { this.DATA_PArray = DATA_PArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_P_Service.get_DATA_PByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_PArray => { this.DATA_PArray = DATA_PArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_P_Service.get_DATA_PByParent(item.DATA_RECORDId).subscribe(DATA_PArray => { this.DATA_PArray = DATA_PArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_P();
		return this.DATA_PArray ;
	   }

    onSelect(item: DATA.DATA_P) {
        this.currentDATA_P = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_P = {} as DATA.DATA_P;
        this.currentDATA_P.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_P) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_P = item;
    }

    onDelete(item: DATA.DATA_P) {
        this.confirmOpened = true;
        this.currentDATA_P = item;
    }

    onConfirmDeletion() {
        this.DATA_P_Service.delete_DATA_PById(this.currentDATA_P.DATA_PId).subscribe(data => {this.refreshDATA_P()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_P) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_P_Service.create_DATA_P(item)
                        .subscribe(data =>{ this.refreshDATA_P()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_P_Service.update_DATA_P( item)
                        .subscribe(data => {this.refreshDATA_P()}, error => { this.ShowError(error.message); });
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
        this.currentDATA_P = {} as DATA.DATA_P;
    }
}
 
