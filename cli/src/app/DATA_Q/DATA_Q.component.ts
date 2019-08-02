import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_Q_Service } from "app/DATA_Q.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { DATA } from "app/DATA";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-DATA_Q',
    styleUrls: ['./DATA_Q.component.scss'],
    templateUrl: './DATA_Q.component.html',
})
export class DATA_QComponent implements OnInit {

    DATA_QArray: Array<DATA.DATA_Q> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_Q: DATA.DATA_Q = {} as DATA.DATA_Q;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_Q_Service: DATA_Q_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_Q"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_Q(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_Q();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_Q"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_Q() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_Q"); 
     this.currentDATA_Q = {} as DATA.DATA_Q;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_Q_Service.get_DATA_QByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_QArray => { this.DATA_QArray = DATA_QArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_Q_Service.get_DATA_QByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_QArray => { this.DATA_QArray = DATA_QArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_Q_Service.get_DATA_QByParent(item.DATA_RECORDId).subscribe(DATA_QArray => { this.DATA_QArray = DATA_QArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_Q();
		return this.DATA_QArray ;
	   }

    onSelect(item: DATA.DATA_Q) {
        this.currentDATA_Q = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_Q = {} as DATA.DATA_Q;
        this.currentDATA_Q.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_Q) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_Q = item;
    }

    onDelete(item: DATA.DATA_Q) {
        this.confirmOpened = true;
        this.currentDATA_Q = item;
    }

    onConfirmDeletion() {
        this.DATA_Q_Service.delete_DATA_QById(this.currentDATA_Q.DATA_QId).subscribe(data => {this.refreshDATA_Q()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_Q) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_Q_Service.create_DATA_Q(item)
                        .subscribe(data =>{ this.refreshDATA_Q()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_Q_Service.update_DATA_Q( item)
                        .subscribe(data => {this.refreshDATA_Q()}, error => { this.ShowError(error.message); });
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
        this.currentDATA_Q = {} as DATA.DATA_Q;
    }
}
 
