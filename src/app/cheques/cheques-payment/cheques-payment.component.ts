import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { Cheque } from '../cheque.model';
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
  ) { }

  public displayedColumns: string[] = [ 'guarantee', 'price', 'paymentAt', 'extensionAt', 'policyNumber', 'partnership', 'customer', 'actions' ];
  public dataSource: any[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public params: Params = {
    payed: 'false',
  };

  private handleSearch$: Subscription = new Subscription();

  ngOnInit(): void { 
    this.navigationService.setTitle('Garantias');
    this.fetchData();

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_cheques', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.navigationService.handleClickMenu().subscribe(id => {
      const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
      let body = [];
      body.push([
        'GARANTIA',
        'MONTO',
        'F. DE PAGO',
        'F. DE PRORROGA',
        'N° DE POLIZA',
        'CONSORCIO',
        'CLIENTE'
      ]);
      for (const cheque of this.dataSource) {
        body.push([
          cheque.guarantee?.guaranteeType,
          cheque.price,
          formatDate(cheque.paymentAt, 'dd/MM/yyyy', 'en-US'),
          formatDate(cheque.extensionAt, 'dd/MM/yyyy', 'en-US'),
          cheque.guarantee?.policyNumber,
          cheque.guarantee?.partnership?.name,
          cheque.guarantee?.customer?.name
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

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
  }

  onShowDetails(chequeId: string) {
    const dialogRef = this.matDialog.open(DialogDetailChequesComponent, {
      data: chequeId,
      width: '600px',
      position: { top: '20px' }
    });
  }

  fetchData() {
    this.chequesService.getChequesByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(cheques => {
      this.dataSource = cheques;
    });
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

  onEditCheque(cheque: Cheque): void {
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
    this.fetchData();
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
