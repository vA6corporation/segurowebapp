import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GuaranteeModel } from 'src/app/guarantees/guarantee.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ConstructionsService } from '../constructions.service';

@Component({
  selector: 'app-dialog-detail-constructions',
  templateUrl: './dialog-detail-constructions.component.html',
  styleUrls: ['./dialog-detail-constructions.component.sass']
})
export class DialogDetailConstructionsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    private readonly constructionId: string,
    private readonly constructionsService: ConstructionsService,
    private readonly navigationService: NavigationService,
  ) { }

  public guaranties: GuaranteeModel[] = [];
  public guarantiesGAMF: any[] = [];
  public guarantiesGADF: any[] = [];
  public guarantiesGFCF: any[] = [];

  ngOnInit(): void { 
    // this.navigationService.loadBarStart();
    this.constructionsService.getGuarantiesByConstructionId(this.constructionId).subscribe(guaranties => {
      this.navigationService.loadBarFinish();
      this.guarantiesGAMF = guaranties.filter(e => e.guaranteeType === 'GAMF');
      this.guarantiesGADF = guaranties.filter(e => e.guaranteeType === 'GADF');
      this.guarantiesGFCF = guaranties.filter(e => e.guaranteeType === 'GFCF');
    });
  }

}
