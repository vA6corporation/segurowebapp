import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CustomersService } from '../customers.service';
import { CustomerModel } from '../customer.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { buildExcel } from 'src/app/xlsx';
import { MatDialog } from '@angular/material/dialog';
import { DialogConstructionCustomersComponent } from '../dialog-construction-customers/dialog-construction-customers.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.sass']
})
export class CustomerModelsComponent implements OnInit {

  constructor(
    private readonly customersService: CustomersService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
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
      this.customersService.getCustomersByKey(key).subscribe(customers => {
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

  onShowConstructions(customerId: string) {
    const dialogRef = this.matDialog.open(DialogConstructionCustomersComponent, {
      width: '600px',
      position: { top: '20px' },
      data: customerId,
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