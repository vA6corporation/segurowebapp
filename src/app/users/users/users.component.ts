import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UsersService } from '../users.service';
import { UserModel } from '../user.model';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  constructor( 
    private readonly usersService: UsersService,
    private readonly navigationService: NavigationService,
  ) { }

  public displayedColumns: string[] = [ 'name', 'email', 'isAdmin', 'actions' ];
  public dataSource: UserModel[] = [];
  public dataSourceDisabled: UserModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void {
    this.navigationService.setTitle('Usuarios');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.usersService.getUsersCount().subscribe(count => {
      this.length = count;
    });

    this.usersService.getActiveUsersByPage(this.pageIndex + 1, this.pageSize).subscribe(users => {
      this.dataSource = users;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.usersService.getActiveUsersByPage(event.pageIndex + 1, event.pageSize).subscribe(users => {
      this.dataSource = users;
    });
  }

  fetchDisabled(event: any) {
    if (event.index === 1) {
      this.usersService.getDisabledUsersByPage(this.pageIndex + 1, this.pageSize).subscribe(users => {
        this.dataSourceDisabled = users;
      });
    }
  }
}
