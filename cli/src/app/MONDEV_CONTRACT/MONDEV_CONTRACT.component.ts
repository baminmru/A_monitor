import { Component, OnInit, OnDestroy,  Input, Output, EventEmitter } from "@angular/core";
import { MONDEV_CONTRACT_Service } from "app/MONDEV_CONTRACT.service";
import { AppService } from "app/app.service";
import { Observable, SubscriptionLike as ISubscription} from "rxjs";
import {  Validators } from "@angular/forms";

import { RemoveHTMLtagPipe } from 'app/pipes';
import { MONDEV } from "app/MONDEV";
import * as XLSX from 'xlsx';

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

 exportXSLX(): void {
        var aoa = [];
/* set column headers at first line */
        if(!aoa[0]) aoa[0] = [];
            aoa[0][0]='№ прибора';
            aoa[0][1]='№ключа';
            aoa[0][2]='D20ОБ';
            aoa[0][3]='D20ПР';
            aoa[0][4]='DyГВС';
            aoa[0][5]='DyОБР';
            aoa[0][6]='DyПР';
            aoa[0][7]='dРпрОБ';
            aoa[0][8]='dРпрПР';
            aoa[0][9]='G(гвс)ПР';
            aoa[0][10]='Gгвс';
            aoa[0][11]='Gоб(гвс min)';
            aoa[0][12]='Gов';
            aoa[0][13]='Gпр(гвс min)';
            aoa[0][14]='Gпр_minОБ';
            aoa[0][15]='Gпр_minПР';
            aoa[0][16]='GпрОБ';
            aoa[0][17]='GпрПР';
            aoa[0][18]='Gут';
            aoa[0][19]='д20ОБ';
            aoa[0][20]='д20ПР';
            aoa[0][21]='Договор';
            aoa[0][22]='Договор G2';
            aoa[0][23]='Договор G1';
            aoa[0][24]='Источник';
            aoa[0][25]='Магистраль';
            aoa[0][26]='Расходомер';
            aoa[0][27]='Расходомер ГВС';
            aoa[0][28]='Робр';
            aoa[0][29]='Рпр';
            aoa[0][30]='Способ отбора';
            aoa[0][31]='Т_график';
            aoa[0][32]='Теп_камера';
            aoa[0][33]='Тип расходомера';
            aoa[0][34]='тип термометра';
            aoa[0][35]='Формула';
            aoa[0][36]='Наименование счетчика';
            aoa[0][37]='Схема';
            aoa[0][38]='Qот';
            aoa[0][39]='Qв';
            aoa[0][40]='Qгвс';
            aoa[0][41]='Qну';
            aoa[0][42]='Gот';
            aoa[0][43]='Gв';
            aoa[0][44]='Gну';
            aoa[0][45]='Часов_архив';
            aoa[0][46]='Сут_архив';
            aoa[0][47]='Термопреобр ГВС';
            aoa[0][48]='Т1';
            aoa[0][49]='Т2';
            aoa[0][50]='Т3';
            aoa[0][51]='Т4';
            aoa[0][52]='Gтех';
            aoa[0][53]='Gтех_гвс';
            aoa[0][54]='Gгвс_м';
            aoa[0][55]='Qтех';
            aoa[0][56]='Qвент';
            aoa[0][57]='Тхв';
            aoa[0][58]='Расходомер ГВСц';
            aoa[0][59]='Формула2';
            aoa[0][60]='Термопреобр';
            aoa[0][61]='Gвент';
            aoa[0][62]='Код УУТЭ';
            aoa[0][63]='Сист_теплопотребления';
            aoa[0][64]='Qтех_гвс';
            aoa[0][65]='Qтех_гвс ср';
            aoa[0][66]='Qгвс ср';
            aoa[0][67]='Дата поверки';
            aoa[0][68]='Фамилия';
            aoa[0][69]='Узел учета';
            aoa[0][70]='Стр.адрес';
            aoa[0][71]='G(гвс)ОБР';
            aoa[0][72]='DyГВСц';
            aoa[0][73]='Цена_имп_M1';
            aoa[0][74]='Цена_имп_M2';
            aoa[0][75]='Цена_имп_M1гв';
            aoa[0][76]='Цена_имп_M2гв';
            aoa[0][77]='Доп_погр_изм_M1%';
            aoa[0][78]='Доп_погр_изм_M2%';
            aoa[0][79]='Доп_погр_изм_M1гв%';
            aoa[0][80]='Доп_погр_изм_M2гв%';
            aoa[0][81]='Расходомер M2';
/* fill data to array */
        for(var i = 0; i < this.MONDEV_CONTRACTArray.length; ++i) {
            if(!aoa[i+1]) aoa[i+1] = [];
            aoa[i+1][0]=this.MONDEV_CONTRACTArray[i].FLD12;
            aoa[i+1][1]=this.MONDEV_CONTRACTArray[i].FLD13;
            aoa[i+1][2]=this.MONDEV_CONTRACTArray[i].FLD14;
            aoa[i+1][3]=this.MONDEV_CONTRACTArray[i].FLD15;
            aoa[i+1][4]=this.MONDEV_CONTRACTArray[i].FLD16;
            aoa[i+1][5]=this.MONDEV_CONTRACTArray[i].FLD17;
            aoa[i+1][6]=this.MONDEV_CONTRACTArray[i].FLD18;
            aoa[i+1][7]=this.MONDEV_CONTRACTArray[i].FLD19;
            aoa[i+1][8]=this.MONDEV_CONTRACTArray[i].FLD20;
            aoa[i+1][9]=this.MONDEV_CONTRACTArray[i].FLD21;
            aoa[i+1][10]=this.MONDEV_CONTRACTArray[i].FLD22;
            aoa[i+1][11]=this.MONDEV_CONTRACTArray[i].FLD23;
            aoa[i+1][12]=this.MONDEV_CONTRACTArray[i].FLD24;
            aoa[i+1][13]=this.MONDEV_CONTRACTArray[i].FLD25;
            aoa[i+1][14]=this.MONDEV_CONTRACTArray[i].FLD26;
            aoa[i+1][15]=this.MONDEV_CONTRACTArray[i].FLD27;
            aoa[i+1][16]=this.MONDEV_CONTRACTArray[i].FLD28;
            aoa[i+1][17]=this.MONDEV_CONTRACTArray[i].FLD29;
            aoa[i+1][18]=this.MONDEV_CONTRACTArray[i].FLD30;
            aoa[i+1][19]=this.MONDEV_CONTRACTArray[i].FLD31;
            aoa[i+1][20]=this.MONDEV_CONTRACTArray[i].FLD32;
            aoa[i+1][21]=this.MONDEV_CONTRACTArray[i].FLD33;
            aoa[i+1][22]=this.MONDEV_CONTRACTArray[i].FLD34;
            aoa[i+1][23]=this.MONDEV_CONTRACTArray[i].FLD35;
            aoa[i+1][24]=this.MONDEV_CONTRACTArray[i].FLD36;
            aoa[i+1][25]=this.MONDEV_CONTRACTArray[i].FLD37;
            aoa[i+1][26]=this.MONDEV_CONTRACTArray[i].FLD40;
            aoa[i+1][27]=this.MONDEV_CONTRACTArray[i].FLD41;
            aoa[i+1][28]=this.MONDEV_CONTRACTArray[i].FLD42;
            aoa[i+1][29]=this.MONDEV_CONTRACTArray[i].FLD43;
            aoa[i+1][30]=this.MONDEV_CONTRACTArray[i].FLD45;
            aoa[i+1][31]=this.MONDEV_CONTRACTArray[i].FLD46;
            aoa[i+1][32]=this.MONDEV_CONTRACTArray[i].FLD47;
            aoa[i+1][33]=this.MONDEV_CONTRACTArray[i].FLD48;
            aoa[i+1][34]=this.MONDEV_CONTRACTArray[i].FLD49;
            aoa[i+1][35]=this.MONDEV_CONTRACTArray[i].FLD50;
            aoa[i+1][36]=this.MONDEV_CONTRACTArray[i].FLD51;
            aoa[i+1][37]=this.MONDEV_CONTRACTArray[i].FLD52;
            aoa[i+1][38]=this.MONDEV_CONTRACTArray[i].FLD53;
            aoa[i+1][39]=this.MONDEV_CONTRACTArray[i].FLD54;
            aoa[i+1][40]=this.MONDEV_CONTRACTArray[i].FLD55;
            aoa[i+1][41]=this.MONDEV_CONTRACTArray[i].FLD56;
            aoa[i+1][42]=this.MONDEV_CONTRACTArray[i].FLD57;
            aoa[i+1][43]=this.MONDEV_CONTRACTArray[i].FLD58;
            aoa[i+1][44]=this.MONDEV_CONTRACTArray[i].FLD59;
            aoa[i+1][45]=this.MONDEV_CONTRACTArray[i].FLD60;
            aoa[i+1][46]=this.MONDEV_CONTRACTArray[i].FLD61;
            aoa[i+1][47]=this.MONDEV_CONTRACTArray[i].FLD62;
            aoa[i+1][48]=this.MONDEV_CONTRACTArray[i].FLD63;
            aoa[i+1][49]=this.MONDEV_CONTRACTArray[i].FLD64;
            aoa[i+1][50]=this.MONDEV_CONTRACTArray[i].FLD65;
            aoa[i+1][51]=this.MONDEV_CONTRACTArray[i].FLD66;
            aoa[i+1][52]=this.MONDEV_CONTRACTArray[i].FLD67;
            aoa[i+1][53]=this.MONDEV_CONTRACTArray[i].FLD68;
            aoa[i+1][54]=this.MONDEV_CONTRACTArray[i].FLD69;
            aoa[i+1][55]=this.MONDEV_CONTRACTArray[i].FLD70;
            aoa[i+1][56]=this.MONDEV_CONTRACTArray[i].FLD71;
            aoa[i+1][57]=this.MONDEV_CONTRACTArray[i].FLD72;
            aoa[i+1][58]=this.MONDEV_CONTRACTArray[i].FLD73;
            aoa[i+1][59]=this.MONDEV_CONTRACTArray[i].FLD81;
            aoa[i+1][60]=this.MONDEV_CONTRACTArray[i].FLD82;
            aoa[i+1][61]=this.MONDEV_CONTRACTArray[i].FLD83;
            aoa[i+1][62]=this.MONDEV_CONTRACTArray[i].FLD84;
            aoa[i+1][63]=this.MONDEV_CONTRACTArray[i].FLD85;
            aoa[i+1][64]=this.MONDEV_CONTRACTArray[i].FLD86;
            aoa[i+1][65]=this.MONDEV_CONTRACTArray[i].FLD87;
            aoa[i+1][66]=this.MONDEV_CONTRACTArray[i].FLD88;
            aoa[i+1][67]=this.MONDEV_CONTRACTArray[i].FLD89;
            aoa[i+1][68]=this.MONDEV_CONTRACTArray[i].FLD90;
            aoa[i+1][69]=this.MONDEV_CONTRACTArray[i].FLD92;
            aoa[i+1][70]=this.MONDEV_CONTRACTArray[i].FLD93;
            aoa[i+1][71]=this.MONDEV_CONTRACTArray[i].FLD94;
            aoa[i+1][72]=this.MONDEV_CONTRACTArray[i].FLD95;
            aoa[i+1][73]=this.MONDEV_CONTRACTArray[i].FLD96;
            aoa[i+1][74]=this.MONDEV_CONTRACTArray[i].FLD97;
            aoa[i+1][75]=this.MONDEV_CONTRACTArray[i].FLD98;
            aoa[i+1][76]=this.MONDEV_CONTRACTArray[i].FLD99;
            aoa[i+1][77]=this.MONDEV_CONTRACTArray[i].FLD100;
            aoa[i+1][78]=this.MONDEV_CONTRACTArray[i].FLD101;
            aoa[i+1][79]=this.MONDEV_CONTRACTArray[i].FLD102;
            aoa[i+1][80]=this.MONDEV_CONTRACTArray[i].FLD103;
            aoa[i+1][81]=this.MONDEV_CONTRACTArray[i].FLD104;
        }
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(aoa);

        var wscols = [
            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
,            {wch: 80}
        ];

        ws['!cols'] = wscols;

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MONDEV_CONTRACT');
        

        wb.Props = {
            Title: "Устройство::Договорные установки",
            Subject: "Устройство::Договорные установки",
            Company: "master.bami",
            Category: "Experimentation",
            Keywords: "Export service",
            Author: "master.bami",
	           Manager: "master.bami",
	           Comments: "Raw data export",
	           LastAuthor: "master.bami",
            CreatedDate: new Date(Date.now())
        }

		/* save to file */
		XLSX.writeFile(wb, 'MONDEV_CONTRACT.xlsx');
	}
    backToList() {
        this.opened = false;
        this.confirmOpened = false;
        this.mode = MODE_LIST;
        this.currentMONDEV_CONTRACT = {} as MONDEV.MONDEV_CONTRACT;
    }
}
 
