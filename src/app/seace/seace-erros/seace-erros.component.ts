import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { SeaceErrorModel } from '../seace-error.model';
import { SeaceService } from '../seace.service';

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

    ngOnInit(): void {
        this.navigationService.setTitle('Seace Errores');
        this.navigationService.backTo();
        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true }
        ]);

        this.seaceService.getCountSeaceErrors().subscribe(count => {
            this.length = count;
        });

        this.seaceService.getSeaceErrosByPage(this.pageIndex + 1, this.pageSize).subscribe(seaceErrors => {
            this.dataSource = seaceErrors;
        });
    }

    handlePageEvent(event: PageEvent): void {
        this.seaceService.getSeaceErrosByPage(event.pageIndex + 1, event.pageSize).subscribe(seaceErrors => {
            this.dataSource = seaceErrors;
        });
    }

}
