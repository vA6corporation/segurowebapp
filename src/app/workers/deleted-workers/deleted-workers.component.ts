import { Component, OnInit } from '@angular/core';
import { WorkerModel } from '../worker.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { WorkersService } from '../workers.service';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-deleted-workers',
  templateUrl: './deleted-workers.component.html',
  styleUrls: ['./deleted-workers.component.sass']
})
export class DeletedWorkersComponent implements OnInit {

  constructor(
    private readonly workersService: WorkersService,
    private readonly navigationService: NavigationService
  ) { }

  public displayedColumns: string[] = [ 'document', 'name', 'email', 'mobileNumber', 'actions' ];
  public dataSource: WorkerModel[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private subscription: Subscription = new Subscription();

  handlePageEvent(event: PageEvent): void {
    this.workersService.getDeletedWorkersByPage(event.pageIndex + 1, event.pageSize).subscribe(workers => {
      this.dataSource = workers;
    });
  }
  
  ngOnInit(): void {
    this.navigationService.setTitle('Personal');
    this.workersService.getCountDeletedWorkers().subscribe(count => {
      this.length = count;
    });

    this.workersService.getDeletedWorkersByPage(this.pageIndex + 1, this.pageSize).subscribe(workers => {
      this.dataSource = workers;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRestore(workerId: string) {
    const ok = confirm('Estas seguro de restablecer?...');
    if (ok) {
      this.navigationService.loadBarStart();
      this.workersService.restore(workerId).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.dataSource = this.dataSource.filter(e => e._id !== workerId);
      });
    }
  }

}
