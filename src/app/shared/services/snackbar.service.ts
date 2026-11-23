import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _matsnack :MatSnackBar) { }

  opensnackbar(msg:string){
    this._matsnack.open(msg, 'Closed',{
      duration:2000,
      horizontalPosition:'left',
      verticalPosition:'top'
    })
  }
}
