import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { OperationsService } from '../operations.service';

@Component({
    selector: 'app-create-operations',
    templateUrl: './create-operations.component.html',
    styleUrls: ['./create-operations.component.sass']
})
export class CreateOperationsComponent implements OnInit {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly operationsService: OperationsService,
        private readonly navigationService: NavigationService,
        private readonly router: Router,
        private readonly matDialog: MatDialog
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        name: [null, Validators.required],
        partnership: this.formBuilder.group({
            _id: null,
            name: null,
        }),
        business: this.formBuilder.group({
            name: [null, Validators.required],
            _id: [null, Validators.required],
        }),
    });
    isLoading: boolean = false;
    hide: boolean = true;

    ngOnInit(): void {
        this.navigationService.setTitle('Nueva operacion');
    }

    onAttachFile() {
        // const dialogRef = this.matDialog.open(DialogAttachFileComponent, {
        //   width: '80vw',
        //   height: '90vh',
        //   position: { top: '20px' },
        //   // position: { top: '20px' },
        //   data: this.paymentOrderId
        // });

        // dialogRef.componentInstance.handleChangePdf().subscribe(() => {
        //   this.fetchData();
        // });
    }

    openDialogPartnerships() {
        const dialogRef = this.matDialog.open(DialogPartnershipsComponent, {
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

    openDialogBusinesses() {
        const dialogRef = this.matDialog.open(DialogBusinessesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(business => {
            if (business) {
                this.formGroup.patchValue({ business });
            }
        });
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            const { partnership, business, ...operation } = this.formGroup.value;
            operation.partnershipId = partnership._id;
            operation.businessId = business._id;
            this.operationsService.create(operation).subscribe(res => {
                console.log(res);
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.router.navigate(['/operations']);
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
