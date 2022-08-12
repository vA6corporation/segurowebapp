import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { Cheque } from '../cheque.model';
import { ChequesService } from '../cheques.service';
import { DialogChequesComponent } from '../dialog-cheques/dialog-cheques.component';
import { DialogDetailChequesComponent } from '../dialog-detail-cheques/dialog-detail-cheques.component';

@Component({
  selector: 'app-cheques',
  templateUrl: './cheques.component.html',
  styleUrls: ['./cheques.component.sass']
})
export class ChequesComponent implements OnInit {

  constructor(
    private readonly chequesService: ChequesService,
    private readonly navigationService: NavigationService,
    private readonly formBuilder: FormBuilder,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  public displayedColumns: string[] = [ 
    'guarantee',
    'price', 
    'paymentAt', 
    'extensionAt', 
    'policyNumber', 
    'partnership', 
    'customer', 
    'actions' 
  ];
  public dataSource: any[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  public formGroup: FormGroup = this.formBuilder.group({
    startDate: [ new Date(), Validators.required ],
    endDate: [ new Date(), Validators.required ],
  });

  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }

  ngOnInit(): void { 

    this.route.queryParams.subscribe(params => {
      const { startDate, endDate } = params;
      if (startDate && endDate) {
        this.formGroup.get('startDate')?.patchValue(new Date(Number(startDate)));
        this.formGroup.get('endDate')?.patchValue(new Date(Number(endDate)));
      }
    });

    const { startDate, endDate } = this.formGroup.value;

    this.chequesService.getCountChequesByRangeDate(startDate, endDate).subscribe(count => {
      this.length = count;
    });

    this.navigationService.setTitle('Garantias');
    this.fetchData();

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_customers', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
      let body = [];
      body.push([
        'GARANTIA',
        'MONTO',
        'F. DE PAGO',
        'F. DE PRORROGA',
        'N° DE POLIZA',
        'CONSORCIO',
        'CLIENTE',
      ]);
      for (const cheque of this.dataSource) {
        body.push([
          cheque.guarantee?.guaranteeType,
          cheque.price,
          formatDate(cheque.paymentAt, 'dd/MM/yyyy', 'en-US'),
          formatDate(cheque.extensionAt, 'dd/MM/yyyy', 'en-US'),
          cheque.guarantee?.policyNumber,
          cheque.guarantee?.partnership?.name,
          cheque.guarantee?.customer?.name,
        ]);
      }
      const name = `GARANTIAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
      buildExcel(body, name, wscols, [], []);
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.navigationService.loadBarStart();
      this.chequesService.getByKey(key).subscribe(cheques => {
        this.navigationService.loadBarFinish();
        this.dataSource = cheques;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });
  }

  onRangeChange() {
    if (this.formGroup.valid) {
      this.pageIndex = 0;
      const { startDate, endDate } = this.formGroup.value;

      const queryParams: Params = { startDate: startDate.getTime(), endDate: endDate.getTime(), pageIndex: 0 };

      this.chequesService.getCountChequesByRangeDate(startDate, endDate).subscribe(count => {
        this.length = count;
      });

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
      this.fetchData();
    }
  }

  async fetchData() {
    this.navigationService.loadBarStart();
    const { startDate, endDate } = this.formGroup.value;
    this.chequesService.getByRangeDatePage(startDate, endDate, this.pageIndex + 1, this.pageSize).subscribe(cheques => {
      this.navigationService.loadBarFinish();
      this.dataSource = cheques;
    });
  }

  onShowDetails(chequeId: string) {
    const dialogRef = this.matDialog.open(DialogDetailChequesComponent, {
      data: chequeId,
      width: '600px',
      position: { top: '20px' }
    });
  }

  async onDelete(chequeId: string) {
    const ok = confirm('Esta seguro de anular');
    if (ok) {
      this.navigationService.loadBarStart();
      await this.chequesService.deleteOne(chequeId).toPromise();
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage('Anulado correctamente');
      this.fetchData();
    }
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();

    // const queryParams: Params = { pageIndex: this.pageIndex, pageSize: this.pageSize };

    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: queryParams, 
    //   queryParamsHandling: 'merge', // remove to replace all query params by provided
    // });
  }

  onEditCheque(cheque: Cheque): void {
    const dialogRef = this.matDialog.open(DialogChequesComponent, {
      width: '600px',
      position: { top: '20px' },
      data: cheque,
    });

    dialogRef.afterClosed().subscribe(updatedCheque => {
      if (updatedCheque) {
        Object.assign(cheque, updatedCheque);
        this.chequesService.update(cheque, cheque._id).subscribe(() => {
          this.navigationService.showMessage('Se han guardado los cambios');
        }, (error: HttpErrorResponse) => {
          this.navigationService.showMessage(error.error.message);
        });
      }
    });
  }

  onNotPaid(cheque: Cheque) {
    cheque.isPaid = false;
    this.chequesService.update(cheque, cheque._id || '').subscribe(cheque => {
      this.navigationService.showMessage('Pago desmarcado');
      this.fetchData();
    });
  }
  
  onPaid(cheque: Cheque) {
    const ok = confirm('Esta seguro de marcar pago?...');
    if (ok) {
      cheque.isPaid = true;
      this.chequesService.update(cheque, cheque._id || '').subscribe(cheque => {
        this.navigationService.showMessage('Pago realizado correctamente');
        this.fetchData();
      });
    }
  }
}
