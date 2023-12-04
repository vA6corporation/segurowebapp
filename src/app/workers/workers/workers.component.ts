import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkerModel } from '../worker.model';
import { WorkersService } from '../workers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.sass']
})
export class WorkersComponent implements OnInit {

  constructor(
    private readonly workersService: WorkersService,
    private readonly navigationService: NavigationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) { }
    
  public displayedColumns: string[] = [ 'document', 'name', 'email', 'mobileNumber', 'actions' ];
  public dataSource: WorkerModel[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  private handleSearch$: Subscription = new Subscription()
  private queryParams$: Subscription = new Subscription()

  ngOnDestroy() {
    this.handleSearch$.unsubscribe()
    this.queryParams$.unsubscribe()
  }
   
  ngOnInit(): void {
    this.navigationService.setTitle('Personal')

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ])

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.navigationService.loadBarStart()
      this.workersService.getWorkersByKey(key).subscribe(workers => {
        this.navigationService.loadBarFinish()
        this.dataSource = workers
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish()
        this.navigationService.showMessage(error.error.message)
      })
    })

    this.queryParams$ = this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
      const { pageIndex, pageSize } = params

      if (pageIndex && pageSize) {
        this.pageIndex = Number(pageIndex)
        this.pageSize = Number(pageSize)
      }
      
      this.fetchData()
      this.fetchCount()
    })
  }

  fetchData() {
    this.workersService.getWorkersByPage(this.pageIndex + 1, this.pageSize).subscribe(workers => {
      this.dataSource = workers;
    })
  }

  fetchCount() {
    this.workersService.getCountWorkers().subscribe(count => {
      this.length = count
    })
  }

  onDelete(workerId: string) {
    const ok = confirm('Estas seguro de eliminar?...');
    if (ok) {
      this.navigationService.loadBarStart();
      this.workersService.delete(workerId).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.dataSource = this.dataSource.filter(e => e._id !== workerId);
      });
    }
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
