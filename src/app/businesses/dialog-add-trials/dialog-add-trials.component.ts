import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-add-trials',
  templateUrl: './dialog-add-trials.component.html',
  styleUrls: ['./dialog-add-trials.component.sass']
})
export class DialogAddTrialsComponent implements OnInit {

  constructor(private readonly formBuilder: UntypedFormBuilder, private readonly dialogRef: MatDialogRef<DialogAddTrialsComponent>) { }
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    reason: [null, Validators.required],
    amount: [null, Validators.required],
    court: [null, Validators.required],
    proceedings: [null, Validators.required],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }
}
