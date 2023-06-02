import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Params } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UserModel } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-disabled-users',
  templateUrl: './disabled-users.component.html',
  styleUrls: ['./disabled-users.component.sass']
})
export class DisabledUsersComponent implements OnInit {

  constructor(
    private readonly usersService: UsersService,
    private readonly navigationService: NavigationService,
  ) { }

  public displayedColumns: string[] = [ 'name', 'email', 'isAdmin', 'actions' ];
  public dataSource: UserModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private params: Params = { isActive: false };

  ngOnInit(): void {
    this.navigationService.setTitle('Usuarios');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.usersService.getCountUsers(this.params).subscribe(count => {
      this.length = count;
    });

    this.usersService.getUsersByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(users => {
      this.dataSource = users;
    });

    this.fetchData();
  }

  fetchData() {
    this.usersService.getUsersByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(users => {
      this.dataSource = users;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.usersService.getUsersByPage(event.pageIndex + 1, event.pageSize, this.params).subscribe(users => {
      this.dataSource = users;
    });
  }

}
