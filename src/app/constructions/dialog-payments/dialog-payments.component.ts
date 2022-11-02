import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChequeModel } from 'src/app/cheques/cheque.model';

@Component({
  selector: 'app-dialog-payments',
  templateUrl: './dialog-payments.component.html',
  styleUrls: ['./dialog-payments.component.sass']
})
export class DialogPaymentsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public readonly data: ChequeModel|null,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogPaymentsComponent>,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    charge: [ null, Validators.required ],
    paymentAt: [ new Date(), Validators.required ],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

}
