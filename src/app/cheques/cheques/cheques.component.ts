import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { Cheque } from '../cheque.model';
import { ChequesService } from '../cheques.service';
import { DialogChequesComponent } from '../dialog-cheques/dialog-cheques.component';

@Component({
  selector: 'app-cheques',
  templateUrl: './cheques.component.html',
  styleUrls: ['./cheques.component.sass']
})
export class ChequesComponent implements OnInit {

  constructor(
    private readonly chequesService: ChequesService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
  ) { }

  public displayedColumns: string[] = [ 
    'guarantee',
    'price', 
    'endDate', 
    'extension', 
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

  ngOnInit(): void { 
    this.navigationService.setTitle('Todos los cheques');
    this.fetchData();
  }

  async fetchData() {
    this.navigationService.loadBarStart();
    this.chequesService.getByPage(this.pageIndex + 1, this.pageSize).subscribe(res => {
      this.navigationService.loadBarFinish();
      const { cheques, count } = res;
      this.length = count;
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

    // const queryParams: Params = { pageIndex: this.pageIndex, pageSize: this.pageSize };

    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: queryParams, 
    //   queryParamsHandling: 'merge', // remove to replace all query params by provided
    // });
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
