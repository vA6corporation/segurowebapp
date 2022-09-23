import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';
import { CompliancePdfModel } from '../compliance-pdf.model';
import { CompliancesService } from '../compliances.service';

export interface CompliancePdfData {
  type: string
  constructionId: string
  complianceId: string
}

@Component({
  selector: 'app-dialog-pdf-compliances',
  templateUrl: './dialog-pdf-compliances.component.html',
  styleUrls: ['./dialog-pdf-compliances.component.sass']
})
export class DialogPdfCompliancesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly data: CompliancePdfData,
    private readonly dialogRef: MatDialogRef<DialogPdfCompliancesComponent>,
    private readonly sanitizer: DomSanitizer,
    private readonly compliancesService: CompliancesService,
  ) { }

  public url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  public accept: string = 'application/pdf, image/png, image/gif, image/jpeg';
  public isLoading: boolean = false;
  public compliancePdfs: CompliancePdfModel[] = [];
  public tabIndex: number = 0;
  public pdfId: string = '';
  public compliancePdfId: string = '';
  public attachAll: boolean = false;

  ngOnInit(): void { 
    this.fetchData();
  }

  fetchData() {
    this.compliancesService.getCompliancePdfs(this.data.complianceId, this.data.type).subscribe(compliancePdfs => {
      this.compliancePdfs = compliancePdfs;
    });
  }

  onDeletePdf() {
    this.tabIndex = 0;
    this.compliancesService.deletePdf(this.pdfId).subscribe(() => {
      this.fetchData();
    });
  }

  onChangePdf(compliancePdf: CompliancePdfModel) {
    this.pdfId = compliancePdf.pdfId;
    this.compliancePdfId = compliancePdf._id,
    this.tabIndex = 1;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.baseUrl}compliances/pdfs/${this.pdfId}`);
  }

  onFileSelected(files: FileList|null, input: HTMLInputElement) {
    if (files !== null && files[0] !== null) {
      const file: File = files[0];
      console.log(file);
      
      input.value = '';
      const formData = new FormData();
      
      if (file.type !== "application/pdf") {
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            resolve(reader.result);
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
          };
        }).then((result: any) => {
          const pdf = new jsPDF("p", "mm", "a4");

          var width = pdf.internal.pageSize.getWidth();
          var height = pdf.internal.pageSize.getHeight();

          pdf.addImage(result, 'JPEG', 0, 0, width, height);
          const data = pdf.output('blob');
          formData.append('file', data);
          this.compliancesService.uploadPdf(formData, this.data.complianceId, this.data.type, this.data.constructionId, this.attachAll).subscribe(pdfId => {
            console.log(pdfId);
            this.fetchData();
          });
        });
      } else {
        formData.append('file', file),
        this.compliancesService.uploadPdf(formData, this.data.complianceId, this.data.type, this.data.constructionId, this.attachAll).subscribe(pdfId => {
          console.log(pdfId);
          this.fetchData();
        });
      }
      
    }
  }

}
