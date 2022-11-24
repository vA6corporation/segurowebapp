import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private readonly activatedRoute: ActivatedRoute,
  ) { }
    
  public displayedColumns: string[] = [ 'document', 'name', 'address', 'email', 'mobileNumber', 'actions' ];
  public dataSource: ProviderModel[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

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

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'export_excel': {

        }
      }
    });

    this.activatedRoute.queryParams.subscribe(params => {
      
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
      relativeTo: this.activatedRoute,
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

  onDelete(providerId: string) {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      this.providersService.delete(providerId).subscribe(() => {
        this.navigationService.showMessage('Eliminado correctamente');
        this.fetchData();
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
