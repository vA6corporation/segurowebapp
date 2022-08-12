import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkerModel } from '../worker.model';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.sass']
})
export class WorkersComponent implements OnInit {

  constructor(
    private readonly workersService: WorkersService,
    private readonly navigationService: NavigationService,
  ) { }
    
  public displayedColumns: string[] = [ 'document', 'name', 'email', 'mobileNumber', 'actions' ];
  public dataSource: WorkerModel[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private subscription: Subscription = new Subscription();

  handlePageEvent(event: PageEvent): void {
    this.workersService.getWorkersByPage(event.pageIndex + 1, event.pageSize).subscribe(workers => {
      this.dataSource = workers;
    });
  }
  
  ngOnInit(): void {
    this.navigationService.setTitle('Personal');
    this.workersService.getWorkersCount().subscribe(count => {
      this.length = count;
    });

    this.workersService.getWorkersByPage(this.pageIndex + 1, this.pageSize).subscribe(workers => {
      this.dataSource = workers;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

}
