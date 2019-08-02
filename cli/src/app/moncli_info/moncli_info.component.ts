import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { moncli_info_Service } from "app/moncli_info.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { moncli } from "app/moncli";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-moncli_info',
    styleUrls: ['./moncli_info.component.scss'],
    templateUrl: './moncli_info.component.html',
})
export class moncli_infoComponent implements OnInit {

    moncli_infoArray: Array<moncli.moncli_info> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentmoncli_info: moncli.moncli_info = {} as moncli.moncli_info;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private moncli_info_Service: moncli_info_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshmoncli_info();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
    }

    refreshmoncli_info() {
		   console.log("refreshing moncli_info"); 
        this.moncli_info_Service.getAll_moncli_infos().subscribe(moncli_infoArray => { this.moncli_infoArray = moncli_infoArray; }, error => { this.ShowError(error.message); })
        this.currentmoncli_info = {} as moncli.moncli_info;
        console.log("clear selection for moncli_info on refresh");
        this.AppService.pushSelectedmoncli_info(this.currentmoncli_info);
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshmoncli_info();
		return this.moncli_infoArray ;
	   }

    onSelect(item: moncli.moncli_info) {
        this.currentmoncli_info = item;
        this.AppService.pushSelectedmoncli_info(item);
    }

    onNew() {
    this.refreshCombo(); 
        this.currentmoncli_info = {} as moncli.moncli_info;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: moncli.moncli_info) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentmoncli_info = item;
    }

    onDelete(item: moncli.moncli_info) {
        this.confirmOpened = true;
        this.currentmoncli_info = item;
    }

    onConfirmDeletion() {
        this.moncli_info_Service.delete_moncli_infoById(this.currentmoncli_info.moncli_infoId).subscribe(data => {this.refreshmoncli_info()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: moncli.moncli_info) {
        this.valid=true; 
     if(this.currentmoncli_info.Name == undefined || this.currentmoncli_info.Name=='') this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.moncli_info_Service.create_moncli_info(item)
                        .subscribe(data =>{ this.refreshmoncli_info()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.moncli_info_Service.update_moncli_info( item)
                        .subscribe(data => {this.refreshmoncli_info()}, error => { this.ShowError(error.message); });
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
        this.currentmoncli_info = {} as moncli.moncli_info;
        console.log("clear selection for moncli_info");
        this.AppService.pushSelectedmoncli_info(this.currentmoncli_info);
    }
}
 
