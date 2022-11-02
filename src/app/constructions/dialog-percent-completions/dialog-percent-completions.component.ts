import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChequeModel } from 'src/app/cheques/cheque.model';

export interface DialogPercentCompletionsData {

}

@Component({
  selector: 'app-dialog-percent-completions',
  templateUrl: './dialog-percent-completions.component.html',
  styleUrls: ['./dialog-percent-completions.component.sass']
})
export class DialogPercentCompletionsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public readonly data: ChequeModel|null,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogPercentCompletionsComponent>,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    year: [ new Date().getFullYear(), Validators.required ],
    month: [ new Date().getMonth(), Validators.required ],
    percentProgrammated: null,
    percentCompletion: null,
  });

  ngOnInit(): void {
    // if (this.cheque) {
    //   this.formGroup.patchValue(this.cheque);
    // }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

}
