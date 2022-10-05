import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-board-members',
  templateUrl: './dialog-board-members.component.html',
  styleUrls: ['./dialog-board-members.component.sass'],
})
export class DialogBoardMembersComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogBoardMembersComponent>
  ) {}
  public maxlength: number = 11;
  public formGroup: FormGroup = this.formBuilder.group({
    position: [null, Validators.required],
    name: [null, Validators.required],
    typeDocument: [null, Validators.required],
    document: [null, Validators.required],
    birthDate: [null, Validators.required],
    countryOrigin: [null, Validators.required],
    profession: [null, Validators.required],
  });
  ngOnInit(): void {
    this.formGroup.get('documentType')?.valueChanges.subscribe((value) => {
      switch (value) {
        case 'RUC':
          this.formGroup
            .get('documento')
            ?.setValidators([
              Validators.required,
              Validators.minLength(11),
              Validators.maxLength(11),
            ]);
          this.maxlength = 11;
          break;
        case 'DNI':
          this.formGroup
            .get('documento')
            ?.setValidators([
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(8),
            ]);
          this.maxlength = 8;
          break;
      }
      this.formGroup.get('documento')?.updateValueAndValidity();
    });
  }
  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }
}
