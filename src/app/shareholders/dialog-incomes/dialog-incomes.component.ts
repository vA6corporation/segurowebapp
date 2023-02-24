import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-incomes',
  templateUrl: './dialog-incomes.component.html',
  styleUrls: ['./dialog-incomes.component.sass']
})
export class DialogIncomesComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly dialogRef: MatDialogRef<DialogIncomesComponent>
  ) { }

  public formGroup: UntypedFormGroup = this.formBuilder.group({
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
