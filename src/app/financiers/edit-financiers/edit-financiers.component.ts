import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { FinancierModelsService } from '../financiers.service';

@Component({
  selector: 'app-edit-financiers',
  templateUrl: './edit-financiers.component.html',
  styleUrls: ['./edit-financiers.component.sass']
})
export class EditFinancierModelsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly financiersService: FinancierModelsService,
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    document: [ null, Validators.required ],
    name: [ null, Validators.required ],
    email: [ null, [ Validators.required, Validators.email ] ],
    mobileNumber: null,
    phoneNumber: null,
    annexed: null,
  });

  private financierId: string = '';
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.navigationService.setTitle('Editar financiera');
    this.navigationService.backTo();
    this.route.params.subscribe(async params => {
      this.financierId = params.financierId;
      this.financiersService.getFinancierModelById(this.financierId).subscribe(financier => {
        console.log(financier);
        this.formGroup.get('document')?.setValue(financier.document);
        this.formGroup.get('name')?.setValue(financier.name);
        this.formGroup.get('email')?.setValue(financier.email);
        this.formGroup.get('phoneNumber')?.setValue(financier.phoneNumber);
        this.formGroup.get('annexed')?.setValue(financier.annexed);
      });
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      this.financiersService.update(this.formGroup.value, this.financierId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
}
