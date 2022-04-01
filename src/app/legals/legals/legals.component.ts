import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Params } from '@angular/router';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { randomColor } from 'src/app/randomColor';
import { ReportsService } from 'src/app/reports/reports.service';
import { UserModel } from 'src/app/users/user.model';
import { UsersService } from 'src/app/users/users.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { formatDate } from '@angular/common';
import { buildExcel } from 'src/app/xlsx';
Chart.register(...registerables);

@Component({
  selector: 'app-legals',
  templateUrl: './legals.component.html',
  styleUrls: ['./legals.component.sass']
})
export class LegalsComponent implements OnInit {

  constructor(
    private readonly reportsService: ReportsService,
    private readonly usersService: UsersService,
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog
  ) { }

  public displayedColumns: string[] = [ 'guaranteeType', 'partnership', 'customer', 'policyNumber', 'endDate', 'price' ];
  public dataSource: any[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  private users$: Subscription = new Subscription();
  public users: UserModel[] = [];
  public compliancePayed: number = 0;
  public materialPayed: number = 0;
  public directPayed: number = 0;

  public complianceNotPayed: number = 0;
  public materialNotPayed: number = 0;
  public directNotPayed: number = 0;

  public emitionCount: number = 0;
  public renovationCount: number = 0;
  public isEmition: boolean|null = null;

  private guaranties: string[] = ["GFCF", "GADF", "GAMF"]

  public statusForm = this.formBuilder.group({
    processStatusCode: '',
  });

  public customerForm = this.formBuilder.group({
    name: [ null, Validators.required ],
    _id: [ null, Validators.required ],
  });

  public financierForm = this.formBuilder.group({
    name: [ null, Validators.required ],
    _id: [ null, Validators.required ],
  });

  onSetEmition(isEmition: boolean) {
    this.isEmition = isEmition;
    this.fetchData();
  }
  
  ngOnDestroy() {
    this.users$.unsubscribe();
  }

  ngOnInit() {
    this.navigationService.setTitle("Documentacion Legal");

    this.navigationService.setMenu([
      // { id: 'search', label: 'Buscar', icon: 'search', show: true },
      { id: 'excel_simple', label: 'Exportar Excel', icon: 'file_download', show: false },
    ]);

    this.users$ = this.usersService.getActiveUsers().subscribe(users => {
      this.users = users;
    });

    this.navigationService.handleClickMenu().subscribe(id => {
      const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
      let body = [];
      body.push([
        'GARANTIA',
        'FINANCIERA',
        'CONSORCIO',
        'CLIENTE',
        'N° DE POLIZA',
        'SUMA ASEGURADA',
        'PRIMA',
        'E. DE TRAMITE',
        'E. DE REVISION',
        'F. CUMPLIMIENTO',
      ]);

      for (const guarantee of this.dataSource) {
        const { customer, partnership, financier } = guarantee;
        body.push([
          guarantee.guaranteeType,
          financier?.name || null,
          partnership?.name || null,
          customer?.name || null,
          guarantee.policyNumber,
          guarantee.price,
          guarantee.prima,
          guarantee.processStatus,
          guarantee.statusLabel,
          formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
        ]);
      }
      const name = `CLIENTES_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
      buildExcel(body, name, wscols, [], []);
    });
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

  onSelectionChange() {
    this.fetchData();
  }

  fetchData() {
    if (this.financierForm.valid) {
      this.navigationService.loadBarStart();

      const params: any = {
        financierId: this.financierForm.value._id,
      }

      if (this.statusForm.valid) {
        params.processStatusCode = this.statusForm.value.processStatusCode;
      }

      if (this.customerForm.valid) {
        params.customerId = this.customerForm.value._id;
      }

      this.reportsService.getGuarantiesByFinancierModelCustomerModelStatus(params).subscribe(guaranties => {
        this.navigationService.loadBarFinish();
        this.dataSource = guaranties;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
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
