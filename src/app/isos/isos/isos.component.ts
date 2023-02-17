import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { buildIso } from 'src/app/buildIso';
import { IsoModel } from 'src/app/isos/iso.model';
import { IsosService } from 'src/app/isos/isos.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';

@Component({
  selector: 'app-isos',
  templateUrl: './isos.component.html',
  styleUrls: ['./isos.component.sass']
})
export class IsosComponent implements OnInit {

  constructor(
    private readonly isosService: IsosService,
    private readonly navigationService: NavigationService,
  ) { }

  public displayedColumns: string[] = [ 'business', 'financier', 'partnership', 'emitionAt', 'days', 'prima', 'actions' ];
  public dataSource: IsoModel[] = [];
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

    this.navigationService.setTitle('Isos');

    this.isosService.getCountIsos().subscribe(count => {
      this.length = count;
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      // this.navigationService.loadBarStart();
      // this.isosService.getIsosByKey(key).subscribe(isos => {
      //   this.navigationService.loadBarFinish();
      //   this.dataSource = isos;
      // }, (error: HttpErrorResponse) => {
      //   this.navigationService.loadBarFinish();
      //   this.navigationService.showMessage(error.error.message);
      // });
    });
    
    this.fetchData();

    this.navigationService.setMenu([
      { id: 'search', label: '', icon: 'search', show: true },
      { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {

      if (id == 'export_excel') {
        this.navigationService.loadBarStart();
        this.isosService.getIsos().subscribe(isos => {
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

          for (const iso of isos) {
            body.push([
              formatDate(new Date(iso.emitionAt), 'dd/MM/yyyy', 'en-US'),
              iso.partnership ? iso.partnership.name : '',
              iso.business.name,
              iso.financier.name,
              iso.charge,
              iso.commission,
              iso.days
            ]);
          }

          const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
          buildExcel(body, name, wscols, [], []);
        });
      }

    });
  }

  onExportPdf(isoId: string) {
    this.navigationService.loadBarStart();
    this.isosService.getIsoById(isoId).subscribe(async iso => {
      this.navigationService.loadBarFinish();
      if (iso.company) {
        const pdf = await buildIso(iso, iso.bank);
        pdf.save(`ORDEN_DE_SERVICIO_${iso.partnership ? iso.partnership.name : iso.business.name}.pdf`);
      }
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.isosService.getIsosByPage(event.pageIndex + 1, event.pageSize).subscribe(isos => {
      this.dataSource = isos;
    });
  }

  onShowDetails(isoId: string) {
    // this.matDialog.open(DialogDetailCreditsComponent, {
    //   position: { top: '20px' },
    //   data: isoId,
    // });
  }

  async onDelete(isoId: string) {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      this.navigationService.loadBarStart();
      this.isosService.delete(isoId).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Eliminado correctamente');
        this.dataSource = this.dataSource.filter(e => e._id !== isoId);
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

  async fetchData() {
    this.navigationService.loadBarStart();
    this.isosService.getIsosByPage(this.pageIndex + 1, this.pageSize).subscribe(isos => {
      this.navigationService.loadBarFinish();
      this.dataSource = isos;
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage(error.error.message);
    });
  }

}
