import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { PartnershipModel } from '../partnership.model';
import { PartnershipsService } from '../partnerships.service';

@Component({
  selector: 'app-partnerships',
  templateUrl: './partnerships.component.html',
  styleUrls: ['./partnerships.component.sass']
})
export class PartnershipsComponent implements OnInit {

  constructor(
    private readonly partnershipsService: PartnershipsService,
    private readonly navigationService: NavigationService,
  ) { }

  public displayedColumns: string[] = [ 'document', 'name', 'business', 'actions' ];
  public dataSource: PartnershipModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private params: Params = {};

  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }
  
  ngOnInit(): void {
    this.navigationService.setTitle('Consorcios Admin');

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.fetchData();
    this.fetchCount();

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
              item.business.name,
              item.representative,
            ]);
          }
  
          const name = `CONSORCIOS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
          buildExcel(body, name, wscols, [], []);
        });
      }
    });
  }

  fetchCount() {
    this.partnershipsService.getPartnershipsCount(this.params).subscribe(count => {
      this.length = count;
    });
  }

  fetchData() {
    this.partnershipsService.getPartnershipsByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(partnerships => {
      this.dataSource = partnerships;
    });
  }

  onDelete(partnershipId: string) {
    const ok = confirm('Estas seguro de anular?...');
    if (ok) {
      this.navigationService.loadBarStart();
      this.partnershipsService.delete(partnershipId).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.dataSource = this.dataSource.filter(e => e._id !== partnershipId);
        this.navigationService.showMessage('Eliminado correctamente');
      });
    }
  }

  handlePageEvent(event: PageEvent): void {
    // this.partnershipsService.getPartnershipsByPage(event.pageIndex + 1, event.pageSize).subscribe(partnerships => {
    //   this.dataSource = partnerships;
    // });
  }

}
