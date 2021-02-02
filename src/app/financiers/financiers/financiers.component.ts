import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FinanciersService } from '../financiers.service';
import { Financier } from '../financier.model';

@Component({
  selector: 'app-financiers',
  templateUrl: './financiers.component.html',
  styleUrls: ['./financiers.component.sass']
})
export class FinanciersComponent implements OnInit {

  constructor(
    private financiersService: FinanciersService,
  ) {}
    
  public displayedColumns: string[] = [ 'ruc', 'name', 'email', 'phoneNumber', 'actions' ];
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
    this.financiersService.getCount().subscribe(count => {
      this.length = count;
    });
    this.financiersService.getFinanciersByPage(this.pageIndex + 1, this.pageSize).subscribe(financiers => {
      this.dataSource = financiers;
    });
  }
}
