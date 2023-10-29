import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogAddGuarantiesComponent } from '../dialog-add-guaranties/dialog-add-guaranties.component';
import { GuaranteeModel } from 'src/app/guaranties/guarantee.model';

export interface DialogEditGugaranteeData {
  guarantee: GuaranteeModel,
  contractMount: number
}

@Component({
  selector: 'app-dialog-edit-guaranties',
  templateUrl: './dialog-edit-guaranties.component.html',
  styleUrls: ['./dialog-edit-guaranties.component.sass']
})
export class DialogEditGuarantiesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    private readonly data: DialogEditGugaranteeData,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly dialogRef: MatDialogRef<DialogAddGuarantiesComponent>,
  ) { }

  public typeBail = 'GAMF';
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    guaranteeCode: 'GAMF',
    timeLimit: [ null, Validators.required ],
    mount: [ null, Validators.required ],
    currencyCode: [ null, Validators.required ],
    validSincer: [ null, Validators.required ],
    validUntil: [ null, Validators.required ],
  });

  ngOnInit(): void {
    this.formGroup.patchValue(this.data.guarantee);
    this.setPercentage(10);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  setPercentage(percentaje: number) {
    const mount = Number(((percentaje * this.data.contractMount) / 100).toFixed(2));
    this.formGroup.patchValue({ mount });
  }

}
