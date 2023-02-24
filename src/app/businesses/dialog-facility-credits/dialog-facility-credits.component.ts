import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-facility-credits',
  templateUrl: './dialog-facility-credits.component.html',
  styleUrls: ['./dialog-facility-credits.component.sass']
})
export class DialogFacilityCreditsComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly dialogRef: MatDialogRef<DialogFacilityCreditsComponent>
  ) { }

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    financier: [ null, Validators.required ],
    creditNumber: [ null, Validators.required ],
    modality: [ null, Validators.required ],
    creditLine: [ null, Validators.required ],
    guaranteeGranted: [ null, Validators.required ],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

}
