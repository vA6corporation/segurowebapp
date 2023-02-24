import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExperienceModelIncome } from '../experience.model';

@Component({
  selector: 'app-dialog-experiences',
  templateUrl: './dialog-experiences.component.html',
  styleUrls: ['./dialog-experiences.component.sass'],
})
export class DialogExperiencesComponent implements OnInit {
  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly dialogRef: MatDialogRef<DialogExperiencesComponent>
  ) {}

  public formGroup: UntypedFormGroup = this.formBuilder.group({
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
    nameSuretyEntities: null,
    
    nameConsortium: null,
    bondedConsortium: null,
    participationConsortium: null,
  });
  incomes: ExperienceModelIncome[] = [];
  incomesYear: null|string = null;
  incomesAmount: null|number = null;
  isCheckedConsortium = false;
  isCheckedOthersConsortium = false;
  nameOtherConsortium = '';
  participationOtherConsortium = 0;
  consortium: any[] = [];
  
  ngOnInit(): void {

  }

  addIncomes() {
    if (this.incomesYear && this.incomesAmount) {
      this.incomes.push({ year: this.incomesYear, amount: this.incomesAmount });
      this.incomesYear = null;
      this.incomesAmount = null;
    }
  }

  removeIncomes(index: number) {
    this.incomes.splice(index, 1);
  }
  
  addConsortium() {
    if (this.nameOtherConsortium != '' && this.participationOtherConsortium > 0) {
      this.consortium.push({ name: this.nameOtherConsortium, participation: this.participationOtherConsortium });
      this.nameOtherConsortium = '';
      this.participationOtherConsortium = 0;
    }
  }

  removeConsortium(index: number) {
    this.consortium.splice(index, 1);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      let experiences = this.formGroup.value;
      experiences.income = this.incomes;
      experiences.othersConsortium = this.consortium;
      this.dialogRef.close(this.formGroup.value);
    }
  }
}
