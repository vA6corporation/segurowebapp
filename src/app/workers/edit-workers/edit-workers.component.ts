import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-edit-workers',
  templateUrl: './edit-workers.component.html',
  styleUrls: ['./edit-workers.component.sass']
})
export class EditWorkersComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly workersService: WorkersService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.formGroup = this.formBuilder.group({
      worker: this.formBuilder.group({
        documentType: [ null, Validators.required ],
        document: [ null, Validators.required ],
        name: [ null, Validators.required ],
        email: null,
        mobileNumber: null,
        birthDate: null,
        address: null,    
      }),
    });
  }
    
  public formGroup: FormGroup;
  public isLoading: boolean = false;
  public maxlength: number = 11;
  private workerId: string = '';
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Editar personal');
    this.navigationService.backTo();

    this.route.params.subscribe(params => {
      this.workerId = params.workerId;
      this.workersService.getWorkerById(this.workerId).subscribe(worker => {
        this.formGroup.get('worker')?.patchValue(worker);
      });
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      const { worker } = this.formGroup.value;
      this.workersService.update(worker, this.workerId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.workersService.loadWorkers();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
