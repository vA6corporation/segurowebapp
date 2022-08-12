import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { SettingsService } from '../settings.service';
import { BusinessModel } from 'src/app/auth/business.model';
import { first } from 'rxjs/operators';
import { OfficeModel } from 'src/app/auth/office.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly settingsService: SettingsService,
    private readonly navigationService: NavigationService,
    private readonly formBuilder: FormBuilder,
    private readonly matDialog: MatDialog,
    private readonly ngZone: NgZone,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    activatedModules: this.formBuilder.group(this.authService.getObjectModules()),
    business: this.formBuilder.group({
      name: [ null, Validators.required ],
      ruc: [ null, Validators.required ],
    }),
    office: this.formBuilder.group({
      name: [ null, Validators.required ],
      address: [ null, Validators.required ],
    }),
  });
  public hide: boolean = true;
  public certificates: any[] = [];
  public isLoading: boolean = false;
  public business: BusinessModel|null = new BusinessModel();
  public office: OfficeModel = new OfficeModel();
  public localBusiness: BusinessModel|null = null;

  private handlePriceLists$: Subscription = new Subscription();
  private auth$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handlePriceLists$.unsubscribe();
    this.auth$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Ajustes');

    this.auth$ = this.authService.handleAuth().pipe(first()).subscribe(auth => {
      this.business = auth.business;
      this.office = auth.office;
      // this.formGroup.get('settings')?.patchValue(auth.settings);
      this.formGroup.get('business')?.patchValue(auth.business);
      this.formGroup.get('office')?.patchValue(auth.office);
      this.fetchData();
    });

  }

  fetchData() {
    // this.authService.loadBusiness(this.business._id).subscribe(business => {
    //   console.log(business);
    //   this.localBusiness = business;
    // });
  }

  onGetCertificates() {
    this.settingsService.getCertificates().subscribe(certificates => {
      console.log(certificates);
      this.certificates = certificates;
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { business, office } = this.formGroup.value;
      this.settingsService.save(business, office).subscribe(() => {
        this.navigationService.showMessage("Se han guardado los cambios");
        setTimeout(() => {
          location.reload();
        }, 1000)
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.showMessage(error.error.message);    
        this.navigationService.loadBarFinish();  
      });
    }
  }

}
