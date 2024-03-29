import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-add-account-rotation',
  templateUrl: './dialog-add-account-rotation.component.html',
  styleUrls: ['./dialog-add-account-rotation.component.sass'],
})
export class DialogAddAccountRotationComponent implements OnInit {
  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly dialogRef: MatDialogRef<DialogAddAccountRotationComponent>
  ) {}

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    typeAccount: [null, Validators.required],
    rotation: [null, Validators.required],
  });

  ngOnInit(): void {}

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }
}
