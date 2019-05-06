import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MOND_F_Service } from "app/MOND_F.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { moncli } from "app/moncli";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MOND_F',
    styleUrls: ['./MOND_F.component.scss'],
    templateUrl: './MOND_F.component.html',
})
export class MOND_FComponent implements OnInit {

    MOND_FArray: Array<moncli.MOND_F> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMOND_F: moncli.MOND_F = {} as moncli.MOND_F;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MOND_F_Service: MOND_F_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MOND_F"); 
        this.subscription=this.AppService.currentmoncli_info.subscribe(si =>{ this.refreshMOND_F(); }, error => { this.ShowError(error.message); } );
        this.refreshMOND_F();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MOND_F"); 
        this.subscription.unsubscribe();
    }

    refreshMOND_F() {
		let item:moncli.moncli_info;
		item=this.AppService.Lastmoncli_info;
		console.log("refreshing MOND_F"); 
     this.currentMOND_F = {} as moncli.MOND_F;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MOND_F_Service.get_MOND_FByParent('00000000-0000-0000-0000-000000000000').subscribe(MOND_FArray => { this.MOND_FArray = MOND_FArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.moncli_infoId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MOND_F_Service.get_MOND_FByParent('00000000-0000-0000-0000-000000000000').subscribe(MOND_FArray => { this.MOND_FArray = MOND_FArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.moncli_infoId === 'string' ) {
        this.MOND_F_Service.get_MOND_FByParent(item.moncli_infoId).subscribe(MOND_FArray => { this.MOND_FArray = MOND_FArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMOND_F();
		return this.MOND_FArray ;
	   }

    onSelect(item: moncli.MOND_F) {
        this.currentMOND_F = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.Lastmoncli_info.moncli_infoId) === 'string' ) {
        this.currentMOND_F = {} as moncli.MOND_F;
        this.currentMOND_F.moncli_infoId = this.AppService.Lastmoncli_info.moncli_infoId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: moncli.MOND_F) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMOND_F = item;
    }

    onDelete(item: moncli.MOND_F) {
        this.confirmOpened = true;
        this.currentMOND_F = item;
    }

    onConfirmDeletion() {
        this.MOND_F_Service.delete_MOND_FById(this.currentMOND_F.MOND_FId).subscribe(data => {this.refreshMOND_F()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: moncli.MOND_F) {
        this.valid=true; 
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MOND_F_Service.create_MOND_F(item)
                        .subscribe(data =>{ this.refreshMOND_F()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MOND_F_Service.update_MOND_F( item)
                        .subscribe(data => {this.refreshMOND_F()}, error => { this.ShowError(error.message); });
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
        this.currentMOND_F = {} as moncli.MOND_F;
    }
}
 
