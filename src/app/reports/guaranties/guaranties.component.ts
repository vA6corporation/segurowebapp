import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CompliancesService } from 'src/app/compliances/compliances.service';
import { DialogComplianceComponent } from 'src/app/compliances/dialog-compliance/dialog-compliance.component';
import { DialogDirectComponent } from 'src/app/directs/dialog-direct/dialog-direct.component';
import { DirectsService } from 'src/app/directs/directs.service';
import { DialogMaterialComponent } from 'src/app/materials/dialog-material/dialog-material.component';
import { MaterialsService } from 'src/app/materials/materials.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ReportsService } from '../reports.service';
import { formatDate } from '@angular/common';
import { buildExcel } from 'src/app/xlsx';
import { Subscription } from 'rxjs';
import { GuaranteeModel } from 'src/app/guarantees/guarantee.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-guaranties',
  templateUrl: './guaranties.component.html',
  styleUrls: ['./guaranties.component.sass']
})
export class GuarantiesComponent implements OnInit {

  constructor(
    private readonly materialsService: MaterialsService,
    private readonly directsService: DirectsService,
    private readonly compliancesService: CompliancesService,
    private readonly reportsService: ReportsService,
    private readonly navigationService: NavigationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  public displayedColumns: string[] = [ 'guaranteeType', 'partnership', 'business', 'worker', 'policyNumber', 'endDate', 'actions' ];
  public dataSource: any[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public formGroup: FormGroup = this.formBuilder.group({
    startDate: [ null, Validators.required ],
    endDate: [ null, Validators.required ],
  });

  private queryParams$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();
  private handleSearch$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleClickMenu$.unsubscribe();
    this.queryParams$.unsubscribe();
    this.handleSearch$.unsubscribe();
  }
    
  ngOnInit(): void {
    this.navigationService.setTitle('Renovaciones de fianzas');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_businesses', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.queryParams$ = this.activatedRoute.queryParams.pipe(first()).subscribe(params => {

      const { startDate, endDate } = params;

      if (startDate && endDate) {
        this.formGroup.get('startDate')?.patchValue(new Date(Number(startDate)));
        this.formGroup.get('endDate')?.patchValue(new Date(Number(endDate)));
      }

      this.fetchData();
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.navigationService.loadBarStart();
      
      const queryParams: Params = { startDate: null, endDate: null, pageIndex: 0, key };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      const params = { key };

      this.reportsService.getGuarantiesByKey(params).subscribe(guaranties => {
        this.navigationService.loadBarFinish();
        this.dataSource = guaranties;
      });
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
      let body = [];
      body.push([
        'GARANTIA',
        'FINANCIERA',
        'CONSORCIO',
        'CLIENTE',
        'N° DE POLIZA',
        'SUMA ASEGURADA',
        'PRIMA',
        'E. DE TRAMITE',
        'E. DE REVISION',
        'F. CUMPLIMIENTO',
      ]);

      for (const guarantee of this.dataSource) {
        const { business, partnership, financier } = guarantee;
        body.push([
          guarantee.guaranteeType,
          financier?.name || null,
          partnership?.name || null,
          business?.name || null,
          guarantee.policyNumber,
          guarantee.price,
          guarantee.prima,
          guarantee.processStatus,
          guarantee.statusLabel,
          formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
        ]);
      }
      const name = `RENOVACIONES_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
      buildExcel(body, name, wscols, [], []);
    });
  }

  fetchData() {
    if (this.formGroup.valid) {
      const { startDate, endDate } = this.formGroup.value;
      this.navigationService.loadBarStart();
      this.reportsService.getGuarantiesByRangeDate(startDate, endDate).subscribe(guaranties => {
        console.log(guaranties);
        this.navigationService.loadBarFinish();
        this.dataSource = guaranties;
      });
    }
  }

  onRangeChange() {
    const { startDate, endDate } = this.formGroup.value;

    const queryParams: Params = { startDate: startDate.getTime(), endDate: endDate.getTime(), pageIndex: 0, key: null };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });

    this.fetchData();   
  }

  onShowDetails(guarantee: GuaranteeModel) {
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

  async onRenewGuarantee(guarantee: any) {
    guarantee.status = '02';
    switch (guarantee.guaranteeType) {
      case 'GAMF':
        this.materialsService.update(guarantee, guarantee._id).toPromise();
        break;
      case 'GADF':
        this.directsService.update(guarantee, guarantee._id).toPromise();
        break;
      case 'GFCF':
        this.compliancesService.update(guarantee, guarantee._id).toPromise();
        break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onNotRenewGuarantee(guarantee: any) {
    guarantee.status = '03';
    switch (guarantee.guaranteeType) {
      case 'GAMF':
        this.materialsService.update(guarantee, guarantee._id).toPromise();
        break;
      case 'GADF':
        this.directsService.update(guarantee, guarantee._id).toPromise();
        break;
      case 'GFCF':
        this.compliancesService.update(guarantee, guarantee._id).toPromise();
        break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onFreeGuarantee(guarantee: any) {
    guarantee.status = '04';
    switch (guarantee.guaranteeType) {
      case 'GAMF':
        this.materialsService.update(guarantee, guarantee._id).toPromise();
        break;
      case 'GADF':
        this.directsService.update(guarantee, guarantee._id).toPromise();
        break;
      case 'GFCF':
        this.compliancesService.update(guarantee, guarantee._id).toPromise();
        break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onNotLookGuarantee(guarantee: any) {
    guarantee.status = '01';
    switch (guarantee.guaranteeType) {
      case 'GAMF':
        this.materialsService.update(guarantee, guarantee._id).toPromise();
        break;
      case 'GADF':
        this.directsService.update(guarantee, guarantee._id).toPromise();
        break;
      case 'GFCF':
        this.compliancesService.update(guarantee, guarantee._id).toPromise();
        break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async sendMail(guarantee: any): Promise<any> {
    this.navigationService.loadBarStart();
    // let mail: MailModel;
    try {
      switch (guarantee.guaranteeType) {
        case 'GFCF':
          this.compliancesService.sendMail(guarantee._id).subscribe(() => {

          }, (error: HttpErrorResponse) => {
            this.navigationService.showMessage(error.error.message);
          });
          break;
        case 'GAMF':
          this.materialsService.sendMail(guarantee._id).subscribe(() => {

          }, (error: HttpErrorResponse) => {
            this.navigationService.showMessage(error.error.message);
          });
          break;
        case 'GADF':
          this.directsService.sendMail(guarantee._id).subscribe(() => {

          }, (error: HttpErrorResponse) => {
            this.navigationService.showMessage(error.error.message);
          });
          break;
        default:
          // mail = { to: '' };
          break;
      }
      this.navigationService.showMessage('Email enviado');
      this.onRangeChange();
    } catch (error) {
      console.log(error);
    }
  }

}
