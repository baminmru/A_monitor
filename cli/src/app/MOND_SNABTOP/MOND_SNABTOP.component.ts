import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MOND_SNABTOP_Service } from "app/MOND_SNABTOP.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MOND } from "app/MOND";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MOND_SNABTOP',
    styleUrls: ['./MOND_SNABTOP.component.scss'],
    templateUrl: './MOND_SNABTOP.component.html',
})
export class MOND_SNABTOPComponent implements OnInit {

    MOND_SNABTOPArray: Array<MOND.MOND_SNABTOP> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMOND_SNABTOP: MOND.MOND_SNABTOP = {} as MOND.MOND_SNABTOP;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MOND_SNABTOP_Service: MOND_SNABTOP_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMOND_SNABTOP();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
    }

    refreshMOND_SNABTOP() {
		   console.log("refreshing MOND_SNABTOP"); 
        this.MOND_SNABTOP_Service.getAll_MOND_SNABTOPs().subscribe(MOND_SNABTOPArray => { this.MOND_SNABTOPArray = MOND_SNABTOPArray; }, error => { this.ShowError(error.message); })
        this.currentMOND_SNABTOP = {} as MOND.MOND_SNABTOP;
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMOND_SNABTOP();
		return this.MOND_SNABTOPArray ;
	   }

    onSelect(item: MOND.MOND_SNABTOP) {
        this.currentMOND_SNABTOP = item;
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMOND_SNABTOP = {} as MOND.MOND_SNABTOP;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MOND.MOND_SNABTOP) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMOND_SNABTOP = item;
    }

    onDelete(item: MOND.MOND_SNABTOP) {
        this.confirmOpened = true;
        this.currentMOND_SNABTOP = item;
    }

    onConfirmDeletion() {
        this.MOND_SNABTOP_Service.delete_MOND_SNABTOPById(this.currentMOND_SNABTOP.MOND_SNABTOPId).subscribe(data => {this.refreshMOND_SNABTOP()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MOND.MOND_SNABTOP) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MOND_SNABTOP_Service.create_MOND_SNABTOP(item)
                        .subscribe(data =>{ this.refreshMOND_SNABTOP()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MOND_SNABTOP_Service.update_MOND_SNABTOP( item)
                        .subscribe(data => {this.refreshMOND_SNABTOP()}, error => { this.ShowError(error.message); });
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
        this.currentMOND_SNABTOP = {} as MOND.MOND_SNABTOP;
    }
}
 
