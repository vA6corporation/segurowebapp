import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Compliance } from 'src/app/compliances/compliance.model';
import { DialogComplianceComponent } from 'src/app/compliances/dialog-compliance/dialog-compliance.component';
import { DialogDirectComponent } from 'src/app/directs/dialog-direct/dialog-direct.component';
import { Direct } from 'src/app/directs/direct.model';
import { DialogMaterialComponent } from 'src/app/materials/dialog-material/dialog-material.component';
import { Material } from 'src/app/materials/material.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ReportsService } from 'src/app/reports/reports.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  constructor(
    private readonly matDialog: MatDialog,
    private readonly navigationService: NavigationService,
    private readonly reportsService: ReportsService,
  ) { }

  private handlerSearch$: Subscription = new Subscription();
  public displayedColumns: string[] = [ 'guaranteeType', 'partnership', 'customer', 'policyNumber', 'endDate', 'actions' ];
  public dataSource: any[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void {
    this.navigationService.setTitle('Buscar');

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);
    
    this.handlerSearch$ = this.navigationService.handlerSearch().subscribe((key: string) => {
      this.navigationService.loadBarStart();
      this.reportsService.getGuarantiesByAny(key).subscribe(materials => {
        console.log(materials);
        this.dataSource = materials;
        this.navigationService.loadBarFinish();
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });
  }

  ngOnDestroy() {
    this.handlerSearch$.unsubscribe();
  }

  onShowDetails(guarantee: Direct|Compliance|Material) {
    switch (guarantee.guaranteeType) {
      case 'GAMF':
        this.matDialog.open(DialogMaterialComponent, {
          position: { top: '20px' },
          data: guarantee._id,
        });
        break;
      case 'GADF':
        this.matDialog.open(DialogDirectComponent, {
          position: { top: '20px' },
          data: guarantee._id,
        });
        break;
      case 'GFCF':
        this.matDialog.open(DialogComplianceComponent, {
          position: { top: '20px' },
          data: guarantee._id,
        });
        break;
    }
  }

}
