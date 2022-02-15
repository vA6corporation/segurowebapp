import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Mail } from 'src/app/mails/mail.interface';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { MailsService } from '../mails.service';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.sass']
})
export class MailsComponent implements OnInit {

  constructor(
    private readonly mailsService: MailsService,
    private readonly navigationService: NavigationService,
  ) { }

  private handleSearch$: Subscription = new Subscription();

  public displayedColumns: string[] = [ 'date', 'user', 'to', 'policyNumber', 'customer', 'actions' ];
  public dataSource: Mail[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  
  ngOnInit(): void {
    this.navigationService.setTitle('Emails enviados');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.fetchData();
    this.handleSearch$ = this.navigationService.handleSearch().subscribe(async (key: string) => {
      this.navigationService.loadBarStart();
      const mails = await this.mailsService.getManyByAny(key).toPromise();
      this.dataSource = mails;
      this.navigationService.loadBarFinish();
    });
  }

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
  }

  handlePageEvent(event: PageEvent): void {
    this.mailsService.getManyByPage(event.pageIndex + 1, event.pageSize).subscribe(compliances => {
      this.dataSource = compliances;
    });
  }

  async fetchData() {
    this.dataSource = await this.mailsService.getManyByPage(this.pageIndex + 1, this.pageSize).toPromise();
    this.length = await this.mailsService.getCount().toPromise();
  }
}
