import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UserModel } from 'src/app/users/user.model';
import { buildExcel } from 'src/app/xlsx';
import { PartnershipModel } from '../partnership.model';
import { PartnershipsService } from '../partnerships.service';

@Component({
  selector: 'app-partnerships-commercial',
  templateUrl: './partnerships-commercial.component.html',
  styleUrls: ['./partnerships-commercial.component.sass']
})
export class PartnershipsCommercialComponent implements OnInit {

  constructor(
    private readonly partnershipsService: PartnershipsService,
    private readonly navigationService: NavigationService,
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  public displayedColumns: string[] = [ 'document', 'name', 'business', 'actions' ];
  public dataSource: PartnershipModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private user: UserModel|null = null;
  private params: Params = {};

  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();
  private handleAuth$: Subscription = new Subscription();
  private queryParams$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
    this.handleAuth$.unsubscribe();
    this.queryParams$.unsubscribe();
  }
  
  ngOnInit(): void {
    this.navigationService.setTitle('Consorcios');

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
      this.user = auth.user;
      if (!this.user?.workerId) {
        alert('Este modulo no puede funcionar si no tienes un COMERCIAL asignado');
      } else {
        Object.assign(this.params, { workerId: this.user.workerId });
        this.queryParams$ = this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
          this.fetchData();
          this.fetchCount();
        });
      }
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
      this.navigationService.loadBarStart();
      this.partnershipsService.getPartnershipsByKey(key).subscribe(partnerships => {
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
    this.partnershipsService.getPartnershipsCount(this.params).subscribe(count => {
      this.length = count;
    });
  }

  fetchData() {
    this.partnershipsService.getPartnershipsByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(partnerships => {
      this.dataSource = partnerships;
    });
  }

  onDelete(partnershipId: string) {
    const ok = confirm('Estas seguro de anular?...');
    if (ok) {
      this.navigationService.loadBarStart();
      this.partnershipsService.delete(partnershipId).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.dataSource = this.dataSource.filter(e => e._id !== partnershipId);
        this.navigationService.showMessage('Eliminado correctamente');
      });
    }
  }

  handlePageEvent(event: PageEvent): void {
    // this.partnershipsService.getPartnershipsByPage(event.pageIndex + 1, event.pageSize).subscribe(partnerships => {
    //   this.dataSource = partnerships;
    // });
  }

}
