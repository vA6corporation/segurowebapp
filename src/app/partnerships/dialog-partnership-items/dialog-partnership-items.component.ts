import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessModel } from 'src/app/businesses/business.model';

@Component({
  selector: 'app-dialog-partnership-items',
  templateUrl: './dialog-partnership-items.component.html',
  styleUrls: ['./dialog-partnership-items.component.sass']
})
export class DialogPartnershipItemsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly business: BusinessModel,
    private readonly dialogRef: MatDialogRef<DialogPartnershipItemsComponent>,
    private readonly formBuilder: FormBuilder,
  ) { }

  formGroup: FormGroup = this.formBuilder.group({
    percent: [ null, Validators.required ]
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const { percent } = this.formGroup.value;
      this.dialogRef.close({
        business: this.business,
        businessId: this.business._id,
        percent
      });
    }
  }

}
