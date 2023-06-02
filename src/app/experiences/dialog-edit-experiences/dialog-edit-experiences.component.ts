import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExperienceModel, ExperienceModelIncome } from '../experience.model';

@Component({
  selector: 'app-dialog-edit-experiences',
  templateUrl: './dialog-edit-experiences.component.html',
  styleUrls: ['./dialog-edit-experiences.component.sass']
})
export class DialogEditExperiencesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly experience: ExperienceModel,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly dialogRef: MatDialogRef<DialogEditExperiencesComponent>
  ) { }

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    contractor: [ this.experience.contractor, Validators.required ],
    startAt: [ new Date(this.experience.startAt), Validators.required],
    location: [ this.experience.location, Validators.required ],
    tenderObjectContract: [ this.experience.tenderObjectContract, Validators.required ],
    price: [ this.experience.price, Validators.required ],
    timeLimit: [ this.experience.timeLimit, Validators.required ],
    advancePercent: [ this.experience.advancePercent, Validators.required ],
    isCompleted: this.experience.isCompleted,
    isArbitration: this.experience.isArbitration,
    isOperator: this.experience.isOperation,
    isConsorcio: this.experience.isConsorcio,
    isCommonRepresentative: this.experience.isCommonRepresentative,

    typeWork: this.experience.typeWork,
    endingDate: this.experience.endingDate,
    signaturetAt: this.experience.signaturetAt,
    faithfulCompliance: this.experience.faithfulCompliance,
    directAdvance: this.experience.directAdvance,
    advanceMaterials: this.experience.advanceMaterials,
    bondingEntity: this.experience.bondingEntity,
    nameSuretyEntities: this.experience.nameSuretyEntities,
    
    nameConsortium: this.experience.nameConsortium,
    bondedConsortium: this.experience.bondedConsortium,
    participationConsortium: this.experience.participationConsortium,
  });

  incomes: ExperienceModelIncome[] = [];
  incomesYear: null|string = null;
  incomesAmount: null|number = null;
  isCheckedConsortium = false;
  isCheckedOthersConsortium = false;
  nameOtherConsortium = null;
  participationOtherConsortium = null;
  consortium: any[] = [];
  
  ngOnInit(): void {
    this.incomes = this.experience.incomes;
    this.consortium = this.experience.othersConsortium;
    if (this.experience.nameConsortium) {
      this.isCheckedConsortium = true;
    }

    if (this.experience.othersConsortium.length) {
      this.isCheckedOthersConsortium = true;
    }
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
    if (this.nameOtherConsortium && this.participationOtherConsortium) {
      this.consortium.push({ name: this.nameOtherConsortium, participation: this.participationOtherConsortium });
      this.nameOtherConsortium = null;
      this.participationOtherConsortium = null;
    }
  }

  removeConsortium(index: number) {
    this.consortium.splice(index, 1);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      let experiences = this.formGroup.value;
      experiences.incomes = this.incomes;
      experiences.othersConsortium = this.consortium;
      this.dialogRef.close(this.formGroup.value);
    }
  }

}
