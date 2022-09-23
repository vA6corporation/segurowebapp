import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-experiences',
  templateUrl: './dialog-experiences.component.html',
  styleUrls: ['./dialog-experiences.component.sass']
})
export class DialogExperiencesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogExperiencesComponent>
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    object: [ null, Validators.required ],
    contractor: [ null, Validators.required ],
    startAt: [ null, Validators.required ],
    location: [ null, Validators.required ],
    price: [ null, Validators.required ],
    timeLimit: [ null, Validators.required ],
    advancePercent: [ null, Validators.required ],
    isCompleted: false,
    isArbitration: false,
  });

  ngOnInit(): void {
  
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

}
