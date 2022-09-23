import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
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
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog
  ) { }

  public displayedColumns: string[] = [ 'partnership', 'business', 'policyNumber', 'endDate', 'actions' ];
  public dataSource: ConstructionModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public users: UserModel[] = [];
  public workers: WorkerModel[] = [];
  public compliancePayed: number = 0;
  public materialPayed: number = 0;
  public directPayed: number = 0;
  public complianceNotPayed: number = 0;
  public materialNotPayed: number = 0;
  public directNotPayed: number = 0;
  public emitionCount: number = 0;
  public renovationCount: number = 0;
  public isEmition: boolean|null = null;

  private users$: Subscription = new Subscription();
  private workers$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  public statusForm = this.formBuilder.group({
    processStatusCode: '',
    constructionCode: '',
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

  ngOnDestroy() {
    this.users$.unsubscribe();
    this.workers$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }

  ngOnInit() {
    this.navigationService.setTitle("Documentacion Legal");

    this.navigationService.setMenu([
      // { id: 'search', label: 'Buscar', icon: 'search', show: true },
      { id: 'excel_simple', label: 'Exportar Excel', icon: 'file_download', show: false },
    ]);

    this.users$ = this.usersService.getActiveUsers().subscribe(users => {
      this.users = users;
    });

    this.workers$ = this.workersService.getWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      const wscols = [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ];
      let body = [];
      body.push([
        'CLIENTE',
        'CONSORCIO',
        'PERSONAL',
        'ASEGURADORA',
        'OBJETO',
      ]);

      for (const construction of this.dataSource) {
        body.push([
          construction.business.name,
          construction.partnership?.name,
          construction.worker?.name,
          construction.object,
        ]);
      }
      const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
      buildExcel(body, name, wscols, [], []);
    });
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
      if (financier) {
        this.financierForm.patchValue(financier);
      } else {
        this.financierForm.patchValue({ name: null, _id: null });
      }
      this.fetchData();
    });
  }

  ngAfterViewInit() {
    this.fetchData();
  }

  onSelectionChange() {
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

    if (this.dateForm.valid) {
      const { startDate, endDate } = this.dateForm.value;
      params.startDate = startDate;
      params.endDate = endDate;
    }

    this.constructionsService.getConstructionsByRangeDateFinancierWorkerStatus(params).subscribe(constructions => {
      console.log(constructions);
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
