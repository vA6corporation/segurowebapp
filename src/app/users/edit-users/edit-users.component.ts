import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { UsersService } from '../users.service';
import { OfficesService } from 'src/app/offices/offices.service';
import { OfficeModel } from 'src/app/auth/office.model';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.sass']
})
export class EditUsersComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly usersService: UsersService,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly officesService: OfficesService,
  ) { }

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    name: [ null, Validators.required ],
    email: [ null, [ Validators.required, Validators.email ] ],
    password: [ null, Validators.required ],
    showAllNotifications: false,
    allowChangeWorkerOnBusiness: false,
    allowChangeConstructionCode: false,
    isActive: false,
    isAdmin: false,
    workerId: null,
    assignedOfficeId: null,
  });

  public isLoading: boolean = false;
  public hide: boolean = true;
  public workers: WorkerModel[] = [];
  private userId: string = '';
  public offices: OfficeModel[] = [];

  private handleWorkers$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Editar usuario');
    this.navigationService.backTo();
    this.activatedRoute.params.subscribe(async params => {
      this.userId = params.userId;
      this.usersService.getUserById(this.userId).subscribe(user => {
        console.log(user);
        this.formGroup.patchValue(user);
      });
    });

    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.officesService.getOffices().subscribe(offices => {
      this.offices = offices;
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      this.usersService.update(this.formGroup.value, this.userId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
}
