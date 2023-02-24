import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs/internal/Subscription';
import { buildCreditLine } from 'src/app/buildCreditLine';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { CreditModel } from '../credit.model';
import { CreditsService } from '../credits.service';
import { DialogDetailCreditsComponent } from '../dialog-detail-credits/dialog-detail-credits.component';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.sass']
})
export class CreditsComponent implements OnInit {

  constructor(
    private readonly creditsService: CreditsService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
  ) { }

  public displayedColumns: string[] = [ 'business', 'financier', 'partnership', 'emitionAt', 'days', 'prima', 'actions' ];
  public dataSource: CreditModel[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }

  ngOnInit(): void {

    this.navigationService.setTitle('Lineas de credito');

    this.creditsService.getCountCredits().subscribe(count => {
      this.length = count;
    });

    this.navigationService.setMenu([
      { id: 'search', label: '', icon: 'search', show: true },
      { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false },
    ]);

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.navigationService.loadBarStart();
      this.creditsService.getCreditsByKey(key).subscribe(credits => {
        this.navigationService.loadBarFinish();
        this.dataSource = credits;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });
    
    this.fetchData();

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {

      if (id == 'export_excel') {
        this.navigationService.loadBarStart();
        this.creditsService.getCredits().subscribe(credits => {
          this.navigationService.loadBarFinish();
          const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
          let body = [];
          body.push([
            'F. DE EMISION',
            'CONSORCIO',
            'CLIENTE',
            'FINANCIERA',
            'MONTO',
            'PRIMA',
            'DIAS',
          ]);

          for (const credit of credits) {
            body.push([
              formatDate(new Date(credit.emitionAt), 'dd/MM/yyyy', 'en-US'),
              credit.partnership ? credit.partnership.name : '',
              credit.business.name,
              credit.financier.name,
              credit.charge,
              credit.commission,
              credit.days
            ]);
          }

          const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
          buildExcel(body, name, wscols, [], []);
        });
      }

    });
  }

  onExportPdf(creditId: string) {
    this.navigationService.loadBarStart();
    this.creditsService.getCreditById(creditId).subscribe(async credit => {
      this.navigationService.loadBarFinish();
      for (const payment of credit.payments) {
        const pdf = await buildCreditLine(credit, payment.bank, payment.company);
        pdf.save(`ORDEN_DE_SERVICIO_${credit.partnership ? credit.partnership.name : credit.business.name}.pdf`);
      }
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.creditsService.getCreditsByPage(event.pageIndex + 1, event.pageSize).subscribe(credits => {
      this.dataSource = credits;
    });
  }

  onShowDetails(creditId: string) {
    this.matDialog.open(DialogDetailCreditsComponent, {
      position: { top: '20px' },
      data: creditId,
    });
  }

  async onDelete(creditId: string) {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      this.navigationService.loadBarStart();
      this.creditsService.delete(creditId).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Eliminado correctamente');
        this.dataSource = this.dataSource.filter(e => e._id !== creditId);
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

  async fetchData() {
    this.navigationService.loadBarStart();
    this.creditsService.getCreditsByPage(this.pageIndex + 1, this.pageSize).subscribe(credits => {
      this.navigationService.loadBarFinish();
      console.log(credits);
      this.dataSource = credits;
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage(error.error.message);
    });
  }

}
