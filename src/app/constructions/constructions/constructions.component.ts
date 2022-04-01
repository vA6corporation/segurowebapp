import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ConstructionModel } from '../construction.model';
import { ConstructionsService } from '../constructions.service';
import { DialogDetailConstructionsComponent } from '../dialog-detail-constructions/dialog-detail-constructions.component';

@Component({
  selector: 'app-constructions',
  templateUrl: './constructions.component.html',
  styleUrls: ['./constructions.component.sass']
})
export class ConstructionsComponent implements OnInit {

  constructor(
    private readonly constructionsService: ConstructionsService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
  ) { }
    
  public displayedColumns: string[] = [ 'object', 'worker', 'actions' ];
  public dataSource: ConstructionModel[] = [];
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
    this.navigationService.setTitle('Obras');

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_customers', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.navigationService.loadBarStart();
    this.constructionsService.getConstructionsByPage(this.pageIndex + 1, this.pageSize).subscribe(constructions => {
      this.navigationService.loadBarFinish();
      this.dataSource = constructions;
    });

    this.constructionsService.getCountConstructions().subscribe(count => {
      this.length = count;
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.navigationService.loadBarStart();
      this.constructionsService.getConstructionsByKey(key).subscribe(constructions => {
        this.navigationService.loadBarFinish();
        this.dataSource = constructions;
      });
    });
  }

  onShowDetails(constructionId: string) {
    this.matDialog.open(DialogDetailConstructionsComponent, {
      width: '100vw',
      // height: '90vh',
      position: { top: '20px' },
      data: constructionId,
    });
  }

  onDelete(constructionId: string) {
    const ok = confirm('Esta seguro de anular?...');
    if (ok) {
      this.navigationService.loadBarStart();
      this.constructionsService.delete(constructionId).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.dataSource = this.dataSource.filter(e => e._id !== constructionId);
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
        this.navigationService.loadBarFinish();
      });
    }
  }

  handlePageEvent(event: PageEvent): void {
    this.navigationService.loadBarStart();
    this.constructionsService.getConstructionsByPage(event.pageIndex + 1, event.pageSize).subscribe(constructions => {
      this.navigationService.loadBarFinish();
      this.dataSource = constructions;
    });
  }

}
