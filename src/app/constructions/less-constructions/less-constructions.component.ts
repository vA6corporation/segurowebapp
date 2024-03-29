import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CompliancesService } from 'src/app/compliances/compliances.service';
import { DialogComplianceComponent } from 'src/app/compliances/dialog-compliance/dialog-compliance.component';
import { DialogDirectComponent } from 'src/app/directs/dialog-direct/dialog-direct.component';
import { DirectsService } from 'src/app/directs/directs.service';
import { GuaranteeModel } from 'src/app/guaranties/guarantee.model';
import { DialogMaterialComponent } from 'src/app/materials/dialog-material/dialog-material.component';
import { MaterialsService } from 'src/app/materials/materials.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ReportsService } from 'src/app/reports/reports.service';
import { buildExcel } from 'src/app/xlsx';

@Component({
  selector: 'app-less-constructions',
  templateUrl: './less-constructions.component.html',
  styleUrls: ['./less-constructions.component.sass']
})
export class LessConstructionsComponent implements OnInit {

  constructor(
    private readonly matDialog: MatDialog,
    private readonly navigationService: NavigationService,
    private readonly reportsService: ReportsService,
    private readonly materialsService: MaterialsService,
    private readonly directsService: DirectsService,
    private readonly compliancesService: CompliancesService,
  ) { }

  public displayedColumns: string[] = [ 'guaranteeType', 'partnership', 'business', 'policyNumber', 'endDate', 'price', 'status', 'actions' ];
  public guaranties: any[] = [];
  public dataSource: any[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private key: string = '';
  public processStatusCode = '';
  public status = '';

  private handleClickMenu$: Subscription = new Subscription();
  private handleSearch$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleClickMenu$.unsubscribe();
    this.handleSearch$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Fianzas sin obra');
    this.fetchData();
    
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'export_excel': {
          this.downloadExcel();
          break;
        }
        default:
          break;
      }
    });
  }

  private fetchData() {
    this.navigationService.loadBarStart();
      this.reportsService.getGuarantiesWithoutConstructions().subscribe(guaranties => {
        this.navigationService.loadBarFinish();
        this.guaranties = guaranties;
        if (this.processStatusCode) {
          this.dataSource = guaranties.filter(e => e.processStatusCode === this.processStatusCode);
        } else {
          this.dataSource = guaranties;
        }
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
  }

  downloadExcel() {
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
    const name = `GARANTIAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
    buildExcel(body, name, wscols, [], []);
  }

  onStatusChange() {
    this.navigationService.loadBarStart();
    this.reportsService.getGuarantiesByStatus(this.processStatusCode, this.status).subscribe(guaranties => {
      this.navigationService.loadBarFinish();
      this.dataSource = guaranties;
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage(error.error.message);
    });
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

  async onDelete(guarantee: GuaranteeModel) {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      this.navigationService.loadBarStart();
      switch (guarantee.guaranteeType) {
        case 'GAMF':
          this.materialsService.delete(guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Eliminado correctamente');
            this.dataSource = this.dataSource.filter(e => e._id !== guarantee._id);
            // this.fetchData();
            this.navigationService.loadBarFinish();
          }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(error.error.message);
          });
          break;
        case 'GADF':
          this.directsService.delete(guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Eliminado correctamente');
            this.dataSource = this.dataSource.filter(e => e._id !== guarantee._id);
            // this.fetchData();
            this.navigationService.loadBarFinish();
          }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(error.error.message);
          });
          break;
        case 'GFCF':
          this.compliancesService.delete(guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Eliminado correctamente');
            this.dataSource = this.dataSource.filter(e => e._id !== guarantee._id);
            // this.fetchData();
            this.navigationService.loadBarFinish();
          }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(error.error.message);
          });
          break;
      }
    }
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

}
