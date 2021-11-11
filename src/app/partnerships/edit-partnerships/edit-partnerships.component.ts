import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/customers/customer.model';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { PartnershipsService } from '../partnerships.service';

@Component({
  selector: 'app-edit-partnerships',
  templateUrl: './edit-partnerships.component.html',
  styleUrls: ['./edit-partnerships.component.sass']
})
export class EditPartnershipsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly partnershipsService: PartnershipsService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly route: ActivatedRoute,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    partnership: this.formBuilder.group({
      _id: [ null, Validators.required ],
      document: null,
      name: [ null, Validators.required ],
      address: null,
      customerId: [ null, Validators.required ],
      representative: [ null, Validators.required ],
      representativeDocument: [ null, Validators.required ],
    }),
  });

  public isLoading: boolean = false;
  private partnershipId: string = '';
  public customers: Customer[] = [];
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Editar consorcio');
    this.navigationService.backTo();
    this.route.params.subscribe(params => {
      this.partnershipId = params.partnershipId;
      this.partnershipsService.getPartnershipById(this.partnershipId).subscribe(partnership => {
        console.log(partnership);
        const { customers } = partnership;
        this.customers = customers;
        this.formGroup.patchValue({ partnership });
      });
    });
  }

  openDialogCustomers(): void {
    const dialogRef = this.matDialog.open(DialogCustomersComponent, {
      height: '400px',
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(customer => {
      if (customer) {
        this.customers.push(customer);
      }
    });
  }

  removeCustomer(index: number): void {
    this.customers.splice(index, 1);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { partnership } = this.formGroup.value;
      partnership.customerIds = this.customers.map(e => e._id);
      this.partnershipsService.update(partnership, this.partnershipId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
}
