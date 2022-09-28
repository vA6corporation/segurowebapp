import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-incomes',
  templateUrl: './dialog-incomes.component.html',
  styleUrls: ['./dialog-incomes.component.sass']
})
export class DialogIncomesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogIncomesComponent>
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    description: [ null, Validators.required ],
    amount: [ null, Validators.required ],
    typeIncome: [ null, Validators.required ],
    origin: [ null, Validators.required ],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

}
