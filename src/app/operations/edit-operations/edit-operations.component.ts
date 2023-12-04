import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { OperationsService } from '../operations.service';
import { BusinessModel } from 'src/app/businesses/business.model';
import { PartnershipItemModel } from 'src/app/partnerships/partnership-item.model';
import { DialogNodeOperationsComponent } from '../dialog-node-operations/dialog-node-operations.component';
import { BusinessNodeType, DialogBusinessNodeData, DialogNodeBusinessesComponent } from 'src/app/businesses/dialog-node-businesses/dialog-node-businesses.component';

@Component({
    selector: 'app-edit-operations',
    templateUrl: './edit-operations.component.html',
    styleUrls: ['./edit-operations.component.sass']
})
export class EditOperationsComponent implements OnInit {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly operationsService: OperationsService,
        private readonly navigationService: NavigationService,
        private readonly matDialog: MatDialog,
        private readonly activatedRoute: ActivatedRoute,
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
    businesses: BusinessModel[] = [];
    private operationId: string = '';
    private params$: Subscription = new Subscription();

    ngOnDestroy() {
        this.params$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Editar operacion');
        this.navigationService.backTo();

        this.params$ = this.activatedRoute.params.subscribe(params => {
            this.operationId = params['operationId'];
            this.operationsService.getOperationById(this.operationId).subscribe(operation => {
                if (operation.partnership) {
                    this.businesses = operation.partnership.partnershipItems.map(e => e.business);
                } else {
                    this.businesses = [operation.business];
                }
                this.formGroup.patchValue(operation);
            });
        });
    }

    onAttachFile() {
        this.matDialog.open(DialogNodeOperationsComponent, {
            width: '80vw',
            height: '90vh',
            position: { top: '20px' },
            data: this.operationId
        });
    }

    onDialogAttachPdfDocuments(businessId: string) {
        const data: DialogBusinessNodeData = {
            businessId,
            type: BusinessNodeType.DOCUMENT,
        }

        this.matDialog.open(DialogNodeBusinessesComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data,
        });
    }

    onDialogAttachPdfExperiences(businessId: string) {
        const data: DialogBusinessNodeData = {
            businessId: businessId,
            type: BusinessNodeType.EXPERIENCE,
        }

        this.matDialog.open(DialogNodeBusinessesComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data,
        });
    }

    onDialogAttachPdfFinancials(businessId: string) {
        const data: DialogBusinessNodeData = {
            businessId: businessId,
            type: BusinessNodeType.FINANCIAL,
        }

        this.matDialog.open(DialogNodeBusinessesComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data,
        });
    }

    openDialogPartnerships() {
        const dialogRef = this.matDialog.open(DialogPartnershipsComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(partnership => {
            if (partnership) {
                const { business, partnershipItems } = partnership;
                this.businesses = partnershipItems.map((e: PartnershipItemModel) => e.business);
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
                this.businesses = [business];
                this.formGroup.patchValue({ partnership: {} });
                this.formGroup.patchValue({ business });
            }
        });
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            const { business, partnership, ...operation } = this.formGroup.value;
            operation.businessId = business._id;
            operation.partnershipId = partnership._id;
            this.operationsService.update(operation, this.operationId).subscribe(() => {
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
