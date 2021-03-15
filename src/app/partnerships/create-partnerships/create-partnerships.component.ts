import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Customer } from 'src/app/customers/customer.model';
import { DialogCustomersComponent } from 'src/app/dialog-customers/dialog-customers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { PartnershipsService } from '../partnerships.service';

@Component({
  selector: 'app-create-partnerships',
  templateUrl: './create-partnerships.component.html',
  styleUrls: ['./create-partnerships.component.sass']
})
export class CreatePartnershipsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private partnershipsService: PartnershipsService,
    private matSnackBar: MatSnackBar,
    private navigationService: NavigationService,
    private router: Router,
    private matDialog: MatDialog,
  ) {
    this.formGroup = this.formBuilder.group({
      partnership: this.formBuilder.group({
        document: [ null, Validators.required ],
        name: [ null, Validators.required ],
        address: null,
        representative: null,
        representativeDocument: null,
      }),
    });
  }
    
  public formGroup: FormGroup;
  public isLoading: boolean = false;
  public customers: Customer[] = [];
  
  ngOnInit(): void { }

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
      this.navigationService.loadSpinnerStart();
      const { partnership } = this.formGroup.value;
      partnership.customerIds = this.customers.map(e => e._id);
      this.partnershipsService.create(partnership).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.router.navigate(['/partnerships']);
        this.matSnackBar.open('Registrado correctamente', 'Aceptar', {
          duration: 5000,
        });
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000,
        });
      });
    }
  }
}
