import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONN_DEF_Service } from "app/MONN_DEF.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONNODE } from "app/MONNODE";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONN_DEF',
    styleUrls: ['./MONN_DEF.component.scss'],
    templateUrl: './MONN_DEF.component.html',
})
export class MONN_DEFComponent implements OnInit {

    MONN_DEFArray: Array<MONNODE.MONN_DEF> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONN_DEF: MONNODE.MONN_DEF = {} as MONNODE.MONN_DEF;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MONN_DEF_Service: MONN_DEF_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMONN_DEF();
    }
    refreshCombo() {
     this.AppService.refreshComboMOND_F();
     this.AppService.refreshCombomoncli_info();
    }
    ngOnDestroy() {
    }

    refreshMONN_DEF() {
		   console.log("refreshing MONN_DEF"); 
        this.MONN_DEF_Service.getAll_MONN_DEFs().subscribe(MONN_DEFArray => { this.MONN_DEFArray = MONN_DEFArray; }, error => { this.ShowError(error.message); })
        this.currentMONN_DEF = {} as MONNODE.MONN_DEF;
        console.log("clear selection for MONN_DEF on refresh");
        this.AppService.pushSelectedMONN_DEF(this.currentMONN_DEF);
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONN_DEF();
		return this.MONN_DEFArray ;
	   }

    onSelect(item: MONNODE.MONN_DEF) {
        this.currentMONN_DEF = item;
        this.AppService.pushSelectedMONN_DEF(item);
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMONN_DEF = {} as MONNODE.MONN_DEF;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MONNODE.MONN_DEF) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONN_DEF = item;
    }

    onDelete(item: MONNODE.MONN_DEF) {
        this.confirmOpened = true;
        this.currentMONN_DEF = item;
    }

    onConfirmDeletion() {
        this.MONN_DEF_Service.delete_MONN_DEFById(this.currentMONN_DEF.MONN_DEFId).subscribe(data => {this.refreshMONN_DEF()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONNODE.MONN_DEF) {
        this.valid=true; 
     if(this.currentMONN_DEF.Addr == undefined || this.currentMONN_DEF.Addr=='') this.valid=false;
     if(this.currentMONN_DEF.ThePhone == undefined || this.currentMONN_DEF.ThePhone=='') this.valid=false;
     if(this.currentMONN_DEF.OrgUnit == undefined ) this.valid=false;
     if(this.currentMONN_DEF.isMovable == undefined ) this.valid=false;
     if(this.currentMONN_DEF.theClient == undefined ) this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONN_DEF_Service.create_MONN_DEF(item)
                        .subscribe(data =>{ this.refreshMONN_DEF()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONN_DEF_Service.update_MONN_DEF( item)
                        .subscribe(data => {this.refreshMONN_DEF()}, error => { this.ShowError(error.message); });
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
        this.currentMONN_DEF = {} as MONNODE.MONN_DEF;
        console.log("clear selection for MONN_DEF");
        this.AppService.pushSelectedMONN_DEF(this.currentMONN_DEF);
    }
}
 
