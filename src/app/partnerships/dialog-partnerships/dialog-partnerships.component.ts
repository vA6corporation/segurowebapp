import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { PartnershipsService } from 'src/app/partnerships/partnerships.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-partnerships',
  templateUrl: './dialog-partnerships.component.html',
  styleUrls: ['./dialog-partnerships.component.sass']
})
export class DialogPartnershipsComponent implements OnInit {

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
