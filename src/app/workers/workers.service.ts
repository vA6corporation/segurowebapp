import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { SummaryCommission } from './summary-commission.model';
import { WorkerModel } from './worker.model';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  private workers$: BehaviorSubject<WorkerModel[]>|null = null;

  getWorkersByPage(pageIndex: number, pageSize: number) {
    return this.httpService.get(`workers/byPage/${pageIndex}/${pageSize}`);
  }

  getWorkersByKey(key: string): Observable<WorkerModel[]> {
    return this.httpService.get(`workers/byKey/${key}`);
  }

  getCommissions(
    startDate: string,
    endDate: string
  ): Observable<SummaryCommission[]> {
    return this.httpService.get(`workers/commissions/${startDate}/${endDate}`);
  }

  getCommissionsByYear(
    year: number
  ): Observable<any[]> {
    return this.httpService.get(`workers/commissionsByYear/${year}`);
  }

  getWorkerById(workerId: string): Observable<WorkerModel> {
    return this.httpService.get(`workers/byId/${workerId}`);
  }

  getCountWorkers() {
    return this.httpService.get('workers/countWorkers');
  }

  getCountDeletedWorkers() {
    return this.httpService.get('workers/countDeletedWorkers');
  }

  getDeletedWorkersByPage(pageIndex: number, pageSize: number) {
    return this.httpService.get(`workers/deletedByPage/${pageIndex}/${pageSize}`);
  }

  getCountWorkersByOffice() {
    return this.httpService.get('workers/countWorkersByOffice');
  }

  create(worker: WorkerModel) {
    return this.httpService.post('workers', { worker });
  }

  update(worker: WorkerModel, workerId: string): Observable<void> {
    return this.httpService.put(`workers/${workerId}`, { worker });
  }

  handleWorkers(): Observable<WorkerModel[]> {
    if (this.workers$ == null) {
      this.workers$ = new BehaviorSubject<WorkerModel[]>([]);
      this.loadWorkers();
    }
    return this.workers$.asObservable();
  }

  loadWorkers() {
    this.httpService.get('workers').subscribe(workers => {
      this.workers$?.next(workers);
    });
  }

  getGoalByYear(year: string): Observable<any> {
    return this.httpService.get(`workers/goalByYear/${year}`);
  }

  createGoal(goal: any) {
    return this.httpService.post('workers/createGoal', { goal });
  }

  delete(workerId: string) {
    return this.httpService.delete(`workers/${workerId}`);
  } 

  restore(workerId: string) {
    return this.httpService.delete(`workers/restore/${workerId}`);
  } 

}
