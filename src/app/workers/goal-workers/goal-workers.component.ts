import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkersService } from '../workers.service';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-goal-workers',
  templateUrl: './goal-workers.component.html',
  styleUrls: ['./goal-workers.component.sass']
})
export class GoalWorkersComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly workersService: WorkersService,
    private readonly navigationService: NavigationService
  ) { }

  years: number[] = [];
  months: string[] = [
    'Ene', 
    'Feb', 
    'Mar', 
    'Abr', 
    'May', 
    'Jun', 
    'Jul', 
    'Ago', 
    'Sep', 
    'Oct', 
    'Nov', 
    'Dic'
  ];
  formGroup: FormGroup = this.formBuilder.group({
    year: new Date().getFullYear(),
    january: [ null, Validators.required ],
    february: [ null, Validators.required ],
    march: [ null, Validators.required ],
    april: [ null, Validators.required ],
    may: [ null, Validators.required ],
    june: [ null, Validators.required ],
    july: [ null, Validators.required ],
    august: [ null, Validators.required ],
    september: [ null, Validators.required ],
    october: [ null, Validators.required ],
    november: [ null, Validators.required ],
    december: [ null, Validators.required ],
  });

  ngOnInit(): void {
    const startYear = 2020;
    const currentYear = new Date().getFullYear();

    for (let index = startYear; index <= currentYear; index++) {
      this.years.push(index);
    }
    
    const { year } = this.formGroup.value;
    this.navigationService.setTitle('Metas comerciales');
    this.navigationService.backTo();
    this.workersService.getGoalByYear(year).subscribe(goal => {
      console.log(goal);
      this.formGroup.patchValue(goal);
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.workersService.createGoal(this.formGroup.value).subscribe(goal => {
        this.navigationService.showMessage("Se han guardado los cambios");
      });
    }
  }

}
