import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MaterialsService } from 'src/app/materials/materials.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-guaranties',
  templateUrl: './guaranties.component.html',
  styleUrls: ['./guaranties.component.sass']
})
export class GuarantiesComponent implements OnInit {

  constructor(
    private readonly materialsService: MaterialsService,
    private readonly reportsService: ReportsService,
    private readonly navigationService: NavigationService,
    private readonly matSnackBar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
  ) { 
    this.formGroup = this.formBuilder.group({
      startDate: [ null, Validators.required ],
      endDate: [ null, Validators.required ],
    });
  }

  public displayedColumns: string[] = [ 'guaranteeType', 'partnership', 'customer', 'policyNumber', 'endDate', 'actions' ];
  public dataSource: any[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private subscription: Subscription = new Subscription();
  public formGroup: FormGroup;

  onRangeChange() {
    if (this.formGroup.valid) {
      const { startDate, endDate } = this.formGroup.value;
      this.navigationService.loadBarStart();
      this.reportsService.getGuarantiesByRange(startDate, endDate).subscribe(guaranties => {
        console.log(guaranties);
        this.navigationService.loadBarFinish();
        this.dataSource = guaranties;
      });
    }
  }

  sendMail(materialId: string): void {
    this.navigationService.loadBarStart();
    this.materialsService.sendMail(materialId).subscribe(material => {
      this.navigationService.loadBarFinish();
      const { customer } = material;
      this.matSnackBar.open(`Enviado correctamente a: ${customer?.email}`, 'Aceptar', {
        duration: 5000,
      });
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.matSnackBar.open(error.error.message, 'Aceptar', {
        duration: 5000,
      });
    });
  }
  
  ngOnInit(): void { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
