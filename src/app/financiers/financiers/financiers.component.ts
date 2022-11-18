import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FinancierModelsService } from '../financiers.service';
import { FinancierModel } from '../financier.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financiers',
  templateUrl: './financiers.component.html',
  styleUrls: ['./financiers.component.sass']
})
export class FinancierModelsComponent implements OnInit {

  constructor(
    private readonly financiersService: FinancierModelsService,
    private readonly navigationService: NavigationService,
  ) { }
    
  private handleSearch$: Subscription = new Subscription();

  public displayedColumns: string[] = [ 'document', 'name', 'email', 'mobileNumber', 'primaPercentage', 'actions' ];
  public dataSource: FinancierModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  handlePageEvent(event: PageEvent): void {
    this.financiersService.getFinancierModelsByPage(event.pageIndex + 1, event.pageSize).subscribe(financiers => {
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
    
    this.financiersService.getFinancierModelsByPage(this.pageIndex + 1, this.pageSize).subscribe(financiers => {
      this.dataSource = financiers;
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
      this.navigationService.loadBarStart();
      this.financiersService.getFinancierModelsByKey(key).subscribe(financiers => {
        this.navigationService.loadBarFinish();
        this.dataSource = financiers;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });
  }

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
  }
}
