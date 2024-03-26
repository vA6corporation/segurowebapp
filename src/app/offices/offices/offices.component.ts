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

    displayedColumns: string[] = ['name', 'address', 'actions'];
    dataSource: OfficeModel[] = [];
    length: number = 0;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 30, 50];
    pageIndex: number = 0;

    ngOnInit(): void {
        this.navigationService.setTitle('Oficinas');
        this.officesService.getOffices().subscribe(offices => {
            return this.dataSource = offices;
        }, (error: HttpErrorResponse) => {
            this.navigationService.showMessage(error.error.message);
        });
    }

}
