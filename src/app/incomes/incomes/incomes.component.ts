import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { IncomesService } from '../incomes.service';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.sass']
})
export class IncomesComponent implements OnInit {

  constructor( 
    private readonly incomesService: IncomesService,
    private readonly navigationService: NavigationService,
  ) { }

  public displayedColumns: string[] = [ 'name', 'email', 'isAdmin', 'actions' ];
  public dataSource: any[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void {
    
  }

}
