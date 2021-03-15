import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { Direct } from '../direct.model';
import { DirectsService } from '../directs.service';

@Component({
  selector: 'app-directs',
  templateUrl: './directs.component.html',
  styleUrls: ['./directs.component.sass']
})
export class DirectsComponent implements OnInit {

  constructor(
    private directsService: DirectsService,
    private navigationService: NavigationService,
    private matSnackBar: MatSnackBar,
  ) { }

  public displayedColumns: string[] = [ 'partnership', 'customer', 'policyNumber', 'startDate', 'endDate', 'price', 'actions' ];
  public dataSource: Direct[] = [];
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public length: number = 100;
  private subscription: Subscription = new Subscription();

  handlePageEvent(event: PageEvent): void {
    this.directsService.getDirectsByPage(event.pageIndex + 1, event.pageSize).subscribe(materials => {
      this.dataSource = materials;
    });
  }

  sendMail(directId: string): void {
    this.navigationService.loadBarStart();
    this.directsService.sendMail(directId).subscribe(direct => {
      this.navigationService.loadBarFinish();
      const { customer } = direct;
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
    this.directsService.getDirectsCount().subscribe(count => {
      this.length = count;
    });
    this.directsService.getDirectsByPage(this.pageIndex + 1, this.pageSize).subscribe(directs => {
      this.dataSource = directs;
    });
    this.subscription = this.navigationService.searchState$.subscribe((key: string) => {
      this.directsService.getDirectsByAny(key).subscribe(directs => {
        this.dataSource = directs;
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
