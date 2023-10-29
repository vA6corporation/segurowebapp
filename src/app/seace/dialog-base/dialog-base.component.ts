import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeaceDataModel } from '../seace-data.model';
import { SeaceService } from '../seace.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-base',
  templateUrl: './dialog-base.component.html',
  styleUrls: ['./dialog-base.component.sass']
})
export class DialogBaseComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly seaceData: SeaceDataModel,
    private readonly seaceService: SeaceService,
  ) { }

  public businessBasePdfs: any[] = [];
  public tabIndex: number = 0;

  ngOnInit(): void {
    this.seaceService.getBusinessBasePdfsBySeaceData(this.seaceData._id).subscribe(businessBasePdfs => {
      console.log(businessBasePdfs);
      this.businessBasePdfs = businessBasePdfs;
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

  onBusinessBaseSelect(businessBasePdf: any) {
    const url = environment.baseUrlSeaceFiles + 'getFileBase/' + businessBasePdf._id;
    console.log(url);
    this.downloadURI(url, businessBasePdf.filename);    
  }

}
