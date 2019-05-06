import { Component, OnInit ,ViewChild, ElementRef, AfterViewInit} from '@angular/core';
//import * as Q from 'quill';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {

public  aboutText:string;
 constructor() { }
 //@ViewChild('quill_editor') editor: ElementRef;
 
  ngOnInit() {
	   this.aboutText =" <h1>Демонстрационный сайт программы RusExam</h1>  <p>Рады вриветствовать <strong>Вас</strong> на нашем сайте!</p>";
  }
   

  ngAfterViewInit() {
	   //let quill = new Q('#quill_editor', {theme: 'snow'});
		//quill.clipboard.dangerouslyPasteHTML(0,this.aboutText,"api");
  }
  
}
