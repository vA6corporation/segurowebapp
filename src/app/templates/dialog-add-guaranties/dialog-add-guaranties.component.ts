import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-add-guaranties',
  templateUrl: './dialog-add-guaranties.component.html',
  styleUrls: ['./dialog-add-guaranties.component.sass']
})
export class DialogAddGuarantiesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    private readonly contractMount: number,
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
    this.setPercentage(10);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  setPercentage(percentaje: number) {
    const mount = Number(((percentaje * this.contractMount) / 100).toFixed(2));
    this.formGroup.patchValue({ mount });
  }

}
