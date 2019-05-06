﻿import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MOND_DATA_Service } from "app/MOND_DATA.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MOND } from "app/MOND";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MOND_DATA',
    styleUrls: ['./MOND_DATA.component.scss'],
    templateUrl: './MOND_DATA.component.html',
})
export class MOND_DATAComponent implements OnInit {

    MOND_DATAArray: Array<MOND.MOND_DATA> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMOND_DATA: MOND.MOND_DATA = {} as MOND.MOND_DATA;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MOND_DATA_Service: MOND_DATA_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMOND_DATA();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
    }

    refreshMOND_DATA() {
		   console.log("refreshing MOND_DATA"); 
        this.MOND_DATA_Service.getAll_MOND_DATAs().subscribe(MOND_DATAArray => { this.MOND_DATAArray = MOND_DATAArray; }, error => { this.ShowError(error.message); })
        this.currentMOND_DATA = {} as MOND.MOND_DATA;
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMOND_DATA();
		return this.MOND_DATAArray ;
	   }

    onSelect(item: MOND.MOND_DATA) {
        this.currentMOND_DATA = item;
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMOND_DATA = {} as MOND.MOND_DATA;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MOND.MOND_DATA) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMOND_DATA = item;
    }

    onDelete(item: MOND.MOND_DATA) {
        this.confirmOpened = true;
        this.currentMOND_DATA = item;
    }

    onConfirmDeletion() {
        this.MOND_DATA_Service.delete_MOND_DATAById(this.currentMOND_DATA.MOND_DATAId).subscribe(data => {this.refreshMOND_DATA()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MOND.MOND_DATA) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MOND_DATA_Service.create_MOND_DATA(item)
                        .subscribe(data =>{ this.refreshMOND_DATA()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MOND_DATA_Service.update_MOND_DATA( item)
                        .subscribe(data => {this.refreshMOND_DATA()}, error => { this.ShowError(error.message); });
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
        this.currentMOND_DATA = {} as MOND.MOND_DATA;
    }
}
 
