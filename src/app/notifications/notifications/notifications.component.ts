import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { NotificationModel } from '../notification.model';
import { NotificationsService } from '../notifications.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WorkersService } from 'src/app/workers/workers.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { Params } from '@angular/router';
import { formatDate } from '@angular/common';
import { buildExcel } from 'src/app/xlsx';
import { SeaceDataModel } from 'src/app/seace/seace-data.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditSeaceComponent } from 'src/app/seace/dialog-edit-seace/dialog-edit-seace.component';
import { DialogSeaceDetailsComponent } from 'src/app/seace/dialog-seace-details/dialog-seace-details.component';
import { DialogOffersComponent } from 'src/app/seace/dialog-offers/dialog-offers.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogBaseComponent } from 'src/app/seace/dialog-base/dialog-base.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit {

  constructor( 
    private readonly notificationsService: NotificationsService,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly formBuilder: FormBuilder,
    private readonly matDialog: MatDialog,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    startDate: [ new Date(), Validators.required ],
    endDate: [ new Date(), Validators.required ],
    workerId: '',
  });
  public displayedColumns: string[] = [ 'buenaPro', 'momenclatura', 'objetoContratacion', 'estado','valorReferencial', 'worker', 'observations', 'actions' ];
  public dataSource: NotificationModel[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public workers: WorkerModel[] = [];

  private handleWorkers$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();
  private handleSearch$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
    this.handleSearch$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Noticaciones Seace');
    
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false },
    ]);

    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      this.onExportExcel();
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.navigationService.loadBarStart();
      this.notificationsService.getNotificationsByKey(key).subscribe(notifications => {
        this.navigationService.loadBarFinish();
        this.dataSource = notifications;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });

    this.fetchData();
    this.fetchCount();
  }

  onExportExcel() {
    const chunk = 500;
    const promises: Promise<any>[] = [];

    for (let index = 0; index < this.length / chunk; index++) {
      const { startDate, endDate, workerId } = this.formGroup.value;
      const params: Params = { workerId };
      const promise = this.notificationsService.getNotificationsByPage(startDate, endDate,  index + 1, chunk, params).toPromise();
      promises.push(promise);
    }

    this.navigationService.loadBarStart();
    Promise.all(promises).then(values => {
      this.navigationService.loadBarFinish();
      const notifications = values.flat();
      const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
      let body = [];
      body.push([
        'F. REGISTRO',
        'TITULO',
        'PERSONAL',
        'OBSERVACIONES'
      ]);
      for (const notification of notifications) {
        body.push([
          formatDate(new Date(notification.createdAt), 'dd/MM/yyyy', 'en-US'),
          notification.title,
          notification.worker.name,
          notification.seaceData.observations
        ]);
      }
      const name = `NOTIFICACIONES_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
      buildExcel(body, name, wscols, [], []);
    });
  }

  onClickCopy() {
    this.navigationService.showMessage('Copiado al portapapeles');
  }

  fetchData() {
    if (this.formGroup.valid) {
      const { startDate, endDate, workerId } = this.formGroup.value;
      const params: Params = { workerId };
      this.navigationService.loadBarStart();
      this.notificationsService.getNotificationsByPage(startDate, endDate, this.pageIndex + 1, this.pageSize, params).subscribe(notifications => {
        console.log(notifications);
        this.navigationService.loadBarFinish();
        this.dataSource = notifications;
      });
    }
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

  onDialogOffers(seaceData: SeaceDataModel) {
    this.matDialog.open(DialogOffersComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data: seaceData,
    });
  }


  onDialogDetails(seaceData: any) {
    this.matDialog.open(DialogSeaceDetailsComponent, {
      data: seaceData,
      width: '600px',
      position: { top: '20px' }
    });
  }

  onDialogBase(seaceData: any) {
    this.matDialog.open(DialogBaseComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data: seaceData,
    });
  }

  fetchCount() {
    if (this.formGroup.valid) {
      const { startDate, endDate, workerId } = this.formGroup.value;
      const params: Params = { workerId };
      this.notificationsService.getCountNotificationsByRangeDate(startDate, endDate, params).subscribe(count => {
        this.length = count;
      });
    }
  }

  onRangeChange() {
    this.fetchCount();
    this.fetchData();
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
  }
  
}
