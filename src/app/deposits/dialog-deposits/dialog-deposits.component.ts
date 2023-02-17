import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepositModel } from '../deposit.model';

@Component({
  selector: 'app-dialog-deposits',
  templateUrl: './dialog-deposits.component.html',
  styleUrls: ['./dialog-deposits.component.sass']
})
export class DialogDepositsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public deposit: DepositModel|null,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogDepositsComponent>,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    _id: null,
    price: [ null, Validators.required ],
    currencyCode: 'PEN'
  });

  ngOnInit(): void {
    if (this.deposit) {
      this.formGroup.patchValue(this.deposit)
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

}
