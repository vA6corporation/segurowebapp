import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { GoalModel } from '../goal.model';
import { WorkersService } from '../workers.service';
import { UserModel } from 'src/app/users/user.model';
import { AuthService } from 'src/app/auth/auth.service';
Chart.register(...registerables);

@Component({
    selector: 'app-timing-workers',
    templateUrl: './timing-workers.component.html',
    styleUrls: ['./timing-workers.component.sass']
})
export class TimingWorkersComponent implements OnInit {

    constructor(
        private readonly authService: AuthService,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly navigationService: NavigationService,
        private readonly workersService: WorkersService,
    ) { }

    years: number[] = [];
    trimestres: any[] = [
        { label: 'TODOS LOS MESES', index: 0 },
        { label: 'Ene. Feb. Mar.', index: 1 },
        { label: 'Abr. May. Jun.', index: 2 },
        { label: 'Jul. Ago. Sep.', index: 3 },
        { label: 'Oct. Nov. Dic.', index: 4 },
    ];
    formGroup = this.formBuilder.group({
        year: new Date().getFullYear(),
        index: 0,
    });
    goal: GoalModel | null = null;
    workers: any[] = [];
    user: UserModel | null = null;

    private handleAuth$: Subscription = new Subscription()
    private handleWorkers$: Subscription = new Subscription()
    private handleClickMenu$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleAuth$.unsubscribe()
        this.handleWorkers$.unsubscribe()
        this.handleClickMenu$.unsubscribe()
    }

    sortOne(workers: any[]) {
        return workers.filter(e => this.user?.isAdmin || !e.showTiming).sort(function (a: any, b: any) {
            const sumA = a.summaryPayments[0].totalCharge + a.summaryPayments[1].totalCharge + a.summaryPayments[2].totalCharge;
            const sumB = b.summaryPayments[0].totalCharge + b.summaryPayments[1].totalCharge + b.summaryPayments[2].totalCharge;
            if (sumA < sumB) {
                return 1;
            }
            if (sumA > sumB) {
                return -1;
            }
            return 0;
        });
    }

    sortTwo(workers: any[]) {
        return workers.filter(e => this.user?.isAdmin || !e.showTiming).sort(function (a: any, b: any) {
            const sumA = a.summaryPayments[3].totalCharge + a.summaryPayments[4].totalCharge + a.summaryPayments[5].totalCharge;
            const sumB = b.summaryPayments[3].totalCharge + b.summaryPayments[4].totalCharge + b.summaryPayments[5].totalCharge;
            if (sumA < sumB) {
                return 1;
            }
            if (sumA > sumB) {
                return -1;
            }
            return 0;
        });
    }

    sortThree(workers: any[]) {
        return workers.filter(e => this.user?.isAdmin || !e.showTiming).sort(function (a: any, b: any) {
            const sumA = a.summaryPayments[6].totalCharge + a.summaryPayments[7].totalCharge + a.summaryPayments[8].totalCharge;
            const sumB = b.summaryPayments[6].totalCharge + b.summaryPayments[7].totalCharge + b.summaryPayments[8].totalCharge;
            if (sumA < sumB) {
                return 1;
            }
            if (sumA > sumB) {
                return -1;
            }
            return 0;
        });
    }

    sortFour(workers: any[]) {
        return workers.filter(e => this.user?.isAdmin || !e.showTiming).sort(function (a: any, b: any) {
            const sumA = a.summaryPayments[9].totalCharge + a.summaryPayments[10].totalCharge + a.summaryPayments[11].totalCharge;
            const sumB = b.summaryPayments[9].totalCharge + b.summaryPayments[10].totalCharge + b.summaryPayments[11].totalCharge;
            if (sumA < sumB) {
                return 1;
            }
            if (sumA > sumB) {
                return -1;
            }
            return 0;
        });
    }

    shortName(name: string) {
        const splitNames = name.split(' ');
        if (splitNames.length > 4) {
            return `${splitNames[0]} ${splitNames[3]}`;
        }
        if (splitNames.length > 3) {
            return `${splitNames[0]} ${splitNames[2]}`;
        }
        return `${splitNames[0]} ${splitNames[1]}`;
    }

    ngOnInit() {
        this.navigationService.setTitle("Timing");

        const startYear = 2020;
        const currentYear = new Date().getFullYear();

        for (let index = startYear; index <= currentYear; index++) {
            this.years.push(index);
        }

        const currentMonth = new Date().getMonth();

        switch (currentMonth) {
            case 0:
            case 1:
            case 2:
                this.formGroup.patchValue({ index: 1 })
                break;

            case 3:
            case 4:
            case 5:
                this.formGroup.patchValue({ index: 2 })
                break;

            case 6:
            case 7:
            case 8:
                this.formGroup.patchValue({ index: 3 })
                break;

            case 9:
            case 10:
            case 11:
                this.formGroup.patchValue({ index: 4 })
                break;

            default:
                break;
        }

        this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
            this.user = auth.user
            this.fetchData();
        })
    }

    fetchData() {
        if (this.formGroup.valid) {
            const { year } = this.formGroup.value
            this.navigationService.loadBarStart()
            this.workersService.getGoalByYear(year).subscribe(goal => {
                this.goal = goal
                this.workersService.getCommissionsByYear(year).subscribe(workers => {
                    this.navigationService.loadBarFinish()
                    this.workers = workers
                })
            }, (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish()
                this.navigationService.showMessage('No se ha establecido metas para este año')
            });
        }
    }

}
