import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChequeModel } from '../cheque.model';

@Component({
  selector: 'app-dialog-cheques',
  templateUrl: './dialog-cheques.component.html',
  styleUrls: ['./dialog-cheques.component.sass']
})
export class DialogChequesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public readonly cheque: ChequeModel|null,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogChequesComponent>,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    price: [ null, Validators.required ],
    paymentAt: [ null, Validators.required ],
    currencyCode: 'PEN',
    extensionAt: null,
    observations: null,
  });

  ngOnInit(): void {
    if (this.cheque) {
      this.formGroup.patchValue(this.cheque);
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

}
