import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONDEV_PLANCALL_Service } from "app/MONDEV_PLANCALL.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONDEV } from "app/MONDEV";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONDEV_PLANCALL',
    styleUrls: ['./MONDEV_PLANCALL.component.scss'],
    templateUrl: './MONDEV_PLANCALL.component.html',
})
export class MONDEV_PLANCALLComponent implements OnInit {

    MONDEV_PLANCALLArray: Array<MONDEV.MONDEV_PLANCALL> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONDEV_PLANCALL: MONDEV.MONDEV_PLANCALL = {} as MONDEV.MONDEV_PLANCALL;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONDEV_PLANCALL_Service: MONDEV_PLANCALL_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONDEV_PLANCALL"); 
        this.subscription=this.AppService.currentMONDEV_BDEVICES.subscribe(si =>{ this.refreshMONDEV_PLANCALL(); }, error => { this.ShowError(error.message); } );
        this.refreshMONDEV_PLANCALL();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONDEV_PLANCALL"); 
        this.subscription.unsubscribe();
    }

    refreshMONDEV_PLANCALL() {
		let item:MONDEV.MONDEV_BDEVICES;
		item=this.AppService.LastMONDEV_BDEVICES;
		console.log("refreshing MONDEV_PLANCALL"); 
     this.currentMONDEV_PLANCALL = {} as MONDEV.MONDEV_PLANCALL;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONDEV_PLANCALL_Service.get_MONDEV_PLANCALLByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_PLANCALLArray => { this.MONDEV_PLANCALLArray = MONDEV_PLANCALLArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONDEV_PLANCALL_Service.get_MONDEV_PLANCALLByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_PLANCALLArray => { this.MONDEV_PLANCALLArray = MONDEV_PLANCALLArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId === 'string' ) {
        this.MONDEV_PLANCALL_Service.get_MONDEV_PLANCALLByParent(item.MONDEV_BDEVICESId).subscribe(MONDEV_PLANCALLArray => { this.MONDEV_PLANCALLArray = MONDEV_PLANCALLArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONDEV_PLANCALL();
		return this.MONDEV_PLANCALLArray ;
	   }

    onSelect(item: MONDEV.MONDEV_PLANCALL) {
        this.currentMONDEV_PLANCALL = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId) === 'string' ) {
        this.currentMONDEV_PLANCALL = {} as MONDEV.MONDEV_PLANCALL;
        this.currentMONDEV_PLANCALL.MONDEV_BDEVICESId = this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONDEV.MONDEV_PLANCALL) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONDEV_PLANCALL = item;
    }

    onDelete(item: MONDEV.MONDEV_PLANCALL) {
        this.confirmOpened = true;
        this.currentMONDEV_PLANCALL = item;
    }

    onConfirmDeletion() {
        this.MONDEV_PLANCALL_Service.delete_MONDEV_PLANCALLById(this.currentMONDEV_PLANCALL.MONDEV_PLANCALLId).subscribe(data => {this.refreshMONDEV_PLANCALL()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONDEV.MONDEV_PLANCALL) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONDEV_PLANCALL_Service.create_MONDEV_PLANCALL(item)
                        .subscribe(data =>{ this.refreshMONDEV_PLANCALL()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONDEV_PLANCALL_Service.update_MONDEV_PLANCALL( item)
                        .subscribe(data => {this.refreshMONDEV_PLANCALL()}, error => { this.ShowError(error.message); });
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
        this.currentMONDEV_PLANCALL = {} as MONDEV.MONDEV_PLANCALL;
    }
}
 
