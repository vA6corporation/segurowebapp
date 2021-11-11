import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cheque } from '../cheque.model';

@Component({
  selector: 'app-dialog-cheques',
  templateUrl: './dialog-cheques.component.html',
  styleUrls: ['./dialog-cheques.component.sass']
})
export class DialogChequesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogChequesComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public cheque: Cheque|null,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    _id: null,
    onModel: null,
    isPaid: null,
    guaranteeId: null,
    price: [ null, Validators.required ],
    endDate: [ null, Validators.required ],
    extension: null,
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
