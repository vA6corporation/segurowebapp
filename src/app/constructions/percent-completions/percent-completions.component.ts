import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Params } from '@angular/router';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { InsurancesService } from 'src/app/insurances/insurances.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { randomColor } from 'src/app/randomColor';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { buildExcel } from 'src/app/xlsx';
import { ConstructionsService } from '../constructions.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables);

@Component({
  selector: 'app-percent-completions',
  templateUrl: './percent-completions.component.html',
  styleUrls: ['./percent-completions.component.sass']
})
export class PercentCompletionsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly constructionsService: ConstructionsService,
  ) { }
    
  @ViewChild('creditsChart') 
  private insurancesChart!: ElementRef<HTMLCanvasElement>;

  public chartInsurance: Chart|null = null;
  public formGroup = this.formBuilder.group({
    constructionCode: '',
  });
  public summaries: any[] = [];

  ngOnDestroy() {
  }

  ngOnInit() {
    this.navigationService.setTitle("Avance de obras");
  }

  ngAfterViewInit() {
    this.fetchData();
  }

  onRangeChange() {
    this.fetchData();
  }

  fetchData() {
    if (this.formGroup.valid) {
      const { constructionCode } = this.formGroup.value;
      this.navigationService.loadBarStart();
      this.constructionsService.getSummaryCompletions(constructionCode).subscribe(summaries => {
        
        this.navigationService.loadBarFinish();
        const colors = [
          '#00ff00',
          '#ffff00',
          '#ff0000', 
        ];
        this.chartInsurance?.destroy();
        const dataSet = {
          labels: [
            'BIEN',
            'PRECAUCION',
            'PELIGRO'
          ],
          datasets: [
            {
              label: 'Primas',
              data: [
                summaries.summaryGood,
                summaries.summaryWarning,
                summaries.summaryDanger,
              ],
              backgroundColor: colors,
            },
          ]
        };
        const configPrima = {
          type: 'pie' as ChartType,
          data: dataSet,
          plugins: [ChartDataLabels],
          options: {
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                backgroundColor: function(context) {
                  return 'rgba(73, 79, 87, 0.5)'
                  // return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                color: 'white',
                font: {
                  weight: 'bold'
                },
                formatter: function(value) {
                  if (value === 0) {
                    return null;
                  } else {
                    return Math.round(value);
                  }
                },
                padding: 6
              },
            }
          } as ChartOptions,
        };
        const canvasPrima = this.insurancesChart.nativeElement;
        this.chartInsurance = new Chart(canvasPrima, configPrima);
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
        this.navigationService.loadBarFinish();
      });
    }
  }

}
