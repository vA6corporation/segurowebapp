import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs/operators';
// import { Params } from '@angular/router';
import { DialogComplianceComponent } from 'src/app/compliances/dialog-compliance/dialog-compliance.component';
import { DialogDirectComponent } from 'src/app/directs/dialog-direct/dialog-direct.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { DialogMaterialComponent } from 'src/app/materials/dialog-material/dialog-material.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DocumentationService } from '../documentation.service';

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
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }
    
  public displayedColumns: string[] = [
    'createdAt',
    'policyNumber', 
    'invoice', 
    'voucher', 
    // 'document', 
    'cheque', 
    'deposit', 
    'fianza', 
    'construction', 
    'contract',
    'actions'
  ];
  public dataSourceCompliance: any[] = [];
  public dataSourceDirect: any[] = [];
  public dataSourceMaterial: any[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public directLabel = '';
  public materialLabel = '';
  public complianceLabel = '';

  private compliances: any[] = [];
  private directs: any[] = [];
  private materials: any[] = [];

  public invoice1 = 0;
  public voucher1 = 0;
  public document1 = 0;
  public cheque1 = 0;
  public deposit1 = 0;
  public fianza1 = 0;
  public construction1 = 0;
  public contract1 = 0;

  public invoice2 = 0;
  public voucher2 = 0;
  public document2 = 0;
  public cheque2 = 0;
  public deposit2 = 0;
  public fianza2 = 0;
  public construction2 = 0;
  public contract2 = 0;

  public invoice3 = 0;
  public voucher3 = 0;
  public document3 = 0;
  public cheque3 = 0;
  public deposit3 = 0;
  public fianza3 = 0;
  public construction3 = 0;
  public contract3 = 0;

  public formGroup: FormGroup = this.formBuilder.group({
    startDate: [ null, Validators.required ],
    endDate: [ null, Validators.required ],
    isEmition: '',
  });

  public financierForm = this.formBuilder.group({
    name: [ null, Validators.required ],
    _id: [ null, Validators.required ],
  });

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
        if(time > startDate.getTime() && time < endDate.getTime()) {
          if (isEmition === 'true') {
            return e.isEmition;
          } else if(isEmition === 'false') {
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
        if(time > startDate.getTime() && time < endDate.getTime()) {
          if (isEmition === 'true') {
            return e.isEmition;
          } else if(isEmition === 'false') {
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
        if(time > startDate.getTime() && time < endDate.getTime()) {
          if (isEmition === 'true') {
            return e.isEmition;
          } else if(isEmition === 'false') {
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
      } else if(isEmition === 'false') {
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
    
  ngOnInit(): void {
    this.navigationService.setTitle('Documentacion faltante');
    
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
      if (!item.documentation.find((e: string) => 'construction' == e) ) {
        if (!item.isEmition) {
          this.construction1 += 1;
        }
      }
      if (!item.documentation.find((e: string) => 'construction' == e) ) {
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
      if (!item.documentation.find((e: string) => 'construction' == e) ) {
        if (!item.isEmition) {
          this.construction2 += 1;
        }
      }
      if (!item.documentation.find((e: string) => 'construction' == e) ) {
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
      if (!item.documentation.find((e: string) => 'construction' == e) ) {
        if (!item.isEmition) {
          this.construction3 += 1;
        }
      }
      if (!item.documentation.find((e: string) => 'construction' == e) ) {
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
    return !element.documentation.find((e: string) => e == type) && !element.isEmition;
  }

  findDocumentation(element: any, type: string) {
    return !element.documentation.find((e: string) => e == type);
  }

  handlePageEvent(event: PageEvent): void {

  }

}
