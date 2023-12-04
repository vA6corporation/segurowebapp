import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CustomersService } from '../customers.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { Subscription } from 'rxjs';
import { CertifiersService } from 'src/app/certifiers/certifiers.service';
import { CertifierModel } from 'src/app/certifiers/certifier.model';

@Component({
  selector: 'app-create-customers',
  templateUrl: './create-customers.component.html',
  styleUrls: ['./create-customers.component.sass']
})
export class CreateCustomersComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly customersService: CustomersService,
    private readonly navigationService: NavigationService,
    private readonly certifiersService: CertifiersService,
    private readonly workersService: WorkersService,
    private readonly router: Router,
  ) { }

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    ruc: [ null, Validators.required ],
    name: [ null, Validators.required ],
    email: [ null, Validators.required ],
    mobileNumber: [ null, Validators.required ],
    address: [ null, Validators.required ],
    workerId: [ null, Validators.required ],
    partnershipName: ''
  });
  public isLoading: boolean = false;
  public workers: WorkerModel[] = [];
  public certifiers: CertifierModel[] = [];

  private handleWorkers$: Subscription = new Subscription();
  private handleCertifiers$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
    this.handleCertifiers$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Nuevo cliente ISO');
    this.navigationService.backTo();

    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.handleCertifiers$ = this.certifiersService.handleCertifiers().subscribe(certifiers => {
      this.certifiers = certifiers;
    });
  }
  
  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      this.customersService.create(this.formGroup.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/customers']);
        this.navigationService.showMessage('Registrado correctamente');
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
