import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogInvestmentsComponent } from 'src/app/investments/dialog-investments/dialog-investments.component';
import { InvestmentModel } from 'src/app/investments/investment.model';
import { DialogMovablePropertiesComponent } from 'src/app/movable-properties/dialog-movable-properties/dialog-movable-properties.component';
import { MovablePropertyModel } from 'src/app/movable-properties/movable-property.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPropertiesComponent } from 'src/app/properties/dialog-properties/dialog-properties.component';
import { PropertyModel } from 'src/app/properties/property.model';
import { DialogIncomesComponent } from '../dialog-incomes/dialog-incomes.component';
import { IncomeModel } from '../income.model';
import { ShareholdersService } from '../shareholders.service';

@Component({
  selector: 'app-edit-shareholders',
  templateUrl: './edit-shareholders.component.html',
  styleUrls: ['./edit-shareholders.component.sass']
})
export class EditShareholdersComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly shareholdersService: ShareholdersService,
    private readonly navigationService: NavigationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    documentType: [ null, Validators.required ],
    document: [ null, Validators.required ],
    name: [ null, Validators.required ],
    email: [ null, [ Validators.required, Validators.email ] ],
    nationality: [ null, Validators.required ],
    maritalStatus: [ null, Validators.required ],
    percent: [ null, Validators.required ],
    mobileNumber: null,
    phoneNumber: null,
    annexed: null,
    birthDate: null,
    address: null,
    // Spouse
    documentTypeSpouse: [ null, Validators.required ],
    documentSpouse: [ null, Validators.required ],
    nameSpouse: [ null, Validators.required ],
    nationalitySpouse: [ null, Validators.required ],
    maritalStatusSpouse: [ null, Validators.required ],
    birthDateSpouse: null,
  });
  public isLoading: boolean = false;
  public maxlength: number = 11;

  private shareholderId: string = '';
  private params$: Subscription = new Subscription();
  public properties: PropertyModel[] = [];
  public movableProperties: MovablePropertyModel[] = [];
  public incomes: IncomeModel[] = [];
  public investments: InvestmentModel[] = [];

  ngOnDestroy() {
    this.params$.unsubscribe();
  }
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Editar accionista');
    this.navigationService.backTo();
    this.formGroup.get('documentType')?.valueChanges.subscribe(value => {
      switch (value) {
        case 'RUC':
          this.formGroup.get('documento')?.setValidators([ Validators.required, Validators.minLength(11), Validators.maxLength(11) ]);
          this.maxlength = 11;
          break;
        case 'DNI':
          this.formGroup.get('documento')?.setValidators([ Validators.required, Validators.minLength(8), Validators.maxLength(8) ]);
          this.maxlength = 8;
          break;
      }
      this.formGroup.get('documento')?.updateValueAndValidity();
    });

    this.formGroup.get('documentTypeSpouse')?.valueChanges.subscribe(value => {
      switch (value) {
        case 'RUC':
          this.formGroup.get('documentoSpouse')?.setValidators([ Validators.required, Validators.minLength(11), Validators.maxLength(11) ]);
          this.maxlength = 11;
          break;
        case 'DNI':
          this.formGroup.get('documentoSpouse')?.setValidators([ Validators.required, Validators.minLength(8), Validators.maxLength(8) ]);
          this.maxlength = 8;
          break;
      }
      this.formGroup.get('documentoSpouse')?.updateValueAndValidity();
    });

    this.params$ = this.activatedRoute.params.subscribe(params => {
      this.shareholderId = params.shareholderId;
      this.shareholdersService.getShareholdersById(this.shareholderId).subscribe(shareholder => {
        console.log(shareholder);
        this.formGroup.patchValue(shareholder);
        this.properties = shareholder.properties;
        this.movableProperties = shareholder.movableProperties;
        this.incomes = shareholder.incomes;
        this.investments = shareholder.investments;
      });
    });

  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      this.shareholdersService.update(this.formGroup.value, this.properties, this.movableProperties, this.incomes, this.investments, this.shareholderId).subscribe(res => {
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

  onRemoveProperty(index: number) {
    this.properties.splice(index, 1);
  }

  onRemoveMovableProperty(index: number) {
    this.movableProperties.splice(index, 1);
  }

  onDialogProperties() {
    const dialogRef = this.matDialog.open(DialogPropertiesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(property => {
      if (property) {
        this.properties.push(property);
      }
    });
  }

  onDialogIncomes() {
    const dialogRef = this.matDialog.open(DialogIncomesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(income => {
      if (income) {
        this.incomes.push(income);
      }
    });
  }

  onRemoveIncome(index: number) {
    this.incomes.splice(index, 1);
  }

  onDialogMovableProperties() {
    const dialogRef = this.matDialog.open(DialogMovablePropertiesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(movableProperty => {
      if (movableProperty) {
        this.movableProperties.push(movableProperty);
      }
    });
  }

  onRemoveInvestment(index: number) {
    this.investments.splice(index, 1);
  }

  onDialogInvestments() {
    const dialogRef = this.matDialog.open(DialogInvestmentsComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(investment => {
      if (investment) {
        this.investments.push(investment);
      }
    });
  }

}
