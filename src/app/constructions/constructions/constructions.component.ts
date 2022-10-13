import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { OfficeModel } from 'src/app/auth/office.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { OfficesService } from 'src/app/offices/offices.service';
import { buildExcel } from 'src/app/xlsx';
import { ConstructionModel } from '../construction.model';
import { ConstructionsService } from '../constructions.service';
import { DialogAddBailComponent } from '../dialog-add-bail/dialog-add-bail.component';
import { DialogDetailConstructionsComponent } from '../dialog-detail-constructions/dialog-detail-constructions.component';

@Component({
  selector: 'app-constructions',
  templateUrl: './constructions.component.html',
  styleUrls: ['./constructions.component.sass']
})
export class ConstructionsComponent implements OnInit {

  constructor(
    private readonly constructionsService: ConstructionsService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly officesService: OfficesService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }
    
  public displayedColumns: string[] = [ 
    'emitionAt',
    'code',
    'object', 
    'worker',
    'office',
    'business',
    'partnership', 
    'actions' 
  ];
  public dataSource: ConstructionModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public formGroup: FormGroup = this.formBuilder.group({
    officeId: '',
    startDate: [ new Date(), Validators.required ],
    endDate: [ new Date(), Validators.required ],
  });
  public offices: OfficeModel[] = [];
  private office: OfficeModel = new OfficeModel();

  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();
  private handleAuth$: Subscription = new Subscription();
  private queryParams$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
    this.handleAuth$.unsubscribe();
    this.queryParams$.unsubscribe();
  }
    
  ngOnInit(): void {
    this.navigationService.setTitle('Obras');

    this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
      this.office = auth.office;
    });

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_constructions', label: 'Exportar excel por fecha', icon: 'download', show: false },
      { id: 'export_constructions_office', label: 'Exportar excel por oficina', icon: 'download', show: false },
      { id: 'export_constructions_all', label: 'Exportar excel todos', icon: 'download', show: false },
    ]);

    this.officesService.getActiveOffices().subscribe(offices => {
      this.offices = offices;
    });

    this.queryParams$ = this.route.queryParams.pipe(first()).subscribe(params => {
      const { startDate, endDate, key } = params;
      if (key) {
        this.constructionsService.getConstructionsByKey(key).subscribe(constructions => {
          this.navigationService.loadBarFinish();
          this.dataSource = constructions;
        });
      } else {
        if (startDate && endDate) {
          this.formGroup.get('startDate')?.patchValue(new Date(Number(startDate)));
          this.formGroup.get('endDate')?.patchValue(new Date(Number(endDate)));
        }
        this.fetchData();
      }
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.navigationService.loadBarStart();
      
      const queryParams: Params = { startDate: null, endDate: null, pageIndex: 0, key };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      this.constructionsService.getConstructionsByKey(key).subscribe(constructions => {
        this.navigationService.loadBarFinish();
        this.dataSource = constructions;
      });
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {

      switch (id) {
        case 'export_constructions': {
          const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
          let body = [];
          body.push([
            'AVANCE (%)',
            'ESTADO DE O.',
            'CLIENTE',
            'CONSORCIO',
            'PERSONAL',
            'OBJETO',
          ]);
          for (const construction of this.dataSource) {
            body.push([
              construction.percentageOfCompletion,
              construction.constructionCodeType,
              construction.business.name,
              construction.partnership?.name,
              construction.worker?.name,
              construction.object,
            ]);
          }
          const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
          buildExcel(body, name, wscols, [], []);
          break;
        }
        case 'export_constructions_all': {
          this.navigationService.loadBarStart();
          this.constructionsService.getConstructions().subscribe(constructions => {
            this.navigationService.loadBarFinish();
            const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
            let body = [];
            body.push([
              'AVANCE (%)',
              'ESTADO DE O.',
              'CLIENTE',
              'CONSORCIO',
              'PERSONAL',
              'OBJETO',
            ]);
            for (const construction of constructions) {
              body.push([
                construction.percentageOfCompletion,
                construction.constructionCodeType,
                construction.business.name,
                construction.partnership?.name,
                construction.worker?.name,
                construction.object,
              ]);
            }
            const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
            buildExcel(body, name, wscols, [], []);
          });
          break;
        }
        case 'export_constructions_office': {
          this.navigationService.loadBarStart();
          this.constructionsService.getConstructionsByOffice().subscribe(constructions => {
            this.navigationService.loadBarFinish();
            const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
            let body = [];
            body.push([
              'AVANCE (%)',
              'ESTADO DE O.',
              'CLIENTE',
              'CONSORCIO',
              'PERSONAL',
              'OBJETO',
            ]);
            for (const construction of constructions) {
              body.push([
                construction.percentageOfCompletion,
                construction.constructionCodeType,
                construction.business.name,
                construction.partnership?.name,
                construction.worker?.name,
                construction.object,
              ]);
            }
            const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}_${this.office.name.toUpperCase()}`;
            buildExcel(body, name, wscols, [], []);
          }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(error.error.message);
          });
          break;
        }
        default:
          break;
      }

    });
  }

  onAddBail(constructionId: string) {
    this.matDialog.open(DialogAddBailComponent, {
      data: constructionId,
      width: '600px',
      position: { top: '20px' }
    });
  }

  onChangeOffice() {
    this.pageIndex = 0;
    this.fetchData();
  }

  onRangeChange() {
    if (this.formGroup.valid) {
      this.pageIndex = 0;
      const { startDate, endDate } = this.formGroup.value;

      const queryParams: Params = { startDate: startDate.getTime(), endDate: endDate.getTime(), pageIndex: 0, key: null };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
      this.fetchData();
    }
  }

  fetchData() {
    if (this.formGroup.valid) {
      const { startDate, endDate, officeId } = this.formGroup.value;
      const params = { officeId };
      this.navigationService.loadBarStart();
      this.constructionsService.getConstructionsByRangeDatePage(
        startDate, 
        endDate, 
        this.pageIndex + 1, 
        this.pageSize, 
        params
      ).subscribe(constructions => {
        this.navigationService.loadBarFinish();
        this.dataSource = constructions;
        console.log(constructions);
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
  
      this.constructionsService.getCountConstructionsByRangeDate(startDate, endDate, params).subscribe(count => {
        this.length = count;
      });
    }
  }

  onShowDetails(constructionId: string) {
    this.matDialog.open(DialogDetailConstructionsComponent, {
      width: '100vw',
      // height: '90vh',
      position: { top: '20px' },
      data: constructionId,
    });
  }

  onDelete(constructionId: string) {
    const ok = confirm('Esta seguro de anular?...');
    if (ok) {
      this.navigationService.loadBarStart();
      this.constructionsService.delete(constructionId).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.dataSource = this.dataSource.filter(e => e._id !== constructionId);
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
        this.navigationService.loadBarFinish();
      });
    }
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
  }

}
