import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessModel } from 'src/app/auth/business.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ProviderModel } from '../provider.model';
import { ProvidersService } from '../providers.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.sass']
})
export class ProvidersComponent implements OnInit {

  constructor(
    private readonly providersService: ProvidersService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
  ) { }
    
  public displayedColumns: string[] = [ 'document', 'name', 'address', 'email', 'mobileNumber', 'actions' ];
  public dataSource: ProviderModel[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private business: BusinessModel = new BusinessModel();

  private handleClickMenu$: Subscription = new Subscription();
  private handleSearch$: Subscription = new Subscription();
  private auth$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
    this.auth$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Proveedores');

    // this.auth$ = this.authService.getAuth().pipe(first()).subscribe(auth => {
    //   this.business = auth.business;
    // });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'export_excel': {
          // this.navigationService.loadBarStart();
          // this.customersService.getCustomerModels().subscribe(customers => {
          //   this.navigationService.loadBarFinish();
          //   const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
          //   let body = [];
          //   body.push([
          //     'T. DOCUMENTO',
          //     'DOCUMENTO',
          //     'NOMBRES',
          //     'DIRECCION',
          //     'EMAIL',
          //     'CELULAR',
          //   ]);
          //   for (const customer of customers) {
          //     body.push([
          //       customer.identificationType,
          //       customer.identificationNumber,
          //       customer.name,
          //       customer.address,
          //       customer.email,
          //       customer.mobileNumber,
          //     ]);
          //   }
          //   const name = `Clientes_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}_${this.business.businessName.replace(/ /g, '_')}`;
          //   buildExcel(body, name, wscols, []);
          // }, (error: HttpErrorResponse) => {
          //   this.navigationService.showMessage(error.error.message);
          // });
        }
      }
    });

    this.route.queryParams.subscribe(params => {
      
      this.navigationService.setMenu([
        { id: 'search', label: 'Buscar', icon: 'search', show: true },
        { id: 'export_excel', label: 'Exportar Excel', icon: 'file_download', show: false },
      ]);

      const { pageIndex, pageSize } = params;
      this.pageIndex = Number(pageIndex || 0);
      this.pageSize = Number(pageSize || 10);
      this.fetchData();
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
      this.providersService.getProvidersByKey(key).subscribe(providers => {
        this.dataSource = providers;
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
      });
    });
  }

  handlePageEvent(event: PageEvent): void {
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
    this.providersService.getProvidersCount().subscribe(count => {
      this.length = count;
    });

    this.navigationService.loadBarStart();
    this.providersService.getProvidersByPage(this.pageIndex + 1, this.pageSize).subscribe(providers => {
      this.navigationService.loadBarFinish();
      this.dataSource = providers;
    });
  }

  onDelete(providersId: string) {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      // this.providersService.delete(customerId).subscribe(() => {
      //   this.navigationService.showMessage('Eliminado correctamente');
      //   this.fetchData();
      // }, (error: HttpErrorResponse) => {
      //   this.navigationService.showMessage(error.error.message);
      // });
    }
  }

}
