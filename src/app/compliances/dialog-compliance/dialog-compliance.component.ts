import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BeneficiaryModel } from 'src/app/beneficiaries/beneficiary.model';
import { BusinessModel } from 'src/app/businesses/business.model';
import { FinancierModel } from 'src/app/financiers/financier.model';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { ComplianceModel } from '../compliance.model';
import { CompliancesService } from '../compliances.service';

@Component({
  selector: 'app-dialog-compliance',
  templateUrl: './dialog-compliance.component.html',
  styleUrls: ['./dialog-compliance.component.sass']
})
export class DialogComplianceComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    private data: string,
    private compliancessService: CompliancesService,
  ) { }

  public compliance: ComplianceModel|null = null;
  public business: BusinessModel|null = null;
  public financier: FinancierModel|null = null;
  public partnership: PartnershipModel|null = null;
  public beneficiary: BeneficiaryModel|null = null;

  ngOnInit(): void { 
    this.compliancessService.getComplianceById(this.data).subscribe(compliance => {
      const { business = null, financier = null, partnership = null, beneficiary = null } = compliance;
      this.compliance = compliance;
      this.partnership = partnership;
      this.business = business;
      this.financier = financier;
      this.beneficiary = beneficiary;
    });
  }

}
