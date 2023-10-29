import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { OperationModel } from '../operation.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.sass']
})
export class OperationsComponent implements OnInit {

  constructor(
    private readonly operationsService: OperationsService, 
    private readonly navigationService: NavigationService,
  ) { }

  public displayedColumns: string[] = [ 'name', 'business', 'partnership', 'user', 'actions' ];
  public dataSource: OperationModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void {
    this.navigationService.setTitle('Operaciones');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.fetchData();
    this.fetchCount();
  }

  fetchCount() {
    this.operationsService.getCountOperations().subscribe(count => {
      this.length = count;
    });
  }

  fetchData() {
    this.operationsService.getOpeartionsByPage(this.pageIndex + 1, this.pageSize).subscribe(operations => {
      this.dataSource = operations;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
  }


}
