import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogSeaceDetailsComponent } from '../dialog-seace-details/dialog-seace-details.component';
import { SeaceService } from '../seace.service';

@Component({
  selector: 'app-seace',
  templateUrl: './seace.component.html',
  styleUrls: ['./seace.component.sass']
})
export class SeaceComponent implements OnInit {

  constructor(
    private readonly seaceService: SeaceService,
    private readonly navigationService: NavigationService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    startDate: [ null, Validators.required ],
    endDate: [ null, Validators.required ],
    estado: '',
    objetoContratacion: '',
  });
  public displayedColumns: string[] = [ 'buenaPro', 'momenclatura', 'objetoContratacion', 'estado','valorReferencial', 'actions' ];
  public dataSource: any[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public estados: any[] = [
    { _id: 'Consentido' },
    { _id: 'Nulo' },
    { _id: 'Adjudicado' },
    { _id: 'Desierto' },
    { _id: 'Convocado' }  
  ]
  // private subscription: Subscription = new Subscription();
  
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Seace');
    const params = {};
    this.seaceService.getCountSeaceDatas(params).subscribe(count => {
      this.length = count;
    });

    this.fetchData();
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
  }

  onStateChange() {
    this.pageIndex = 0;
    const { startDate, endDate, estado, objetoContratacion } = this.formGroup.value;
    
    const params: any = { estado, objetoContratacion };
    
    if (startDate && endDate) {
      Object.assign(params, { startDate, endDate });
    }

    this.seaceService.getCountSeaceDatas(params).subscribe(count => {
      this.length = count;
    });
    this.fetchData();
  }

  onObjectChange() {
    this.pageIndex = 0;
    const { startDate, endDate, estado, objetoContratacion } = this.formGroup.value;
    
    const params: any = { estado, objetoContratacion };
    
    if (startDate && endDate) {
      Object.assign(params, { startDate, endDate });
    }

    this.seaceService.getCountSeaceDatas(params).subscribe(count => {
      this.length = count;
    });
    this.fetchData();
  }

  onRangeChange() {
    if (this.formGroup.valid) {
      this.pageIndex = 0;

      const { startDate, endDate, estado, objetoContratacion } = this.formGroup.value;

      const queryParams: Params = { startDate: startDate.getTime(), endDate: endDate.getTime(), pageIndex: 0 };

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      const params: any = { estado, objetoContratacion };
      if (startDate && endDate) {
        Object.assign(params, { startDate, endDate });
      }

      this.seaceService.getCountSeaceDatas(params).subscribe(count => {
        this.length = count;
      });

      this.fetchData();
    }
  }

  fetchData() {
    const { startDate, endDate, estado, objetoContratacion } = this.formGroup.value;
    const params: any = { estado, objetoContratacion };
    if (startDate && endDate) {
      Object.assign(params, { startDate, endDate });
    }
    this.navigationService.loadBarStart();
    this.seaceService.getSeaceDatasByPage(this.pageIndex + 1, this.pageSize, params).subscribe(workers => {
      this.navigationService.loadBarFinish();
      this.dataSource = workers;
    });
  }

  onDialogDetails(seaceData: any) {
    this.matDialog.open(DialogSeaceDetailsComponent, {
      data: seaceData,
      width: '600px',
      position: { top: '20px' }
    });
  }

}
