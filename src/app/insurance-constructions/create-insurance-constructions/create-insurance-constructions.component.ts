import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogInsuranceBusinessesComponent } from 'src/app/insurance-businesses/dialog-insurance-businesses/dialog-insurance-businesses.component';
import { DialogInsurancePartnershipsComponent } from 'src/app/insurance-partnerships/dialog-insurance-partnerships/dialog-insurance-partnerships.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { InsuranceConstructionsService } from '../insurance-constructions.service';

@Component({
    selector: 'app-create-insurance-constructions',
    templateUrl: './create-insurance-constructions.component.html',
    styleUrls: ['./create-insurance-constructions.component.sass']
})
export class CreateInsuranceConstructionsComponent implements OnInit {

    constructor(
        private readonly constructionsService: InsuranceConstructionsService,
        private readonly navigationService: NavigationService,
        private readonly router: Router,
        private readonly matDialog: MatDialog,
    ) { }

    private formBuilder: UntypedFormBuilder = new UntypedFormBuilder();
    isLoading: boolean = false;
    formGroup: UntypedFormGroup = this.formBuilder.group({
        business: this.formBuilder.group({
            name: [null, Validators.required],
            _id: [null, Validators.required],
        }),
        object: [null, Validators.required],
    });

    ngOnInit(): void {
        this.navigationService.setTitle('Nueva obra');
    }

    openDialogBusinesses() {
        const dialogRef = this.matDialog.open(DialogInsuranceBusinessesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(business => {
            if (business) {
                this.formGroup.patchValue({ business });
            }
        });
    }

    openDialogPartnerships() {
        const dialogRef = this.matDialog.open(DialogInsurancePartnershipsComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(partnership => {
            if (partnership) {
                const { business } = partnership;
                this.formGroup.patchValue({ business: business || {} });
                this.formGroup.patchValue({ partnership: partnership || {} });
            }
        });
    }

    async onSubmit() {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            const { business, ...construction } = this.formGroup.value;
            construction.businessId = business._id;
            this.constructionsService.create(construction).subscribe(res => {
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.router.navigate(['/insuranceConstructions']);
                this.navigationService.showMessage('Registrado correctamente');
            }, (error: HttpErrorResponse) => {
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        }
    }
}
