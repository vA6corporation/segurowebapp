import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs/internal/Subscription';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BrokerModel } from '../broker.model';
import { BrokersService } from '../brokers.service';

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.sass']
})
export class BrokersComponent implements OnInit {

  constructor(
    private readonly brokersService: BrokersService,
    private readonly navigationService: NavigationService,
  ) { }
    
  public displayedColumns: string[] = [ 'document', 'name', 'email', 'phoneNumber', 'actions' ];
  public dataSource: BrokerModel[] = [];
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
    this.navigationService.setTitle('Brokers');

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_customers', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.navigationService.loadBarStart();
    this.brokersService.getBrokersByPage(this.pageIndex + 1, this.pageSize).subscribe(brokers => {
      this.navigationService.loadBarFinish();
      this.dataSource = brokers;
    }, (error: HttpErrorResponse) => {
      this.navigationService.showMessage(error.error.message);
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.navigationService.loadBarStart();
    this.brokersService.getBrokersByPage(event.pageIndex + 1, event.pageSize).subscribe(brokers => {
      this.navigationService.loadBarFinish();
      this.dataSource = brokers;
    }, (error: HttpErrorResponse) => {
      this.navigationService.showMessage(error.error.message);
    });
  }

}
