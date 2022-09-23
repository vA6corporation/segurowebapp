import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-properties',
  templateUrl: './dialog-properties.component.html',
  styleUrls: ['./dialog-properties.component.sass']
})
export class DialogPropertiesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogPropertiesComponent>
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    description: [ null, Validators.required ],
    location: [ null, Validators.required ],
    landArea: [ null, Validators.required ],
    constructionArea: [ null, Validators.required ],
    commercialPrice: [ null, Validators.required ],
    mortgagePrice: null,
    debt: null,
    financier: null,
    inscription: [ null, Validators.required ],
    purchaseAt: [ null, Validators.required ],
    encumbrance: null,
    isMortgage: false,
    isFamiliarPatrimony: false
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

}
