import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONSRV_PORTS_Service } from "app/MONSRV_PORTS.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONSRV } from "app/MONSRV";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONSRV_PORTS',
    styleUrls: ['./MONSRV_PORTS.component.scss'],
    templateUrl: './MONSRV_PORTS.component.html',
})
export class MONSRV_PORTSComponent implements OnInit {

    MONSRV_PORTSArray: Array<MONSRV.MONSRV_PORTS> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONSRV_PORTS: MONSRV.MONSRV_PORTS = {} as MONSRV.MONSRV_PORTS;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONSRV_PORTS_Service: MONSRV_PORTS_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONSRV_PORTS"); 
        this.subscription=this.AppService.currentMONSRV_INFO.subscribe(si =>{ this.refreshMONSRV_PORTS(); }, error => { this.ShowError(error.message); } );
        this.refreshMONSRV_PORTS();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONSRV_PORTS"); 
        this.subscription.unsubscribe();
    }

    refreshMONSRV_PORTS() {
		let item:MONSRV.MONSRV_INFO;
		item=this.AppService.LastMONSRV_INFO;
		console.log("refreshing MONSRV_PORTS"); 
     this.currentMONSRV_PORTS = {} as MONSRV.MONSRV_PORTS;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONSRV_PORTS_Service.get_MONSRV_PORTSByParent('00000000-0000-0000-0000-000000000000').subscribe(MONSRV_PORTSArray => { this.MONSRV_PORTSArray = MONSRV_PORTSArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONSRV_INFOId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONSRV_PORTS_Service.get_MONSRV_PORTSByParent('00000000-0000-0000-0000-000000000000').subscribe(MONSRV_PORTSArray => { this.MONSRV_PORTSArray = MONSRV_PORTSArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONSRV_INFOId === 'string' ) {
        this.MONSRV_PORTS_Service.get_MONSRV_PORTSByParent(item.MONSRV_INFOId).subscribe(MONSRV_PORTSArray => { this.MONSRV_PORTSArray = MONSRV_PORTSArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONSRV_PORTS();
		return this.MONSRV_PORTSArray ;
	   }

    onSelect(item: MONSRV.MONSRV_PORTS) {
        this.currentMONSRV_PORTS = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONSRV_INFO.MONSRV_INFOId) === 'string' ) {
        this.currentMONSRV_PORTS = {} as MONSRV.MONSRV_PORTS;
        this.currentMONSRV_PORTS.MONSRV_INFOId = this.AppService.LastMONSRV_INFO.MONSRV_INFOId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONSRV.MONSRV_PORTS) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONSRV_PORTS = item;
    }

    onDelete(item: MONSRV.MONSRV_PORTS) {
        this.confirmOpened = true;
        this.currentMONSRV_PORTS = item;
    }

    onConfirmDeletion() {
        this.MONSRV_PORTS_Service.delete_MONSRV_PORTSById(this.currentMONSRV_PORTS.MONSRV_PORTSId).subscribe(data => {this.refreshMONSRV_PORTS()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONSRV.MONSRV_PORTS) {
        this.valid=true; 
     if(this.currentMONSRV_PORTS.IsUsable == undefined ) this.valid=false;
     if(this.currentMONSRV_PORTS.IsUsed == undefined ) this.valid=false;
     if(this.currentMONSRV_PORTS.UsedUntil == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONSRV_PORTS_Service.create_MONSRV_PORTS(item)
                        .subscribe(data =>{ this.refreshMONSRV_PORTS()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONSRV_PORTS_Service.update_MONSRV_PORTS( item)
                        .subscribe(data => {this.refreshMONSRV_PORTS()}, error => { this.ShowError(error.message); });
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
        this.currentMONSRV_PORTS = {} as MONSRV.MONSRV_PORTS;
    }
}
 
