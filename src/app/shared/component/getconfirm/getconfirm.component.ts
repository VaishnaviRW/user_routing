
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-getconfirm',
  templateUrl: './getconfirm.component.html',
  styleUrls: ['./getconfirm.component.scss']
})
export class GetconfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<GetconfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onConfirm(): void {
    this.dialogRef.close(true);
  }
onCancel(): void {
    this.dialogRef.close(false);
  }
}
