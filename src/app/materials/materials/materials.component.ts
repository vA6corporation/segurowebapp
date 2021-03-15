import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { Material } from '../material.model';
import { MaterialsService } from '../materials.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.sass']
})
export class MaterialsComponent implements OnInit {

  constructor(
    private materialsService: MaterialsService,
    private navigationService: NavigationService,
    private matSnackBar: MatSnackBar,
  ) { }

  public displayedColumns: string[] = [ 'partnership', 'customer', 'policyNumber', 'startDate', 'endDate', 'price', 'actions' ];
  public dataSource: Material[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private subscription: Subscription = new Subscription();

  handlePageEvent(event: PageEvent): void {
    this.materialsService.getMaterialsByPage(event.pageIndex + 1, event.pageSize).subscribe(materials => {
      this.dataSource = materials;
    });
  }

  sendMail(materialId: string): void {
    this.navigationService.loadBarStart();
    this.materialsService.sendMail(materialId).subscribe(material => {
      this.navigationService.loadBarFinish();
      const { customer } = material;
      this.matSnackBar.open(`Enviado correctamente a: ${customer?.email}`, 'Aceptar', {
        duration: 5000,
      });
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.matSnackBar.open(error.error.message, 'Aceptar', {
        duration: 5000,
      });
    });
  }
  
  ngOnInit(): void {
    this.materialsService.getMaterialsCount().subscribe(count => {
      this.length = count;
    });
    this.materialsService.getMaterialsByPage(this.pageIndex + 1, this.pageSize).subscribe(materials => {
      console.log(materials);
      this.dataSource = materials;
    });
    this.subscription = this.navigationService.searchState$.subscribe((key: string) => {
      this.materialsService.getMaterialsByAny(key).subscribe(materials => {
        this.dataSource = materials;
      }, (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000,
        });
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
