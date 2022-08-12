import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Compliance } from 'src/app/compliances/compliance.model';
import { CompliancesService } from 'src/app/compliances/compliances.service';
import { DialogComplianceComponent } from 'src/app/compliances/dialog-compliance/dialog-compliance.component';
import { DialogDirectComponent } from 'src/app/directs/dialog-direct/dialog-direct.component';
import { Direct } from 'src/app/directs/direct.model';
import { DirectsService } from 'src/app/directs/directs.service';
import { DialogMaterialComponent } from 'src/app/materials/dialog-material/dialog-material.component';
import { Material }from 'src/app/materials/material.model';
import { MaterialsService } from 'src/app/materials/materials.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ReportsService } from 'src/app/reports/reports.service';
import { UserModel } from 'src/app/users/user.model';

@Component({
  selector: 'app-search-commercial',
  templateUrl: './search-commercial.component.html',
  styleUrls: ['./search-commercial.component.sass']
})
export class SearchCommercialComponent implements OnInit {

  constructor(
    private readonly matDialog: MatDialog,
    private readonly navigationService: NavigationService,
    private readonly reportsService: ReportsService,
    private readonly authService: AuthService,
    private readonly materialsService: MaterialsService,
    private readonly directsService: DirectsService,
    private readonly compliancesService: CompliancesService,
  ) { }

  public displayedColumns: string[] = [ 'guaranteeType', 'partnership', 'customer', 'policyNumber', 'endDate', 'price', 'status', 'actions' ];
  public displayedColumnsGuarantee: string[] = [ 'partnership', 'customer', 'policyNumber', 'startDate', 'endDate', 'price', 'actions' ];
  public guaranties: any[] = [];
  public dataSource: any[] = [];
  public dataSourceMaterials: any[] = [];
  public dataSourceCompliances: any[] = [];
  public dataSourceDirects: any[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private key: string = '';
  public processStatusCode = '';
  public status = '';
  private user: UserModel|null = null;
  private workerId: string = '';
  public tabIndex: number = 0;

  private handleClickMenu$: Subscription = new Subscription();
  private handleSearch$: Subscription = new Subscription();
  private user$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleClickMenu$.unsubscribe();
    this.handleSearch$.unsubscribe();
    this.user$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Buscar');

    this.user$ = this.authService.handleAuth().subscribe(auth => {
      this.user = auth.user;
      console.log(this.user);
      
      if (!this.user?.workerId) {
        alert('Este modulo no puede funcionar si no tienes un COMERCIAL asignado');
      } else {
        this.workerId = this.user.workerId || '';
        this.materialsService.getMaterialsByCommercialPage(this.workerId, this.pageIndex + 1, this.pageSize).subscribe(materials => {
          this.dataSourceMaterials = materials;
        });
        this.compliancesService.getCompliancesByCommercialPage(this.workerId, this.pageIndex + 1, this.pageSize).subscribe(compliances => {
          this.dataSourceCompliances = compliances;
        });
        this.directsService.getDirectsByCommercialPage(this.workerId, this.pageIndex + 1, this.pageSize).subscribe(directs => {
          this.dataSourceDirects = directs;
        });
      }
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.key = key;
      this.tabIndex = 3;
      this.fetchData();
    });
    
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      // { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'export_excel': {
          // this.downloadExcel();
          break;
        }
        default:
          break;
      }
    });
  }

  private fetchData() {
    this.navigationService.loadBarStart();
      this.reportsService.getGuarantiesByCommercialKey(this.workerId, this.key).subscribe(guaranties => {
        this.navigationService.loadBarFinish();
        this.guaranties = guaranties;
        if (this.processStatusCode) {
          this.dataSource = guaranties.filter(e => e.processStatusCode === this.processStatusCode);
        } else {
          this.dataSource = guaranties;
        }
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
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

  handlePageEvent(event: PageEvent): void {
    // this.navigationService.loadBarStart();
    // this.constructionsService.getConstructionsByPage(event.pageIndex + 1, event.pageSize).subscribe(constructions => {
    //   this.navigationService.loadBarFinish();
    //   this.dataSource = constructions;
    // });
  }

}
