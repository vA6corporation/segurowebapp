import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { Compliance } from '../compliance.model';
import { CompliancesService } from '../compliances.service';

@Component({
  selector: 'app-compliances',
  templateUrl: './compliances.component.html',
  styleUrls: ['./compliances.component.sass']
})
export class CompliancesComponent implements OnInit {

  constructor(
    private compliancesService: CompliancesService,
    private matSnackBar: MatSnackBar,
    private navigationService: NavigationService,
  ) { }

  public displayedColumns: string[] = [ 'partnership', 'customer', 'policyNumber', 'startDate', 'endDate', 'price', 'actions' ];
  public dataSource: Compliance[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private subscription: Subscription = new Subscription();

  handlePageEvent(event: PageEvent): void {
    this.compliancesService.getCompliancesByPage(event.pageIndex + 1, event.pageSize).subscribe(compliances => {
      this.dataSource = compliances;
    });
  }

  sendMail(complianceId: string): void {
    this.navigationService.loadBarStart();
    this.compliancesService.sendMail(complianceId).subscribe(compliance => {
      this.navigationService.loadBarFinish();
      const { customer } = compliance;
      this.matSnackBar.open(`Enviado correctamente a: ${customer?.email}`, 'Aceptar', {
        duration: 5000,
      });
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.matSnackBar.open(error.error.message, 'Aceptar', {
        duration: 5000,
      });
    });
  }

  ngOnInit(): void {
    this.compliancesService.getCompliancesCount().subscribe(count => {
      this.length = count;
    });
    this.compliancesService.getCompliancesByPage(this.pageIndex + 1, this.pageSize).subscribe(compliances => {
      console.log(compliances);
      this.dataSource = compliances;
    });
    this.subscription = this.navigationService.searchState$.subscribe((key: string) => {
      this.compliancesService.getCompliancesByAny(key).subscribe(compliances => {
        this.dataSource = compliances;
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
