import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ConstructionModel } from '../construction.model';
import { ConstructionsService } from '../constructions.service';

@Component({
  selector: 'app-update-percent-completions',
  templateUrl: './update-percent-completions.component.html',
  styleUrls: ['./update-percent-completions.component.sass']
})
export class UpdatePercentCompletionsComponent implements OnInit {

  constructor(
    private readonly navigationService: NavigationService,
    private readonly constructionsService: ConstructionsService,
  ) { }

  public displayedColumns: string[] = [ 
    'emitionAt',
    'code',
    'business',
    'partnership', 
    'percentCompletion',
    'actions' 
  ];
  public dataSource: ConstructionModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void {
    this.navigationService.setTitle('Actualizacion de avance de obras');
    this.constructionsService.getUpdatePercentCompletions().subscribe(constructions => {
      this.dataSource = constructions;
      this.length = constructions.length;
      this.pageSize = constructions.length;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // this.fetchData();
  }

}
