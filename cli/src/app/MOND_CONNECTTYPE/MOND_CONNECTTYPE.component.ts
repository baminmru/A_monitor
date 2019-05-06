import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MOND_CONNECTTYPE_Service } from "app/MOND_CONNECTTYPE.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MOND } from "app/MOND";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MOND_CONNECTTYPE',
    styleUrls: ['./MOND_CONNECTTYPE.component.scss'],
    templateUrl: './MOND_CONNECTTYPE.component.html',
})
export class MOND_CONNECTTYPEComponent implements OnInit {

    MOND_CONNECTTYPEArray: Array<MOND.MOND_CONNECTTYPE> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMOND_CONNECTTYPE: MOND.MOND_CONNECTTYPE = {} as MOND.MOND_CONNECTTYPE;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MOND_CONNECTTYPE_Service: MOND_CONNECTTYPE_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMOND_CONNECTTYPE();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
    }

    refreshMOND_CONNECTTYPE() {
		   console.log("refreshing MOND_CONNECTTYPE"); 
        this.MOND_CONNECTTYPE_Service.getAll_MOND_CONNECTTYPEs().subscribe(MOND_CONNECTTYPEArray => { this.MOND_CONNECTTYPEArray = MOND_CONNECTTYPEArray; }, error => { this.ShowError(error.message); })
        this.currentMOND_CONNECTTYPE = {} as MOND.MOND_CONNECTTYPE;
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMOND_CONNECTTYPE();
		return this.MOND_CONNECTTYPEArray ;
	   }

    onSelect(item: MOND.MOND_CONNECTTYPE) {
        this.currentMOND_CONNECTTYPE = item;
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMOND_CONNECTTYPE = {} as MOND.MOND_CONNECTTYPE;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MOND.MOND_CONNECTTYPE) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMOND_CONNECTTYPE = item;
    }

    onDelete(item: MOND.MOND_CONNECTTYPE) {
        this.confirmOpened = true;
        this.currentMOND_CONNECTTYPE = item;
    }

    onConfirmDeletion() {
        this.MOND_CONNECTTYPE_Service.delete_MOND_CONNECTTYPEById(this.currentMOND_CONNECTTYPE.MOND_CONNECTTYPEId).subscribe(data => {this.refreshMOND_CONNECTTYPE()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MOND.MOND_CONNECTTYPE) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MOND_CONNECTTYPE_Service.create_MOND_CONNECTTYPE(item)
                        .subscribe(data =>{ this.refreshMOND_CONNECTTYPE()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MOND_CONNECTTYPE_Service.update_MOND_CONNECTTYPE( item)
                        .subscribe(data => {this.refreshMOND_CONNECTTYPE()}, error => { this.ShowError(error.message); });
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
        this.currentMOND_CONNECTTYPE = {} as MOND.MOND_CONNECTTYPE;
    }
}
 
