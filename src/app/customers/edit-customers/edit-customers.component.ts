import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../customers.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkersService } from 'src/app/workers/workers.service';
import { ActivatedRoute } from '@angular/router';
import { WorkerModel } from 'src/app/workers/worker.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogBusinessNodeData } from 'src/app/businesses/dialog-node-businesses/dialog-node-businesses.component';
import { CustomerNodeType, DialogCustomerNodeData, DialogNodeCustomersComponent } from '../dialog-node-customers/dialog-node-customers.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-edit-customers',
    templateUrl: './edit-customers.component.html',
    styleUrls: ['./edit-customers.component.sass']
})
export class EditCustomersComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly customersService: CustomersService,
        private readonly navigationService: NavigationService,
        private readonly workersService: WorkersService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly matDialog: MatDialog,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        ruc: [null, Validators.required],
        name: [null, Validators.required],
        email: [null, Validators.required],
        mobileNumber: [null, Validators.required],
        address: [null, Validators.required],
        workerId: [null, Validators.required],
        partnershipName: ''
    });
    isLoading: boolean = false;
    workers: WorkerModel[] = [];
    private customerId: string = '';

    private handleWorkers$: Subscription = new Subscription();
    private params$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleWorkers$.unsubscribe();
        this.params$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Editar cliente');
        this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
            this.workers = workers;
        });

        this.params$ = this.activatedRoute.params.subscribe(params => {
            this.customerId = params['customerId'];
            this.customersService.getCustomerById(this.customerId).subscribe(customer => {
                this.formGroup.patchValue(customer);
            });
        });
    }

    onDialogAttachPdfDocuments() {
        const data: DialogCustomerNodeData = {
            customerId: this.customerId,
            type: CustomerNodeType.DOCUMENT,
        }

        this.matDialog.open(DialogNodeCustomersComponent, {
            width: '80vw',
            height: '90vh',
            position: { top: '20px' },
            data,
        });
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            this.customersService.update(this.formGroup.value, this.customerId).subscribe(res => {
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
