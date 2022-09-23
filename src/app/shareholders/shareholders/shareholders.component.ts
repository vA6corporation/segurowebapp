import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { DialogConstructionBusinessesComponent } from 'src/app/businesses/dialog-construction-businesses/dialog-construction-businesses.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ShareholderModel } from '../shareholder.model';
import { ShareholdersService } from '../shareholders.service';

@Component({
  selector: 'app-shareholders',
  templateUrl: './shareholders.component.html',
  styleUrls: ['./shareholders.component.sass']
})
export class ShareholdersComponent implements OnInit {

  constructor(
    private readonly shareholdersService: ShareholdersService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
  ) { }
    
  public displayedColumns: string[] = [ 'document', 'name', 'email', 'mobileNumber', 'actions' ];
  public dataSource: ShareholderModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }
    
  ngOnInit(): void {
    this.navigationService.setTitle('Accionistas');

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_businesses', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.shareholdersService.getShareholdersCount().subscribe(count => {
      this.length = count;
    });

    this.shareholdersService.getShareholdersByPage(this.pageIndex + 1, this.pageSize).subscribe(businesses => {
      this.dataSource = businesses;
    });
  }

  onShowConstructions(businessId: string) {
    const dialogRef = this.matDialog.open(DialogConstructionBusinessesComponent, {
      width: '600px',
      position: { top: '20px' },
      data: businessId,
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.shareholdersService.getShareholdersByPage(event.pageIndex + 1, event.pageSize).subscribe(shareholders => {
      this.dataSource = shareholders;
    });
  }

}
