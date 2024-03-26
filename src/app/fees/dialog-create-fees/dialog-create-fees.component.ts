import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-dialog-create-fees',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './dialog-create-fees.component.html',
  styleUrl: './dialog-create-fees.component.sass'
})
export class DialogCreateFeesComponent {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly matDialogRef: MatDialogRef<DialogCreateFeesComponent>
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        charge: ['', Validators.required],
        expirationAt: ['', Validators.required]
    })

    onSubmit() {
        if (this.formGroup.valid) {
            this.matDialogRef.close(this.formGroup.value)
        }
    }
}
