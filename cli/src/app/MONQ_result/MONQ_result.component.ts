import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONQ_result_Service } from "app/MONQ_result.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONQ } from "app/MONQ";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONQ_result',
    styleUrls: ['./MONQ_result.component.scss'],
    templateUrl: './MONQ_result.component.html',
})
export class MONQ_resultComponent implements OnInit {

    MONQ_resultArray: Array<MONQ.MONQ_result> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONQ_result: MONQ.MONQ_result = {} as MONQ.MONQ_result;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONQ_result_Service: MONQ_result_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONQ_result"); 
        this.subscription=this.AppService.currentMONQ_DEF.subscribe(si =>{ this.refreshMONQ_result(); }, error => { this.ShowError(error.message); } );
        this.refreshMONQ_result();
    }
    refreshCombo() {
     this.AppService.refreshComboDATA_RECORD();
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONQ_result"); 
        this.subscription.unsubscribe();
    }

    refreshMONQ_result() {
		let item:MONQ.MONQ_DEF;
		item=this.AppService.LastMONQ_DEF;
		console.log("refreshing MONQ_result"); 
     this.currentMONQ_result = {} as MONQ.MONQ_result;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONQ_result_Service.get_MONQ_resultByParent('00000000-0000-0000-0000-000000000000').subscribe(MONQ_resultArray => { this.MONQ_resultArray = MONQ_resultArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONQ_DEFId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONQ_result_Service.get_MONQ_resultByParent('00000000-0000-0000-0000-000000000000').subscribe(MONQ_resultArray => { this.MONQ_resultArray = MONQ_resultArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONQ_DEFId === 'string' ) {
        this.MONQ_result_Service.get_MONQ_resultByParent(item.MONQ_DEFId).subscribe(MONQ_resultArray => { this.MONQ_resultArray = MONQ_resultArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONQ_result();
		return this.MONQ_resultArray ;
	   }

    onSelect(item: MONQ.MONQ_result) {
        this.currentMONQ_result = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONQ_DEF.MONQ_DEFId) === 'string' ) {
        this.currentMONQ_result = {} as MONQ.MONQ_result;
        this.currentMONQ_result.MONQ_DEFId = this.AppService.LastMONQ_DEF.MONQ_DEFId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONQ.MONQ_result) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONQ_result = item;
    }

    onDelete(item: MONQ.MONQ_result) {
        this.confirmOpened = true;
        this.currentMONQ_result = item;
    }

    onConfirmDeletion() {
        this.MONQ_result_Service.delete_MONQ_resultById(this.currentMONQ_result.MONQ_resultId).subscribe(data => {this.refreshMONQ_result()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONQ.MONQ_result) {
        this.valid=true; 
     if(this.currentMONQ_result.RecArch == undefined ) this.valid=false;
     if(this.currentMONQ_result.IsError == undefined ) this.valid=false;
     if(this.currentMONQ_result.LogMessage == undefined || this.currentMONQ_result.LogMessage=='') this.valid=false;
     if(this.currentMONQ_result.StartTime == undefined ) this.valid=false;
     if(this.currentMONQ_result.EndTime == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONQ_result_Service.create_MONQ_result(item)
                        .subscribe(data =>{ this.refreshMONQ_result()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONQ_result_Service.update_MONQ_result( item)
                        .subscribe(data => {this.refreshMONQ_result()}, error => { this.ShowError(error.message); });
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
        this.currentMONQ_result = {} as MONQ.MONQ_result;
    }
}
 
