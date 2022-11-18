import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { ChequeModel } from '../cheque.model';
import { ChequesService } from '../cheques.service';
import { DialogChequesComponent } from '../dialog-cheques/dialog-cheques.component';
import { DialogDetailChequesComponent } from '../dialog-detail-cheques/dialog-detail-cheques.component';

@Component({
  selector: 'app-cheques-payment',
  templateUrl: './cheques-payment.component.html',
  styleUrls: ['./cheques-payment.component.sass']
})
export class ChequesPaymentComponent implements OnInit {

  constructor(
    private readonly chequesService: ChequesService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    startDate: [ new Date(), Validators.required ],
    endDate: [ new Date(), Validators.required ],
    isPaid: 'false',
  });
  public displayedColumns: string[] = [ 'guarantee', 'price', 'paymentAt', 'extensionAt', 'policyNumber', 'partnership', 'business', 'actions' ];
  public dataSource: any[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();
  private queryParams$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
    this.queryParams$.unsubscribe();
  }

  ngOnInit(): void { 
    this.navigationService.setTitle('Garantias');

    this.queryParams$ = this.route.queryParams.pipe(first()).subscribe(params => {
      const { startDate, endDate, isPaid } = params;
      if (startDate && endDate) {
        this.formGroup.get('startDate')?.patchValue(new Date(Number(startDate)));
        this.formGroup.get('endDate')?.patchValue(new Date(Number(endDate)));
      }
      if (isPaid) {
        this.formGroup.get('isPaid')?.patchValue(isPaid);
      }
      this.fetchData();
    });

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_cheques', label: 'Exportar excel', icon: 'download', show: false }
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
          cheque.guarantee?.business?.name,
        ]);
      }
      const name = `GARANTIAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
      buildExcel(body, name, wscols, [], []);
    });

    this.chequesService.getCountCheques().subscribe(count => {
      this.length = count;
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

  onShowDetails(chequeId: string) {
    const dialogRef = this.matDialog.open(DialogDetailChequesComponent, {
      data: chequeId,
      width: '600px',
      position: { top: '20px' }
    });
  }

  fetchData() {
    if (this.formGroup.valid) {
      const { startDate, endDate, isPaid } = this.formGroup.value;
      const params = { isPaid };
      this.navigationService.loadBarStart();
      this.chequesService.getChequesByRangeDate(startDate, endDate, params).subscribe(cheques => {
        this.navigationService.loadBarFinish();
        this.dataSource = cheques;
      });
    }
  }

  onRangeChange() {
    if (this.formGroup.valid) {
      this.pageIndex = 0;

      const { startDate, endDate } = this.formGroup.value;

      const queryParams: Params = { startDate: startDate.getTime(), endDate: endDate.getTime(), pageIndex: 0 };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      this.fetchData();
    }
  }

  async onDelete(chequeId: string) {
    const ok = confirm('Esta seguro de eliminar');
    if (ok) {
      this.navigationService.loadBarStart();
      await this.chequesService.deleteOne(chequeId).toPromise();
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage('Eliminado correctamente');
      this.fetchData();
    }
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
  }

  onEditCheque(cheque: ChequeModel): void {
    const dialogRef = this.matDialog.open(DialogChequesComponent, {
      width: '600px',
      position: { top: '20px' },
      data: cheque,
    });

    dialogRef.afterClosed().subscribe(async updatedCheque => {
      if (updatedCheque) {
        Object.assign(cheque, updatedCheque);
        await this.chequesService.update(updatedCheque, cheque._id).toPromise();
        this.navigationService.showMessage('Se han guardado los cambios');
      }
    });
  }

  onSelectionChange() {
    const { isPaid } = this.formGroup.value;
    const queryParams: Params = { isPaid };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });

    this.fetchData();
  }

  onNotPaid(cheque: ChequeModel) {
    cheque.isPaid = false;
    this.chequesService.update(cheque, cheque._id || '').subscribe(cheque => {
      this.navigationService.showMessage('Se han guardado los cambios');
      this.fetchData();
    });
  }

  onPaid(cheque: ChequeModel) {
    const ok = confirm('Esta seguro de marcar pago?...');
    if (ok) {
      cheque.isPaid = true;
      this.chequesService.update(cheque, cheque._id || '').subscribe(cheque => {
        this.navigationService.showMessage('Se han guardado los cambios');
        this.fetchData();
      });
    }
  }

}
