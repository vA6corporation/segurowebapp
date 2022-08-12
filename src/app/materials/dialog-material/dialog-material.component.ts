import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BeneficiaryModel } from 'src/app/beneficiaries/beneficiary.model';
import { CustomerModel } from 'src/app/customers/customer.model';
import { FinancierModel } from 'src/app/financiers/financier.model';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { Material }from '../material.model';
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

  public material: Material|null = null;
  public customer: CustomerModel|null = null;
  public financier: FinancierModel|null = null;
  public partnership: PartnershipModel|null = null;
  public beneficiary: BeneficiaryModel|null = null;

  ngOnInit(): void { 
    this.materialsService.getMaterialById(this.data).subscribe(material => {
      console.log(material);
      
      const { customer = null, financier = null, partnership = null, beneficiary = null } = material;
      this.material = material;
      this.partnership = partnership;
      this.customer = customer;
      this.financier = financier;
      this.beneficiary = beneficiary;
    });
  }

}
