import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONDEV_BDEVICES_Service } from "app/MONDEV_BDEVICES.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONDEV } from "app/MONDEV";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONDEV_BDEVICES',
    styleUrls: ['./MONDEV_BDEVICES.component.scss'],
    templateUrl: './MONDEV_BDEVICES.component.html',
})
export class MONDEV_BDEVICESComponent implements OnInit {

    MONDEV_BDEVICESArray: Array<MONDEV.MONDEV_BDEVICES> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONDEV_BDEVICES: MONDEV.MONDEV_BDEVICES = {} as MONDEV.MONDEV_BDEVICES;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MONDEV_BDEVICES_Service: MONDEV_BDEVICES_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMONDEV_BDEVICES();
    }
    refreshCombo() {
     this.AppService.refreshComboMONN_DEF();
     this.AppService.refreshComboMOND_DEVTYPE();
     this.AppService.refreshComboMOND_SNAB();
     this.AppService.refreshComboMOND_GRP();
     this.AppService.refreshComboMONSCH_INFO();
    }
    ngOnDestroy() {
    }

    refreshMONDEV_BDEVICES() {
		   console.log("refreshing MONDEV_BDEVICES"); 
        this.MONDEV_BDEVICES_Service.getAll_MONDEV_BDEVICESs().subscribe(MONDEV_BDEVICESArray => { this.MONDEV_BDEVICESArray = MONDEV_BDEVICESArray; }, error => { this.ShowError(error.message); })
        this.currentMONDEV_BDEVICES = {} as MONDEV.MONDEV_BDEVICES;
        console.log("clear selection for MONDEV_BDEVICES on refresh");
        this.AppService.pushSelectedMONDEV_BDEVICES(this.currentMONDEV_BDEVICES);
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONDEV_BDEVICES();
		return this.MONDEV_BDEVICESArray ;
	   }

    onSelect(item: MONDEV.MONDEV_BDEVICES) {
        this.currentMONDEV_BDEVICES = item;
        this.AppService.pushSelectedMONDEV_BDEVICES(item);
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMONDEV_BDEVICES = {} as MONDEV.MONDEV_BDEVICES;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MONDEV.MONDEV_BDEVICES) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONDEV_BDEVICES = item;
    }

    onDelete(item: MONDEV.MONDEV_BDEVICES) {
        this.confirmOpened = true;
        this.currentMONDEV_BDEVICES = item;
    }

    onConfirmDeletion() {
        this.MONDEV_BDEVICES_Service.delete_MONDEV_BDEVICESById(this.currentMONDEV_BDEVICES.MONDEV_BDEVICESId).subscribe(data => {this.refreshMONDEV_BDEVICES()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONDEV.MONDEV_BDEVICES) {
        this.valid=true; 
     if(this.currentMONDEV_BDEVICES.TheNode == undefined ) this.valid=false;
     if(this.currentMONDEV_BDEVICES.ThePhone == undefined || this.currentMONDEV_BDEVICES.ThePhone=='') this.valid=false;
     if(this.currentMONDEV_BDEVICES.Addr == undefined || this.currentMONDEV_BDEVICES.Addr=='') this.valid=false;
     if(this.currentMONDEV_BDEVICES.DEVType == undefined ) this.valid=false;
     if(this.currentMONDEV_BDEVICES.Shab == undefined ) this.valid=false;
     if(this.currentMONDEV_BDEVICES.DevGrp == undefined ) this.valid=false;
     if(this.currentMONDEV_BDEVICES.THESCHEMA == undefined ) this.valid=false;
     if(this.currentMONDEV_BDEVICES.NPLOCK == undefined ) this.valid=false;
     if(this.currentMONDEV_BDEVICES.CONNECTED == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONDEV_BDEVICES_Service.create_MONDEV_BDEVICES(item)
                        .subscribe(data =>{ this.refreshMONDEV_BDEVICES()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONDEV_BDEVICES_Service.update_MONDEV_BDEVICES( item)
                        .subscribe(data => {this.refreshMONDEV_BDEVICES()}, error => { this.ShowError(error.message); });
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
        this.currentMONDEV_BDEVICES = {} as MONDEV.MONDEV_BDEVICES;
        console.log("clear selection for MONDEV_BDEVICES");
        this.AppService.pushSelectedMONDEV_BDEVICES(this.currentMONDEV_BDEVICES);
    }
}
 
