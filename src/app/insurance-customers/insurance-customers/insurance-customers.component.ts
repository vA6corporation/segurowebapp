import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { CustomerModel } from 'src/app/customers/customer.model';
// import { CustomersService } from 'src/app/customers/customers.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { InsuranceCustomersService } from '../insurance-customers.service';

@Component({
  selector: 'app-insurance-customers',
  templateUrl: './insurance-customers.component.html',
  styleUrls: ['./insurance-customers.component.sass']
})
export class InsuranceCustomersComponent implements OnInit {

  constructor(
    private readonly customersService: InsuranceCustomersService,
    private readonly navigationService: NavigationService,
  ) { }
    
  public displayedColumns: string[] = [ 'document', 'name', 'email', 'phoneNumber', 'actions' ];
  public dataSource: CustomerModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }
    
  ngOnInit(): void {
    this.navigationService.setTitle('Clientes');

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_customers', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.customersService.getCustomersCount().subscribe(count => {
      this.length = count;
    });

    this.customersService.getCustomersByPage(this.pageIndex + 1, this.pageSize).subscribe(customers => {
      this.dataSource = customers;
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
      this.navigationService.loadBarStart();
      this.customersService.getCustomersByAny(key).subscribe(customers => {
        this.navigationService.loadBarFinish();
        this.dataSource = customers;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'export_customers': {
          this.downloadExcel();
          break;
        }
        default:
          break;
      }
    });
  }

  downloadExcel() {
    this.navigationService.loadBarStart();
    this.customersService.getCustomers().subscribe(customers => {
      this.navigationService.loadBarFinish();
      const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
      let body = [];
      body.push([
        'RUC',
        'RAZON SOCIAL',
        'EMAIL',
        'CELULAR',
      ]);
      for (const customer of customers) {
        body.push([
          customer.document,
          customer.name,
          customer.email,
          customer.mobileNumber,
        ]);
      }
      const name = `CLIENTES_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
      buildExcel(body, name, wscols, [], []);
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.customersService.getCustomersByPage(event.pageIndex + 1, event.pageSize).subscribe(customers => {
      this.dataSource = customers;
    });
  }

}
