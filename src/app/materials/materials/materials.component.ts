import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogMaterialComponent } from '../dialog-material/dialog-material.component';
import { Material } from '../material.model';
import { MaterialsService } from '../materials.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.sass']
})
export class MaterialsComponent implements OnInit {

  constructor(
    private readonly materialsService: MaterialsService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
  ) { }

  private handleSearch$: Subscription = new Subscription();

  public displayedColumns: string[] = [ 'partnership', 'customer', 'policyNumber', 'startDate', 'endDate', 'price', 'actions' ];
  public dataSource: Material[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void {
    this.navigationService.setTitle('Adelanto de materiales');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.fetchData();
    this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
      this.navigationService.loadBarStart();
      this.materialsService.getMaterialsByAny(key).subscribe(materials => {
        this.navigationService.loadBarFinish();
        this.dataSource = materials;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });
  }

  async onRenewGuarantee(guarantee: any) {
    guarantee.status = '02';
    switch (guarantee.guaranteeType) {
      case 'GAMF':
        this.materialsService.update(guarantee, guarantee._id).toPromise();
        break;
      // case 'GADF':
      //   this.directsService.update(guarantee, guarantee._id).toPromise();
      //   break;
      // case 'GFCF':
      //   this.compliancesService.update(guarantee, guarantee._id).toPromise();
      //   break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onNotRenewGuarantee(guarantee: any) {
    guarantee.status = '03';
    switch (guarantee.guaranteeType) {
      case 'GAMF':
        this.materialsService.update(guarantee, guarantee._id).toPromise();
        break;
      // case 'GADF':
      //   this.directsService.update(guarantee, guarantee._id).toPromise();
      //   break;
      // case 'GFCF':
      //   this.compliancesService.update(guarantee, guarantee._id).toPromise();
      //   break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onFreeGuarantee(guarantee: any) {
    guarantee.status = '04';
    switch (guarantee.guaranteeType) {
      case 'GAMF':
        this.materialsService.update(guarantee, guarantee._id).toPromise();
        break;
      // case 'GADF':
      //   this.directsService.update(guarantee, guarantee._id).toPromise();
      //   break;
      // case 'GFCF':
      //   this.compliancesService.update(guarantee, guarantee._id).toPromise();
      //   break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onNotLookGuarantee(guarantee: any) {
    guarantee.status = '01';
    switch (guarantee.guaranteeType) {
      case 'GAMF':
        this.materialsService.update(guarantee, guarantee._id).toPromise();
        break;
      // case 'GADF':
      //   this.directsService.update(guarantee, guarantee._id).toPromise();
      //   break;
      // case 'GFCF':
      //   this.materialsService.update(guarantee, guarantee._id).toPromise();
      //   break;
    }
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
  }

  handlePageEvent(event: PageEvent): void {
    this.materialsService.getMaterialsByPage(event.pageIndex + 1, event.pageSize).subscribe(materials => {
      this.dataSource = materials;
    });
  }

  sendMail(materialId: string): void {
    this.navigationService.loadBarStart();
    this.materialsService.sendMail(materialId).subscribe(mail => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage(`Enviado correctamente a: ${mail.to}`);
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage(error.error.message);
    });
  }

  onShowDetails(materialId: string) {
    this.matDialog.open(DialogMaterialComponent, {
      position: { top: '20px' },
      data: materialId,
    });
  }

  async onDelete(materialId: string) {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      await this.materialsService.delete(materialId).toPromise();
      this.navigationService.showMessage('Eliminado correctamente');
      this.fetchData();
    }
  }

  async fetchData() {
    this.length = await this.materialsService.getMaterialsCount().toPromise();
    this.dataSource = await this.materialsService.getMaterialsByPage(this.pageIndex + 1, this.pageSize).toPromise();
  }
}
