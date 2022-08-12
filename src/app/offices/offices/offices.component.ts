import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OfficeModel } from 'src/app/auth/office.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { OfficesService } from '../offices.service';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.sass']
})
export class OfficesComponent implements OnInit {

  constructor(
    private readonly navigationService: NavigationService,
    private readonly officesService: OfficesService,
  ) { }

  public displayedColumns: string[] = [ 'name', 'address', 'actions' ];
  public dataSource: OfficeModel[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void {
    this.navigationService.setTitle('Oficinas');
    this.navigationService.backTo();
    this.officesService.getOffices().subscribe(offices => {
      console.log(offices);
      
      return this.dataSource = offices;
    }, (error: HttpErrorResponse) => {
      this.navigationService.showMessage(error.error.message);
    });
  }

}
