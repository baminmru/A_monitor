import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONDEV_CONNECT_Service } from "app/MONDEV_CONNECT.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONDEV } from "app/MONDEV";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONDEV_CONNECT',
    styleUrls: ['./MONDEV_CONNECT.component.scss'],
    templateUrl: './MONDEV_CONNECT.component.html',
})
export class MONDEV_CONNECTComponent implements OnInit {

    MONDEV_CONNECTArray: Array<MONDEV.MONDEV_CONNECT> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONDEV_CONNECT: MONDEV.MONDEV_CONNECT = {} as MONDEV.MONDEV_CONNECT;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONDEV_CONNECT_Service: MONDEV_CONNECT_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONDEV_CONNECT"); 
        this.subscription=this.AppService.currentMONDEV_BDEVICES.subscribe(si =>{ this.refreshMONDEV_CONNECT(); }, error => { this.ShowError(error.message); } );
        this.refreshMONDEV_CONNECT();
    }
    refreshCombo() {
     this.AppService.refreshComboMOND_CONNECTTYPE();
     this.AppService.refreshComboMONSRV_INFO();
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONDEV_CONNECT"); 
        this.subscription.unsubscribe();
    }

    refreshMONDEV_CONNECT() {
		let item:MONDEV.MONDEV_BDEVICES;
		item=this.AppService.LastMONDEV_BDEVICES;
		console.log("refreshing MONDEV_CONNECT"); 
     this.currentMONDEV_CONNECT = {} as MONDEV.MONDEV_CONNECT;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONDEV_CONNECT_Service.get_MONDEV_CONNECTByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_CONNECTArray => { this.MONDEV_CONNECTArray = MONDEV_CONNECTArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONDEV_CONNECT_Service.get_MONDEV_CONNECTByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_CONNECTArray => { this.MONDEV_CONNECTArray = MONDEV_CONNECTArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId === 'string' ) {
        this.MONDEV_CONNECT_Service.get_MONDEV_CONNECTByParent(item.MONDEV_BDEVICESId).subscribe(MONDEV_CONNECTArray => { this.MONDEV_CONNECTArray = MONDEV_CONNECTArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONDEV_CONNECT();
		return this.MONDEV_CONNECTArray ;
	   }

    onSelect(item: MONDEV.MONDEV_CONNECT) {
        this.currentMONDEV_CONNECT = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId) === 'string' ) {
        this.currentMONDEV_CONNECT = {} as MONDEV.MONDEV_CONNECT;
        this.currentMONDEV_CONNECT.MONDEV_BDEVICESId = this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONDEV.MONDEV_CONNECT) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONDEV_CONNECT = item;
    }

    onDelete(item: MONDEV.MONDEV_CONNECT) {
        this.confirmOpened = true;
        this.currentMONDEV_CONNECT = item;
    }

    onConfirmDeletion() {
        this.MONDEV_CONNECT_Service.delete_MONDEV_CONNECTById(this.currentMONDEV_CONNECT.MONDEV_CONNECTId).subscribe(data => {this.refreshMONDEV_CONNECT()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONDEV.MONDEV_CONNECT) {
        this.valid=true; 
     if(this.currentMONDEV_CONNECT.ConnectType == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONDEV_CONNECT_Service.create_MONDEV_CONNECT(item)
                        .subscribe(data =>{ this.refreshMONDEV_CONNECT()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONDEV_CONNECT_Service.update_MONDEV_CONNECT( item)
                        .subscribe(data => {this.refreshMONDEV_CONNECT()}, error => { this.ShowError(error.message); });
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
        this.currentMONDEV_CONNECT = {} as MONDEV.MONDEV_CONNECT;
    }
}
 
