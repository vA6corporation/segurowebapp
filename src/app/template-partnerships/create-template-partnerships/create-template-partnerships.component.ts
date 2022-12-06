import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BusinessModel } from 'src/app/businesses/business.model';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipItemsComponent } from 'src/app/partnerships/dialog-partnership-items/dialog-partnership-items.component';
import { PartnershipItemModel } from 'src/app/partnerships/partnership-item.model';
import { PartnershipsService } from 'src/app/partnerships/partnerships.service';

@Component({
  selector: 'app-create-template-partnerships',
  templateUrl: './create-template-partnerships.component.html',
  styleUrls: ['./create-template-partnerships.component.sass']
})
export class CreateTemplatePartnershipsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly partnershipsService: PartnershipsService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly matDialog: MatDialog,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    document: null,
    name: [ null, Validators.required ],
    constitutedAt: null,
    address: [ null ],
    representativeName: [ null, Validators.required ],
    representativeDocument: [ null, Validators.required ],
    businessId: null,
    isTemplate: true,
    independentAccounting: null,
    email: null,
    phoneNumber: null,
    economicActivity: null,
    representativeNationality: null,
  });
  public isLoading: boolean = false;
  public businesses: BusinessModel[] = [];
  public partnershipItems: PartnershipItemModel[] = [];
  public independentAccounting = false;
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Nuevo consorcio para formatos');
    this.navigationService.backTo();
  }

  onDialogBusinesses(): void {
    const dialogRef = this.matDialog.open(DialogBusinessesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(business => {
      if (business) {
        const dialogRef = this.matDialog.open(DialogPartnershipItemsComponent, {
          width: '600px',
          position: { top: '20px' },
          data: business
        });

        dialogRef.afterClosed().subscribe(partnershipItem => {
          if (partnershipItem) {
            this.partnershipItems.push(partnershipItem);
          }
        });
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
      this.partnershipsService.create(this.formGroup.value, this.partnershipItems).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/templatePartnerships']);
        this.navigationService.showMessage('Registrado correctamente');
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

  // onSubmit(): void {
  //   if (this.formGroup.valid) {
  //     this.isLoading = true;
  //     this.navigationService.loadBarStart();
  //     const partnership = this.formGroup.value;
  //     partnership.businessIds = this.businesses.map(e => e._id);
  //     this.partnershipsService.create(partnership).subscribe(res => {
  //       console.log(res);
  //       this.isLoading = false;
  //       this.navigationService.loadBarFinish();
  //       this.router.navigate(['/templatePartnerships']);
  //       this.navigationService.showMessage('Registrado correctamente');
  //     }, (error: HttpErrorResponse) => {
  //       console.log(error);
  //       this.isLoading = false;
  //       this.navigationService.loadBarFinish();
  //       this.navigationService.showMessage(error.error.message);
  //     });
  //   }
  // }

}
