import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BeneficiaryModel } from 'src/app/beneficiaries/beneficiary.model';
import { BusinessModel } from 'src/app/businesses/business.model';
import { FinancierModel } from 'src/app/financiers/financier.model';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { MaterialModel } from '../material.model';
import { MaterialsService } from '../materials.service';

@Component({
  selector: 'app-dialog-material',
  templateUrl: './dialog-material.component.html',
  styleUrls: ['./dialog-material.component.sass']
})
export class DialogMaterialComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    private readonly data: string,
    private readonly materialsService: MaterialsService,
  ) { }

  public material: MaterialModel|null = null;
  public business: BusinessModel|null = null;
  public financier: FinancierModel|null = null;
  public partnership: PartnershipModel|null = null;
  public beneficiary: BeneficiaryModel|null = null;

  ngOnInit(): void { 
    this.materialsService.getMaterialById(this.data).subscribe(material => {
      const { business = null, financier = null, partnership = null, beneficiary = null } = material;
      this.material = material;
      this.partnership = partnership;
      this.business = business;
      this.financier = financier;
      this.beneficiary = beneficiary;
    });
  }

}
