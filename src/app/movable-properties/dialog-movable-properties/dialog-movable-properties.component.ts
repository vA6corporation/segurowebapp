import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-movable-properties',
  templateUrl: './dialog-movable-properties.component.html',
  styleUrls: ['./dialog-movable-properties.component.sass']
})
export class DialogMovablePropertiesComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly dialogRef: MatDialogRef<DialogMovablePropertiesComponent>,
  ) { }

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    description: [ null, Validators.required ],
    modelo: [ null, Validators.required ],
    placa: [ null, Validators.required ],
    serie: [ null, Validators.required ],
    commercialPrice: [ null, Validators.required ],
    encumbrance: [ null, Validators.required ],
    warrantyPrice: null,
    debtPrice: null,
    financier: null,
    isWarranty: false,
    year: null,
    Brand: null,
    Antiquity: null,
    capacity: null,
    location: null,
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

}
