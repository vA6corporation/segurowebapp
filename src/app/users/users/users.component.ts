import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UsersService } from '../users.service';
import { UserModel } from '../user.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogDevicesComponent } from 'src/app/devices/dialog-devices/dialog-devices.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

    constructor(
        private readonly usersService: UsersService,
        private readonly navigationService: NavigationService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly matDialog: MatDialog
    ) { }

    displayedColumns: string[] = ['name', 'email', 'isAdmin', 'office', 'devices', 'actions'];
    dataSource: UserModel[] = [];
    length: number = 100;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 30, 50];
    pageIndex: number = 0;
    private params: Params = { isActive: true };

    private handleSearch$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleSearch$.unsubscribe()
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Usuarios');

        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true }
        ]);

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart()
            this.usersService.getUsersByKey(key).subscribe({
                next: users => {
                    this.navigationService.loadBarFinish()
                    this.dataSource = users
                }, error: (error: HttpErrorResponse) => {
                    this.navigationService.loadBarFinish()
                    this.navigationService.showMessage(error.error.message)
                }
            })
        })

        const { pageIndex, pageSize } = this.activatedRoute.snapshot.queryParams;

        if (pageIndex && pageSize) {
            this.pageIndex = Number(pageIndex);
            this.pageSize = Number(pageSize);
        }

        this.fetchData();
        this.fetchCount();
    }

    countDevices(devices: any[]): number {
        return devices.map(e => e.isActive).length;
    }

    fetchCount() {
        this.usersService.getCountUsers(this.params).subscribe(count => {
            this.length = count;
        });
    }

    fetchData() {
        this.navigationService.loadBarStart();
        this.usersService.getUsersByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(users => {
            this.navigationService.loadBarFinish();
            this.dataSource = users;
        });
    }

    onDialogDevices(user: UserModel) {
        const dialogRef = this.matDialog.open(DialogDevicesComponent, {
            width: '600px',
            position: { top: '20px' },
            data: user.devices,
        });

        dialogRef.afterClosed().subscribe(ok => {
            if (ok) {
                this.fetchData();
            }
        });
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

}
