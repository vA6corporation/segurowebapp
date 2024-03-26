import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { SeaceErrorModel } from '../seace-error.model';
import { SeaceService } from '../seace.service';
import { Subscription } from 'rxjs';
import { Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-seace-erros',
    templateUrl: './seace-erros.component.html',
    styleUrls: ['./seace-erros.component.sass']
})
export class SeaceErrosComponent implements OnInit {

    constructor(
        private readonly seaceService: SeaceService,
        private readonly navigationService: NavigationService,
    ) { }

    displayedColumns: string[] = ['createdAt', 'momenclatura', 'valorReferencial', 'departamento', 'objetoContratacion'];
    dataSource: SeaceErrorModel[] = [];
    length: number = 100;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 30, 50];
    pageIndex: number = 0;

    private handleSearch$: Subscription = new Subscription()
    private params: Params = {}

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Seace Errores');
        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true }
        ]);

        this.seaceService.getCountSeaceErrors().subscribe(count => {
            this.length = count;
        });

        this.seaceService.getSeaceErrosByPage(this.pageIndex + 1, this.pageSize).subscribe(seaceErrors => {
            this.dataSource = seaceErrors;
        });

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart()
            this.seaceService.getSeaceErrorsByKey(key, this.params).subscribe({
                next: seaceErrors => {
                    this.navigationService.loadBarFinish()
                    this.dataSource = seaceErrors
                },
                error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        })
    }

    handlePageEvent(event: PageEvent): void {
        this.seaceService.getSeaceErrosByPage(event.pageIndex + 1, event.pageSize).subscribe(seaceErrors => {
            this.dataSource = seaceErrors;
        });
    }

}
