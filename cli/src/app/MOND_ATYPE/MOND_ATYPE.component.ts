import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MOND_ATYPE_Service } from "app/MOND_ATYPE.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MOND } from "app/MOND";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MOND_ATYPE',
    styleUrls: ['./MOND_ATYPE.component.scss'],
    templateUrl: './MOND_ATYPE.component.html',
})
export class MOND_ATYPEComponent implements OnInit {

    MOND_ATYPEArray: Array<MOND.MOND_ATYPE> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMOND_ATYPE: MOND.MOND_ATYPE = {} as MOND.MOND_ATYPE;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MOND_ATYPE_Service: MOND_ATYPE_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMOND_ATYPE();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
    }

    refreshMOND_ATYPE() {
		   console.log("refreshing MOND_ATYPE"); 
        this.MOND_ATYPE_Service.getAll_MOND_ATYPEs().subscribe(MOND_ATYPEArray => { this.MOND_ATYPEArray = MOND_ATYPEArray; }, error => { this.ShowError(error.message); })
        this.currentMOND_ATYPE = {} as MOND.MOND_ATYPE;
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMOND_ATYPE();
		return this.MOND_ATYPEArray ;
	   }

    onSelect(item: MOND.MOND_ATYPE) {
        this.currentMOND_ATYPE = item;
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMOND_ATYPE = {} as MOND.MOND_ATYPE;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MOND.MOND_ATYPE) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMOND_ATYPE = item;
    }

    onDelete(item: MOND.MOND_ATYPE) {
        this.confirmOpened = true;
        this.currentMOND_ATYPE = item;
    }

    onConfirmDeletion() {
        this.MOND_ATYPE_Service.delete_MOND_ATYPEById(this.currentMOND_ATYPE.MOND_ATYPEId).subscribe(data => {this.refreshMOND_ATYPE()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MOND.MOND_ATYPE) {
        this.valid=true; 
     if(this.currentMOND_ATYPE.TheCode == undefined || this.currentMOND_ATYPE.TheCode=='') this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MOND_ATYPE_Service.create_MOND_ATYPE(item)
                        .subscribe(data =>{ this.refreshMOND_ATYPE()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MOND_ATYPE_Service.update_MOND_ATYPE( item)
                        .subscribe(data => {this.refreshMOND_ATYPE()}, error => { this.ShowError(error.message); });
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
        this.currentMOND_ATYPE = {} as MOND.MOND_ATYPE;
    }
}
 
