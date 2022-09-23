import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { PartnershipsService } from 'src/app/partnerships/partnerships.service';

@Component({
  selector: 'app-dialog-template-partnerships',
  templateUrl: './dialog-template-partnerships.component.html',
  styleUrls: ['./dialog-template-partnerships.component.sass']
})
export class DialogTemplatePartnershipsComponent implements OnInit {

  constructor(
    private readonly partnershipsService: PartnershipsService,
    private readonly navigationService: NavigationService,
    private readonly formBuilder: FormBuilder
  ) { }

  public partnerships: PartnershipModel[] = [];
  public formGroup: FormGroup = this.formBuilder.group({
    key: [ null, Validators.required ],
  });

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.reset();
      this.partnershipsService.getTemplatePartnershipsByKey(key).subscribe(partnerships => {
        this.navigationService.loadBarFinish();
        this.partnerships = partnerships;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
