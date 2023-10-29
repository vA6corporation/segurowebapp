import { Component, OnInit } from '@angular/core';
import { WorkersService } from '../workers.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SummaryCommission } from '../summary-commission.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { PaymentModel } from 'src/app/payments/payment.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogPaymentsComponent } from 'src/app/payments/dialog-payments/dialog-payments.component';

@Component({
  selector: 'app-commission-workers',
  templateUrl: './commission-workers.component.html',
  styleUrls: ['./commission-workers.component.sass']
})
export class CommissionWorkersComponent implements OnInit {

  constructor(
    private readonly workersService: WorkersService,
    private readonly navigationService: NavigationService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog,
  ) { }
    
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    startDate: [ new Date(), Validators.required ],
    endDate: [ new Date(), Validators.required ],
  });
  public displayedColumns: string[] = [ 'name', 'countConstruction', 'countInsurance', 'totalCharge', 'commission', 'actions' ];
  public dataSource: SummaryCommission[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private subscription: Subscription = new Subscription();
  
  ngOnInit(): void {
    this.navigationService.setTitle('Comisiones');
    this.activatedRoute.queryParams.subscribe(queryParams => {
      const { startDate, endDate } = queryParams;
      if (startDate && endDate) {
        this.formGroup.patchValue({
          startDate: new Date(startDate),
          endDate: new Date(endDate)
        });
      }
      this.fetchData();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDialogPayments(payments: PaymentModel[]) {
    this.matDialog.open(DialogPaymentsComponent, {
      width: '600px',
      position: { top: '20px' },
      data: payments,
    });
  }

  fetchData() {
    const { startDate, endDate } = this.formGroup.value;
    this.navigationService.loadBarStart();
    this.workersService.getCommissions(startDate, endDate).subscribe(summaryCommissions => {
      this.navigationService.loadBarFinish();
      console.log(summaryCommissions);
      this.dataSource = summaryCommissions.sort((a, b) => {
        if (a.totalCharge < b.totalCharge) {
          return 1;
        }
        if (a.totalCharge > b.totalCharge) {
          return -1;
        }
        return 0;
      }).filter(e => e.totalCharge);
    });
  }

  onRangeChange() {
    if (this.formGroup.valid) {
      this.pageIndex = 0;

      const { startDate, endDate } = this.formGroup.value;

      const queryParams: Params = { startDate: startDate, endDate: endDate, pageIndex: 0 };

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      this.fetchData();
    }
  }

  handlePageEvent(event: PageEvent): void {
    this.workersService.getWorkersByPage(event.pageIndex + 1, event.pageSize).subscribe(workers => {
      this.dataSource = workers;
    });
  }
}
