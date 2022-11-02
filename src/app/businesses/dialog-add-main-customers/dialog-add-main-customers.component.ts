import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-add-main-customers',
  templateUrl: './dialog-add-main-customers.component.html',
  styleUrls: ['./dialog-add-main-customers.component.sass'],
})
export class DialogAddMainCustomersComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogAddMainCustomersComponent>
  ) {}
  d = new Date();
  year = this.d.getFullYear();
  public formGroup: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    document: [null, Validators.required],
    turnBusiness: [null, Validators.required],
    yearOne: [this.year - 1, Validators.required],
    itemOne: [null, Validators.required],
    priceOne: [null, Validators.required],
    shoppingOne: [null, Validators.required],
    yearTwo: [this.year, Validators.required],
    itemTwo: [null, Validators.required],
    priceTwo: [null, Validators.required],
    shoppingTwo: [null, Validators.required],
  });

  ngOnInit(): void {}

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }
}
