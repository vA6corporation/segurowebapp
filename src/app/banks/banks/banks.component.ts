import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BankModel } from 'src/app/providers/bank.model';
import { UserModel } from 'src/app/users/user.model';
import { BanksService } from '../banks.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.sass']
})
export class BanksComponent implements OnInit {

  constructor(
    private readonly banksService: BanksService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  public users: UserModel[] = [];
  public displayedColumns: string[] = [ 'bankName', 'accountNumber', 'actions' ];
  public dataSource: BankModel[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
      
  ngOnInit(): void {
    this.navigationService.setTitle('Cuentas bancarias');
    this.fetchData();
  }

  handlePageEvent(event: PageEvent): void {
    this.navigationService.loadBarStart();
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    const queryParams: Params = { pageIndex: this.pageIndex, pageSize: this.pageSize };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }

  fetchData() {
    this.navigationService.loadBarFinish();
    this.banksService.getBanks().subscribe(banks => {
      this.dataSource = banks;
      this.navigationService.loadBarFinish();
    }, (error: HttpErrorResponse) => {
      this.navigationService.showMessage(error.error.message);
    });
  }

}
