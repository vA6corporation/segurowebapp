import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-add-access-credit',
  templateUrl: './dialog-add-access-credit.component.html',
  styleUrls: ['./dialog-add-access-credit.component.sass'],
})
export class DialogAddAccessCreditComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogAddAccessCreditComponent>
  ) {}

  public formGroup: FormGroup = this.formBuilder.group({
    insuranceCarrier: [null, Validators.required],
    financialProducts: [null, Validators.required],
    creditLine: [null, Validators.required],
    amount: [null, Validators.required],
    typeGuarantee: [null, Validators.required],
    amountGuarantee: [null, Validators.required],
  });

  ngOnInit(): void {}

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }
}
