import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { DATA_M_Service } from "app/DATA_M.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { DATA } from "app/DATA";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-DATA_M',
    styleUrls: ['./DATA_M.component.scss'],
    templateUrl: './DATA_M.component.html',
})
export class DATA_MComponent implements OnInit {

    DATA_MArray: Array<DATA.DATA_M> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentDATA_M: DATA.DATA_M = {} as DATA.DATA_M;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private DATA_M_Service: DATA_M_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe DATA_M"); 
        this.subscription=this.AppService.currentDATA_RECORD.subscribe(si =>{ this.refreshDATA_M(); }, error => { this.ShowError(error.message); } );
        this.refreshDATA_M();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe DATA_M"); 
        this.subscription.unsubscribe();
    }

    refreshDATA_M() {
		let item:DATA.DATA_RECORD;
		item=this.AppService.LastDATA_RECORD;
		console.log("refreshing DATA_M"); 
     this.currentDATA_M = {} as DATA.DATA_M;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.DATA_M_Service.get_DATA_MByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_MArray => { this.DATA_MArray = DATA_MArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.DATA_M_Service.get_DATA_MByParent('00000000-0000-0000-0000-000000000000').subscribe(DATA_MArray => { this.DATA_MArray = DATA_MArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.DATA_RECORDId === 'string' ) {
        this.DATA_M_Service.get_DATA_MByParent(item.DATA_RECORDId).subscribe(DATA_MArray => { this.DATA_MArray = DATA_MArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshDATA_M();
		return this.DATA_MArray ;
	   }

    onSelect(item: DATA.DATA_M) {
        this.currentDATA_M = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastDATA_RECORD.DATA_RECORDId) === 'string' ) {
        this.currentDATA_M = {} as DATA.DATA_M;
        this.currentDATA_M.DATA_RECORDId = this.AppService.LastDATA_RECORD.DATA_RECORDId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: DATA.DATA_M) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentDATA_M = item;
    }

    onDelete(item: DATA.DATA_M) {
        this.confirmOpened = true;
        this.currentDATA_M = item;
    }

    onConfirmDeletion() {
        this.DATA_M_Service.delete_DATA_MById(this.currentDATA_M.DATA_MId).subscribe(data => {this.refreshDATA_M()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: DATA.DATA_M) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.DATA_M_Service.create_DATA_M(item)
                        .subscribe(data =>{ this.refreshDATA_M()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.DATA_M_Service.update_DATA_M( item)
                        .subscribe(data => {this.refreshDATA_M()}, error => { this.ShowError(error.message); });
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
        this.currentDATA_M = {} as DATA.DATA_M;
    }
}
 
