import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { PartnershipsService } from 'src/app/partnerships/partnerships.service';
import { InsurancePartnershipsService } from '../insurance-partnerships.service';

@Component({
  selector: 'app-dialog-insurance-partnerships',
  templateUrl: './dialog-insurance-partnerships.component.html',
  styleUrls: ['./dialog-insurance-partnerships.component.sass']
})
export class DialogInsurancePartnershipsComponent implements OnInit {

  constructor(
    private readonly partnershipsService: InsurancePartnershipsService,
    private readonly navigationService: NavigationService,
  ) { }

  public partnerships: PartnershipModel[] = [];
  private formBuilder: FormBuilder = new FormBuilder();
  public formGroup: FormGroup = this.formBuilder.group({
    key: [ null, Validators.required ],
  });

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.reset();
      this.partnershipsService.getPartnershipsByKey(key).subscribe(partnerships => {
        this.navigationService.loadBarFinish();
        this.partnerships = partnerships;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
