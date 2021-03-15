import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BeneficiariesService } from '../beneficiaries.service';
import { Beneficiary } from '../beneficiary.model';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.sass']
})
export class BeneficiariesComponent implements OnInit {

  constructor(
    private beneficiariesService: BeneficiariesService,
    private navigationService: NavigationService,
    private matSnackBar: MatSnackBar,
  ) { }
    
  public displayedColumns: string[] = [ 'document', 'name', 'email', 'phoneNumber', 'actions' ];
  public dataSource: Beneficiary[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private subscription: Subscription = new Subscription(); 

  handlePageEvent(event: PageEvent): void {
    this.beneficiariesService.getBeneficiariesByPage(event.pageIndex + 1, event.pageSize).subscribe(beneficiaries => {
      this.dataSource = beneficiaries;
    });
  }
  
  ngOnInit(): void {
    this.beneficiariesService.getBeneficiariesCount().subscribe(count => {
      this.length = count;
    });
    this.beneficiariesService.getBeneficiariesByPage(this.pageIndex + 1, this.pageSize).subscribe(beneficiaries => {
      this.dataSource = beneficiaries;
    });
    this.subscription = this.navigationService.searchState$.subscribe((key: string) => {
      this.beneficiariesService.getBeneficiariesByAny(key).subscribe(beneficiaries => {
        this.dataSource = beneficiaries;
      }, (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000,
        });
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
