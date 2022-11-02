import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExperienceModelIncome } from '../experience.model';

@Component({
  selector: 'app-dialog-experiences',
  templateUrl: './dialog-experiences.component.html',
  styleUrls: ['./dialog-experiences.component.sass'],
})
export class DialogExperiencesComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogExperiencesComponent>
  ) {}

  public formGroup: FormGroup = this.formBuilder.group({
    object: [null, Validators.required],
    contractor: [null, Validators.required],
    startAt: [null, Validators.required],
    location: [null, Validators.required],
    tenderObjectContract: [null, Validators.required],
    price: [null, Validators.required],
    timeLimit: [null, Validators.required],
    advancePercent: [null, Validators.required],
    isCompleted: false,
    isArbitration: false,
    isOperator: false,
    isConsorcio: false,

    typeWork: null,
    endingDate: null,
    signaturetAt: null,
    faithfulCompliance: null,
    directAdvance: null,
    advanceMaterials: null,
    bondingEntity: null,

    bondedConsortium: null,
    participationConsortium: null,
  });
  incomes: ExperienceModelIncome[] = [];
  incomesYear = '';
  incomesAmount = 0;
  isCheckedConsortium = false;
  ngOnInit(): void {}
  addIncomes() {
    if (this.incomesYear != '' && this.incomesAmount > 0) {
      this.incomes.push({ year: this.incomesYear, amount: this.incomesAmount });
      this.incomesYear = '';
      this.incomesAmount = 0;
    }
  }
  removeIncomes(index: number) {
    this.incomes.splice(index, 1);
  }
  onSubmit() {
    if (this.formGroup.valid) {
      let experiences = this.formGroup.value;
      experiences.income = this.incomes;
      this.dialogRef.close(this.formGroup.value);
    }
  }
}
