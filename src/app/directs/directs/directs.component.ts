import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogDirectComponent } from '../dialog-direct/dialog-direct.component';
import { DirectModel } from '../direct.model';
import { DirectsService } from '../directs.service';
import { GuaranteeModel, GuaranteeStatusTypes } from 'src/app/guaranties/guarantee.model';

@Component({
    selector: 'app-directs',
    templateUrl: './directs.component.html',
    styleUrls: ['./directs.component.sass']
})
export class DirectsComponent implements OnInit {

    constructor(
        private readonly directsService: DirectsService,
        private readonly navigationService: NavigationService,
        private readonly matDialog: MatDialog,
    ) { }

    displayedColumns: string[] = ['partnership', 'business', 'policyNumber', 'startDate', 'endDate', 'price', 'actions'];
    dataSource: DirectModel[] = [];
    pageSizeOptions: number[] = [10, 30, 50];
    pageSize: number = 10;
    pageIndex: number = 0;
    length: number = 100;

    private handleSearch$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Adelanto directo');
        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true }
        ])

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart()
            this.directsService.getDirectsByKey(key).subscribe({
                next: directs => {
                    this.navigationService.loadBarFinish()
                    this.dataSource = directs
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message);
                }
            })
        })

        this.fetchData()
        this.fetchCount()
    }

    onRenewGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.RENEW;
        this.directsService.update(guarantee, guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Se han guardado los cambios');
        })
    }

    onNotRenewGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.NOT_RENEW;
        this.directsService.update(guarantee, guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Se han guardado los cambios');
        })
    }

    onFreeGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.FREE;
        this.directsService.update(guarantee, guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Se han guardado los cambios');
        })
    }

    onNotLookGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.NOT_LOOK;
        this.directsService.update(guarantee, guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Se han guardado los cambios');
        })
    }

    handlePageEvent(event: PageEvent): void {
        this.directsService.getDirectsByPage(event.pageIndex + 1, event.pageSize).subscribe(materials => {
            this.dataSource = materials;
        })
    }

    sendMail(directId: string): void {
        this.navigationService.loadBarStart();
        this.directsService.sendMail(directId).subscribe(mail => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(`Enviado correctamente a: ${mail.to}`);
        })
    }

    onShowDetails(directId: string) {
        this.matDialog.open(DialogDirectComponent, {
            position: { top: '20px' },
            data: directId,
        });
    }

    fetchCount() {
        this.directsService.getCountDirects().subscribe(count => {
            this.length = count
        })
    }

    fetchData() {
        this.directsService.getDirectsByPage(this.pageIndex + 1, this.pageSize).subscribe(directs => {
            this.dataSource = directs
        })
    }

    onDelete(directId: string) {
        const ok = confirm('Esta seguro de eliminar?...')
        if (ok) {
            this.directsService.delete(directId).subscribe(() => {
                this.navigationService.showMessage('Eliminado correctamente')
                this.fetchData()
            })
        }

    }

}
