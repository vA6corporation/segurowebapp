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
    private readonly partnershipsService: PartnershipsService,
    private readonly navigationService: NavigationService,
  ) { }
    
  private handleSearch$: Subscription = new Subscription();

  public displayedColumns: string[] = [ 'document', 'name', 'customer', 'actions' ];
  public dataSource: Partnership[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  
  ngOnInit(): void {
    this.navigationService.setTitle('Consorcios');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.partnershipsService.getPartnershipsCount().subscribe(count => {
      this.length = count;
    });

    this.partnershipsService.getPartnershipsByPage(this.pageIndex + 1, this.pageSize).subscribe(partnerships => {
      console.log(partnerships);
      this.dataSource = partnerships;
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
      this.navigationService.loadBarStart();
      this.partnershipsService.getPartnershipsByAny(key).subscribe(partnerships => {
        this.navigationService.loadBarFinish();
        this.dataSource = partnerships;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });
  }

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
  }


  handlePageEvent(event: PageEvent): void {
    this.partnershipsService.getPartnershipsByPage(event.pageIndex + 1, event.pageSize).subscribe(partnerships => {
      this.dataSource = partnerships;
    });
  }

}
