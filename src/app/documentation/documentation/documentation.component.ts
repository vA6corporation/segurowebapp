import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { DialogComplianceComponent } from 'src/app/compliances/dialog-compliance/dialog-compliance.component';
import { DialogDirectComponent } from 'src/app/directs/dialog-direct/dialog-direct.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { DialogMaterialComponent } from 'src/app/materials/dialog-material/dialog-material.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DocumentationService } from '../documentation.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { buildExcel } from 'src/app/xlsx';
import { GuaranteeTypes } from 'src/app/guaranties/guaranteeTypes.enum';

@Component({
    selector: 'app-documentation',
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.sass']
})
export class DocumentationComponent implements OnInit {

    constructor(
        private readonly navigationService: NavigationService,
        private readonly documentationService: DocumentationService,
        private readonly matDialog: MatDialog,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) { }

    displayedColumns: string[] = [
        'createdAt',
        'policyNumber',
        'invoice',
        'voucher',
        'cheque',
        'deposit',
        'fianza',
        'construction',
        'contract',
        'actions'
    ];
    dataSourceCompliance: any[] = [];
    dataSourceDirect: any[] = [];
    dataSourceMaterial: any[] = [];
    length: number = 100;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 30, 50];
    pageIndex: number = 0;
    directLabel = '';
    materialLabel = '';
    complianceLabel = '';

    private compliances: any[] = [];
    private directs: any[] = [];
    private materials: any[] = [];

    invoice1 = 0;
    voucher1 = 0;
    document1 = 0;
    cheque1 = 0;
    deposit1 = 0;
    fianza1 = 0;
    construction1 = 0;
    contract1 = 0;

    invoice2 = 0;
    voucher2 = 0;
    document2 = 0;
    cheque2 = 0;
    deposit2 = 0;
    fianza2 = 0;
    construction2 = 0;
    contract2 = 0;

    invoice3 = 0;
    voucher3 = 0;
    document3 = 0;
    cheque3 = 0;
    deposit3 = 0;
    fianza3 = 0;
    construction3 = 0;
    contract3 = 0;

    formGroup: UntypedFormGroup = this.formBuilder.group({
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
        isEmition: '',
    });

    financierForm = this.formBuilder.group({
        name: [null, Validators.required],
        _id: [null, Validators.required],
    });

    private handleClickMenu$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleClickMenu$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Fianzas sin documentacion');

        this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
            this.financierForm.patchValue(params);
            this.formGroup.patchValue(params);
            if (params.startDate && params.endDate) {
                this.formGroup.patchValue({
                    startDate: new Date(Number(params.startDate)),
                    endDate: new Date(Number(params.endDate))
                });
            }
            this.fetchData();
        });

        this.navigationService.setMenu([
            // { id: 'search', label: 'search', icon: 'search', show: true },
            { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
        ]);

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
            const wscols = [40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
            let body = [];
            body.push([
                'TIPO',
                'F. REGISTRO',
                'N° DE POLIZA',
                'FACTURA',
                'VOUCHER',
                'CHEQUE',
                'DEPOSITO',
                'FIANZA',
                'E. DE OBRA',
                'C. DE OBRA',
                'EMISION',
                'FINANCIERA'
            ]);
            for (const material of this.materials) {
                body.push([
                    GuaranteeTypes.MATERIAL,
                    formatDate(new Date(material.createdAt), 'dd/MM/yyyy', 'en-US'),
                    material.policyNumber,
                    this.findDocumentation(material, 'invoice') ? 'X' : '',
                    this.findDocumentation(material, 'voucher') ? 'X' : '',
                    this.findDocumentation(material, 'cheque') ? 'X' : '',
                    this.findDocumentation(material, 'deposit') ? 'X' : '',
                    this.findDocumentation(material, 'fianza') ? 'X' : '',
                    this.findConstruction(material, 'construction') ? 'X' : '',
                    this.findContract(material, 'construction') ? 'X' : '',
                    material.isEmition ? 'SI' : 'NO',
                    material.financier?.name
                ]);
            }
            body.push([]);
            for (const compliance of this.compliances) {
                body.push([
                    GuaranteeTypes.COMPLIANCE,
                    formatDate(new Date(compliance.createdAt), 'dd/MM/yyyy', 'en-US'),
                    compliance.policyNumber,
                    this.findDocumentation(compliance, 'invoice') ? 'X' : '',
                    this.findDocumentation(compliance, 'voucher') ? 'X' : '',
                    this.findDocumentation(compliance, 'cheque') ? 'X' : '',
                    this.findDocumentation(compliance, 'deposit') ? 'X' : '',
                    this.findDocumentation(compliance, 'fianza') ? 'X' : '',
                    this.findConstruction(compliance, 'construction') ? 'X' : '',
                    this.findContract(compliance, 'construction') ? 'X' : '',
                    compliance.isEmition ? 'SI' : 'NO',
                    compliance.financier?.name
                ]);
            }
            body.push([]);
            for (const direct of this.directs) {
                body.push([
                    GuaranteeTypes.DIRECT,
                    formatDate(new Date(direct.createdAt), 'dd/MM/yyyy', 'en-US'),
                    direct.policyNumber,
                    this.findDocumentation(direct, 'invoice') ? 'X' : '',
                    this.findDocumentation(direct, 'voucher') ? 'X' : '',
                    this.findDocumentation(direct, 'cheque') ? 'X' : '',
                    this.findDocumentation(direct, 'deposit') ? 'X' : '',
                    this.findDocumentation(direct, 'fianza') ? 'X' : '',
                    this.findConstruction(direct, 'construction') ? 'X' : '',
                    this.findContract(direct, 'construction') ? 'X' : '',
                    direct.isEmition ? 'SI' : 'NO',
                    direct.financier?.name
                ]);
            }
            const name = `FIANZAS_SIN_DOCUMENTACION`;
            buildExcel(body, name, wscols, [], []);
        });
    }

    openDialogFinanciers() {
        const dialogRef = this.matDialog.open(DialogFinanciesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(financier => {
            if (financier) {
                this.financierForm.patchValue(financier);

                const queryParams: Params = financier;

                this.router.navigate([], {
                    relativeTo: this.activatedRoute,
                    queryParams: queryParams,
                    queryParamsHandling: 'merge', // remove to replace all query params by provided
                });

            } else {
                this.financierForm.patchValue({ name: null, _id: null });
            }
            this.fetchData();
        });
    }

    onRangeChange() {

        const { startDate, endDate, isEmition } = this.formGroup.value;

        const queryParams: Params = { pageIndex: 0, isEmition };

        if (startDate && endDate) {
            Object.assign(queryParams, { startDate: startDate.getTime(), endDate: endDate.getTime() });
        }

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        });

        if (this.formGroup.valid) {
            this.dataSourceDirect = this.directs.filter(e => {
                const time = new Date(e.createdAt).getTime();
                if (time > startDate.getTime() && time < endDate.getTime()) {
                    if (isEmition === 'true') {
                        return e.isEmition;
                    } else if (isEmition === 'false') {
                        return !e.isEmition;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            });
            this.dataSourceMaterial = this.materials.filter(e => {
                const time = new Date(e.createdAt).getTime();
                if (time > startDate.getTime() && time < endDate.getTime()) {
                    if (isEmition === 'true') {
                        return e.isEmition;
                    } else if (isEmition === 'false') {
                        return !e.isEmition;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            });
            this.dataSourceCompliance = this.compliances.filter(e => {
                const time = new Date(e.createdAt).getTime();
                if (time > startDate.getTime() && time < endDate.getTime()) {
                    if (isEmition === 'true') {
                        return e.isEmition;
                    } else if (isEmition === 'false') {
                        return !e.isEmition;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            });
        } else {
            if (isEmition === 'true') {
                this.dataSourceCompliance = this.compliances.filter(e => e.isEmition);
                this.dataSourceMaterial = this.materials.filter(e => e.isEmition);
                this.dataSourceDirect = this.directs.filter(e => e.isEmition);
            } else if (isEmition === 'false') {
                this.dataSourceCompliance = this.compliances.filter(e => !e.isEmition);
                this.dataSourceMaterial = this.materials.filter(e => !e.isEmition);
                this.dataSourceDirect = this.directs.filter(e => !e.isEmition);
            } else {
                this.dataSourceCompliance = this.compliances;
                this.dataSourceMaterial = this.materials;
                this.dataSourceDirect = this.directs;
            }
        }
        this.updateTableHead();
    }

    fetchData() {
        this.navigationService.loadBarStart();
        const params = {};
        if (this.financierForm.valid) {
            Object.assign(params, { financierId: this.financierForm.value._id });
        }
        this.documentationService.getGuaranties(params).subscribe(guaranties => {
            this.navigationService.loadBarFinish();
            const { materialsDocumentation, directsDocumentation, compliancesDocumentation } = guaranties;
            this.dataSourceDirect = directsDocumentation;
            this.dataSourceMaterial = materialsDocumentation;
            this.dataSourceCompliance = compliancesDocumentation;

            this.directs = directsDocumentation;
            this.materials = materialsDocumentation;
            this.compliances = compliancesDocumentation;

            this.onRangeChange();
            this.updateTableHead();
        }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(error.error.message);
        });
    }

    updateTableHead() {
        this.invoice1 = 0;
        this.voucher1 = 0;
        this.document1 = 0;
        this.cheque1 = 0;
        this.deposit1 = 0;
        this.fianza1 = 0;
        this.construction1 = 0;
        this.contract1 = 0;

        for (const item of this.dataSourceDirect) {
            if (!item.documentation.find((e: string) => 'invoice' == e)) {
                this.invoice1 += 1;
            }
            if (!item.documentation.find((e: string) => 'voucher' == e)) {
                this.voucher1 += 1;
            }
            if (!item.documentation.find((e: string) => 'document' == e)) {
                this.document1 += 1;
            }
            if (!item.documentation.find((e: string) => 'cheque' == e)) {
                this.cheque1 += 1;
            }
            if (!item.documentation.find((e: string) => 'deposit' == e)) {
                this.deposit1 += 1;
            }
            if (!item.documentation.find((e: string) => 'fianza' == e)) {
                this.fianza1 += 1;
            }
            if (!item.documentation.find((e: string) => 'construction' == e)) {
                if (!item.isEmition) {
                    this.construction1 += 1;
                }
            }
            if (!item.documentation.find((e: string) => 'construction' == e)) {
                if (item.isEmition) {
                    this.contract1 += 1;
                }
            }
        }

        this.invoice2 = 0;
        this.voucher2 = 0;
        this.document2 = 0;
        this.cheque2 = 0;
        this.deposit2 = 0;
        this.fianza2 = 0;
        this.construction2 = 0;
        this.contract2 = 0;

        for (const item of this.dataSourceMaterial) {
            if (!item.documentation.find((e: string) => 'invoice' == e)) {
                this.invoice2 += 1;
            }
            if (!item.documentation.find((e: string) => 'voucher' == e)) {
                this.voucher2 += 1;
            }
            if (!item.documentation.find((e: string) => 'document' == e)) {
                this.document2 += 1;
            }
            if (!item.documentation.find((e: string) => 'cheque' == e)) {
                this.cheque2 += 1;
            }
            if (!item.documentation.find((e: string) => 'deposit' == e)) {
                this.deposit2 += 1;
            }
            if (!item.documentation.find((e: string) => 'fianza' == e)) {
                this.fianza2 += 1;
            }
            if (!item.documentation.find((e: string) => 'construction' == e)) {
                if (!item.isEmition) {
                    this.construction2 += 1;
                }
            }
            if (!item.documentation.find((e: string) => 'construction' == e)) {
                if (item.isEmition) {
                    this.contract2 += 1;
                }
            }
        }

        this.invoice3 = 0;
        this.voucher3 = 0;
        this.document3 = 0;
        this.cheque3 = 0;
        this.deposit3 = 0;
        this.fianza3 = 0;
        this.construction3 = 0;
        this.contract3 = 0;

        for (const item of this.dataSourceCompliance) {
            if (!item.documentation.find((e: string) => 'invoice' == e)) {
                this.invoice3 += 1;
            }
            if (!item.documentation.find((e: string) => 'voucher' == e)) {
                this.voucher3 += 1;
            }
            if (!item.documentation.find((e: string) => 'document' == e)) {
                this.document3 += 1;
            }
            if (!item.documentation.find((e: string) => 'cheque' == e)) {
                this.cheque3 += 1;
            }
            if (!item.documentation.find((e: string) => 'deposit' == e)) {
                this.deposit3 += 1;
            }
            if (!item.documentation.find((e: string) => 'fianza' == e)) {
                this.fianza3 += 1;
            }
            if (!item.documentation.find((e: string) => 'construction' == e)) {
                if (!item.isEmition) {
                    this.construction3 += 1;
                }
            }
            if (!item.documentation.find((e: string) => 'construction' == e)) {
                if (item.isEmition) {
                    this.contract3 += 1;
                }
            }
        }

        this.directLabel = `A. Directo (${this.dataSourceDirect.length})`;
        this.complianceLabel = `F. Cumplimiento (${this.dataSourceCompliance.length})`;
        this.materialLabel = `A. Materiales (${this.dataSourceMaterial.length})`;
    }

    onShowDetails(guarantee: any) {
        switch (guarantee.guaranteeType) {
            case 'GAMF':
                this.matDialog.open(DialogMaterialComponent, {
                    position: { top: '20px' },
                    data: guarantee._id,
                });
                break;
            case 'GADF':
                this.matDialog.open(DialogDirectComponent, {
                    position: { top: '20px' },
                    data: guarantee._id,
                });
                break;
            case 'GFCF':
                this.matDialog.open(DialogComplianceComponent, {
                    position: { top: '20px' },
                    data: guarantee._id,
                });
                break;
        }
    }

    findContract(element: any, type: string) {
        return !element.documentation.find((e: string) => e == type) && element.isEmition;
    }

    findConstruction(element: any, type: string) {
        return !element.documentation.find((e: string) => e == type) && element.isEmition;
    }

    findDocumentation(element: any, type: string) {
        return !element.documentation.find((e: string) => e == type);
    }

    handlePageEvent(event: PageEvent): void {

    }

}
