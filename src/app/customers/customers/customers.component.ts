import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CustomersService } from '../customers.service';
import { Customer } from '../customer.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.sass']
})
export class CustomersComponent implements OnInit {

  constructor(
    private readonly customersService: CustomersService,
    private readonly navigationService: NavigationService,
  ) { }
    
  private handlerSearch$: Subscription = new Subscription();

  public displayedColumns: string[] = [ 'document', 'name', 'email', 'phoneNumber', 'actions' ];
  public dataSource: Customer[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
    
  ngOnInit(): void {
    this.navigationService.setTitle('Clientes');

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.customersService.getCustomersCount().subscribe(count => {
      this.length = count;
    });

    this.customersService.getCustomersByPage(this.pageIndex + 1, this.pageSize).subscribe(customers => {
      this.dataSource = customers;
    });

    this.handlerSearch$ = this.navigationService.handlerSearch().subscribe((key: string) => {
      this.customersService.getCustomersByAny(key).subscribe(customers => {
        this.dataSource = customers;
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
      });
    });
  }

  ngOnDestroy() {
    this.handlerSearch$.unsubscribe();
  }

  handlePageEvent(event: PageEvent): void {
    this.customersService.getCustomersByPage(event.pageIndex + 1, event.pageSize).subscribe(customers => {
      this.dataSource = customers;
    });
  }
}