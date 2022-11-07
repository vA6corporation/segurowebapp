import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ConstructionsService } from '../constructions.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Subscription } from 'rxjs';
import { buildExcel } from 'src/app/xlsx';
import { formatDate } from '@angular/common';
Chart.register(...registerables);
import { randomColor } from 'src/app/randomColor';

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
    
  @ViewChild('percentChart') 
  private percentChartViewChild!: ElementRef<HTMLCanvasElement>;
  public percentChart: Chart|null = null;

  @ViewChild('statusChart') 
  private statusChartViewChild!: ElementRef<HTMLCanvasElement>;
  public statusChart: Chart|null = null;

  public formGroup = this.formBuilder.group({
    constructionCode: '',
    percentCompletionCode: ''
  });
  public summaries: any[] = [];
  public months: any[] = [
    'ENERO',
    'FEBRERO',
    'MARZO',
    'ABRIL',
    'MAYO',
    'JUNIO',
    'JULIO',
    'AGOSTO',
    'SEPTIEMBRE',
    'OCTUBRE',
    'NOVIEMBRE',
    'DICIEMBRE',
  ];

  public constructionCodes: any = {
    "01": 'EJECUCION',
    "02": 'POR TERMINAR',
    "03": 'PARALIZADA',
    "04": 'EN ARBITRAJE',
    "05": 'ANULADA',
    "06": 'FINALIZADA',
    "07": 'AMORTIZADO',
  };

  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleClickMenu$.unsubscribe();
  }

  ngOnInit() {
    this.navigationService.setTitle("Avance de obras");

    this.navigationService.setMenu([
      { id: 'export_constructions_all', label: 'Exportar excel', icon: 'download', show: false },
    ]);


    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {

      switch (id) {
        case 'export_constructions_all': {
          if (this.formGroup.value.percentCompletionCode) {
            this.navigationService.loadBarStart();
            this.constructionsService.getConstructionsByPercentCompletion(this.formGroup.value.percentCompletionCode).subscribe(constructions => {
              this.navigationService.loadBarFinish();
              const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
              let body = [];
              body.push([
                // 'AVANCE (%)',
                'ESTADO DE O.',
                'CLIENTE',
                'CONSORCIO',
                'PERSONAL',
                'A. PROGRAMADO',
                'A. EJECUTADO',
                'MES',
                'AÑO',
                'OBJETO',
              ]);
              for (const construction of constructions) {
                body.push([
                  // construction.percentageOfCompletion,
                  construction.constructionCodeType,
                  construction.business.name,
                  construction.partnership?.name,
                  construction.worker?.name,
                  construction.percentCompletion?.percentProgrammated,
                  construction.percentCompletion?.percentCompletion,
                  construction.percentCompletion?.month ? this.months[construction.percentCompletion?.month] : '',
                  construction.percentCompletion?.year,
                  construction.object,
                ]);
              }
              const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
              buildExcel(body, name, wscols, [], []);
            });
          } else {
            this.navigationService.loadBarStart();
            this.constructionsService.getConstructions().subscribe(constructions => {
              this.navigationService.loadBarFinish();
              console.log(constructions);
              const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
              let body = [];
              body.push([
                // 'AVANCE (%)',
                'ESTADO DE O.',
                'CLIENTE',
                'CONSORCIO',
                'PERSONAL',
                'A. PROGRAMADO',
                'A. EJECUTADO',
                'MES',
                'AÑO',
                'OBJETO',
              ]);
              for (const construction of constructions) {
                body.push([
                  // construction.percentageOfCompletion,
                  construction.constructionCodeType,
                  construction.business.name,
                  construction.partnership?.name,
                  construction.worker?.name,
                  construction.percentCompletion?.percentProgrammated,
                  construction.percentCompletion?.percentCompletion,
                  construction.percentCompletion?.month ? this.months[construction.percentCompletion?.month] : '',
                  construction.percentCompletion?.year,
                  construction.object,
                ]);
              }
              const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
              buildExcel(body, name, wscols, [], []);
            });
          }
        }
      }

    });

  }

  ngAfterViewInit() {
    this.fetchData();
  }

  onRangeChange() {
    this.fetchData();
  }

  fetchData() {
    if (this.formGroup.valid) {
      const { constructionCode, percentCompletionCode } = this.formGroup.value;
      this.navigationService.loadBarStart();
      const params = { constructionCode };
      this.constructionsService.getSummaryConstructions(params).subscribe(summaries => {
        console.log(summaries);

        const colors = [
          randomColor(), 
          randomColor(), 
          randomColor(), 
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
        ];
        
        this.navigationService.loadBarFinish();
        this.statusChart?.destroy();
        const dataSet = {
          // labels: [
          //   'BIEN',
          //   'PRECAUCION',
          //   'PELIGRO',
          //   'POR INICIAR'
          // ],
          // labels,
          labels: summaries.map(e => this.constructionCodes[e._id]),
          datasets: [
            {
              label: 'Primas',
              data: summaries.map(e => e.count),
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
        const canvasPrima = this.statusChartViewChild.nativeElement;
        this.statusChart = new Chart(canvasPrima, configPrima);
      });
      this.constructionsService.getSummaryCompletions(constructionCode, percentCompletionCode).subscribe(summaries => {

        let data: any[] = [];
        let labels: any[] = [];
        let colors: any[] = [];

        if (!percentCompletionCode) {
          
          data = [
            summaries.summaryFinal,
            summaries.summaryGood,
            summaries.summaryWarning,
            summaries.summaryDanger,
            summaries.summaryInitial
          ];

          labels = [
            'FINALIZADO',
            'BIEN',
            'PRECAUCION',
            'PELIGRO',
            'POR INICIAR'
          ];
          
          colors = [
            'white',
            '#00ff00',
            '#ffff00',
            '#ff0000', 
            'gray'
          ];
        } else {

          switch (percentCompletionCode) {
            case '01':
              data = [
                summaries.summaryGood,
              ]
              labels = [
                'BIEN',
                // 'PRECAUCION',
                // 'PELIGRO',
                // 'POR INICIAR'
              ];
              colors = [
                '#00ff00',
                // '#ffff00',
                // '#ff0000', 
                // 'gray'
              ];
              break;

            case '02':
              data = [
                summaries.summaryWarning,
              ]
              labels = [
                // 'BIEN',
                'PRECAUCION',
                // 'PELIGRO',
                // 'POR INICIAR'
              ];
              colors = [
                // '#00ff00',
                '#ffff00',
                // '#ff0000', 
                // 'gray'
              ];
              break;

            case '03':
              data = [
                summaries.summaryDanger,
              ]
              labels = [
                // 'BIEN',
                // 'PRECAUCION',
                'PELIGRO',
                // 'POR INICIAR'
              ];
              colors = [
                // '#00ff00',
                // '#ffff00',
                '#ff0000', 
                // 'gray'
              ];
              break;

            case '04':
              data = [
                summaries.summaryInitial,
              ]
              labels = [
                // 'BIEN',
                // 'PRECAUCION',
                // 'PELIGRO',
                'POR INICIAR'
              ];
              colors = [
                // '#00ff00',
                // '#ffff00',
                // '#ff0000', 
                'gray'
              ];
              break;

            case '05':
              data = [
                summaries.summaryFinal,
              ]
              labels = [
                // 'BIEN',
                // 'PRECAUCION',
                // 'PELIGRO',
                'FINALIZADO'
              ];
              colors = [
                // '#00ff00',
                // '#ffff00',
                // '#ff0000', 
                'white'
              ];
              break;
          
            default:
              break;
          }

        }
        
        this.navigationService.loadBarFinish();
        this.percentChart?.destroy();
        const dataSet = {
          // labels: [
          //   'BIEN',
          //   'PRECAUCION',
          //   'PELIGRO',
          //   'POR INICIAR'
          // ],
          labels,
          datasets: [
            {
              label: 'Primas',
              data,
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
        const canvasPrima = this.percentChartViewChild.nativeElement;
        this.percentChart = new Chart(canvasPrima, configPrima);
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
        this.navigationService.loadBarFinish();
      });
    }
  }

}
