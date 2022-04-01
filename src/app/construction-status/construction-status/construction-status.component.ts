import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Compliance } from 'src/app/compliances/compliance.model';
import { CompliancesService } from 'src/app/compliances/compliances.service';
import { DialogComplianceComponent } from 'src/app/compliances/dialog-compliance/dialog-compliance.component';
import { DialogDirectComponent } from 'src/app/directs/dialog-direct/dialog-direct.component';
import { Direct } from 'src/app/directs/direct.model';
import { DirectsService } from 'src/app/directs/directs.service';
import { FinancierModelsService } from 'src/app/financiers/financiers.service';
import { DialogMaterialComponent } from 'src/app/materials/dialog-material/dialog-material.component';
import { Material } from 'src/app/materials/material.model';
import { MaterialsService } from 'src/app/materials/materials.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { Guarantee } from 'src/app/reports/guarantee.interface';

@Component({
  selector: 'app-construction-status',
  templateUrl: './construction-status.component.html',
  styleUrls: ['./construction-status.component.sass']
})
export class ConstructionStatusComponent implements OnInit {

  constructor(
    private readonly financiersService: FinancierModelsService,
    private readonly navigationService: NavigationService,
    private readonly materialsService: MaterialsService,
    private readonly compliancesService: CompliancesService,
    private readonly directsService: DirectsService,
    private readonly matDialog: MatDialog,
    private readonly route: ActivatedRoute,
  ) { }
    
  private handleSearch$: Subscription = new Subscription();

  public displayedColumns: string[] = [ 'guaranteeType', 'partnership', 'customer', 'policyNumber', 'endDate', 'price', 'actions' ];
  public dataSource: Guarantee[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private financierId: string = '';

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Emisiones');

    this.navigationService.backTo();

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.route.params.subscribe(params => {
      console.log(params);
      this.financierId = params.financierId;
      this.fetchData();
    });

    // this.financiersService.getCount().subscribe(count => {
    //   this.length = count;
    // });
    
    // this.financiersService.getFinancierModelsByPage(this.pageIndex + 1, this.pageSize).subscribe(financiers => {
    //   this.dataSource = financiers;
    // });

    // this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
    //   this.navigationService.loadBarStart();
    //   this.financiersService.getFinancierModelsByAny(key).subscribe(financiers => {
    //     this.navigationService.loadBarFinish();
    //     this.dataSource = financiers;
    //   }, (error: HttpErrorResponse) => {
    //     this.navigationService.loadBarFinish();
    //     this.navigationService.showMessage(error.error.message);
    //   });
    // });
  }

  fetchData() {
    this.financiersService.getEmitionGuaranties(this.financierId).subscribe(guaranties => {
      console.log(guaranties);
      this.dataSource = guaranties;
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

  async onDelete(guarantee: Guarantee) {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      this.navigationService.loadBarStart();
      switch (guarantee.guaranteeType) {
        case 'GAMF':
          this.materialsService.delete(guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Eliminado correctamente');
            this.fetchData();
            this.navigationService.loadBarFinish();
          }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(error.error.message);
          });
          break;
        case 'GADF':
          this.directsService.delete(guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Eliminado correctamente');
            this.fetchData();
            this.navigationService.loadBarFinish();
          }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(error.error.message);
          });
          break;
        case 'GFCF':
          this.compliancesService.delete(guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Eliminado correctamente');
            this.fetchData();
            this.navigationService.loadBarFinish();
          }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(error.error.message);
          });
          break;
      }
    }
  }

  onShowDetails(guarantee: Direct|Compliance|Material) {
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
