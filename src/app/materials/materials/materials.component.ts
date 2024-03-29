import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { GuaranteeModel, GuaranteeStatusTypes } from 'src/app/guaranties/guarantee.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { DialogMaterialComponent } from '../dialog-material/dialog-material.component';
import { MaterialModel } from '../material.model';
import { MaterialsService } from '../materials.service';

@Component({
    selector: 'app-materials',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.sass']
})
export class MaterialsComponent implements OnInit {

    constructor(
        private readonly materialsService: MaterialsService,
        private readonly navigationService: NavigationService,
        private readonly matDialog: MatDialog,
    ) { }

    displayedColumns: string[] = ['partnership', 'business', 'policyNumber', 'startDate', 'endDate', 'price', 'actions'];
    dataSource: MaterialModel[] = [];
    length: number = 100;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 30, 50];
    pageIndex: number = 0;

    private handleSearch$: Subscription = new Subscription()
    private handleClickMenu$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
        this.handleClickMenu$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Adelanto de materiales')

        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true },
            // { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
        ])

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart();
            this.materialsService.getMaterialsByKey(key).subscribe({
                next: materials => {
                    this.navigationService.loadBarFinish();
                    this.dataSource = materials;
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish();
                    this.navigationService.showMessage(error.error.message);
                }
            })
        })

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
            if (id == 'export_excel') {
                const wscols = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
                let body = [];
                body.push([
                    'CONSORCIO',
                    'CLIENTE',
                    'N° POLIZA',
                    'OBJETO',
                    'F. DE INICIO',
                    'F. DE CUMPLIMIENTO',
                    'SUMA ASEGURADA',
                    'PRIMA',
                    'GARANTIA',
                    'COMISION',
                    'ESTADO DE TRAMITE',
                    'ESTADO DE OBRA',
                    'P. A CARGO'
                ])

                const name = `ADELANTO_DE_MATERIALES_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
                buildExcel(body, name, wscols, [], []);
            }
        })

        this.fetchData()
        this.fetchCount()
    }

    onRenewGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.RENEW;
        this.materialsService.update(guarantee, guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Se han guardado los cambios');
        })
    }

    onNotRenewGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.NOT_RENEW;
        this.materialsService.update(guarantee, guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Se han guardado los cambios');
        })
    }

    onFreeGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.FREE;
        this.materialsService.update(guarantee, guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Se han guardado los cambios');
        })
    }

    onNotLookGuarantee(guarantee: GuaranteeModel) {
        guarantee.status = GuaranteeStatusTypes.NOT_LOOK;
        this.materialsService.update(guarantee, guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Se han guardado los cambios');
        })
    }

    handlePageEvent(event: PageEvent): void {
        this.materialsService.getMaterialsByPage(event.pageIndex + 1, event.pageSize).subscribe(materials => {
            this.dataSource = materials;
        });
    }

    sendMail(materialId: string): void {
        this.navigationService.loadBarStart();
        this.materialsService.sendMail(materialId).subscribe(mail => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(`Enviado correctamente a: ${mail.to}`);
        })
    }

    onShowDetails(materialId: string) {
        this.matDialog.open(DialogMaterialComponent, {
            position: { top: '20px' },
            data: materialId,
        })
    }

    onDelete(materialId: string) {
        const ok = confirm('Esta seguro de eliminar?...')
        if (ok) {
            this.materialsService.delete(materialId).subscribe(() => {
                this.navigationService.showMessage('Eliminado correctamente')
                this.fetchData()
            })
        }
    }

    fetchCount() {
        this.materialsService.getCountMaterials().subscribe(count => {
            this.length = count
        })
    }

    fetchData() {
        this.materialsService.getMaterialsByPage(this.pageIndex + 1, this.pageSize).subscribe(materials => {
            this.dataSource = materials
        })
    }
}
