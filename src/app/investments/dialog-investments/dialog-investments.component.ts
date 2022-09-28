import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-investments',
  templateUrl: './dialog-investments.component.html',
  styleUrls: ['./dialog-investments.component.sass']
})
export class DialogInvestmentsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogInvestmentsComponent>,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    type: [ null, Validators.required ],
    quantity: [ null, Validators.required ],
    price: [ null, Validators.required ],
    typeAccount: [ null, Validators.required ],
    bankDetail: [ null, Validators.required ],
    gravamen: [ null, Validators.required ],
    comercialPrice: [ null, Validators.required ],
  }); 

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

}
