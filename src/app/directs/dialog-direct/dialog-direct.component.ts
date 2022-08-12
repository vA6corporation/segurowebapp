import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BeneficiaryModel } from 'src/app/beneficiaries/beneficiary.model';
import { CustomerModel } from 'src/app/customers/customer.model';
import { FinancierModel } from 'src/app/financiers/financier.model';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { Direct } from '../direct.model';
import { DirectsService } from '../directs.service';

@Component({
  selector: 'app-dialog-direct',
  templateUrl: './dialog-direct.component.html',
  styleUrls: ['./dialog-direct.component.sass']
})
export class DialogDirectComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    private readonly data: string,
    private readonly directsService: DirectsService,
  ) { }

  public direct: Direct|null = null;
  public customer: CustomerModel|null = null;
  public financier: FinancierModel|null = null;
  public partnership: PartnershipModel|null = null;
  public beneficiary: BeneficiaryModel|null = null;

  ngOnInit(): void { 
    this.directsService.getDirectById(this.data).subscribe(direct => {
      const { customer = null, financier = null, partnership = null, beneficiary = null } = direct;
      this.direct = direct;
      this.partnership = partnership;
      this.customer = customer;
      this.financier = financier;
      this.beneficiary = beneficiary;
    });
  }

}
