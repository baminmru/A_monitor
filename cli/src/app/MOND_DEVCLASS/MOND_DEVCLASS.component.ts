import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MOND_DEVCLASS_Service } from "app/MOND_DEVCLASS.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MOND } from "app/MOND";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MOND_DEVCLASS',
    styleUrls: ['./MOND_DEVCLASS.component.scss'],
    templateUrl: './MOND_DEVCLASS.component.html',
})
export class MOND_DEVCLASSComponent implements OnInit {

    MOND_DEVCLASSArray: Array<MOND.MOND_DEVCLASS> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMOND_DEVCLASS: MOND.MOND_DEVCLASS = {} as MOND.MOND_DEVCLASS;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MOND_DEVCLASS_Service: MOND_DEVCLASS_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMOND_DEVCLASS();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
    }

    refreshMOND_DEVCLASS() {
		   console.log("refreshing MOND_DEVCLASS"); 
        this.MOND_DEVCLASS_Service.getAll_MOND_DEVCLASSs().subscribe(MOND_DEVCLASSArray => { this.MOND_DEVCLASSArray = MOND_DEVCLASSArray; }, error => { this.ShowError(error.message); })
        this.currentMOND_DEVCLASS = {} as MOND.MOND_DEVCLASS;
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMOND_DEVCLASS();
		return this.MOND_DEVCLASSArray ;
	   }

    onSelect(item: MOND.MOND_DEVCLASS) {
        this.currentMOND_DEVCLASS = item;
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMOND_DEVCLASS = {} as MOND.MOND_DEVCLASS;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MOND.MOND_DEVCLASS) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMOND_DEVCLASS = item;
    }

    onDelete(item: MOND.MOND_DEVCLASS) {
        this.confirmOpened = true;
        this.currentMOND_DEVCLASS = item;
    }

    onConfirmDeletion() {
        this.MOND_DEVCLASS_Service.delete_MOND_DEVCLASSById(this.currentMOND_DEVCLASS.MOND_DEVCLASSId).subscribe(data => {this.refreshMOND_DEVCLASS()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MOND.MOND_DEVCLASS) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MOND_DEVCLASS_Service.create_MOND_DEVCLASS(item)
                        .subscribe(data =>{ this.refreshMOND_DEVCLASS()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MOND_DEVCLASS_Service.update_MOND_DEVCLASS( item)
                        .subscribe(data => {this.refreshMOND_DEVCLASS()}, error => { this.ShowError(error.message); });
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
        this.currentMOND_DEVCLASS = {} as MOND.MOND_DEVCLASS;
    }
}
 
