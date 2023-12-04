import { HttpErrorResponse } from '@angular/common/http';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UserModel } from 'src/app/users/user.model';
import { UsersService } from 'src/app/users/users.service';
import { formatDate } from '@angular/common';
import { buildExcel } from 'src/app/xlsx';
import { Component, OnInit } from '@angular/core';
import { WorkersService } from 'src/app/workers/workers.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { ConstructionsService } from 'src/app/constructions/constructions.service';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogDetailConstructionsComponent } from 'src/app/constructions/dialog-detail-constructions/dialog-detail-constructions.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { OfficeModel } from 'src/app/auth/office.model';
import { OfficesService } from 'src/app/offices/offices.service';
Chart.register(...registerables);

@Component({
  selector: 'app-legals',
  templateUrl: './legals.component.html',
  styleUrls: ['./legals.component.sass']
})
export class LegalsComponent implements OnInit {

  constructor(
    private readonly constructionsService: ConstructionsService,
    private readonly usersService: UsersService,
    private readonly workersService: WorkersService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly officesService: OfficesService,
  ) { }

  public displayedColumns: string[] = [ 'partnership', 'business', 'policyNumber', 'endDate', 'actions' ];
  public dataSource: ConstructionModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public users: UserModel[] = [];
  public workers: WorkerModel[] = [];
  public offices: OfficeModel[] = [];
  public compliancePayed: number = 0;
  public materialPayed: number = 0;
  public directPayed: number = 0;
  public complianceNotPayed: number = 0;
  public materialNotPayed: number = 0;
  public directNotPayed: number = 0;
  public emitionCount: number = 0;
  public renovationCount: number = 0;
  public isEmition: boolean|null = null;

  private handleWorkers$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();
  private queryParams$: Subscription = new Subscription();
  private handleOffices$: Subscription = new Subscription();

  public statusForm = this.formBuilder.group({
    processStatusCode: '',
  });

  public workerForm = this.formBuilder.group({
    _id: [ null, Validators.required ],
  });

  public financierForm = this.formBuilder.group({
    name: [ null, Validators.required ],
    _id: [ null, Validators.required ],
  });

  public dateForm = this.formBuilder.group({
    startDate: [ null, Validators.required ],
    endDate: [ null, Validators.required ],
  });

