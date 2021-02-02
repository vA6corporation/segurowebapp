import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CustomersService } from '../customers.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.sass']
})
export class CustomersComponent implements OnInit {

  constructor(
    private customersService: CustomersService,
  ) {}
    
  public displayedColumns: string[] = [ 'document', 'name', 'email', 'phoneNumber', 'actions' ];
  public dataSource: Customer[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  handlePageEvent(event: PageEvent): void {
    this.customersService.getCustomersByPage(event.pageIndex + 1, event.pageSize).subscribe(customers => {
      this.dataSource = customers;
    });
  }
  
  ngOnInit(): void {
    this.customersService.getCustomersCount().subscribe(count => {
      this.length = count;
    });
    this.customersService.getCustomersByPage(this.pageIndex + 1, this.pageSize).subscribe(customers => {
      this.dataSource = customers;
    });
  }
}