import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ProviderModel } from '../provider.model';
import { ProvidersService } from '../providers.service';

@Component({
  selector: 'app-dialog-providers',
  templateUrl: './dialog-providers.component.html',
  styleUrls: ['./dialog-providers.component.sass']
})
export class DialogProvidersComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly providersService: ProvidersService,
    private readonly navigationService: NavigationService,
    private readonly dialogRef: MatDialogRef<DialogProvidersComponent>,
  ) { }

  public providers: ProviderModel[] = [];
  public formGroup: FormGroup = this.formBuilder.group({
    searchType: 'RUC',
    key: [ null, Validators.required ],
  });
  public maxlength: number = 11;
  public searchTypes = [
    { code: 'RUC', name: 'RUC' },
    { code: 'DNI', name: 'DNI' },
    { code: 'NAME', name: 'NOMBRES/CELULAR' },
  ];
  private onAdd: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void { 
    this.formGroup.get('searchType')?.valueChanges.subscribe(value => {
      switch (value) {
        case 'RUC':
          this.formGroup.get('key')?.setValidators([ Validators.required, Validators.minLength(11), Validators.maxLength(11) ]);
          this.maxlength = 11;
          break;
        case 'DNI':
          this.formGroup.get('key')?.setValidators([ Validators.required, Validators.minLength(8), Validators.maxLength(8) ]);
          this.maxlength = 8;
          break;
        default:
          this.formGroup.get('key')?.setValidators([ Validators.required ]);
          this.maxlength = 50;
      }
      this.formGroup.get('key')?.updateValueAndValidity();
    });
  }

  handleAddProvider() {
    return this.onAdd;
  }

  onSetProvider(provider: ProviderModel) {
    this.dialogRef.close(provider);
  }

  onCreateProvider() {
    this.onAdd.emit();
  }

  onChangeKey() {
    const searchType = this.formGroup.get('searchType')?.value;
    const key = this.formGroup.get('key')?.value;
    switch (searchType) {
      case 'RUC':
        if (key.length === 11) {
          this.formGroup.get('key')?.disable();
          this.providersService.getProvidersByRuc(key).subscribe(providers => {
            this.providers = providers;
            this.formGroup.get('key')?.enable();
          }, (error: HttpErrorResponse) => {
            this.formGroup.get('key')?.enable();
            this.navigationService.showMessage(error.error.message);
          });
        }
        break;
      case 'DNI':
        if (key.length === 8) {
          this.formGroup.get('key')?.disable();
          this.providersService.getProvidersByDni(key).subscribe(provider => {
            this.providers = provider;
            this.formGroup.get('key')?.enable();
          }, (error: HttpErrorResponse) => {
            this.formGroup.get('key')?.enable();
            this.navigationService.showMessage(error.error.message);
          });
        }
        break;
      default:
        this.formGroup.get('key')?.disable();
        this.providersService.getProvidersByKey(key).subscribe(provider => {
          this.providers = provider;
          this.formGroup.get('key')?.enable();
        }, (error: HttpErrorResponse) => {
          this.formGroup.get('key')?.enable();
          this.navigationService.showMessage(error.error.message);
        });
        break;
    }
  }

}
