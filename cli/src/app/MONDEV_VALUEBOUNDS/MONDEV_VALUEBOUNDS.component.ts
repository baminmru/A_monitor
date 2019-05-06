import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONDEV_VALUEBOUNDS_Service } from "app/MONDEV_VALUEBOUNDS.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONDEV } from "app/MONDEV";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONDEV_VALUEBOUNDS',
    styleUrls: ['./MONDEV_VALUEBOUNDS.component.scss'],
    templateUrl: './MONDEV_VALUEBOUNDS.component.html',
})
export class MONDEV_VALUEBOUNDSComponent implements OnInit {

    MONDEV_VALUEBOUNDSArray: Array<MONDEV.MONDEV_VALUEBOUNDS> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONDEV_VALUEBOUNDS: MONDEV.MONDEV_VALUEBOUNDS = {} as MONDEV.MONDEV_VALUEBOUNDS;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONDEV_VALUEBOUNDS_Service: MONDEV_VALUEBOUNDS_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONDEV_VALUEBOUNDS"); 
        this.subscription=this.AppService.currentMONDEV_BDEVICES.subscribe(si =>{ this.refreshMONDEV_VALUEBOUNDS(); }, error => { this.ShowError(error.message); } );
        this.refreshMONDEV_VALUEBOUNDS();
    }
    refreshCombo() {
     this.AppService.refreshComboMOND_PARAM();
     this.AppService.refreshComboMOND_ATYPE();
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONDEV_VALUEBOUNDS"); 
        this.subscription.unsubscribe();
    }

    refreshMONDEV_VALUEBOUNDS() {
		let item:MONDEV.MONDEV_BDEVICES;
		item=this.AppService.LastMONDEV_BDEVICES;
		console.log("refreshing MONDEV_VALUEBOUNDS"); 
     this.currentMONDEV_VALUEBOUNDS = {} as MONDEV.MONDEV_VALUEBOUNDS;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONDEV_VALUEBOUNDS_Service.get_MONDEV_VALUEBOUNDSByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_VALUEBOUNDSArray => { this.MONDEV_VALUEBOUNDSArray = MONDEV_VALUEBOUNDSArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONDEV_VALUEBOUNDS_Service.get_MONDEV_VALUEBOUNDSByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_VALUEBOUNDSArray => { this.MONDEV_VALUEBOUNDSArray = MONDEV_VALUEBOUNDSArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId === 'string' ) {
        this.MONDEV_VALUEBOUNDS_Service.get_MONDEV_VALUEBOUNDSByParent(item.MONDEV_BDEVICESId).subscribe(MONDEV_VALUEBOUNDSArray => { this.MONDEV_VALUEBOUNDSArray = MONDEV_VALUEBOUNDSArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONDEV_VALUEBOUNDS();
		return this.MONDEV_VALUEBOUNDSArray ;
	   }

    onSelect(item: MONDEV.MONDEV_VALUEBOUNDS) {
        this.currentMONDEV_VALUEBOUNDS = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId) === 'string' ) {
        this.currentMONDEV_VALUEBOUNDS = {} as MONDEV.MONDEV_VALUEBOUNDS;
        this.currentMONDEV_VALUEBOUNDS.MONDEV_BDEVICESId = this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONDEV.MONDEV_VALUEBOUNDS) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONDEV_VALUEBOUNDS = item;
    }

    onDelete(item: MONDEV.MONDEV_VALUEBOUNDS) {
        this.confirmOpened = true;
        this.currentMONDEV_VALUEBOUNDS = item;
    }

    onConfirmDeletion() {
        this.MONDEV_VALUEBOUNDS_Service.delete_MONDEV_VALUEBOUNDSById(this.currentMONDEV_VALUEBOUNDS.MONDEV_VALUEBOUNDSId).subscribe(data => {this.refreshMONDEV_VALUEBOUNDS()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONDEV.MONDEV_VALUEBOUNDS) {
        this.valid=true; 
     if(this.currentMONDEV_VALUEBOUNDS.PNAME == undefined ) this.valid=false;
     if(this.currentMONDEV_VALUEBOUNDS.PTYPE == undefined ) this.valid=false;
     if(this.currentMONDEV_VALUEBOUNDS.PMIN == undefined  ) this.valid=false;
     if(this.currentMONDEV_VALUEBOUNDS.PMAX == undefined  ) this.valid=false;
     if(this.currentMONDEV_VALUEBOUNDS.ISMIN == undefined ) this.valid=false;
     if(this.currentMONDEV_VALUEBOUNDS.ISMAX == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONDEV_VALUEBOUNDS_Service.create_MONDEV_VALUEBOUNDS(item)
                        .subscribe(data =>{ this.refreshMONDEV_VALUEBOUNDS()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONDEV_VALUEBOUNDS_Service.update_MONDEV_VALUEBOUNDS( item)
                        .subscribe(data => {this.refreshMONDEV_VALUEBOUNDS()}, error => { this.ShowError(error.message); });
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
        this.currentMONDEV_VALUEBOUNDS = {} as MONDEV.MONDEV_VALUEBOUNDS;
    }
}
 