  public officeForm = this.formBuilder.group({
    officeId: [ null, Validators.required ],
  });

  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
    this.queryParams$.unsubscribe();
    this.handleOffices$.unsubscribe();
  }

  ngOnInit() {
    this.navigationService.setTitle("Documentacion Legal");

    this.navigationService.setMenu([
      // { id: 'search', label: 'Buscar', icon: 'search', show: true },
      { id: 'excel_simple', label: 'Exportar Excel', icon: 'file_download', show: false },
    ]);

    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.handleOffices$ = this.officesService.handleOffices().subscribe(offices => {
      this.offices = offices;
    });

    this.queryParams$ = this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
      const { _id, name, workerId, startDate, endDate, processStatusCode } = params;
      if (_id && name) {
        this.financierForm.patchValue({
          _id,
          name
        });
      }
      if (workerId) {
        this.workerForm.patchValue({ _id: workerId });
      }
      if (startDate && endDate) {
        this.dateForm.patchValue({
          startDate: new Date(Number(startDate)), 
          endDate: new Date(Number(endDate))
        });
      }
      if (processStatusCode) {
        this.statusForm.patchValue({ processStatusCode });
      }
      this.fetchData();
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      const params: any = {};

      params.processStatusCode = this.statusForm.value.processStatusCode;
      
      if (this.financierForm.valid) {
        params.financierId = this.financierForm.value._id;
      }
      
      if (this.workerForm.valid) {
        params.workerId = this.workerForm.value._id; 
      }
  
      if (this.officeForm.valid) {
        params.officeId = this.officeForm.value.officeId;
      }
  
      if (this.dateForm.valid) {
        const { startDate, endDate } = this.dateForm.value;
        params.startDate = startDate;
        params.endDate = endDate;
      }

      this.navigationService.loadBarStart();
      this.constructionsService.getConstructionsByRangeDateFinancierWorkerStatusWithGuaranteis(params).subscribe(constructions => {
        console.log(constructions);
        this.navigationService.loadBarFinish();
        // this.dataSource = constructions;
        const wscols = [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ];
        let body = [];
        body.push([
          'CLIENTE',
          'CONSORCIO',
          'ASEGURADORAS',
          'PERSONAL',
          'E. DE TRAMITE',
          'OBJETO',
        ]);
  
        for (const construction of constructions) {
          const financiers: any[] = [];
          for (const material of construction.materials || []) {
            financiers.push(material.financier);
          }
          for (const compliance of construction.compliances || []) {
            financiers.push(compliance.financier);
          }
          for (const direct of construction.directs || []) {
            financiers.push(direct.financier);
          }
          body.push([
            construction.business.name,
            construction.partnership?.name,
            financiers.map(e => e.name),
            construction.worker?.name,
            construction.processStatusCodeType,
            construction.object,
          ]);
        }
        const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
        buildExcel(body, name, wscols, [], []);
      });
    });
  }

  onChangeOffice() {
    const queryParams: Params = { };
    const { officeId } = this.officeForm.value;
    Object.assign(queryParams, { officeId });
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.fetchData();
  }

  onShowDetails(constructionId: string) {
    this.matDialog.open(DialogDetailConstructionsComponent, {
      width: '100vw',
      // height: '90vh',
      position: { top: '20px' },
      data: constructionId,
    });
  }

  onDelete(constructionId: string) {
    const ok = confirm('Esta seguro de anular?...');
    if (ok) {
      this.navigationService.loadBarStart();
      this.constructionsService.delete(constructionId).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.dataSource = this.dataSource.filter(e => e._id !== constructionId);
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
        this.navigationService.loadBarFinish();
      });
    }
  }

  onSetEmition(isEmition: boolean) {
    this.isEmition = isEmition;
    this.fetchData();
  }

  openDialogFinanciers() {
    const dialogRef = this.matDialog.open(DialogFinanciesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(financier => {

      const queryParams: Params = { };

      if (financier) {
        this.financierForm.patchValue(financier);
        Object.assign(queryParams, { name: financier.name, _id: financier._id });
      } else {
        this.financierForm.patchValue({ name: null, _id: null });
        Object.assign(queryParams, { name: null, _id: null });
      }

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      this.fetchData();
    });
  }

  onSelectionChange() {
    this.fetchData();
  }

  onWorkerChange() {
    const queryParams: Params = { };
    Object.assign(queryParams, { workerId: this.workerForm.value._id || null });
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.fetchData();
  }

  onStatusChange() {
    const queryParams: Params = { };
    const { processStatusCode } = this.statusForm.value;
    Object.assign(queryParams, { processStatusCode });
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.fetchData();
  }

  onDateChange() {
    const queryParams: Params = { };
    const { startDate, endDate } = this.dateForm.value;
    Object.assign(queryParams, { startDate: startDate.getTime(), endDate: endDate.getTime() });
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.fetchData();
  }

  fetchData() {
    this.navigationService.loadBarStart();

    const params: any = {};

    params.processStatusCode = this.statusForm.value.processStatusCode;
    
    if (this.financierForm.valid) {
      params.financierId = this.financierForm.value._id;
    }
    
    if (this.workerForm.valid) {
      params.workerId = this.workerForm.value._id; 
    }

    if (this.officeForm.valid) {
      params.officeId = this.officeForm.value.officeId;
    }

    if (this.dateForm.valid) {
      const { startDate, endDate } = this.dateForm.value;
      params.startDate = startDate;
      params.endDate = endDate;
    }

    this.constructionsService.getConstructionsByRangeDateFinancierWorkerStatus(params).subscribe(constructions => {
      this.navigationService.loadBarFinish();
      this.dataSource = constructions;
    });
  }

  onChangeCategory() {
    this.fetchData();
  }

  onChangeUser() {
    this.fetchData();
  }

  onRangeChange() {
    this.fetchData();
  }

  onChange() {
    this.fetchData();
  }

}
