import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { PaymentModel } from '../payment.model';
import { PaymentsService } from '../payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.sass']
})
export class PaymentsComponent implements OnInit {

  constructor( 
    private readonly paymentsService: PaymentsService,
    private readonly navigationService: NavigationService,
  ) { }

  public displayedColumns: string[] = [ 'paymentAt', 'bank', 'company', 'charge', 'type', 'actions' ];
  public dataSource: PaymentModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void {
    this.navigationService.setTitle('Ingresos');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.fetchData();
    this.fetchCount();
  }

  fetchData() {
    this.navigationService.loadBarStart();
    this.paymentsService.getPaymentsByPage(this.pageIndex + 1, this.pageSize).subscribe(payments => {
      this.navigationService.loadBarFinish();
      this.dataSource = payments;
    });
  }

  fetchCount() {
    this.paymentsService.getCountPayments().subscribe(count => {
      this.length = count;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
    this.fetchCount();
  }

}
