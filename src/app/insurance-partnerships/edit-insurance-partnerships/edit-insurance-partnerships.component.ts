import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BusinessModel } from 'src/app/businesses/business.model';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { InsurancePartnershipsService } from '../insurance-partnerships.service';

@Component({
  selector: 'app-edit-insurance-partnerships',
  templateUrl: './edit-insurance-partnerships.component.html',
  styleUrls: ['./edit-insurance-partnerships.component.sass']
})
export class EditInsurancePartnershipsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly partnershipsService: InsurancePartnershipsService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    _id: [ null, Validators.required ],
    document: null,
    name: [ null, Validators.required ],
    address: null,
    businessId: [ null, Validators.required ],
    representative: [ null, Validators.required ],
    representativeDocument: [ null, Validators.required ],
  });

  public isLoading: boolean = false;
  private partnershipId: string = '';
  public businesses: BusinessModel[] = [];
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Editar consorcio');
    this.navigationService.backTo();
    this.activatedRoute.params.subscribe(params => {
      this.partnershipId = params.partnershipId;
      this.partnershipsService.getPartnershipById(this.partnershipId).subscribe(partnership => {
        const { businesses } = partnership;
        this.businesses = businesses;
        this.formGroup.patchValue(partnership);
      });
    });
  }

  openDialogBusinesses(): void {
    const dialogRef = this.matDialog.open(DialogBusinessesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(business => {
      if (business) {
        this.businesses.push(business);
      }
    });
  }

  removeBusiness(index: number): void {
    this.businesses.splice(index, 1);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const partnership = this.formGroup.value;
      partnership.businessIds = this.businesses.map(e => e._id);
      this.partnershipsService.update(partnership, this.partnershipId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
