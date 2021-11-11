import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Beneficiary } from 'src/app/beneficiaries/beneficiary.model';
import { Customer } from 'src/app/customers/customer.model';
import { Financier } from 'src/app/financiers/financier.model';
import { Partnership } from 'src/app/partnerships/partnership.model';
import { Material } from '../material.model';
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
  public customer: Customer|null = null;
  public financier: Financier|null = null;
  public partnership: Partnership|null = null;
  public beneficiary: Beneficiary|null = null;

  ngOnInit(): void { 
    this.materialsService.getMaterialById(this.data).subscribe(material => {
      const { customer = null, financier = null, partnership = null, beneficiary = null } = material;
      this.material = material;
      this.partnership = partnership;
      this.customer = customer;
      this.financier = financier;
      this.beneficiary = beneficiary;
    });
  }

}
