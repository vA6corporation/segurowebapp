import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UserModel } from 'src/app/users/user.model';
import { buildExcel } from 'src/app/xlsx';
import { ChequeModel } from '../cheque.model';
import { ChequesService } from '../cheques.service';
import { DialogChequesComponent } from '../dialog-cheques/dialog-cheques.component';
import { DialogDetailChequesComponent } from '../dialog-detail-cheques/dialog-detail-cheques.component';

@Component({
  selector: 'app-commercial-cheques',
  templateUrl: './commercial-cheques.component.html',
  styleUrls: ['./commercial-cheques.component.sass']
})
export class CommercialChequesComponent implements OnInit {

  constructor(
    private readonly chequesService: ChequesService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly authService: AuthService,
    private readonly formBuilder: UntypedFormBuilder,
  ) { }

  public displayedColumns: string[] = [ 'guarantee', 'price', 'paymentAt', 'extensionAt', 'policyNumber', 'partnership', 'business', 'actions' ];
  public dataSource: any[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public params: Params = {
    payed: 'false',
  };
  private user: UserModel|null = null;
  private workerId: string = '';
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    startDate: [ new Date(), Validators.required ],
    endDate: [ new Date(), Validators.required ],
  });

  private handleAuth$: Subscription = new Subscription();
  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleAuth$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }

  ngOnInit(): void { 
    this.navigationService.setTitle('Garantias');
    this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
      this.user = auth.user;
      if (!this.user?.workerId) {
        alert('Este modulo no puede funcionar si no tienes un COMERCIAL asignado');
      } else {
        this.workerId = this.user.workerId || '';
        this.fetchData();
      }
    });

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_cheques', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
      let body = [];
      body.push([
        'GARANTIA',
        'MONTO',
        'F. DE PAGO',
        'F. DE PRORROGA',
        'N° DE POLIZA',
        'CONSORCIO',
        'CLIENTE'
      ]);
      for (const cheque of this.dataSource) {
        body.push([
          cheque.guarantee?.guaranteeType,
          cheque.price,
          formatDate(cheque.paymentAt, 'dd/MM/yyyy', 'en-US'),
          formatDate(cheque.extensionAt, 'dd/MM/yyyy', 'en-US'),
          cheque.guarantee?.policyNumber,
          cheque.guarantee?.partnership?.name,
          cheque.guarantee?.business?.name
        ]);
      }
      const name = `GARANTIAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
      buildExcel(body, name, wscols, [], []);
    });

    this.chequesService.getCountCheques().subscribe(count => {
      this.length = count;
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.navigationService.loadBarStart();
      this.chequesService.getByKey(key).subscribe(cheques => {
        this.navigationService.loadBarFinish();
        this.dataSource = cheques;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });
  }

  onShowDetails(chequeId: string) {
    const dialogRef = this.matDialog.open(DialogDetailChequesComponent, {
      data: chequeId,
      width: '600px',
      position: { top: '20px' }
    });
  }

  fetchData() {
    const { startDate, endDate } = this.formGroup.value;
    this.navigationService.loadBarStart();
    this.chequesService.getChequesByCommercialPage(
      startDate,
      endDate,
      this.workerId, 
      this.pageIndex + 1, 
      this.pageSize, 
      this.params
    ).subscribe(cheques => {
      this.navigationService.loadBarFinish();
      this.dataSource = cheques;
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage(error.error.message);
    });
  }

  async onDelete(chequeId: string) {
    const ok = confirm('Esta seguro de eliminar');
    if (ok) {
      this.navigationService.loadBarStart();
      await this.chequesService.deleteOne(chequeId).toPromise();
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage('Eliminado correctamente');
      this.fetchData();
    }
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
  }

  onEditCheque(cheque: ChequeModel): void {
    const dialogRef = this.matDialog.open(DialogChequesComponent, {
      width: '600px',
      position: { top: '20px' },
      data: cheque,
    });

    dialogRef.afterClosed().subscribe(async updatedCheque => {
      if (updatedCheque) {
        Object.assign(cheque, updatedCheque);
        await this.chequesService.update(updatedCheque, cheque._id).toPromise();
        this.navigationService.showMessage('Se han guardado los cambios');
      }
    });
  }

  onSelectionChange() {
    this.fetchData();
  }

  onPaid(cheque: ChequeModel) {
    const ok = confirm('Esta seguro de marcar pago?...');
    if (ok) {
      cheque.isPaid = true;
      this.chequesService.update(cheque, cheque._id || '').subscribe(cheque => {
        this.navigationService.showMessage('Pago realizado correctamente');
        this.fetchData();
      });
    }
  }

  onNotPaid(cheque: ChequeModel) {
    // const ok = confirm('Esta seguro de marcar pago?...');
    cheque.isPaid = false;
    this.chequesService.update(cheque, cheque._id || '').subscribe(cheque => {
      this.navigationService.showMessage('Desmarcado correctamente');
      this.fetchData();
    });
    // if (ok) {
    // }
  }

  onRangeChange() {
    if (this.formGroup.valid) {
      this.fetchData();
      // const { startDate, endDate } = this.formGroup.value;
      // this.navigationService.loadBarStart();
      // this.insurancesService.getInsurancesByRangeDateType(startDate, endDate, params).subscribe(guaranties => {
      //   console.log(guaranties);
      //   this.navigationService.loadBarFinish();
      //   this.dataSource = guaranties;
      // }, (error: HttpErrorResponse) => {
      //   this.navigationService.showMessage(error.error.message);
      //   this.navigationService.loadBarFinish();
      // });
    }
  }

}
