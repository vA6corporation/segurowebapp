import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { ConstructionsService } from '../constructions.service';
import { DialogAttachPdfComponent } from '../dialog-attach-pdf/dialog-attach-pdf.component';

@Component({
  selector: 'app-edit-constructions',
  templateUrl: './edit-constructions.component.html',
  styleUrls: ['./edit-constructions.component.sass']
})
export class EditConstructionsComponent implements OnInit {

  constructor(
    private readonly constructionsService: ConstructionsService,
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute,
    private readonly workersService: WorkersService,
    private readonly matDialog: MatDialog,
  ) { }
    
  private formBuilder: FormBuilder = new FormBuilder();
  public isLoading: boolean = false;

  public formGroup: FormGroup = this.formBuilder.group({
    partnership: this.formBuilder.group({
      _id: null,
      name: null,
    }),
    customer: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    object: [ null, Validators.required ],
    workerId: null,
    processStatusCode: '01',
    constructionCode: '01',
  });
  private constructionId: string = '';

  public workers: WorkerModel[] = [];

  private workers$: Subscription = new Subscription;

  ngOnDestroy() {
    this.workers$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Editar obra');
    this.navigationService.backTo();

    this.workers$ = this.workersService.getWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.route.params.subscribe(params => {
      this.constructionId = params.constructionId;
      this.constructionsService.getConstructionById(params.constructionId).subscribe(construction => {
        console.log(construction);
        const { partnership, customer, ...value } = construction;
        this.formGroup.patchValue(value);
        this.formGroup.patchValue({ partnership: partnership || {} });
        this.formGroup.patchValue({ customer });
      });
    });
  }
  
  openDialogCustomer() {
    const dialogRef = this.matDialog.open(DialogCustomersComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(customer => {
      if (customer) {
        this.formGroup.patchValue({ customer });
      }
    });
  }

  openDialogPartnerships() {
    const dialogRef = this.matDialog.open(DialogPartnershipsComponent, {
      width: '600px',
      position: { top: '20px' }
    });
    
    dialogRef.afterClosed().subscribe(partnership => {
      if (partnership) {
        const { customer } = partnership;
        this.formGroup.patchValue({ customer: customer || {} });
        this.formGroup.patchValue({ partnership: partnership || {} });
      }
    });
  }

  onAttachPdf() {
    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data: this.constructionId,
    });
  }

  async onSubmit() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { customer, partnership, ...construction } = this.formGroup.value;
      construction.customerId = customer._id;
      construction.partnershipId = partnership._id;
      this.constructionsService.update(construction, this.constructionId).subscribe(res => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        // this.router.navigate(['/constructions']);
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
}
