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

    private handleSearch$: Subscription = new Subscription();

    public displayedColumns: string[] = ['partnership', 'business', 'policyNumber', 'startDate', 'endDate', 'price', 'actions'];
    public dataSource: DirectModel[] = [];
    public pageSizeOptions: number[] = [10, 30, 50];
    public pageSize: number = 10;
    public pageIndex: number = 0;
    public length: number = 100;

    ngOnInit(): void {
        this.navigationService.setTitle('Adelanto directo');
        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true }
        ]);

        this.fetchData();
        this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
            this.navigationService.loadBarStart();
            this.directsService.getDirectsByKey(key).subscribe(directs => {
                this.navigationService.loadBarFinish();
                this.dataSource = directs;
            }, (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        });
    }

    async onRenewGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.RENEW;
        this.directsService.update(guarantee, guarantee._id).toPromise();
        this.navigationService.showMessage('Se han guardado los cambios');
    }

    async onNotRenewGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.NOT_RENEW;
        this.directsService.update(guarantee, guarantee._id).toPromise();
        this.navigationService.showMessage('Se han guardado los cambios');
    }

    async onFreeGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.FREE;
        this.directsService.update(guarantee, guarantee._id).toPromise();
        this.navigationService.showMessage('Se han guardado los cambios');
    }

    async onNotLookGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.NOT_LOOK;
        this.directsService.update(guarantee, guarantee._id).toPromise();
        this.navigationService.showMessage('Se han guardado los cambios');
    }

    ngOnDestroy() {
        this.handleSearch$.unsubscribe();
    }

    handlePageEvent(event: PageEvent): void {
        this.directsService.getDirectsByPage(event.pageIndex + 1, event.pageSize).subscribe(materials => {
            this.dataSource = materials;
        });
    }

    sendMail(directId: string): void {
        this.navigationService.loadBarStart();
        this.directsService.sendMail(directId).subscribe(mail => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(`Enviado correctamente a: ${mail.to}`);
        }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(error.error.message);
        });
    }

    onShowDetails(directId: string) {
        this.matDialog.open(DialogDirectComponent, {
            position: { top: '20px' },
            data: directId,
        });
    }

    async fetchData() {
        this.directsService.getDirectsCount().subscribe(count => {
            this.length = count
        })
        
        this.directsService.getDirectsByPage(this.pageIndex + 1, this.pageSize).subscribe(directs => {
            this.dataSource = directs
        })
    }

    async onDelete(directId: string) {
        const ok = confirm('Esta seguro de eliminar?...');
        if (ok) {
            await this.directsService.delete(directId).toPromise();
            this.navigationService.showMessage('Eliminado correctamente');
            this.fetchData();
        }

    }

}
