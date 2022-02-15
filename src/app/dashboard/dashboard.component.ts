import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Compliance } from '../compliances/compliance.model';
import { DialogComplianceComponent } from '../compliances/dialog-compliance/dialog-compliance.component';
import { DialogDirectComponent } from '../directs/dialog-direct/dialog-direct.component';
import { Direct } from '../directs/direct.model';
import { DialogMaterialComponent } from '../materials/dialog-material/dialog-material.component';
import { Material } from '../materials/material.model';
import { NavigationService } from '../navigation/navigation.service';
import { ReportsService } from '../reports/reports.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(
    private readonly matDialog: MatDialog,
    private readonly navigationService: NavigationService,
    private readonly reportsService: ReportsService,
  ) { }

  private handleSearch$: Subscription = new Subscription();
  public displayedColumns: string[] = [ 'guaranteeType', 'partnership', 'customer', 'policyNumber', 'endDate', 'actions' ];
  public dataSource: any[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void {
    this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
      this.navigationService.loadBarStart();
      this.reportsService.getGuarantiesByAny(key).subscribe(materials => {
        this.navigationService.loadBarFinish();
        console.log(materials);
        this.dataSource = materials;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });
  }

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
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
