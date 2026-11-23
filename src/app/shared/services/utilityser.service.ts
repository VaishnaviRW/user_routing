import { Injectable } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityserService {

  constructor() { }


  formcontrolpatch(dataArr:Array<any>, formarr:FormArray){
    formarr.clear()
    dataArr.forEach(val => {
      let cntrl=new FormControl(val, Validators.required)
      formarr.push(cntrl)


    })
  }
}
