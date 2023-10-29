import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompliancesService } from 'src/app/compliances/compliances.service';
import { DialogComplianceComponent } from 'src/app/compliances/dialog-compliance/dialog-compliance.component';
import { DialogDirectComponent } from 'src/app/directs/dialog-direct/dialog-direct.component';
import { DirectsService } from 'src/app/directs/directs.service';
import { FinancierModelsService } from 'src/app/financiers/financiers.service';
import { GuaranteeModel } from 'src/app/guaranties/guarantee.model';
import { GuaranteeTypes } from 'src/app/guaranties/guaranteeTypes.enum';
import { DialogMaterialComponent } from 'src/app/materials/dialog-material/dialog-material.component';
import { MaterialsService } from 'src/app/materials/materials.service';
import { NavigationService } from 'src/app/navigation/navigation.service';

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
    private readonly activatedRoute: ActivatedRoute,
  ) { }
    
  public displayedColumns: string[] = [ 'guaranteeType', 'partnership', 'business', 'policyNumber', 'endDate', 'price', 'actions' ];
  public dataSource: GuaranteeModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private financierId: string = '';

  private handleSearch$: Subscription = new Subscription();
  
  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Emisiones');

    this.navigationService.backTo();

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.financierId = params.financierId;
      this.fetchData();
    });
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
      case GuaranteeTypes.MATERIAL:
        this.materialsService.update(guarantee, guarantee._id).toPromise();
        break;
      case GuaranteeTypes.COMPLIANCE:
        this.compliancesService.update(guarantee, guarantee._id).toPromise();
        break;
      case GuaranteeTypes.DIRECT:
        this.directsService.update(guarantee, guarantee._id).toPromise();
        break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onNotRenewGuarantee(guarantee: any) {
    guarantee.status = '03';
    switch (guarantee.guaranteeType) {
      case GuaranteeTypes.MATERIAL:
        this.materialsService.update(guarantee, guarantee._id).toPromise();
        break;
      case GuaranteeTypes.COMPLIANCE:
        this.compliancesService.update(guarantee, guarantee._id).toPromise();
        break;
      case GuaranteeTypes.DIRECT:
        this.directsService.update(guarantee, guarantee._id).toPromise();
        break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onFreeGuarantee(guarantee: any) {
    guarantee.status = '04';
    switch (guarantee.guaranteeType) {
      case GuaranteeTypes.MATERIAL:
        this.materialsService.update(guarantee, guarantee._id).toPromise();
        break;
      case GuaranteeTypes.COMPLIANCE:
        this.compliancesService.update(guarantee, guarantee._id).toPromise();
        break;
      case GuaranteeTypes.DIRECT:
        this.directsService.update(guarantee, guarantee._id).toPromise();
        break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onNotLookGuarantee(guarantee: any) {
    guarantee.status = '01';
    switch (guarantee.guaranteeType) {
      case GuaranteeTypes.MATERIAL:
        this.materialsService.update(guarantee, guarantee._id).toPromise();
        break;
      case GuaranteeTypes.COMPLIANCE:
        this.compliancesService.update(guarantee, guarantee._id).toPromise();
        break;
      case GuaranteeTypes.DIRECT:
        this.directsService.update(guarantee, guarantee._id).toPromise();
        break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onDelete(guarantee: GuaranteeModel) {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      this.navigationService.loadBarStart();
      switch (guarantee.guaranteeType) {
        case GuaranteeTypes.MATERIAL:
          this.materialsService.delete(guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Eliminado correctamente');
            this.fetchData();
            this.navigationService.loadBarFinish();
          }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(error.error.message);
          });
          break;
        case GuaranteeTypes.COMPLIANCE:
          this.compliancesService.delete(guarantee._id).subscribe(() => {
            this.navigationService.showMessage('Eliminado correctamente');
            this.fetchData();
            this.navigationService.loadBarFinish();
          }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(error.error.message);
          });
          break;
        case GuaranteeTypes.DIRECT:
          this.directsService.delete(guarantee._id).subscribe(() => {
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

  onShowDetails(guarantee: GuaranteeModel) {
    switch (guarantee.guaranteeType) {
      case GuaranteeTypes.MATERIAL:
        this.matDialog.open(DialogMaterialComponent, {
          position: { top: '20px' },
          data: guarantee._id,
        });
        break;
      case GuaranteeTypes.COMPLIANCE:
        this.matDialog.open(DialogComplianceComponent, {
          position: { top: '20px' },
          data: guarantee._id,
        });
        break;
      case GuaranteeTypes.DIRECT:
        this.matDialog.open(DialogDirectComponent, {
          position: { top: '20px' },
          data: guarantee._id,
        });
        break;
    }
  }

}
