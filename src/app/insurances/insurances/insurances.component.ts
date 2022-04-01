import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogMaterialComponent } from 'src/app/materials/dialog-material/dialog-material.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { InsuranceModel } from '../insurance.model';
import { InsurancesService } from '../insurances.service';

@Component({
  selector: 'app-insurances',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.sass']
})
export class InsurancesComponent implements OnInit {

  constructor(
    private readonly insurancesService: InsurancesService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly route: ActivatedRoute,
  ) { }

  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  public displayedColumns: string[] = [ 'partnership', 'customer', 'financier', 'policyNumber', 'emitionAt', 'expirationAt', 'prima', 'actions' ];
  public dataSource: InsuranceModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public type: string = '';

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Lineas de credito');
    this.route.params.subscribe(params => {
      this.type = params.type;
      this.navigationService.setTitle(this.type);
      this.fetchData();
    });

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

  async onDelete(insuranceId: string) {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      this.insurancesService.delete(insuranceId).subscribe(() => {
        this.navigationService.showMessage('Eliminado correctamente');
        this.dataSource = this.dataSource.filter(e => e._id !== insuranceId);
      });
    }
  }

  async fetchData() {
    this.insurancesService.getInsurancesByPageType(this.pageIndex + 1, this.pageSize, this.type).subscribe(insurances => {
      console.log(insurances);
      this.dataSource = insurances;
    }, (error: HttpErrorResponse) => {
      
    });
    // this.length = await this.materialsService.getMaterialsCount().toPromise();
    // this.dataSource = await this.materialsService.getMaterialsByPage(this.pageIndex + 1, this.pageSize).toPromise();
  }

}
