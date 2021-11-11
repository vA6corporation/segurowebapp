import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FinanciersService } from '../financiers.service';
import { Financier } from '../financier.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financiers',
  templateUrl: './financiers.component.html',
  styleUrls: ['./financiers.component.sass']
})
export class FinanciersComponent implements OnInit {

  constructor(
    private readonly financiersService: FinanciersService,
    private readonly navigationService: NavigationService,
  ) { }
    
  private handlerSearch$: Subscription = new Subscription();

  public displayedColumns: string[] = [ 'document', 'name', 'email', 'phoneNumber', 'actions' ];
  public dataSource: Financier[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  handlePageEvent(event: PageEvent): void {
    this.financiersService.getFinanciersByPage(event.pageIndex + 1, event.pageSize).subscribe(financiers => {
      this.dataSource = financiers;
    });
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Financieras');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.financiersService.getCount().subscribe(count => {
      this.length = count;
    });
    
    this.financiersService.getFinanciersByPage(this.pageIndex + 1, this.pageSize).subscribe(financiers => {
      this.dataSource = financiers;
    });

    this.handlerSearch$ = this.navigationService.handlerSearch().subscribe((key: string) => {
      this.financiersService.getFinanciersByAny(key).subscribe(financiers => {
        this.dataSource = financiers;
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
      });
    });
  }

  ngOnDestroy() {
    this.handlerSearch$.unsubscribe();
  }
}
