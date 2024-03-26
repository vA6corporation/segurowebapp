import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CompaniesService } from '../companies.service';
import { CompanyModel } from '../company.model';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.sass']
})
export class CompaniesComponent implements OnInit {

    constructor(
        private readonly companiesService: CompaniesService,
        private readonly navigationService: NavigationService,
    ) { }

    public displayedColumns: string[] = ['ruc', 'name', 'email', 'address', 'mobileNumber', 'actions'];
    public dataSource: CompanyModel[] = [];
    public length: number = 0;
    public pageSize: number = 10;
    public pageSizeOptions: number[] = [10, 30, 50];
    public pageIndex: number = 0;

    ngOnInit(): void {
        this.navigationService.setTitle('Empresas')
        this.fetchData()
    }

    handlePageEvent(event: PageEvent): void {

    }

    fetchData() {
        this.navigationService.loadBarFinish();
        this.companiesService.getCompanies().subscribe(companies => {
            this.dataSource = companies;
            this.navigationService.loadBarFinish();
        });
    }

}
