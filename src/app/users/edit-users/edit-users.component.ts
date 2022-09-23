import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.sass']
})
export class EditUsersComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly usersService: UsersService,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly route: ActivatedRoute,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    name: [ null, Validators.required ],
    email: [ null, [ Validators.required, Validators.email ] ],
    password: [ null, Validators.required ],
    isActive: false,
    isAdmin: false,
    allGuaranties: false,
    workerId: ''
  });

  public isLoading: boolean = false;
  public hide: boolean = true;
  public workers: WorkerModel[] = [];
  private userId: string = '';

  private workers$: Subscription = new Subscription();

  ngOnDestroy() {
    this.workers$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Editar usuario');
    this.navigationService.backTo();
    this.route.params.subscribe(async params => {
      this.userId = params.userId;
      this.usersService.getUserById(this.userId).subscribe(user => {
        console.log(user);
        this.formGroup.patchValue(user);
      });
    });

    this.workers$ = this.workersService.getWorkers().subscribe(workers => {
      this.workers = workers;
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
