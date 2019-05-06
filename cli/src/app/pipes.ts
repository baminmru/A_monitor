import { Pipe, PipeTransform } from '@angular/core';    

@Pipe({
  name: 'removehtmltag',
})
export class RemoveHTMLtagPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
			
           if(value != undefined && value !=null  ){
			   var v;
			   v=value.toString();
               var result = v.replace(/<\/?[^>]+>/gi, ""); //removing html tag using regex pattern
              return result;
           }
           else{}


  }
}