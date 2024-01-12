import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { MailModel } from '../mail.model';
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
    
    displayedColumns: string[] = ['date', 'user', 'to', 'policyNumber', 'business', 'actions'];
    dataSource: MailModel[] = [];
    length: number = 100;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 30, 50];
    pageIndex: number = 0;
    
    private handleSearch$: Subscription = new Subscription();

    ngOnInit(): void {
        this.navigationService.setTitle('Emails enviados');
        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true }
        ])

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart();
            this.mailsService.getMailsByKey(key).subscribe(mails => {
                this.dataSource = mails
                this.navigationService.loadBarFinish()
            })
        })

        this.fetchData()
    }

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
    }

    handlePageEvent(event: PageEvent): void {
        this.mailsService.getMailsByPage(event.pageIndex + 1, event.pageSize).subscribe(mails => {
            this.dataSource = mails;
        });
    }

    fetchData() {
        this.mailsService.getCount().subscribe(count => {
            this.length = count
        })

        this.mailsService.getMailsByPage(this.pageIndex + 1, this.pageSize).subscribe(mails => {
            console.log(mails);
            this.dataSource = mails
        })
    }
}
