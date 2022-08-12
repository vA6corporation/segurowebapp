import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { InsuranceConstructionsService } from '../insurance-constructions.service';

@Component({
  selector: 'app-dialog-insurance-constructions',
  templateUrl: './dialog-insurance-constructions.component.html',
  styleUrls: ['./dialog-insurance-constructions.component.sass']
})
export class DialogInsuranceConstructionsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly constructionsService: InsuranceConstructionsService,
    private readonly navigationService: NavigationService,
  ) { }

  public constructions: ConstructionModel[] = [];
  public formGroup: FormGroup = this.formBuilder.group({
    key: [ null, Validators.required ],
  });

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.reset();
      this.constructionsService.getConstructionsByKey(key).subscribe(constructions => {
        this.navigationService.loadBarFinish();
        this.constructions = constructions;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
