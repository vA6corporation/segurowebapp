import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { InsuranceBusinessModel } from '../insurance-business.model';
import { InsuranceBusinessesService } from '../insurance-businesses.service';

@Component({
  selector: 'app-dialog-insurance-businesses',
  templateUrl: './dialog-insurance-businesses.component.html',
  styleUrls: ['./dialog-insurance-businesses.component.sass']
})
export class DialogInsuranceBusinessesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly businessesService: InsuranceBusinessesService,
    private readonly navigationService: NavigationService,
  ) { }

  public businesses: InsuranceBusinessModel[] = [];
  public formGroup: FormGroup = this.formBuilder.group({
    key: [ null, Validators.required ],
  });

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.reset();
      this.businessesService.getBusinessesByKey(key).subscribe(businesses => {
        this.navigationService.loadBarFinish();
        this.businesses = businesses;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
}
