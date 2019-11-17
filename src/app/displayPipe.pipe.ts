import { Pipe, PipeTransform } from '@angular/core';


/*
USE THIS FOR COMPANY NAME DISPLAY
*/


@Pipe({name: 'displayPipe'})
export class DisplayPipe implements PipeTransform {

  transform(value: number): string {
    let newStr: string = "";
    
    switch(value){
        case 1: newStr = "Customer"; break;
        case 2: newStr = "Technician"; break;
    }
    return newStr;
  }
}