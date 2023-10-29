import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { PartnershipsService } from 'src/app/partnerships/partnerships.service';
import { buildExcel } from 'src/app/xlsx';

@Component({
  selector: 'app-template-partnerships',
  templateUrl: './template-partnerships.component.html',
  styleUrls: ['./template-partnerships.component.sass']
})
export class TemplatePartnershipsComponent implements OnInit {

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

  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }
  
  ngOnInit(): void {
    this.navigationService.setTitle('Consorcios para formatos');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    // this.partnershipsService.getTemplatePartnershipsCount().subscribe(count => {
    //   this.length = count;
    // });

    // this.partnershipsService.getTemplatePartnershipsByPage(this.pageIndex + 1, this.pageSize).subscribe(partnerships => {
    //   this.dataSource = partnerships;
    // });
    this.fetchData();
    this.fetchCount();

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.navigationService.loadBarStart();
      this.partnershipsService.getTemplatePartnershipsByKey(key).subscribe(partnerships => {
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
  
          for (const partnership of partnerships) {
            body.push([
              partnership.document,
              partnership.name,
              partnership.business?.name,
              partnership.representative,
            ]);
          }
  
          const name = `CONSORCIOS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
          buildExcel(body, name, wscols, [], []);
        });
      }
    });
  }

  fetchCount() {
    this.partnershipsService.getTemplatePartnershipsCount().subscribe(count => {
      this.length = count;
    });
  }

  fetchData() {
    this.navigationService.loadBarStart();
    this.partnershipsService.getTemplatePartnershipsByPage(this.pageIndex + 1, this.pageSize).subscribe(partnerships => {
      this.navigationService.loadBarFinish();
      this.dataSource = partnerships;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
  }

  onDelete(templatePartnershipId: string): void {
    this.partnershipsService.delete(templatePartnershipId).subscribe(() => {
      this.navigationService.showMessage('Eliminado correctamente');
      this.dataSource = this.dataSource.filter(e => e._id === templatePartnershipId);
      this.fetchCount();
    });
  }

}
