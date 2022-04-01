import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs/internal/Subscription';
import { DialogMaterialComponent } from 'src/app/materials/dialog-material/dialog-material.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CreditModel } from '../credit.model';
import { CreditsService } from '../credits.service';

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

  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  public displayedColumns: string[] = [ 'customer', 'financier', 'partnership', 'emitionAt', 'days', 'prima', 'actions' ];
  public dataSource: CreditModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }

  ngOnInit(): void {

    this.navigationService.setTitle('Lineas de credito');
    
    this.fetchData();

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      // { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {

      if (id == 'export_excel') {
        this.navigationService.loadBarStart();
        this.navigationService.loadBarFinish();
        const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
        let body = [];
        body.push([
          'CONSORCIO',
          'CLIENTE',
          'N° POLIZA',
          'OBJETO',
          'F. DE INICIO',
          'F. DE CUMPLIMIENTO',
          'SUMA ASEGURADA',
          'PRIMA',
          'GARANTIA',
          'COMISION',
          'ESTADO DE TRAMITE',
          'ESTADO DE OBRA',
          'P. A CARGO'
        ]);
      }

    });
  }

  handlePageEvent(event: PageEvent): void {
    // this.materialsService.getMaterialsByPage(event.pageIndex + 1, event.pageSize).subscribe(materials => {
    //   this.dataSource = materials;
    // });
  }

  onShowDetails(materialId: string) {
    this.matDialog.open(DialogMaterialComponent, {
      position: { top: '20px' },
      data: materialId,
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
