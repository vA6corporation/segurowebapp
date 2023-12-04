import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { DialogDevicesComponent } from 'src/app/devices/dialog-devices/dialog-devices.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UserModel } from 'src/app/users/user.model';
import { CustomersService } from '../customers.service';
import { CustomerModel } from '../customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.sass']
})
export class CustomersComponent implements OnInit {

  constructor( 
    private readonly customersService: CustomersService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog
  ) { }

  public displayedColumns: string[] = [ 'ruc', 'name', 'partnershipName', 'email', 'mobileNumber', 'actions' ];
  public dataSource: CustomerModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  private queryParams$: Subscription = new Subscription();

  ngOnDestroy() {
    this.queryParams$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Clientes');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.queryParams$ = this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
      const { pageIndex, pageSize } = params;
      
      if (pageIndex && pageSize) {
        this.pageIndex = Number(pageIndex);
        this.pageSize = Number(pageSize);
      }
      
      this.fetchData();
      this.fetchCount();
    });
  }

  countDevices(devices: any[]): number {
    return devices.map(e => e.isActive).length;
  }

  fetchCount() {
    this.customersService.getCountCustomers().subscribe(count => {
      this.length = count;
    });
  }

  fetchData() {
    this.navigationService.loadBarStart();
    this.customersService.getCustomersByPage(this.pageIndex + 1, this.pageSize).subscribe(customers => {
      this.navigationService.loadBarFinish();
      this.dataSource = customers;
    });
  }

  onDialogDevices(user: UserModel) {
    const dialogRef = this.matDialog.open(DialogDevicesComponent, {
      width: '600px',
      position: { top: '20px' },
      data: user.devices,
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) {
        this.fetchData();
      }
    });
  }

  handlePageEvent(event: PageEvent): void {
    const { pageIndex, pageSize } = event;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;

    const queryParams: Params = { pageIndex, pageSize };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });

    this.fetchData();
  }

}
