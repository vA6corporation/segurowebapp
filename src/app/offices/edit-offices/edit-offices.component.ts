import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { OfficesService } from '../offices.service';

@Component({
  selector: 'app-edit-offices',
  templateUrl: './edit-offices.component.html',
  styleUrls: ['./edit-offices.component.sass']
})
export class EditOfficesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly officesService: OfficesService,
    private readonly navigationService: NavigationService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    name: [ null, Validators.required ],
    address: [ null, Validators.required ],
  });
  public isLoading: boolean = false;
  public maxlength: number = 11;
  public activities: any[] = [];
  private officeId: string = '';

  private params$: Subscription = new Subscription();

  ngOnDestroy() {
    this.params$.unsubscribe();
  }
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Editar oficina');
    this.navigationService.backTo();

    this.params$ = this.activatedRoute.params.subscribe(params => {
      this.officeId = params.officeId;
      this.officesService.getOfficeById(params.officeId).subscribe(office => {
        this.formGroup.patchValue(office);
      });
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      this.officesService.update(this.formGroup.value, this.officeId).subscribe(res => {
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
