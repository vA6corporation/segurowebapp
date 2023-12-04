import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CertifierModel } from 'src/app/certifiers/certifier.model';
import { CertifiersService } from 'src/app/certifiers/certifiers.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-dialog-create-customers',
  templateUrl: './dialog-create-customers.component.html',
  styleUrls: ['./dialog-create-customers.component.sass']
})
export class DialogCreateCustomersComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly customersService: CustomersService,
    private readonly navigationService: NavigationService,
    private readonly certifiersService: CertifiersService,
    private readonly workersService: WorkersService,
    private readonly matDialogRef: MatDialogRef<DialogCreateCustomersComponent>,
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
      this.navigationService.loadBarStart()
      this.customersService.create(this.formGroup.value).subscribe(customer => {
        this.isLoading = false
        this.navigationService.loadBarFinish()
        this.navigationService.showMessage('Registrado correctamente')
        this.matDialogRef.close(customer)
      }, (error: HttpErrorResponse) => {
        this.isLoading = false
        this.navigationService.loadBarFinish()
        this.navigationService.showMessage(error.error.message)
      });
    }
  }

}
