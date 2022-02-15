import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
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

  private handleSearch$: Subscription = new Subscription();

  ngOnInit(): void { 
    this.navigationService.setTitle('Pagos por cobrar');
    this.fetchData();

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

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
    this.chequesService.forPaid().subscribe(cheques => {
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
