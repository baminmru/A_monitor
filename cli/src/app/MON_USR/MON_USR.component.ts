import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MON_USR_Service } from "app/MON_USR.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONUSR } from "app/MONUSR";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MON_USR',
    styleUrls: ['./MON_USR.component.scss'],
    templateUrl: './MON_USR.component.html',
})
export class MON_USRComponent implements OnInit {

    MON_USRArray: Array<MONUSR.MON_USR> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMON_USR: MONUSR.MON_USR = {} as MONUSR.MON_USR;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MON_USR_Service: MON_USR_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMON_USR();
    }
    refreshCombo() {
     this.AppService.refreshCombomoncli_info();
     this.AppService.refreshComboMOND_ROLE();
    }
    ngOnDestroy() {
    }

    refreshMON_USR() {
		   console.log("refreshing MON_USR"); 
        this.MON_USR_Service.getAll_MON_USRs().subscribe(MON_USRArray => { this.MON_USRArray = MON_USRArray; }, error => { this.ShowError(error.message); })
        this.currentMON_USR = {} as MONUSR.MON_USR;
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMON_USR();
		return this.MON_USRArray ;
	   }

    onSelect(item: MONUSR.MON_USR) {
        this.currentMON_USR = item;
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMON_USR = {} as MONUSR.MON_USR;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MONUSR.MON_USR) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMON_USR = item;
    }

    onDelete(item: MONUSR.MON_USR) {
        this.confirmOpened = true;
        this.currentMON_USR = item;
    }

    onConfirmDeletion() {
        this.MON_USR_Service.delete_MON_USRById(this.currentMON_USR.MON_USRId).subscribe(data => {this.refreshMON_USR()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONUSR.MON_USR) {
        this.valid=true; 
     if(this.currentMON_USR.theClient == undefined ) this.valid=false;
     if(this.currentMON_USR.surname == undefined || this.currentMON_USR.surname=='') this.valid=false;
     if(this.currentMON_USR.curRole == undefined ) this.valid=false;
     if(this.currentMON_USR.email == undefined || this.currentMON_USR.email=='') this.valid=false;
     if(this.currentMON_USR.thephone == undefined || this.currentMON_USR.thephone=='') this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MON_USR_Service.create_MON_USR(item)
                        .subscribe(data =>{ this.refreshMON_USR()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MON_USR_Service.update_MON_USR( item)
                        .subscribe(data => {this.refreshMON_USR()}, error => { this.ShowError(error.message); });
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
        this.currentMON_USR = {} as MONUSR.MON_USR;
    }
}
 
