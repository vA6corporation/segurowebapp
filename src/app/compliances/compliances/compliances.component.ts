import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { Compliance } from '../compliance.model';
import { CompliancesService } from '../compliances.service';
import { DialogComplianceComponent } from '../dialog-compliance/dialog-compliance.component';

@Component({
  selector: 'app-compliances',
  templateUrl: './compliances.component.html',
  styleUrls: ['./compliances.component.sass']
})
export class CompliancesComponent implements OnInit {

  constructor(
    private readonly compliancesService: CompliancesService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
  ) { }

  private handlerSearch$: Subscription = new Subscription();

  public displayedColumns: string[] = [ 'partnership', 'customer', 'policyNumber', 'startDate', 'endDate', 'price', 'actions' ];
  public dataSource: Compliance[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void {
    this.navigationService.setTitle('Fiel complimiento');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.fetchData();
    this.handlerSearch$ = this.navigationService.handlerSearch().subscribe((key: string) => {
      this.compliancesService.getCompliancesByAny(key).subscribe(compliances => {
        this.dataSource = compliances;
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
      });
    });
  }

  ngOnDestroy() {
    this.handlerSearch$.unsubscribe();
  }

  handlePageEvent(event: PageEvent): void {
    this.compliancesService.getCompliancesByPage(event.pageIndex + 1, event.pageSize).subscribe(compliances => {
      this.dataSource = compliances;
    });
  }

  sendMail(complianceId: string): void {
    this.navigationService.loadBarStart();
    this.compliancesService.sendMail(complianceId).subscribe(mail => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage(`Enviado correctamente a: ${mail.to}`);
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage(error.error.message);
    });
  }

  onShowDetails(complianceId: string) {
    this.matDialog.open(DialogComplianceComponent, {
      position: { top: '20px' },
      data: complianceId,
    });
  }

  async onDelete(complianceId: string) {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      await this.compliancesService.delete(complianceId).toPromise();
      this.navigationService.showMessage('Eliminado correctamente');
      this.fetchData();
    }
  }
  
  async fetchData() {
    this. length = await this.compliancesService.getCompliancesCount().toPromise();
    this.dataSource = await this.compliancesService.getCompliancesByPage(this.pageIndex + 1, this.pageSize).toPromise();
  }

}
