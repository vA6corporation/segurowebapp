import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BusinessModel } from 'src/app/businesses/business.model';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipItemsComponent } from '../dialog-partnership-items/dialog-partnership-items.component';
import { PartnershipItemModel } from '../partnership-item.model';
import { PartnershipsService } from '../partnerships.service';

@Component({
    selector: 'app-create-partnerships',
    templateUrl: './create-partnerships.component.html',
    styleUrls: ['./create-partnerships.component.sass']
})
export class CreatePartnershipsComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly partnershipsService: PartnershipsService,
        private readonly navigationService: NavigationService,
        private readonly router: Router,
        private readonly matDialog: MatDialog,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        document: null,
        name: [null, Validators.required],
        address: null,
        constitutedAt: null,
        email: null,
        phoneNumber: null,
        economicActivity: [null, Validators.required],
        representativeDocumentType: 'DNI',
        representativeNationality: [null, Validators.required],
        representativeDocument: [null, Validators.required],
        representativeName: [null, Validators.required],
        businessId: null,
    });
    isLoading: boolean = false;
    businesses: BusinessModel[] = [];
    partnershipItems: PartnershipItemModel[] = [];

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo consorcio');
    }

    onDialogBusinesses(): void {
        const dialogRef = this.matDialog.open(DialogBusinessesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(business => {
            if (business) {
                const dialogRef = this.matDialog.open(DialogPartnershipItemsComponent, {
                    width: '600px',
                    position: { top: '20px' },
                    data: business
                });

                dialogRef.afterClosed().subscribe(partnershipItem => {
                    if (partnershipItem) {
                        this.partnershipItems.push(partnershipItem);
                    }
                });
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
            this.partnershipsService.create(this.formGroup.value, this.partnershipItems).subscribe(res => {
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.router.navigate(['/partnerships']);
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
