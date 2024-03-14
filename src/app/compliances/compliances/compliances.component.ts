import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { GuaranteeModel, GuaranteeStatusTypes } from 'src/app/guaranties/guarantee.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ComplianceModel } from '../compliance.model';
import { CompliancesService } from '../compliances.service';
import { DialogComplianceComponent } from '../dialog-compliance/dialog-compliance.component';

@Component({
    selector: 'app-compliances',
    templateUrl: './compliances.component.html',
    styleUrls: ['./compliances.component.sass']
})
export class CompliancesComponent implements OnInit {

    constructor(
        private readonly compliancesService: CompliancesService,
        private readonly navigationService: NavigationService,
        private readonly matDialog: MatDialog,
    ) { }

    displayedColumns: string[] = ['partnership', 'business', 'policyNumber', 'startDate', 'endDate', 'price', 'actions'];
    dataSource: ComplianceModel[] = [];
    length: number = 100;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 30, 50];
    pageIndex: number = 0;

    private handleSearch$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Fiel cumplimiento')

        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true }
        ])

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart();
            this.compliancesService.getCompliancesByKey(key).subscribe({
                next: compliances => {
                    this.navigationService.loadBarFinish();
                    this.dataSource = compliances;
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish();
                    this.navigationService.showMessage(error.error.message);
                }
            })
        })

        this.fetchData()
        this.fetchCount()
    }

    onRenewGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.RENEW;
        this.compliancesService.update(guarantee, guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Se han guardado los cambios')
        })
    }

    onNotRenewGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.NOT_RENEW;
        this.compliancesService.update(guarantee, guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Se han guardado los cambios')
        })
    }

    onFreeGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.FREE;
        this.compliancesService.update(guarantee, guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Se han guardado los cambios')
        })
    }

    onNotLookGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.NOT_LOOK;
        this.compliancesService.update(guarantee, guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Se han guardado los cambios')
        })
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.fetchData()
    }

    sendMail(complianceId: string): void {
        this.navigationService.loadBarStart();
        this.compliancesService.sendMail(complianceId).subscribe(mail => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(`Enviado correctamente a: ${mail.to}`);
        })
    }

    onShowDetails(complianceId: string) {
        this.matDialog.open(DialogComplianceComponent, {
            position: { top: '20px' },
            data: complianceId,
        })
    }

    onDelete(complianceId: string) {
        const ok = confirm('Esta seguro de eliminar?...');
        if (ok) {
            this.compliancesService.delete(complianceId).subscribe(() => {
                this.navigationService.showMessage('Eliminado correctamente');
                this.fetchData()
            })
        }
    }

    fetchCount() {
        this.compliancesService.getCountCompliances().subscribe(count => {
            this.length = count
        })
    }

    fetchData() {
        this.navigationService.loadBarStart()
        this.compliancesService.getCompliancesByPage(this.pageIndex + 1, this.pageSize).subscribe(compliances => {
            this.navigationService.loadBarFinish()
            this.dataSource = compliances
        })
    }

}
