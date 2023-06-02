import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { DialogEditSeaceComponent } from '../dialog-edit-seace/dialog-edit-seace.component';
import { DialogSeaceDetailsComponent } from '../dialog-seace-details/dialog-seace-details.component';
import { SeaceDataModel } from '../seace-data.model';
import { SeaceService } from '../seace.service';
import { DialogOffersComponent } from '../dialog-offers/dialog-offers.component';

@Component({
  selector: 'app-seace',
  templateUrl: './seace.component.html',
  styleUrls: ['./seace.component.sass']
})
export class SeaceComponent implements OnInit {

  constructor(
    private readonly seaceService: SeaceService,
    private readonly navigationService: NavigationService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog,
  ) { }
    
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    startDate: [ null, Validators.required ],
    endDate: [ null, Validators.required ],
    isCustomer: false,
    key: '',
    estado: '',
    objetoContratacion: '',
    departamento: '',
  });
  public displayedColumns: string[] = [ 'buenaPro', 'departamento', 'convocatoria', 'momenclatura', 'objetoContratacion', 'estado','valorReferencial', 'worker', 'observations', 'actions' ];
  public dataSource: any[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public key: string = '';
  public estados: any[] = [
    { _id: 'Consentido' },
    { _id: 'Nulo' },
    { _id: 'Adjudicado' },
    { _id: 'Desierto' },
    { _id: 'Convocado' }  
  ]

  public departamentos: string[] = [
    'AMAZONAS',
    'ANCASH',
    'APURIMAC',
    'AREQUIPA',
    'AYACUCHO',
    'CAJAMARCA',
    'CALLAO',
    'CUSCO',
    'EXTERIOR',
    'HUANCAVELICA',
    'HUANUCO',
    'ICA',
    'JUNIN',
    'LA LIBERTAD',
    'LAMBAYEQUE',
    'LIMA', // 15
    'LORETO',
    'MADRE DE DIOS',
    'MOQUEGUA',
    'MULTIDEPARTAMENTAL',
    'PASCO',
    'PIURA',
    'PUNO',
    'SAN MARTIN',
    'TACNA',
    'TUMBES',
    'UCAYALI'
  ]
  private params: Params = {};

  private queryParams$: Subscription = new Subscription();
  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();
  
  ngOnDestroy() {
    this.queryParams$.unsubscribe();
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Seace');

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false },
    ]);

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.navigationService.loadBarStart();
      this.seaceService.getSeaceDatasByKey(key, this.params).subscribe(seaceDatas => {
        console.log(seaceDatas);
        this.navigationService.loadBarFinish();
        this.dataSource = seaceDatas;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });
    
    this.queryParams$ = this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
      const { startDate, endDate, estado, departamento, objetoContratacion, key } = params;

      if (startDate && endDate) {
        this.formGroup.patchValue({
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        });
      }

      this.formGroup.patchValue({
        key: key || '',
        estado: estado || '',
        departamento: departamento || '',
        objetoContratacion: objetoContratacion || '',
      });

    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      this.navigationService.loadBarStart();
      const chunk = 500;
      const promises: Promise<any>[] = [];

      for (let index = 0; index < this.length / chunk; index++) {
        const promise = this.seaceService.getSeaceDatasByPage(index + 1, chunk, this.params).toPromise();
        promises.push(promise);
      }

      Promise.all(promises).then(values => {
        this.navigationService.loadBarFinish();
        const seaceDatas = values.flat() as SeaceDataModel[];
        const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
        let body = [];
        body.push([
          'CONVOCATORIA',
          'BUENA PRO',
          'MOMENCLATURA',
          'OBJETO DE CONTRATACION',
          'ESTADO',
          'VALOR REFERENCIAL',
          'PERSONAL',
          'OBSERVACIONES'
        ]);
        for (const seaceData of seaceDatas) {
          body.push([
            seaceData.convocatoriaDate ? formatDate(seaceData.convocatoriaDate, 'dd/MM/yyyy', 'en-US') : null,
            formatDate(seaceData.buenaProDate, 'dd/MM/yyyy', 'en-US'),
            seaceData.momenclatura,
            seaceData.objetoContratacion,
            seaceData.estado,
            seaceData.valorReferencial,
            seaceData.worker ? seaceData.worker.name : null,
            seaceData.observations
          ]);
        }
        const name = `SEACE_DATA_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
        buildExcel(body, name, wscols, [], []);
      });

    });

    this.fetchData();
    this.fetchCount();
  }

  onClickCopy() {
    this.navigationService.showMessage('Copiado al portapapeles');
  }

  onDialogOffers(seaceData: SeaceDataModel) {
    this.matDialog.open(DialogOffersComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data: seaceData,
    });
  }

  onDialogEditSeace(seaceData: SeaceDataModel) {
    const dialogRef = this.matDialog.open(DialogEditSeaceComponent, {
      width: '600px',
      position: { top: '20px' },
      data: seaceData,
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) {
        this.fetchData();
      }
    });
  }

  fetchCount() {
    const { startDate, endDate, estado, objetoContratacion, departamento, key, isCustomer } = this.formGroup.value;
    const params: any = { estado, objetoContratacion, departamento, key, isCustomer };

    if (startDate && endDate) {
      Object.assign(params, { startDate, endDate });
    }

    this.seaceService.getCountSeaceDatas(params).subscribe(count => {
      this.length = count;
    });
  }

  fetchData() {
    const { startDate, endDate, estado, objetoContratacion, departamento, isCustomer } = this.formGroup.value;
    const params: any = { estado, objetoContratacion, departamento, isCustomer };

    if (startDate && endDate) {
      Object.assign(params, { startDate, endDate });
    }

    this.navigationService.loadBarStart();
    this.seaceService.getSeaceDatasByPage(this.pageIndex + 1, this.pageSize, params).subscribe(seaceDatas => {
      this.navigationService.loadBarFinish();
      this.dataSource = seaceDatas;
      console.log(seaceDatas);
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage(error.error.message);
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    const queryParams = { pageIndex: this.pageIndex, pageSize: this.pageSize };

    Object.assign(this.params, queryParams);

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });

    this.fetchData();
  }

  onStateChange() {
    this.pageIndex = 0;

    const { estado } = this.formGroup.value;
    
    const queryParams: Params = { estado, pageIndex: 0 };

    Object.assign(this.params, queryParams);

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });

    this.fetchCount();
    this.fetchData();
  }

  onObjectChange() {
    this.pageIndex = 0;

    const { objetoContratacion } = this.formGroup.value;
    
    const queryParams: Params = { objetoContratacion, pageIndex: 0 };

    Object.assign(this.params, queryParams);

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });

    this.fetchCount();
    this.fetchData();
  }

  onDepartmentChange() {
    this.pageIndex = 0;

    const { departamento } = this.formGroup.value;

    const queryParams: Params = { departamento, pageIndex: 0 };

    Object.assign(this.params, queryParams);

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });

    this.fetchCount();
    this.fetchData();
  }

  onCustomerChange() {
    this.pageIndex = 0;

    const { isCustomer } = this.formGroup.value;

    const queryParams: Params = { isCustomer, pageIndex: 0 };

    Object.assign(this.params, queryParams);

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });

    this.fetchCount();
    this.fetchData();
  }

  onRangeChange() {
    if (this.formGroup.valid) {
      this.pageIndex = 0;

      const { startDate, endDate } = this.formGroup.value;

      const queryParams: Params = { startDate: startDate, endDate: endDate, pageIndex: 0 };

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      Object.assign(this.params, queryParams);
      
      this.fetchCount();
      this.fetchData();
    }
  }

  onDialogDetails(seaceData: any) {
    this.matDialog.open(DialogSeaceDetailsComponent, {
      data: seaceData,
      width: '600px',
      position: { top: '20px' }
    });
  }

}
