import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BusinessModel } from 'src/app/businesses/business.model';
import { DialogInsuranceBusinessesComponent } from 'src/app/insurance-businesses/dialog-insurance-businesses/dialog-insurance-businesses.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { InsurancePartnershipsService } from '../insurance-partnerships.service';

@Component({
    selector: 'app-create-insurance-partnerships',
    templateUrl: './create-insurance-partnerships.component.html',
    styleUrls: ['./create-insurance-partnerships.component.sass']
})
export class CreateInsurancePartnershipsComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly partnershipsService: InsurancePartnershipsService,
        private readonly navigationService: NavigationService,
        private readonly router: Router,
        private readonly matDialog: MatDialog,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        document: null,
        name: [null, Validators.required],
        address: [null],
        representative: [null, Validators.required],
        representativeDocument: [null, Validators.required],
        businessId: [null, Validators.required],
    });
    isLoading: boolean = false;
    businesses: BusinessModel[] = [];

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo consorcio');
        this.navigationService.backTo();
    }

    openDialogBusinesses(): void {
        const dialogRef = this.matDialog.open(DialogInsuranceBusinessesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(business => {
            if (business) {
                this.businesses.push(business);
            }
        });
    }

    removeBusiness(index: number): void {
        this.businesses.splice(index, 1);
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            const partnership = this.formGroup.value;
            partnership.businessIds = this.businesses.map(e => e._id);
            this.partnershipsService.create(partnership).subscribe({
                next: res => {
                    console.log(res);
                    this.isLoading = false;
                    this.navigationService.loadBarFinish();
                    this.router.navigate(['/insurancePartnerships']);
                    this.navigationService.showMessage('Registrado correctamente');
                }, error: (error: HttpErrorResponse) => {
                    console.log(error);
                    this.isLoading = false;
                    this.navigationService.loadBarFinish();
                    this.navigationService.showMessage(error.error.message);
                }
            });
        }
    }

}
