import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FinancierModel } from 'src/app/financiers/financier.model';
import { FinancierModelsService } from 'src/app/financiers/financiers.service';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-dialog-financiers',
  templateUrl: './dialog-financiers.component.html',
  styleUrls: ['./dialog-financiers.component.sass']
})
export class DialogFinanciesComponent implements OnInit {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private financiersService: FinancierModelsService,
    private navigationService: NavigationService,
  ) { }

  public financiers: FinancierModel[] = [];
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    key: [ null, Validators.required ],
  });

  ngOnInit(): void { }
  
  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.get('key')?.setValue(null);
      this.financiersService.getFinancierModelsByKey(key).subscribe(financiers => {
        this.navigationService.loadBarFinish();
        this.financiers = financiers;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
