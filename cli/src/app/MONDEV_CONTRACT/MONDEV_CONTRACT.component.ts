import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONDEV_CONTRACT_Service } from "app/MONDEV_CONTRACT.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONDEV } from "app/MONDEV";


const MODE_LIST = 0;
const MODE_NEW = 1;
const MODE_EDIT = 2;

@Component({
	   selector: 'app-MONDEV_CONTRACT',
    styleUrls: ['./MONDEV_CONTRACT.component.scss'],
    templateUrl: './MONDEV_CONTRACT.component.html',
})
export class MONDEV_CONTRACTComponent implements OnInit {

    MONDEV_CONTRACTArray: Array<MONDEV.MONDEV_CONTRACT> = [];
    opened: boolean = false;
    confirmOpened: boolean = false;
    mode: Number = MODE_LIST;
    currentMONDEV_CONTRACT: MONDEV.MONDEV_CONTRACT = {} as MONDEV.MONDEV_CONTRACT;
    formMsg: string = '';
    valid:boolean=true;
    errorFlag:boolean=false;
    errorMessage:string='';
   subscription:ISubscription;

    constructor( private MONDEV_CONTRACT_Service: MONDEV_CONTRACT_Service,  public AppService:AppService ) {
    }

    ngOnInit() {
		   console.log("Subscribe MONDEV_CONTRACT"); 
        this.subscription=this.AppService.currentMONDEV_BDEVICES.subscribe(si =>{ this.refreshMONDEV_CONTRACT(); }, error => { this.ShowError(error.message); } );
        this.refreshMONDEV_CONTRACT();
    }
    refreshCombo() {
    }
    ngOnDestroy() {
		   console.log("Unsubscribe MONDEV_CONTRACT"); 
        this.subscription.unsubscribe();
    }

