import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONDEV_CONTRACT_Service } from "app/MONDEV_CONTRACT.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONDEV } from "app/MONDEV";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONDEV_CONTRACT',
    styleUrls: ['./MONDEV_CONTRACT.component.scss'],
    templateUrl: './MONDEV_CONTRACT.component.html',
})
export class MONDEV_CONTRACTComponent implements OnInit {

    MONDEV_CONTRACTArray: Array<MONDEV.MONDEV_CONTRACT> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONDEV_CONTRACT: MONDEV.MONDEV_CONTRACT = {} as MONDEV.MONDEV_CONTRACT;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONDEV_CONTRACT_Service: MONDEV_CONTRACT_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONDEV_CONTRACT"); 
        this.subscription=this.AppService.currentMONDEV_BDEVICES.subscribe(si =>{ this.refreshMONDEV_CONTRACT(); }, error => { this.ShowError(error.message); } );
        this.refreshMONDEV_CONTRACT();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONDEV_CONTRACT"); 
        this.subscription.unsubscribe();
    }

    refreshMONDEV_CONTRACT() {
		let item:MONDEV.MONDEV_BDEVICES;
		item=this.AppService.LastMONDEV_BDEVICES;
		console.log("refreshing MONDEV_CONTRACT"); 
     this.currentMONDEV_CONTRACT = {} as MONDEV.MONDEV_CONTRACT;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONDEV_CONTRACT_Service.get_MONDEV_CONTRACTByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_CONTRACTArray => { this.MONDEV_CONTRACTArray = MONDEV_CONTRACTArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONDEV_CONTRACT_Service.get_MONDEV_CONTRACTByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_CONTRACTArray => { this.MONDEV_CONTRACTArray = MONDEV_CONTRACTArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId === 'string' ) {
        this.MONDEV_CONTRACT_Service.get_MONDEV_CONTRACTByParent(item.MONDEV_BDEVICESId).subscribe(MONDEV_CONTRACTArray => { this.MONDEV_CONTRACTArray = MONDEV_CONTRACTArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONDEV_CONTRACT();
		return this.MONDEV_CONTRACTArray ;
	   }

    onSelect(item: MONDEV.MONDEV_CONTRACT) {
        this.currentMONDEV_CONTRACT = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId) === 'string' ) {
        this.currentMONDEV_CONTRACT = {} as MONDEV.MONDEV_CONTRACT;
        this.currentMONDEV_CONTRACT.MONDEV_BDEVICESId = this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONDEV.MONDEV_CONTRACT) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONDEV_CONTRACT = item;
    }

    onDelete(item: MONDEV.MONDEV_CONTRACT) {
        this.confirmOpened = true;
        this.currentMONDEV_CONTRACT = item;
    }

    onConfirmDeletion() {
        this.MONDEV_CONTRACT_Service.delete_MONDEV_CONTRACTById(this.currentMONDEV_CONTRACT.MONDEV_CONTRACTId).subscribe(data => {this.refreshMONDEV_CONTRACT()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONDEV.MONDEV_CONTRACT) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONDEV_CONTRACT_Service.create_MONDEV_CONTRACT(item)
                        .subscribe(data =>{ this.refreshMONDEV_CONTRACT()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONDEV_CONTRACT_Service.update_MONDEV_CONTRACT( item)
                        .subscribe(data => {this.refreshMONDEV_CONTRACT()}, error => { this.ShowError(error.message); });
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
        this.currentMONDEV_CONTRACT = {} as MONDEV.MONDEV_CONTRACT;
    }
}
 
