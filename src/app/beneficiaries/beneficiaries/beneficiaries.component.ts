import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BeneficiariesService } from '../beneficiaries.service';
import { BeneficiaryModel } from '../beneficiary.model';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.sass']
})
export class BeneficiariesComponent implements OnInit {

  constructor(
    private readonly beneficiariesService: BeneficiariesService,
    private readonly navigationService: NavigationService,
  ) { }
  
  private handleSearch$: Subscription = new Subscription(); 
  
  public displayedColumns: string[] = [ 'document', 'name', 'email', 'phoneNumber', 'actions' ];
  public dataSource: BeneficiaryModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void {
    this.navigationService.setTitle('Beneficiarios');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.beneficiariesService.getBeneficiariesCount().subscribe(count => {
      this.length = count;
    });
    
    this.navigationService.loadBarStart();
    this.beneficiariesService.getBeneficiariesByPage(this.pageIndex + 1, this.pageSize).subscribe(beneficiaries => {
      this.navigationService.loadBarFinish();
      this.dataSource = beneficiaries;
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage(error.error.message);
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
      this.navigationService.loadBarStart();
      this.beneficiariesService.getBeneficiariesByKey(key).subscribe(beneficiaries => {
        this.navigationService.loadBarFinish();
        this.dataSource = beneficiaries;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });
  }

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
  }

  handlePageEvent(event: PageEvent): void {
    this.beneficiariesService.getBeneficiariesByPage(event.pageIndex + 1, event.pageSize).subscribe(beneficiaries => {
      this.dataSource = beneficiaries;
    });
  }

}
