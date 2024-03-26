import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipItemsComponent } from '../dialog-partnership-items/dialog-partnership-items.component';
import { PartnershipItemModel } from '../partnership-item.model';
import { PartnershipsService } from '../partnerships.service';

@Component({
    selector: 'app-edit-partnerships',
    templateUrl: './edit-partnerships.component.html',
    styleUrls: ['./edit-partnerships.component.sass']
})
export class EditPartnershipsComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly partnershipsService: PartnershipsService,
        private readonly navigationService: NavigationService,
        private readonly matDialog: MatDialog,
        private readonly activatedRoute: ActivatedRoute,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        _id: [null, Validators.required],
        document: null,
        name: [null, Validators.required],
        address: null,
        constitutedAt: null,
        email: null,
        phoneNumber: null,
        economicActivity: [null, Validators.required],
        representativeNationality: null,
        representativeDocumentType: 'DNI',
        representativeDocument: [null, Validators.required],
        representativeName: [null, Validators.required],
        businessId: null,
    });

    isLoading: boolean = false;
    partnershipItems: PartnershipItemModel[] = [];
    private partnershipId: string = '';

    ngOnInit(): void {
        this.navigationService.setTitle('Editar consorcio');
        this.activatedRoute.params.subscribe(params => {
            this.partnershipId = params.partnershipId;
            this.partnershipsService.getPartnershipById(this.partnershipId).subscribe(partnership => {
                this.partnershipItems = partnership.partnershipItems;
                this.formGroup.patchValue(partnership);
            });
        });
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
        this.partnershipItems.splice(index, 1);
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            this.partnershipsService.update(this.formGroup.value, this.partnershipItems, this.partnershipId).subscribe(res => {
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
