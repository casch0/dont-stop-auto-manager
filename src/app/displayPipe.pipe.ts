import { Pipe, PipeTransform } from '@angular/core';


/*
USE THIS FOR COMPANY NAME DISPLAY
*/


@Pipe({name: 'displayPipe'})
export class DisplayPipe implements PipeTransform {

  transform(value: number): string {
    let newStr: string = "";
    
    switch(value){
        case 1: newStr = "Maintenance"; break;
        case 2: newStr = "Body Repair"; break;
        case 3: newStr = "Mechanical Repair"; break;
        case 4: newStr = "Other"; break;
    }
    return newStr;
  }
}