import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UsersService } from '../users.service';
import { User } from '../user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  constructor( 
    private usersService: UsersService,
  ) { }

  public displayedColumns: string[] = [ 'name', 'email', 'allGuaranties', 'actions' ];
  public dataSource: User[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  handlePageEvent(event: PageEvent): void {
    this.usersService.getUsersByPage(event.pageIndex + 1, event.pageSize).subscribe(users => {
      this.dataSource = users;
    });
  }

  ngOnInit(): void {
    this.usersService.getUsersCount().subscribe(count => {
      this.length = count;
    });
    this.usersService.getUsersByPage(this.pageIndex + 1, this.pageSize).subscribe(users => {
      console.log(users);
      this.dataSource = users;
    });
  }
}
