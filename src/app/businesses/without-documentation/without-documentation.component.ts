import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ConstructionPdfTypes } from 'src/app/constructions/construction-pdf.enum';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogDetailConstructionsComponent } from 'src/app/constructions/dialog-detail-constructions/dialog-detail-constructions.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BusinessModel } from '../business.model';
import { BusinessesService } from '../businesses.service';

@Component({
  selector: 'app-without-documentation',
  templateUrl: './without-documentation.component.html',
  styleUrls: ['./without-documentation.component.sass']
})
export class WithoutDocumentationComponent implements OnInit {

  constructor(
    private readonly businessesService: BusinessesService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder, 
  ) { }
    
  public displayedColumns: string[] = [ 
    'index',
    'code', 
    'document',
    'completion',
    'partnership', 
    'construction',
    'legal',
    'pro',
    'voucher',
    'actions' 
  ];
  public dataSource: BusinessModel[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public documentCount: number = 0;
  public completionCount: number = 0;
  public partnershipCount: number = 0;
  public constructionCount: number = 0;
  public legalCount: number = 0;
  public proCount: number = 0;
  public voucherCount: number = 0;
  private params: Params = {};

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    startDate: [ null, Validators.required ],
    endDate: [ null, Validators.required ]
  });

  public financierForm: UntypedFormGroup = this.formBuilder.group({
    name: [ null, Validators.required ],
    _id: [ null, Validators.required ],
  });

  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();
  private queryParams$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
    this.queryParams$.unsubscribe();
  }
    
  ngOnInit(): void {
    this.navigationService.setTitle('Empresas sin documentacion');

    this.navigationService.setMenu([
      // { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    // this.constructionsService.getCountConstructionsWithoutDocumentation().subscribe(count => {
    //   this.length = count;
    // });

    this.queryParams$ = this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
      // const { startDate, endDate, financier } = params;
      // if (startDate && endDate) {
      //   this.formGroup.patchValue({ 
      //     startDate: new Date(startDate),
      //     endDate: new Date(endDate) 
      //   });
      //   Object.assign(this.params, { 
      //     startDate: new Date(startDate),
      //     endDate: new Date(endDate) 
      //   });
      // }
      // if (financier) {
      //   const financierParse = JSON.parse(financier);
      //   this.financierForm.patchValue(financierParse);
      //   Object.assign(this.params, { financierId: financierParse._id });
      // }
      this.fetchData();
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      // switch (id) {
      //   case 'export_excel':
      //     const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
      //     let body = [];
      //     body.push([
      //       'CODIGO',
      //       'CONSORCIO',
      //       'EMPRESA',
      //       'DOCUMENTOS',
      //       'A. DE OBRA',
      //       'C. DE CONSOR.',
      //       'C. DE OBRA',
      //       'D. LEGAL',
      //       'BUENA PRO',
      //       'VOUCHER DE P.',
      //     ]);
      //     for (const construction of this.dataSource) {
      //       const { business, partnership } = construction;
      //       body.push([
      //         construction.code,
      //         partnership?.name,
      //         business.name,
      //         this.fileExist(construction, ConstructionPdfTypes.DOCUMENT) ? '' : 'X',
      //         this.fileExist(construction, ConstructionPdfTypes.COMPLETION) ? '' : 'X',
      //         this.fileExist(construction, ConstructionPdfTypes.PARTNERSHIP) ? '' : 'X',
      //         this.fileExist(construction, ConstructionPdfTypes.CONSTRUCTION) ? '' : 'X',
      //         this.fileExist(construction, ConstructionPdfTypes.LEGAL) ? '' : 'X',
      //         this.fileExist(construction, ConstructionPdfTypes.PRO) ? '' : 'X',
      //         this.fileExist(construction, ConstructionPdfTypes.VOUCHER) ? '' : 'X',
      //       ]);
      //     }
      //     const name = `OBRAS_SIN_DOCUMENTACION_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
      //     buildExcel(body, name, wscols, [], []);
      //     break;
      
      //   default:
      //     break;
      // }
    });
    
    // this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
    //   this.navigationService.loadBarStart();
    //   this.constructionsService.getConstructionsWithoutDocumentationByKey(key).subscribe(constructions => {
    //     this.navigationService.loadBarFinish();
    //     this.dataSource = constructions;
    //   });
    // });
  }

  onRangeChange() {
    if (this.formGroup.valid) {
      this.pageIndex = 0;

      const { startDate, endDate } = this.formGroup.value;
      const queryParams: Params = { startDate, endDate, pageIndex: 0 };

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      Object.assign(this.params, queryParams);
      this.fetchData();
    }
  }

  fetchData() {
    this.navigationService.loadBarStart();
    this.businessesService.getBusinessesWithoutDocumentation(this.params).subscribe(businesses => {
      this.navigationService.loadBarFinish();
      this.dataSource = businesses;
    });
  }

  fileExist(construction: ConstructionModel, type: string): boolean {
    if (construction.pdfs) {
      return construction.pdfs.find(e => e.type === type) ? true : false;
    } else {
      return false;
    }
  }

  countFiles(constructions: ConstructionModel[]): void {
    this.documentCount = 0;
    this.completionCount = 0;
    this.partnershipCount = 0;
    this.constructionCount = 0;
    this.legalCount = 0;
    this.legalCount = 0;
    this.proCount = 0
    this.voucherCount = 0;

    for (const construction of constructions) {
      if (construction.pdfs) {
        construction.pdfs.find(e => e.type === ConstructionPdfTypes.DOCUMENT) ? true : this.documentCount++;
        construction.pdfs.find(e => e.type === ConstructionPdfTypes.COMPLETION) ? true : this.completionCount++;
        construction.pdfs.find(e => e.type === ConstructionPdfTypes.PARTNERSHIP) ? true : this.partnershipCount++;
        construction.pdfs.find(e => e.type === ConstructionPdfTypes.CONSTRUCTION) ? true : this.constructionCount++;
        construction.pdfs.find(e => e.type === ConstructionPdfTypes.LEGAL) ? true : this.legalCount++;
        construction.pdfs.find(e => e.type === ConstructionPdfTypes.PRO) ? true : this.proCount++;
        construction.pdfs.find(e => e.type === ConstructionPdfTypes.VOUCHER) ? true : this.voucherCount++;
      }
    }

  }

  openDialogFinanciers() {
    const dialogRef = this.matDialog.open(DialogFinanciesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(financier => {
      if (financier) {
        this.financierForm.patchValue(financier);

        const queryParams: Params = { financier: JSON.stringify({ name: financier.name, _id: financier._id }) };

        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: queryParams, 
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        });

        Object.assign(this.params, { financierId: financier._id });

      } else {
        this.financierForm.patchValue({ name: null, _id: null });
      }
      this.fetchData();
    });
  }

  onShowDetails(constructionId: string) {
    this.matDialog.open(DialogDetailConstructionsComponent, {
      width: '100vw',
      // height: '90vh',
      position: { top: '20px' },
      data: constructionId,
    });
  }

}
