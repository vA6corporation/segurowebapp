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

  public displayedColumns: string[] = [ 'isoType', 'customer', 'certifier', 'worker', 'emitionAt', 'actions' ];
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
            'CLIENTE',
            'CERTIFICADORA',
            'MONTO',
            'COMISION',
          ]);

          for (const iso of isos) {
            body.push([
              formatDate(new Date(iso.emitionAt), 'dd/MM/yyyy', 'en-US'),
              iso.customer.name,
              iso.certifier.name,
              iso.charge,
              iso.commission,
            ]);
          }

          const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
          buildExcel(body, name, wscols, [], []);
        });
      }
    });

    this.fetchData();
    this.fetchCount();
  }

  onExportPdf(isoId: string) {
    this.navigationService.loadBarStart();
    this.isosService.getIsoById(isoId).subscribe(async iso => {
      this.navigationService.loadBarFinish();
      // if (iso.company) {
      //   const pdf = await buildIso(iso, iso.bank);
      //   pdf.save(`ORDEN_DE_SERVICIO_${iso.customer.name.toUpperCase()}.pdf`);
      // }
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.isosService.getIsosByPage(event.pageIndex + 1, event.pageSize).subscribe(isos => {
      this.dataSource = isos;
    });
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

  async fetchCount() {
    this.isosService.getCountIsos().subscribe(count => {
      this.length = count;
    });
  }

}
