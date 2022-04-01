import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Beneficiary } from 'src/app/beneficiaries/beneficiary.model';
import { CustomerModel } from 'src/app/customers/customer.model';
import { FinancierModel } from 'src/app/financiers/financier.model';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { Compliance } from '../compliance.model';
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

  public compliance: Compliance|null = null;
  public customer: CustomerModel|null = null;
  public financier: FinancierModel|null = null;
  public partnership: PartnershipModel|null = null;
  public beneficiary: Beneficiary|null = null;

  ngOnInit(): void { 
    this.compliancessService.getComplianceById(this.data).subscribe(compliance => {
      const { customer = null, financier = null, partnership = null, beneficiary = null } = compliance;
      this.compliance = compliance;
      this.partnership = partnership;
      this.customer = customer;
      this.financier = financier;
      this.beneficiary = beneficiary;
    });
  }

}
