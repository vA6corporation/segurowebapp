import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { Partnership } from '../partnership.model';
import { PartnershipsService } from '../partnerships.service';

@Component({
  selector: 'app-partnerships',
  templateUrl: './partnerships.component.html',
  styleUrls: ['./partnerships.component.sass']
})
export class PartnershipsComponent implements OnInit {

  constructor(
    private partnershipsService: PartnershipsService,
    private navigationService: NavigationService,
    private matSnackBar: MatSnackBar,
  ) { }
    
  public displayedColumns: string[] = [ 'document', 'name', 'actions' ];
  public dataSource: Partnership[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private subscription: Subscription = new Subscription();

  handlePageEvent(event: PageEvent): void {
    this.partnershipsService.getPartnershipsByPage(event.pageIndex + 1, event.pageSize).subscribe(partnerships => {
      this.dataSource = partnerships;
    });
  }
  
  ngOnInit(): void {
    this.partnershipsService.getPartnershipsCount().subscribe(count => {
      this.length = count;
    });
    this.partnershipsService.getPartnershipsByPage(this.pageIndex + 1, this.pageSize).subscribe(partnerships => {
      console.log(partnerships);
      this.dataSource = partnerships;
    });
    this.subscription = this.navigationService.searchState$.subscribe((key: string) => {
      this.partnershipsService.getPartnershipsByAny(key).subscribe(partnerships => {
        this.dataSource = partnerships;
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
