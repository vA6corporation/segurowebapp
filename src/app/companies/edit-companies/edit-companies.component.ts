import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CompaniesService } from '../companies.service';

@Component({
  selector: 'app-edit-companies',
  templateUrl: './edit-companies.component.html',
  styleUrls: ['./edit-companies.component.sass']
})
export class EditCompaniesComponent implements OnInit {

  constructor(
    private readonly companiesService: CompaniesService,
    private readonly navigationService: NavigationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: UntypedFormBuilder,
  ) { }
    
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    ruc: [ null, Validators.required ],
    name: [ null, Validators.required ],
    email: [ null, [ Validators.required, Validators.email ] ],
    address: [ null, Validators.required ],
    mobileNumber: [ null, Validators.required ]
  });

  public isLoading: boolean = false;
  private companyId: string = '';

  private params$: Subscription = new Subscription();

  ngOnDestroy() {
    this.params$.unsubscribe();
  }

  async ngOnInit(): Promise<void> { 
    this.navigationService.setTitle('Editar empresa');
    this.navigationService.backTo();

    this.params$ = this.activatedRoute.params.subscribe(params => {
      this.companyId = params.companyId;
      this.companiesService.getCompanyById(this.companyId).subscribe(company => {
        this.formGroup.patchValue(company);
      });
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      this.companiesService.update(this.formGroup.value, this.companyId).subscribe(() => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
