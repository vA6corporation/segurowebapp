import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipItemsComponent } from 'src/app/partnerships/dialog-partnership-items/dialog-partnership-items.component';
import { PartnershipItemModel } from 'src/app/partnerships/partnership-item.model';
import { PartnershipsService } from 'src/app/partnerships/partnerships.service';

@Component({
  selector: 'app-edit-template-partnerships',
  templateUrl: './edit-template-partnerships.component.html',
  styleUrls: ['./edit-template-partnerships.component.sass']
})
export class EditTemplatePartnershipsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly partnershipsService: PartnershipsService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly route: ActivatedRoute,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    _id: [ null, Validators.required ],
    document: null,
    name: [ null, Validators.required ],
    constitutedAt: null,
    address: null,
    businessId: [ null, Validators.required ],
    representativeName: [ null, Validators.required ],
    representativeDocument: [ null, Validators.required ],
  });

  public isLoading: boolean = false;
  private partnershipId: string = '';
  public partnershipItems: PartnershipItemModel[] = [];
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Editar consorcio para formatos');
    this.navigationService.backTo();
    this.route.params.subscribe(params => {
      this.partnershipId = params.partnershipId;
      this.partnershipsService.getPartnershipById(this.partnershipId).subscribe(partnership => {
        this.partnershipItems = partnership.partnershipItems;
        this.formGroup.patchValue(partnership);
      });
    });
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
    this.partnershipItems.splice(index, 1);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      this.partnershipsService.update(this.formGroup.value, this.partnershipItems, this.partnershipId).subscribe(res => {
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
