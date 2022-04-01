import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { randomColor } from 'src/app/randomColor';
import { ReportsService } from 'src/app/reports/reports.service';
import { UserModel } from 'src/app/users/user.model';
import { UsersService } from 'src/app/users/users.service';
import { buildExcel } from 'src/app/xlsx';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { CreditsService } from '../credits.service';
Chart.register(...registerables);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {

  constructor(
    private readonly creditsService: CreditsService,
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly matDialog: MatDialog
  ) { }
    
  @ViewChild('collectionChart') 
  private collectionChart!: ElementRef<HTMLCanvasElement>;

  public chart: Chart|null = null;

  public formGroup = this.formBuilder.group({
    workerId: '',
    startDate: [ new Date(), Validators.required ],
    endDate: [ new Date(), Validators.required ],
  });

  private workers$: Subscription = new Subscription();
  public workers: WorkerModel[] = [];

  // private guaranties: string[] = ["GFCF", "GADF", "GAMF"]
  
  ngOnDestroy() {
    this.workers$.unsubscribe();
  }

  ngOnInit() {
    this.navigationService.setTitle("Linea de creditos");

    this.navigationService.setMenu([
      // { id: 'search', label: 'Buscar', icon: 'search', show: true },
      { id: 'excel_simple', label: 'Exportar Excel', icon: 'file_download', show: false },
    ]);

    this.workers$ = this.workersService.getWorkers().subscribe(workers => {
      this.workers = workers;
    });
  }

  ngAfterViewInit() {
    this.fetchData();
  }

  fetchData() {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const { startDate, endDate, workerId } = this.formGroup.value;
      const params = { workerId };
      this.creditsService.getSummary(
        startDate,
        endDate,
        params
      ).subscribe(value => {
        this.navigationService.loadBarFinish();
        console.log(value);
        
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
      //   console.log(collection);
      //   this.navigationService.loadBarFinish();
      //   const { payedCompliance, payedMaterial, payedDirect, notPayedCompliance, notPayedMaterial, notPayedDirect } = collection;
      //   const colors = [randomColor(), randomColor(), randomColor()];

      //   this.emitionCount = payedMaterial.emitionCount + payedDirect.emitionCount + payedCompliance.emitionCount + notPayedMaterial.emitionCount + notPayedDirect.emitionCount + notPayedCompliance.emitionCount;
      //   this.renovationCount = payedMaterial.renovationCount + payedDirect.renovationCount + payedCompliance.renovationCount + notPayedMaterial.renovationCount + notPayedCompliance.renovationCount + notPayedCompliance.renovationCount;

      //   this.chartPayed?.destroy();
      //   this.compliancePayed = payedCompliance.emitionPrima + payedCompliance.renovationPrima;
      //   this.directPayed = payedDirect.emitionPrima + payedDirect.renovationPrima;
      //   this.materialPayed = payedMaterial.emitionPrima + payedMaterial.renovationPrima;

      //   const dataPrice = {
      //     datasets: [
      //       {
      //         label: 'Dataset 1',
      //         data: [this.compliancePayed, this.directPayed, this.materialPayed],
      //         backgroundColor: colors,
      //         fill: true
      //       },
      //     ]
      //   };
    
      //   const configPrice = {
      //     type: 'pie' as ChartType,
      //     data: dataPrice,
      //     plugins: [ChartDataLabels],
      //     options: {
      //       maintainAspectRatio: false,
      //       plugins: {
      //         datalabels: {
      //           backgroundColor: function(ctx) {
      //             return 'rgba(73, 79, 87, 0.5)'
      //           },
      //           borderRadius: 4,
      //           color: 'white',
      //           font: {
      //             weight: 'bold'
      //           },
      //           formatter: (value, ctx) => {
      //             if (value) {
      //               return this.guaranties[ctx.dataIndex];
      //             } else {
      //               return null;
      //             }
      //           },
      //           padding: 6
      //         },
      //       }
      //     } as ChartOptions,
      //   };
      //   const canvasPrice = this.collectionChart.nativeElement;
      //   this.chart = new Chart(canvasPrice, configPrice);
      // }, (error: HttpErrorResponse) => {
      //   this.navigationService.showMessage(error.error.message);
      //   this.navigationService.loadBarFinish();
      // });
    }
  }

  onChangeCategory() {
    this.fetchData();
  }

  onChangeUser() {
    this.fetchData();
  }

  onRangeChange() {
    this.fetchData();
  }

  onChange() {
    this.fetchData();
  }

}
