import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CapitalIncreasesService } from '../capital-increases.service';
import { CapitalIncreaseModel } from '../capital-increase.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-capital-increases',
    templateUrl: './capital-increases.component.html',
    styleUrls: ['./capital-increases.component.sass']
})
export class CapitalIncreasesComponent implements OnInit {

    constructor(
        private readonly capitalIncreassService: CapitalIncreasesService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
    ) { }

    displayedColumns: string[] = ['customer', 'capital', 'worker', 'emitionAt', 'actions'];
    dataSource: CapitalIncreaseModel[] = [];
    length: number = 0;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 30, 50];
    pageIndex: number = 0;

    private handleSearch$: Subscription = new Subscription();
    private handleClickMenu$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
        this.handleClickMenu$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Incremento de capital');

        this.navigationService.setMenu([
            { id: 'search', label: '', icon: 'search', show: true },
            { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
        ]);

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
            if (id == 'export_excel') {
                this.navigationService.loadBarStart();
                // this.isosService.getIsos().subscribe(isos => {
                //   this.navigationService.loadBarFinish();
                //   const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
                //   let body = [];
                //   body.push([
                //     'F. DE EMISION',
                //     'CLIENTE',
                //     'CERTIFICADORA',
                //     'MONTO',
                //     'COMISION',
                //   ]);

                //   for (const iso of isos) {
                //     body.push([
                //       formatDate(new Date(iso.emitionAt), 'dd/MM/yyyy', 'en-US'),
                //       iso.customer.name,
                //       iso.certifier.name,
                //       iso.charge,
                //       iso.commission,
                //     ]);
                //   }

                //   const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
                //   buildExcel(body, name, wscols, [], []);
                // });
            }
        })

        const { pageIndex, pageSize } = this.activatedRoute.snapshot.queryParams

        if (pageIndex && pageSize) {
            this.pageIndex = Number(pageIndex)
            this.pageSize = Number(pageSize)
        }

        this.fetchData()
        this.fetchCount()
    }

    onExportPdf(isoId: string) {
        // this.navigationService.loadBarStart();
        // this.isosService.getIsoById(isoId).subscribe(async iso => {
        //   this.navigationService.loadBarFinish();
        //   if (iso.company) {
        //     const pdf = await buildIso(iso, iso.bank);
        //     pdf.save(`ORDEN_DE_SERVICIO_${iso.customer.name.toUpperCase()}.pdf`);
        //   }
        // });
    }

    handlePageEvent(event: PageEvent): void {
        const { pageIndex, pageSize } = event;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;

        const queryParams: Params = { pageIndex, pageSize };

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        });

        this.fetchData();
    }

    async onDelete(capitalIncreaseId: string) {
        const ok = confirm('Esta seguro de eliminar?...');
        if (ok) {
            this.navigationService.loadBarStart();
            this.capitalIncreassService.delete(capitalIncreaseId).subscribe(() => {
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage('Eliminado correctamente');
                this.dataSource = this.dataSource.filter(e => e._id !== capitalIncreaseId);
            }, (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        }
    }

    async fetchData() {
        this.navigationService.loadBarStart();
        this.capitalIncreassService.getCapitalIncreasesByPage(this.pageIndex + 1, this.pageSize).subscribe(capitalIncreases => {
            this.navigationService.loadBarFinish();
            console.log(capitalIncreases);
            this.dataSource = capitalIncreases;
        }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(error.error.message);
        });
    }

    async fetchCount() {
        this.capitalIncreassService.getCountCapitalIncreases().subscribe(count => {
            this.length = count;
        })
    }

}
