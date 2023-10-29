import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuaranteeTypes } from '../guaranteeTypes.enum';
import { MaterialsService } from 'src/app/materials/materials.service';
import { CompliancesService } from 'src/app/compliances/compliances.service';
import { DirectsService } from 'src/app/directs/directs.service';
import { GuaranteeModel } from '../guarantee.model';
import { NavigationService } from 'src/app/navigation/navigation.service';

export interface DialogRenewObservationsData {
  guarenteeId: string
  guarenteeType: string
}

@Component({
  selector: 'app-dialog-renew-observations',
  templateUrl: './dialog-renew-observations.component.html',
  styleUrls: ['./dialog-renew-observations.component.sass']
})
export class DialogRenewObservationsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly guarantee: GuaranteeModel,
    private readonly navigationService: NavigationService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly materialsService: MaterialsService,
    private readonly compliancesService: CompliancesService,
    private readonly directsService: DirectsService,
    private readonly matDialog: MatDialogRef<DialogRenewObservationsComponent>
  ) { }

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    renewObservations: null,
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { renewObservations } = this.formGroup.value;
    this.guarantee.renewObservations = renewObservations;
    switch (this.guarantee.guaranteeType) {
      case GuaranteeTypes.MATERIAL:
        this.materialsService.update(this.guarantee, this.guarantee._id).subscribe(guarantee => {
          this.matDialog.close();
          this.navigationService.showMessage('Se han guardado los cambios');
        });
        break;
      case GuaranteeTypes.COMPLIANCE:
        this.compliancesService.update(this.guarantee, this.guarantee._id).subscribe(guarantee => {
          this.matDialog.close();
          this.navigationService.showMessage('Se han guardado los cambios');
        });
        break;
      case GuaranteeTypes.DIRECT:
        this.directsService.update(this.guarantee, this.guarantee._id).subscribe(guarantee => {
          this.matDialog.close();
          this.navigationService.showMessage('Se han guardado los cambios');
        });
        break;
      default:
        break;
    }
  }

}
