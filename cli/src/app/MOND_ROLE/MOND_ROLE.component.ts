import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MOND_ROLE_Service } from "app/MOND_ROLE.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MOND } from "app/MOND";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MOND_ROLE',
    styleUrls: ['./MOND_ROLE.component.scss'],
    templateUrl: './MOND_ROLE.component.html',
})
export class MOND_ROLEComponent implements OnInit {

    MOND_ROLEArray: Array<MOND.MOND_ROLE> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMOND_ROLE: MOND.MOND_ROLE = {} as MOND.MOND_ROLE;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';

    constructor( private MOND_ROLE_Service: MOND_ROLE_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
        this.refreshMOND_ROLE();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
    }

    refreshMOND_ROLE() {
		   console.log("refreshing MOND_ROLE"); 
        this.MOND_ROLE_Service.getAll_MOND_ROLEs().subscribe(MOND_ROLEArray => { this.MOND_ROLEArray = MOND_ROLEArray; }, error => { this.ShowError(error.message); })
        this.currentMOND_ROLE = {} as MOND.MOND_ROLE;
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMOND_ROLE();
		return this.MOND_ROLEArray ;
	   }

    onSelect(item: MOND.MOND_ROLE) {
        this.currentMOND_ROLE = item;
    }

    onNew() {
    this.refreshCombo(); 
        this.currentMOND_ROLE = {} as MOND.MOND_ROLE;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
    }

    onEdit(item: MOND.MOND_ROLE) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMOND_ROLE = item;
    }

    onDelete(item: MOND.MOND_ROLE) {
        this.confirmOpened = true;
        this.currentMOND_ROLE = item;
    }

    onConfirmDeletion() {
        this.MOND_ROLE_Service.delete_MOND_ROLEById(this.currentMOND_ROLE.MOND_ROLEId).subscribe(data => {this.refreshMOND_ROLE()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MOND.MOND_ROLE) {
        this.valid=true; 
     if(this.currentMOND_ROLE.Name == undefined || this.currentMOND_ROLE.Name=='') this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MOND_ROLE_Service.create_MOND_ROLE(item)
                        .subscribe(data =>{ this.refreshMOND_ROLE()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MOND_ROLE_Service.update_MOND_ROLE( item)
                        .subscribe(data => {this.refreshMOND_ROLE()}, error => { this.ShowError(error.message); });
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
        this.currentMOND_ROLE = {} as MOND.MOND_ROLE;
    }
}
 
