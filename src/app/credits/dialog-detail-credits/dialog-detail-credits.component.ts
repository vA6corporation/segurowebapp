import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BeneficiaryModel } from 'src/app/beneficiaries/beneficiary.model';
import { CustomerModel } from 'src/app/customers/customer.model';
import { FinancierModel } from 'src/app/financiers/financier.model';
import { Material }from 'src/app/materials/material.model';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { CreditModel } from '../credit.model';
import { CreditsService } from '../credits.service';

@Component({
  selector: 'app-dialog-detail-credits',
  templateUrl: './dialog-detail-credits.component.html',
  styleUrls: ['./dialog-detail-credits.component.sass']
})
export class DialogDetailCreditsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    private readonly creditId: string,
    private readonly creditsService: CreditsService,
  ) { }

  public credit: CreditModel|null = null;
  public customer: CustomerModel|null = null;
  public financier: FinancierModel|null = null;
  public partnership: PartnershipModel|null = null;
  public beneficiary: BeneficiaryModel|null = null;

  ngOnInit(): void { 
    this.creditsService.getCreditById(this.creditId).subscribe(credit => {
      const { customer = null, financier = null, partnership = null } = credit;
      this.credit = credit;
      this.partnership = partnership;
      this.customer = customer;
      this.financier = financier;
    });
  }

}
