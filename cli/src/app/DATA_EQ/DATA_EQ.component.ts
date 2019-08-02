import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_EQ_Service } from "app/DATA_EQ.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { DATA } from "app/DATA";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-DATA_EQ',
    styleUrls: ['./DATA_EQ.component.scss'],
    templateUrl: './DATA_EQ.component.html',
})
export class DATA_EQComponent implements OnInit {

    DATA_EQArray: Array<DATA.DATA_EQ> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_EQ: DATA.DATA_EQ = {} as DATA.DATA_EQ;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_EQ_Service: DATA_EQ_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_EQ"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_EQ(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_EQ();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_EQ"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_EQ() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_EQ"); 
     this.currentDATA_EQ = {} as DATA.DATA_EQ;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_EQ_Service.get_DATA_EQByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_EQArray => { this.DATA_EQArray = DATA_EQArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_EQ_Service.get_DATA_EQByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_EQArray => { this.DATA_EQArray = DATA_EQArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_EQ_Service.get_DATA_EQByParent(item.DATA_RECORDId).subscribe(DATA_EQArray => { this.DATA_EQArray = DATA_EQArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_EQ();
		return this.DATA_EQArray ;
	   }

    onSelect(item: DATA.DATA_EQ) {
        this.currentDATA_EQ = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_EQ = {} as DATA.DATA_EQ;
        this.currentDATA_EQ.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_EQ) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_EQ = item;
    }

    onDelete(item: DATA.DATA_EQ) {
        this.confirmOpened = true;
        this.currentDATA_EQ = item;
    }

    onConfirmDeletion() {
        this.DATA_EQ_Service.delete_DATA_EQById(this.currentDATA_EQ.DATA_EQId).subscribe(data => {this.refreshDATA_EQ()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_EQ) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_EQ_Service.create_DATA_EQ(item)
                        .subscribe(data =>{ this.refreshDATA_EQ()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_EQ_Service.update_DATA_EQ( item)
                        .subscribe(data => {this.refreshDATA_EQ()}, error => { this.ShowError(error.message); });
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
        this.currentDATA_EQ = {} as DATA.DATA_EQ;
    }
}
 