    refreshMONDEV_CONTRACT() {
		let item:MONDEV.MONDEV_BDEVICES;
		item=this.AppService.LastMONDEV_BDEVICES;
		console.log("refreshing MONDEV_CONTRACT"); 
     this.currentMONDEV_CONTRACT = {} as MONDEV.MONDEV_CONTRACT;
		if(typeof item === 'undefined') { 
		   //console.log("no parent item for refresh"); 
        this.MONDEV_CONTRACT_Service.get_MONDEV_CONTRACTByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_CONTRACTArray => { this.MONDEV_CONTRACTArray = MONDEV_CONTRACTArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId==='undefined') { 
		   //console.log("no parent id for refresh"); 
        this.MONDEV_CONTRACT_Service.get_MONDEV_CONTRACTByParent('00000000-0000-0000-0000-000000000000').subscribe(MONDEV_CONTRACTArray => { this.MONDEV_CONTRACTArray = MONDEV_CONTRACTArray; }, error => { this.ShowError(error.message); })
			return; 
		} 
		if(typeof item.MONDEV_BDEVICESId === 'string' ) {
        this.MONDEV_CONTRACT_Service.get_MONDEV_CONTRACTByParent(item.MONDEV_BDEVICESId).subscribe(MONDEV_CONTRACTArray => { this.MONDEV_CONTRACTArray = MONDEV_CONTRACTArray; }, error => { this.ShowError(error.message); })
      }
    }

	   ShowError(message:string){
		this.errorMessage=message; ;
		this.errorFlag=true;
	   }

	   getData(){
		this.refreshMONDEV_CONTRACT();
		return this.MONDEV_CONTRACTArray ;
	   }

    onSelect(item: MONDEV.MONDEV_CONTRACT) {
        this.currentMONDEV_CONTRACT = item;
    }

    onNew() {
    this.refreshCombo(); 
      if(typeof ( this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId) === 'string' ) {
        this.currentMONDEV_CONTRACT = {} as MONDEV.MONDEV_CONTRACT;
        this.currentMONDEV_CONTRACT.MONDEV_BDEVICESId = this.AppService.LastMONDEV_BDEVICES.MONDEV_BDEVICESId;
        this.opened = true;
        this.mode = MODE_NEW;
        this.formMsg = 'Создать: ';
      }
    }

    onEdit(item: MONDEV.MONDEV_CONTRACT) {
    this.refreshCombo(); 
        this.opened = true;
        this.formMsg = 'Изменить: ';
        this.mode = MODE_EDIT;
        this.currentMONDEV_CONTRACT = item;
    }

    onDelete(item: MONDEV.MONDEV_CONTRACT) {
        this.confirmOpened = true;
        this.currentMONDEV_CONTRACT = item;
    }

    onConfirmDeletion() {
        this.MONDEV_CONTRACT_Service.delete_MONDEV_CONTRACTById(this.currentMONDEV_CONTRACT.MONDEV_CONTRACTId).subscribe(data => {this.refreshMONDEV_CONTRACT()}, error => { this.ShowError(error.message); });
        this.backToList();
    }

    save(item: MONDEV.MONDEV_CONTRACT) {
        this.valid=true; 
     if(this.currentMONDEV_CONTRACT.FLD12 == undefined || this.currentMONDEV_CONTRACT.FLD12=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD13 == undefined || this.currentMONDEV_CONTRACT.FLD13=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD14 == undefined || this.currentMONDEV_CONTRACT.FLD14=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD15 == undefined || this.currentMONDEV_CONTRACT.FLD15=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD16 == undefined || this.currentMONDEV_CONTRACT.FLD16=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD17 == undefined || this.currentMONDEV_CONTRACT.FLD17=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD18 == undefined || this.currentMONDEV_CONTRACT.FLD18=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD19 == undefined || this.currentMONDEV_CONTRACT.FLD19=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD20 == undefined || this.currentMONDEV_CONTRACT.FLD20=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD21 == undefined || this.currentMONDEV_CONTRACT.FLD21=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD22 == undefined || this.currentMONDEV_CONTRACT.FLD22=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD23 == undefined || this.currentMONDEV_CONTRACT.FLD23=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD24 == undefined || this.currentMONDEV_CONTRACT.FLD24=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD25 == undefined || this.currentMONDEV_CONTRACT.FLD25=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD26 == undefined || this.currentMONDEV_CONTRACT.FLD26=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD27 == undefined || this.currentMONDEV_CONTRACT.FLD27=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD28 == undefined || this.currentMONDEV_CONTRACT.FLD28=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD29 == undefined || this.currentMONDEV_CONTRACT.FLD29=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD30 == undefined || this.currentMONDEV_CONTRACT.FLD30=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD31 == undefined || this.currentMONDEV_CONTRACT.FLD31=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD32 == undefined || this.currentMONDEV_CONTRACT.FLD32=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD33 == undefined || this.currentMONDEV_CONTRACT.FLD33=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD34 == undefined || this.currentMONDEV_CONTRACT.FLD34=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD35 == undefined || this.currentMONDEV_CONTRACT.FLD35=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD36 == undefined || this.currentMONDEV_CONTRACT.FLD36=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD37 == undefined || this.currentMONDEV_CONTRACT.FLD37=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD40 == undefined || this.currentMONDEV_CONTRACT.FLD40=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD41 == undefined || this.currentMONDEV_CONTRACT.FLD41=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD42 == undefined || this.currentMONDEV_CONTRACT.FLD42=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD43 == undefined || this.currentMONDEV_CONTRACT.FLD43=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD45 == undefined || this.currentMONDEV_CONTRACT.FLD45=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD46 == undefined || this.currentMONDEV_CONTRACT.FLD46=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD47 == undefined || this.currentMONDEV_CONTRACT.FLD47=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD48 == undefined || this.currentMONDEV_CONTRACT.FLD48=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD49 == undefined || this.currentMONDEV_CONTRACT.FLD49=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD50 == undefined || this.currentMONDEV_CONTRACT.FLD50=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD51 == undefined || this.currentMONDEV_CONTRACT.FLD51=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD52 == undefined || this.currentMONDEV_CONTRACT.FLD52=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD53 == undefined || this.currentMONDEV_CONTRACT.FLD53=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD54 == undefined || this.currentMONDEV_CONTRACT.FLD54=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD55 == undefined || this.currentMONDEV_CONTRACT.FLD55=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD56 == undefined || this.currentMONDEV_CONTRACT.FLD56=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD57 == undefined || this.currentMONDEV_CONTRACT.FLD57=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD58 == undefined || this.currentMONDEV_CONTRACT.FLD58=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD59 == undefined || this.currentMONDEV_CONTRACT.FLD59=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD60 == undefined || this.currentMONDEV_CONTRACT.FLD60=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD61 == undefined || this.currentMONDEV_CONTRACT.FLD61=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD62 == undefined || this.currentMONDEV_CONTRACT.FLD62=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD63 == undefined || this.currentMONDEV_CONTRACT.FLD63=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD64 == undefined || this.currentMONDEV_CONTRACT.FLD64=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD65 == undefined || this.currentMONDEV_CONTRACT.FLD65=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD66 == undefined || this.currentMONDEV_CONTRACT.FLD66=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD67 == undefined || this.currentMONDEV_CONTRACT.FLD67=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD68 == undefined || this.currentMONDEV_CONTRACT.FLD68=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD69 == undefined || this.currentMONDEV_CONTRACT.FLD69=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD70 == undefined || this.currentMONDEV_CONTRACT.FLD70=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD71 == undefined || this.currentMONDEV_CONTRACT.FLD71=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD72 == undefined || this.currentMONDEV_CONTRACT.FLD72=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD73 == undefined || this.currentMONDEV_CONTRACT.FLD73=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD81 == undefined || this.currentMONDEV_CONTRACT.FLD81=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD82 == undefined || this.currentMONDEV_CONTRACT.FLD82=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD83 == undefined || this.currentMONDEV_CONTRACT.FLD83=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD84 == undefined || this.currentMONDEV_CONTRACT.FLD84=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD85 == undefined || this.currentMONDEV_CONTRACT.FLD85=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD86 == undefined || this.currentMONDEV_CONTRACT.FLD86=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD87 == undefined || this.currentMONDEV_CONTRACT.FLD87=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD88 == undefined || this.currentMONDEV_CONTRACT.FLD88=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD89 == undefined || this.currentMONDEV_CONTRACT.FLD89=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD90 == undefined || this.currentMONDEV_CONTRACT.FLD90=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD92 == undefined || this.currentMONDEV_CONTRACT.FLD92=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD93 == undefined || this.currentMONDEV_CONTRACT.FLD93=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD94 == undefined || this.currentMONDEV_CONTRACT.FLD94=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD95 == undefined || this.currentMONDEV_CONTRACT.FLD95=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD96 == undefined || this.currentMONDEV_CONTRACT.FLD96=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD97 == undefined || this.currentMONDEV_CONTRACT.FLD97=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD98 == undefined || this.currentMONDEV_CONTRACT.FLD98=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD99 == undefined || this.currentMONDEV_CONTRACT.FLD99=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD100 == undefined || this.currentMONDEV_CONTRACT.FLD100=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD101 == undefined || this.currentMONDEV_CONTRACT.FLD101=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD102 == undefined || this.currentMONDEV_CONTRACT.FLD102=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD103 == undefined || this.currentMONDEV_CONTRACT.FLD103=='') this.valid=false;
     if(this.currentMONDEV_CONTRACT.FLD104 == undefined || this.currentMONDEV_CONTRACT.FLD104=='') this.valid=false;
        if (this.valid) {
            switch (this.mode) {
                case MODE_NEW: {
                    this.MONDEV_CONTRACT_Service.create_MONDEV_CONTRACT(item)
                        .subscribe(data =>{ this.refreshMONDEV_CONTRACT()}, error => { this.ShowError(error.message); });
                    break;
                }
                case MODE_EDIT: {
                    this.MONDEV_CONTRACT_Service.update_MONDEV_CONTRACT( item)
                        .subscribe(data => {this.refreshMONDEV_CONTRACT()}, error => { this.ShowError(error.message); });
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
        this.currentMONDEV_CONTRACT = {} as MONDEV.MONDEV_CONTRACT;
    }
}
 
