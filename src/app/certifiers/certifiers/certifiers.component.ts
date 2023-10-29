import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CertifierModel } from '../certifier.model';
import { CertifiersService } from '../certifiers.service';

@Component({
  selector: 'app-certifiers',
  templateUrl: './certifiers.component.html',
  styleUrls: ['./certifiers.component.sass']
})
export class CertifiersComponent implements OnInit {

  constructor( 
    private readonly certifiersService: CertifiersService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  public displayedColumns: string[] = [ 'name', 'email', 'actions' ];
  public dataSource: CertifierModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  private queryParams$: Subscription = new Subscription();

  ngOnDestroy() {
    this.queryParams$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Certificadoras');
    // this.navigationService.setMenu([
    //   { id: 'search', label: 'search', icon: 'search', show: true }
    // ]);

    this.queryParams$ = this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
      const { pageIndex, pageSize } = params;
      
      if (pageIndex && pageSize) {
        this.pageIndex = Number(pageIndex);
        this.pageSize = Number(pageSize);
      }
      
      this.fetchData();
      this.fetchCount();
    });
  }

  fetchCount() {
    this.certifiersService.getCountCertifiers().subscribe(count => {
      this.length = count;
    });
  }

  fetchData() {
    this.navigationService.loadBarStart();
    this.certifiersService.getCertifiersByPage(this.pageIndex + 1, this.pageSize).subscribe(certifiers => {
      this.navigationService.loadBarFinish();
      this.dataSource = certifiers;
    });
  }

  handlePageEvent(event: PageEvent): void {
    const { pageIndex, pageSize } = event;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;

    const queryParams: Params = { pageIndex, pageSize };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });

    this.fetchData();
  }

}
