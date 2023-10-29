import { Component, Inject, OnInit } from '@angular/core';
import { SeaceService } from '../seace.service';
import { SeaceDataModel } from '../seace-data.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-offers',
  templateUrl: './dialog-offers.component.html',
  styleUrls: ['./dialog-offers.component.sass']
})
export class DialogOffersComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly seaceData: SeaceDataModel,
    private readonly seaceService: SeaceService,
  ) { }

  public businessOfferPdfs: any[] = [];
  public tabIndex: number = 0;

  ngOnInit(): void {
    this.seaceService.getBusinessOfferPdfsBySeaceData(this.seaceData._id).subscribe(businessOfferPdfs => {
      console.log(businessOfferPdfs);
      this.businessOfferPdfs = businessOfferPdfs;
    });
  }

  downloadURI(uri: string, name: string) {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.target = '_blank'
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onBusinessOfferSelect(businessOfferPdf: any) {
    const url = environment.baseUrlSeaceFiles + 'getFile/' + businessOfferPdf._id;
    console.log(url);
    this.downloadURI(url, businessOfferPdf.filename);    
  }

}
