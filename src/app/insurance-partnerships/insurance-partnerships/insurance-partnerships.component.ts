import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs/internal/Subscription';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
// import { PartnershipsService } from 'src/app/partnerships/partnerships.service';
import { buildExcel } from 'src/app/xlsx';
import { InsurancePartnershipsService } from '../insurance-partnerships.service';

@Component({
  selector: 'app-insurance-partnerships',
  templateUrl: './insurance-partnerships.component.html',
  styleUrls: ['./insurance-partnerships.component.sass']
})
export class InsurancePartnershipsComponent implements OnInit {

  constructor(
    private readonly partnershipsService: InsurancePartnershipsService,
    private readonly navigationService: NavigationService,
  ) { }
    
  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  public displayedColumns: string[] = [ 'document', 'name', 'customer', 'actions' ];
  public dataSource: PartnershipModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }
  
  ngOnInit(): void {
    this.navigationService.setTitle('Consorcios');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.partnershipsService.getPartnershipsCount().subscribe(count => {
      this.length = count;
    });

    this.partnershipsService.getPartnershipsByPage(this.pageIndex + 1, this.pageSize).subscribe(partnerships => {
      console.log(partnerships);
      this.dataSource = partnerships;
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
      this.navigationService.loadBarStart();
      this.partnershipsService.getPartnershipsByKey(key).subscribe(partnerships => {
        this.navigationService.loadBarFinish();
        this.dataSource = partnerships;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      if (id === 'export_excel') {
        this.navigationService.loadBarStart();
        this.partnershipsService.getPartnerships().subscribe(partnerships => {
          this.navigationService.loadBarFinish();
          const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
          let body = [];
          body.push([
            'RUC',
            'RAZON SOCIAL',
            'OPERADOR TRIBUTARIO',
            'REPRESENTANTE LEGAL',
          ]);
  
          for (const item of partnerships) {
            body.push([
              item.document,
              item.name,
              item.customer?.name,
              item.representative,
            ]);
          }
  
          const name = `CONSORCIOS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
          buildExcel(body, name, wscols, [], []);
        });
      }
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.partnershipsService.getPartnershipsByPage(event.pageIndex + 1, event.pageSize).subscribe(partnerships => {
      this.dataSource = partnerships;
    });
  }

}
