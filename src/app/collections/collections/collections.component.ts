import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ReportsService } from 'src/app/reports/reports.service';
import { UsersService } from 'src/app/users/users.service';
import { randomColor } from 'src/app/randomColor';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/users/user.model';
import { Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { MatDialog } from '@angular/material/dialog';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
Chart.register(...registerables);

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.sass']
})
export class CollectionsComponent implements OnInit {

  constructor(
    private readonly reportsService: ReportsService,
    private readonly usersService: UsersService,
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
  ) { }
    
  @ViewChild('collectionChartPrice') 
  private collectionChartPrice!: ElementRef<HTMLCanvasElement>;

  @ViewChild('collectionChartPrima') 
  private collectionChartPrima!: ElementRef<HTMLCanvasElement>;

  public chartPrice: Chart|null = null;
  public chartPrima: Chart|null = null;

  public customerForm = this.formBuilder.group({
    name: [ null, Validators.required ],
    _id: [ null, Validators.required ],
  });

  public financierForm = this.formBuilder.group({
    name: [ null, Validators.required ],
    _id: [ null, Validators.required ],
  });
  
  public formGroup = this.formBuilder.group({
    userId: '',
    startDate: [ new Date(), Validators.required ],
    endDate: [ new Date(), Validators.required ],
  });

  private users$: Subscription = new Subscription();
  public users: UserModel[] = [];
  public compliancePrima: number = 0;
  public materialPrima: number = 0;
  public directPrima: number = 0;

  public compliancePrice: number = 0;
  public materialPrice: number = 0;
  public directPrice: number = 0;

  public emitionCount: number = 0;
  public renovationCount: number = 0;
  public isEmition: boolean|null = null;

  private guaranties: string[] = ["GFCF", "GADF", "GAMF"]

  onSetEmition(isEmition: boolean) {
    this.isEmition = isEmition;
    this.fetchData();
  }
  
  ngOnDestroy() {
    this.users$.unsubscribe();
  }

  ngOnInit() {
    this.navigationService.setTitle("Suma Asegurada");

    this.navigationService.setMenu([
      // { id: 'search', label: 'Buscar', icon: 'search', show: true },
      { id: 'excel_simple', label: 'Exportar Excel', icon: 'file_download', show: false },
    ]);

    this.users$ = this.usersService.getActiveUsers().subscribe(users => {
      this.users = users;
    });
  }

  openDialogFinanciers() {
    const dialogRef = this.matDialog.open(DialogFinanciesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(financier => {
      if (financier) {
        this.financierForm.patchValue(financier);
      } else {
        this.financierForm.patchValue({ name: null, _id: null });
      }
      this.fetchData();
    });
  }


  ngAfterViewInit() {
    this.fetchData();
  }

  fetchData() {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const { startDate, endDate, userId } = this.formGroup.value;
      const params: Params = {
        startDate, endDate, userId
      };
      if (this.financierForm.valid) {
        params.financierId = this.financierForm.value._id;
      }

      params.isEmition = this.isEmition;

      if (this.customerForm.valid) {
        params.customerId = this.customerForm.value._id;
      }

      this.reportsService.getCollectionGuarantiesByRangeDateUser(
        params
      ).subscribe(collection => {
        this.navigationService.loadBarFinish();
        const { material, direct, compliance } = collection;
        const colors = [randomColor(), randomColor(), randomColor()];

        this.emitionCount = material.emitionCount + direct.emitionCount + compliance.emitionCount;
        this.renovationCount = material.renovationCount + direct.renovationCount + compliance.renovationCount;

        this.chartPrice?.destroy();
        this.compliancePrice = compliance.emitionPrice + compliance.renovationPrice;
        this.directPrice = direct.emitionPrice + direct.renovationPrice;
        this.materialPrice = material.emitionPrice + material.renovationPrice;

        const dataPrice = {
          datasets: [
            {
              label: 'Dataset 1',
              data: [this.compliancePrice, this.directPrice, this.materialPrice],
              backgroundColor: colors,
              fill: true
            },
          ]
        };
    
        const configPrice = {
          type: 'pie' as ChartType,
          data: dataPrice,
          plugins: [ChartDataLabels],
          options: {
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                backgroundColor: function(ctx) {
                  return 'rgba(73, 79, 87, 0.5)'
                },
                borderRadius: 4,
                color: 'white',
                font: {
                  weight: 'bold'
                },
                formatter: (value, ctx) => {
                  if (value) {
                    return this.guaranties[ctx.dataIndex];
                  } else {
                    return null;
                  }
                },
                padding: 6
              },
            }
          } as ChartOptions,
        };
        const canvasPrice = this.collectionChartPrice.nativeElement;
        this.chartPrice = new Chart(canvasPrice, configPrice);

        // this.chartPrima?.destroy();
        // this.compliancePrima = compliance.emitionPrima + compliance.renovationPrima;
        // this.directPrima = direct.emitionPrima + direct.renovationPrima;
        // this.materialPrima = material.emitionPrima + material.renovationPrima;

        // const dataPrima = {
        //   datasets: [
        //     {
        //       label: 'Dataset 1',
        //       data: [this.compliancePrima, this.directPrima, this.materialPrima],
        //       backgroundColor: colors,
        //       fill: true
        //     },
        //   ]
        // };
    
        // const configPrima = {
        //   type: 'pie' as ChartType,
        //   data: dataPrima,
        //   plugins: [ChartDataLabels],
        //   options: {
        //     maintainAspectRatio: false,
        //     plugins: {
        //       datalabels: {
        //         backgroundColor: function(ctx) {
        //           return 'rgba(73, 79, 87, 0.5)'
        //         },
        //         borderRadius: 4,
        //         color: 'white',
        //         font: {
        //           weight: 'bold'
        //         },
        //         formatter: (value, ctx) => {
        //           if (value) {
        //             return this.guaranties[ctx.dataIndex];
        //           } else {
        //             return null;
        //           }
        //         },
        //         padding: 6
        //       },
        //     }
        //   } as ChartOptions,
        // };
        // const canvasPrima = this.collectionChartPrima.nativeElement;
        // this.chartPrima = new Chart(canvasPrima, configPrima);
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
        this.navigationService.loadBarFinish();
      });
    }
  }

  openDialogCustomer() {
    const dialogRef = this.matDialog.open(DialogCustomersComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(customer => {
      if (customer) {
        this.customerForm.patchValue(customer);
      } else {
        this.customerForm.patchValue({ name: null, _id: null });
      }
      this.fetchData();
    });
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
