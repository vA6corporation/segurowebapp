import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CertifiersService } from '../certifiers.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-certifiers',
  templateUrl: './edit-certifiers.component.html',
  styleUrls: ['./edit-certifiers.component.sass']
})
export class EditCertifiersComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly navigationService: NavigationService,
    private readonly certifiersService: CertifiersService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }
    
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    name: [ null, Validators.required ],
    email: [ null, Validators.required ],
  });
  private certifierId: string = '';

  public isLoading: boolean = false;

  ngOnInit() { 
    this.navigationService.setTitle('Editar certificadora');
    this.activatedRoute.params.subscribe(params => {
      this.certifierId = params['certifierId'];
      this.certifiersService.getCertifierById(this.certifierId).subscribe(certifier => {
        this.formGroup.patchValue(certifier);
      });
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      this.certifiersService.update(this.formGroup.value, this.certifierId).subscribe(certifier => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.certifiersService.loadCertifiers();
        this.navigationService.showMessage('Se han guardado los cambios');
        // this.router.navigate(['/certifiers']);
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
