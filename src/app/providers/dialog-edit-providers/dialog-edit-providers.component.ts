import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProviderModel } from 'src/app/providers/provider.model';
import { ProvidersService } from 'src/app/providers/providers.service';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-dialog-edit-providers',
  templateUrl: './dialog-edit-providers.component.html',
  styleUrls: ['./dialog-edit-providers.component.sass']
})
export class DialogEditProvidersComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly provider: ProviderModel,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly providersService: ProvidersService,
    private readonly dialogRef: MatDialogRef<DialogEditProvidersComponent>,
    private readonly navigationService: NavigationService,
  ) { }

  public formArray: UntypedFormArray = this.formBuilder.array([]);
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    _id: this.provider._id,
    documentType: this.provider.documentType,
    document: this.provider.document,
    name: [ this.provider.name, Validators.required ],
    address: this.provider.address,
    mobileNumber: this.provider.mobileNumber,
    email: [ this.provider.email, Validators.email ],
    banks: this.formArray,
  });

  public documentTypes: string[] = ['RUC', 'DNI', 'CE'];
  public maxlength: number = 11;
  public isLoading: boolean = false;
  private providerId: string = this.provider._id;

  ngOnInit(): void {
    if (this.provider.banks) {
      for (const bank of this.provider.banks) {
        const formGroup = this.formBuilder.group({ bankName: bank.bankName, accountNumber: bank.accountNumber });
        this.formArray.push(formGroup);
      }
    }
  }

  onAddAccount() {
    const formGroup = this.formBuilder.group({
      bankName: 'BCP',
      accountNumber: [ null, Validators.required ],
    });
    this.formArray.push(formGroup);
  }

  onRemoveAccount(index: number) {
    this.formArray.removeAt(index);
  }

  onSubmit() {
    if (this.formGroup.valid && this.providerId !== null) {
      this.isLoading = true;
      this.providersService.update(this.formGroup.value, this.formArray.value, this.providerId).subscribe(() => {
        this.isLoading = false;
        Object.assign(this.provider, this.formGroup.value);
        Object.assign(this.provider, { banks: this.formArray.value });
        this.dialogRef.close(this.provider);
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
}
