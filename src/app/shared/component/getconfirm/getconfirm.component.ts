import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-getconfirm',
  templateUrl: './getconfirm.component.html',
  styleUrls: ['./getconfirm.component.scss']
})
export class GetconfirmComponent implements OnInit {
getmsg!:string
  constructor(private _matdailog : MatDialogRef<GetconfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data:string

  ) {this.getmsg=data }

  ngOnInit(): void {
  }

  onclose(flag:boolean){
    this._matdailog.close(flag)
  }
}
