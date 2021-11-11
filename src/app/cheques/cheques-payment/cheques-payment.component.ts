import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { Cheque } from '../cheque.model';
import { ChequesService } from '../cheques.service';
import { DialogChequesComponent } from '../dialog-cheques/dialog-cheques.component';

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

  public displayedColumns: string[] = [ 'guarantee', 'price', 'endDate', 'extension', 'policyNumber', 'partnership', 'customer', 'actions' ];
  public dataSource: any[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void { 
    this.navigationService.setTitle('Cheques por cobrar');
    this.fetchData();
  }

  async fetchData() {
    this.dataSource = await this.chequesService.forPaid().toPromise();
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
      height: '400px',
      width: '600px',
      position: { top: '20px' },
      data: cheque,
    });

    dialogRef.afterClosed().subscribe(async updatedCheque => {
      if (updatedCheque) {
        Object.assign(cheque, updatedCheque);
        await this.chequesService.update(updatedCheque, updatedCheque._id).toPromise();
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
