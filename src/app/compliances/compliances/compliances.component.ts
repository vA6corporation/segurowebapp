import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { GuaranteeModel, GuaranteeStatusTypes } from 'src/app/guaranties/guarantee.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ComplianceModel } from '../compliance.model';
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

  private handleSearch$: Subscription = new Subscription();

  public displayedColumns: string[] = [ 'partnership', 'business', 'policyNumber', 'startDate', 'endDate', 'price', 'actions' ];
  public dataSource: ComplianceModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void {
    this.navigationService.setTitle('Fiel cumplimiento');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.fetchData();
    this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
      this.navigationService.loadBarStart();
      this.compliancesService.getCompliancesByKey(key).subscribe(compliances => {
        this.navigationService.loadBarFinish();
        this.dataSource = compliances;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });
  }

  async onRenewGuarantee(guarantee: GuaranteeModel) {
    guarantee.status = GuaranteeStatusTypes.RENEW;
    this.compliancesService.update(guarantee, guarantee._id).toPromise();
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onNotRenewGuarantee(guarantee: GuaranteeModel) {
    guarantee.status = GuaranteeStatusTypes.NOT_RENEW;
    this.compliancesService.update(guarantee, guarantee._id).toPromise();
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onFreeGuarantee(guarantee: GuaranteeModel) {
    guarantee.status = GuaranteeStatusTypes.FREE;
    this.compliancesService.update(guarantee, guarantee._id).toPromise();
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  async onNotLookGuarantee(guarantee: GuaranteeModel) {
    guarantee.status = GuaranteeStatusTypes.NOT_LOOK;
    this.compliancesService.update(guarantee, guarantee._id).toPromise();
    this.navigationService.showMessage('Se han guardado los cambios');
  }

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
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
