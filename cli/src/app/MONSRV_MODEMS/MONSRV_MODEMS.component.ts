import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONSRV_MODEMS_Service } from "app/MONSRV_MODEMS.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONSRV } from "app/MONSRV";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONSRV_MODEMS',
    styleUrls: ['./MONSRV_MODEMS.component.scss'],
    templateUrl: './MONSRV_MODEMS.component.html',
})
export class MONSRV_MODEMSComponent implements OnInit {

    MONSRV_MODEMSArray: Array<MONSRV.MONSRV_MODEMS> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONSRV_MODEMS: MONSRV.MONSRV_MODEMS = {} as MONSRV.MONSRV_MODEMS;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONSRV_MODEMS_Service: MONSRV_MODEMS_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONSRV_MODEMS"); 
        this.subscription=this.AppService.currentMONSRV_INFO.subscribe(si =>{ this.refreshMONSRV_MODEMS(); }, error => { this.ShowError(error.message); } );
        this.refreshMONSRV_MODEMS();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONSRV_MODEMS"); 
        this.subscription.unsubscribe();
    }

    refreshMONSRV_MODEMS() {
		let item:MONSRV.MONSRV_INFO;
		item=this.AppService.LastMONSRV_INFO;
		console.log("refreshing MONSRV_MODEMS"); 
     this.currentMONSRV_MODEMS = {} as MONSRV.MONSRV_MODEMS;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONSRV_MODEMS_Service.get_MONSRV_MODEMSByParent('00000000-0000-0000-0000-000000000000').subscribe(MONSRV_MODEMSArray => { this.MONSRV_MODEMSArray = MONSRV_MODEMSArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONSRV_INFOId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONSRV_MODEMS_Service.get_MONSRV_MODEMSByParent('00000000-0000-0000-0000-000000000000').subscribe(MONSRV_MODEMSArray => { this.MONSRV_MODEMSArray = MONSRV_MODEMSArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONSRV_INFOId === 'string' ) {
        this.MONSRV_MODEMS_Service.get_MONSRV_MODEMSByParent(item.MONSRV_INFOId).subscribe(MONSRV_MODEMSArray => { this.MONSRV_MODEMSArray = MONSRV_MODEMSArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONSRV_MODEMS();
		return this.MONSRV_MODEMSArray ;
	   }

    onSelect(item: MONSRV.MONSRV_MODEMS) {
        this.currentMONSRV_MODEMS = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONSRV_INFO.MONSRV_INFOId) === 'string' ) {
        this.currentMONSRV_MODEMS = {} as MONSRV.MONSRV_MODEMS;
        this.currentMONSRV_MODEMS.MONSRV_INFOId = this.AppService.LastMONSRV_INFO.MONSRV_INFOId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONSRV.MONSRV_MODEMS) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONSRV_MODEMS = item;
    }

    onDelete(item: MONSRV.MONSRV_MODEMS) {
        this.confirmOpened = true;
        this.currentMONSRV_MODEMS = item;
    }

    onConfirmDeletion() {
        this.MONSRV_MODEMS_Service.delete_MONSRV_MODEMSById(this.currentMONSRV_MODEMS.MONSRV_MODEMSId).subscribe(data => {this.refreshMONSRV_MODEMS()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONSRV.MONSRV_MODEMS) {
        this.valid=true; 
     if(this.currentMONSRV_MODEMS.PortNum == undefined || this.currentMONSRV_MODEMS.PortNum=='') this.valid=false;
     if(this.currentMONSRV_MODEMS.IsUsable == undefined ) this.valid=false;
     if(this.currentMONSRV_MODEMS.IsUsed == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONSRV_MODEMS_Service.create_MONSRV_MODEMS(item)
                        .subscribe(data =>{ this.refreshMONSRV_MODEMS()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONSRV_MODEMS_Service.update_MONSRV_MODEMS( item)
                        .subscribe(data => {this.refreshMONSRV_MODEMS()}, error => { this.ShowError(error.message); });
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
        this.currentMONSRV_MODEMS = {} as MONSRV.MONSRV_MODEMS;
    }
}
 
