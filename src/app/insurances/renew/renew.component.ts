import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { GuaranteeModel } from 'src/app/guarantees/guarantee.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { InsuranceModel } from '../insurance.model';
import { InsurancesService } from '../insurances.service';

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['./renew.component.sass']
})
export class RenewComponent implements OnInit {

  constructor(
    private readonly insurancesService: InsurancesService,
    private readonly navigationService: NavigationService,
    private readonly formBuilder: FormBuilder,
  ) { }

  public displayedColumns: string[] = [ 
    'expirationAt', 
    'policyNumber', 
    'business', 
    'worker', 
    'actions' 
  ];
  public dataSource: InsuranceModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public formGroup: FormGroup = this.formBuilder.group({
    startDate: [ null, Validators.required ],
    endDate: [ null, Validators.required ],
    type: '',
  });
  public types: string[] = [
    'SCTR',
    'SOAT',
    'VIDALEY',
    'POLIZACAR',
    'POLIZAEAR',
    'RCIVIL',
    'VEHICULAR',
    'VIDA',
    'EPS',
    'SALUD'
  ];

  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleClickMenu$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Renovaciones de seguros');

    this.navigationService.setMenu([
      // { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_insurances', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'export_insurances':
          const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
          let body = [];
          body.push([
            'CONSORCIO',
            'CLIENTE',
            'N° POLIZA',
            'F. DE EMISION',
            'F. DE VENCIMIENTO',
            'PRIMA',
            'COMISION',
            'PROMOTOR'
          ]);
          for (const insurance of this.dataSource) {
            body.push([
              insurance.partnership?.name,
              insurance.business.name,
              insurance.policyNumber,
              formatDate(insurance.emitionAt, 'dd/MM/yyyy', 'en-US'),
              formatDate(insurance.expirationAt, 'dd/MM/yyyy', 'en-US'),
              insurance.prima,
              insurance.commission,
              insurance.worker?.name,
            ]);
          }
          const name = `RENOVACIONES_DE_SEGUROS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
          buildExcel(body, name, wscols, [], []);
          break;
      
        default:
          break;
      }
    });
  }

  async onRenewGuarantee(insuranceId: string) {
    const status = '02';
    this.insurancesService.updateStatus(insuranceId, status).toPromise();
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onNotRenewGuarantee(guarantee: GuaranteeModel) {
    guarantee.status = '03';
    switch (guarantee.guaranteeType) {
      // case 'GAMF':
      //   this.materialsService.update(guarantee, guarantee._id).toPromise();
      //   break;
      // case 'GADF':
      //   this.directsService.update(guarantee, guarantee._id).toPromise();
      //   break;
      // case 'GFCF':
      //   this.compliancesService.update(guarantee, guarantee._id).toPromise();
      //   break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onFreeGuarantee(guarantee: GuaranteeModel) {
    guarantee.status = '04';
    switch (guarantee.guaranteeType) {
      // case 'GAMF':
      //   this.materialsService.update(guarantee, guarantee._id).toPromise();
      //   break;
      // case 'GADF':
      //   this.directsService.update(guarantee, guarantee._id).toPromise();
      //   break;
      // case 'GFCF':
      //   this.compliancesService.update(guarantee, guarantee._id).toPromise();
      //   break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onNotLookGuarantee(guarantee: GuaranteeModel) {
    guarantee.status = '01';
    switch (guarantee.guaranteeType) {
      // case 'GAMF':
      //   this.materialsService.update(guarantee, guarantee._id).toPromise();
      //   break;
      // case 'GADF':
      //   this.directsService.update(guarantee, guarantee._id).toPromise();
      //   break;
      // case 'GFCF':
      //   this.compliancesService.update(guarantee, guarantee._id).toPromise();
      //   break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  onRangeChange() {
    if (this.formGroup.valid) {
      const { startDate, endDate, type } = this.formGroup.value;
      this.navigationService.loadBarStart();
      const params: Params = { type };
      this.insurancesService.getInsurancesByRangeDateTypeWorker(startDate, endDate, params).subscribe(guaranties => {
        console.log(guaranties);
        this.navigationService.loadBarFinish();
        this.dataSource = guaranties;
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
        this.navigationService.loadBarFinish();
      });
    }
  }

}
