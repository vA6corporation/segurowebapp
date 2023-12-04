import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { FideicomisoModel } from 'src/app/fideicomisos/fideicomiso.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { FideicomisosService } from '../fideicomisos.service';

@Component({
  selector: 'app-fideicomisos',
  templateUrl: './fideicomisos.component.html',
  styleUrls: ['./fideicomisos.component.sass']
})
export class FideicomisosComponent implements OnInit {

  constructor(
    private readonly fideicomisosService: FideicomisosService,
    private readonly navigationService: NavigationService,
  ) { }

  public displayedColumns: string[] = [ 'customer', 'financier', 'partnership', 'emitionAt', 'actions' ];
  public dataSource: FideicomisoModel[] = [];
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

    this.navigationService.setTitle('Fideicomisos');

    this.fideicomisosService.getCountFideicomisos().subscribe(count => {
      this.length = count;
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      // this.navigationService.loadBarStart();
    });
    
    this.fetchData();

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {

      if (id == 'export_excel') {
        this.navigationService.loadBarStart();
        this.fideicomisosService.getFideicomisos().subscribe(fideicomisos => {
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

          for (const fideicomiso of fideicomisos) {
            body.push([
              formatDate(new Date(fideicomiso.emitionAt), 'dd/MM/yyyy', 'en-US'),
              fideicomiso.partnership ? fideicomiso.partnership.name : '',
              fideicomiso.business.name,
              fideicomiso.financier.name,
              fideicomiso.charge,
              fideicomiso.commission,
              fideicomiso.days
            ]);
          }

          const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
          buildExcel(body, name, wscols, [], []);
        });
      }

    });
  }

  onExportPdf(fideicomisoId: string) {
    this.navigationService.loadBarStart();
    this.fideicomisosService.getFideicomisoById(fideicomisoId).subscribe(async fideicomiso => {
      this.navigationService.loadBarFinish();
      // if (fideicomiso.company) {
      //   const pdf = await buildFideicomiso(fideicomiso, fideicomiso.bank);
      //   pdf.save(`ORDEN_DE_SERVICIO_${fideicomiso.partnership ? fideicomiso.partnership.name : fideicomiso.business.name}.pdf`);
      // }
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.fideicomisosService.getFideicomisosByPage(event.pageIndex + 1, event.pageSize).subscribe(fideicomisos => {
      this.dataSource = fideicomisos;
    });
  }

  onShowDetails(fideicomisoId: string) {
    // this.matDialog.open(DialogDetailCreditsComponent, {
    //   position: { top: '20px' },
    //   data: fideicomisoId,
    // });
  }

  async onDelete(fideicomisoId: string) {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      this.navigationService.loadBarStart();
      this.fideicomisosService.delete(fideicomisoId).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Eliminado correctamente');
        this.dataSource = this.dataSource.filter(e => e._id !== fideicomisoId);
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

  async fetchData() {
    this.navigationService.loadBarStart();
    this.fideicomisosService.getFideicomisosByPage(this.pageIndex + 1, this.pageSize).subscribe(fideicomisos => {
      console.log(fideicomisos);
      this.navigationService.loadBarFinish();
      this.dataSource = fideicomisos;
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage(error.error.message);
    });
  }

}
