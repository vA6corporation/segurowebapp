import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogInsuranceBusinessesComponent } from 'src/app/insurance-businesses/dialog-insurance-businesses/dialog-insurance-businesses.component';
import { DialogAttachPdfComponent } from 'src/app/insurances/dialog-attach-pdf/dialog-attach-pdf.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { InsuranceConstructionsService } from '../insurance-constructions.service';

@Component({
  selector: 'app-edit-insurance-constructions',
  templateUrl: './edit-insurance-constructions.component.html',
  styleUrls: ['./edit-insurance-constructions.component.sass']
})
export class EditInsuranceConstructionsComponent implements OnInit {

  constructor(
    private readonly constructionsService: InsuranceConstructionsService,
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute,
    private readonly matDialog: MatDialog,
  ) { }
    
  private formBuilder: FormBuilder = new FormBuilder();
  public isLoading: boolean = false;

  public formGroup: FormGroup = this.formBuilder.group({
    business: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    object: [ null, Validators.required ],
  });
  private constructionId: string = '';

  ngOnInit(): void {
    this.navigationService.setTitle('Editar obra');
    this.navigationService.backTo();

    this.route.params.subscribe(params => {
      this.constructionId = params.constructionId;
      this.constructionsService.getConstructionById(params.constructionId).subscribe(construction => {
        const { business, ...value } = construction;
        this.formGroup.patchValue(value);
        this.formGroup.patchValue({ business });
      });
    });
  }
  
  openDialogBusinesses() {
    const dialogRef = this.matDialog.open(DialogInsuranceBusinessesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(business => {
      if (business) {
        this.formGroup.patchValue({ business });
      }
    });
  }

  openDialogPartnerships() {
    const dialogRef = this.matDialog.open(DialogPartnershipsComponent, {
      width: '600px',
      position: { top: '20px' }
    });
    
    dialogRef.afterClosed().subscribe(partnership => {
      if (partnership) {
        const { business } = partnership;
        this.formGroup.patchValue({ business: business || {} });
        this.formGroup.patchValue({ partnership: partnership || {} });
      }
    });
  }

  onAttachPdf() {
    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data: this.constructionId,
    });
  }

  async onSubmit() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { business, ...construction } = this.formGroup.value;
      construction.businessId = business._id;
      this.constructionsService.update(construction, this.constructionId).subscribe(res => {
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
