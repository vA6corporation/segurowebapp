import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { InsuranceBusinessModel } from '../insurance-business.model';
import { InsuranceBusinessesService } from '../insurance-businesses.service';

@Component({
  selector: 'app-insurance-businesses',
  templateUrl: './insurance-businesses.component.html',
  styleUrls: ['./insurance-businesses.component.sass']
})
export class InsuranceBusinessesComponent implements OnInit {

  constructor(
    private readonly businessesService: InsuranceBusinessesService,
    private readonly navigationService: NavigationService,
  ) { }
    
  public displayedColumns: string[] = [ 'document', 'name', 'email', 'mobileNumber', 'actions' ];
  public dataSource: InsuranceBusinessModel[] = [];
  public length: number = 100;
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
    this.navigationService.setTitle('Clientes');

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_businesses', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.businessesService.getBusinessesCount().subscribe(count => {
      this.length = count;
    });

    this.businessesService.getBusinessesByPage(this.pageIndex + 1, this.pageSize).subscribe(businesses => {
      this.dataSource = businesses;
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
      this.navigationService.loadBarStart();
      this.businessesService.getBusinessesByKey(key).subscribe(businesses => {
        this.navigationService.loadBarFinish();
        this.dataSource = businesses;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'export_businesses': {
          this.downloadExcel();
          break;
        }
        default:
          break;
      }
    });
  }

  downloadExcel() {
    this.navigationService.loadBarStart();
    this.businessesService.getBusinesses().subscribe(businesses => {
      this.navigationService.loadBarFinish();
      const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
      let body = [];
      body.push([
        'RUC',
        'RAZON SOCIAL',
        'EMAIL',
        'CELULAR',
      ]);
      for (const business of businesses) {
        body.push([
          business.document,
          business.name,
          business.email,
          business.mobileNumber,
        ]);
      }
      const name = `CLIENTES_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
      buildExcel(body, name, wscols, [], []);
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.businessesService.getBusinessesByPage(event.pageIndex + 1, event.pageSize).subscribe(businesses => {
      this.dataSource = businesses;
    });
  }


}
