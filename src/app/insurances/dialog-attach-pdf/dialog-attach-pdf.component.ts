import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';
import { InsurancePdfModel } from '../insurance-pdf.model';
import { InsurancesService } from '../insurances.service';

export interface InsurancePdfData {
  type: string
  insuranceId: string
}

@Component({
  selector: 'app-dialog-attach-pdf',
  templateUrl: './dialog-attach-pdf.component.html',
  styleUrls: ['./dialog-attach-pdf.component.sass']
})
export class DialogAttachPdfComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly data: InsurancePdfData,
    private readonly sanitizer: DomSanitizer,
    private readonly insurancesService: InsurancesService,
  ) { }

  public url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  public accept: string = 'application/pdf, image/png, image/gif, image/jpeg, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/msword, .doc, .docx';
  public isLoading: boolean = false;
  public insurancePdfs: InsurancePdfModel[] = [];
  public tabIndex: number = 0;
  public pdfId: string = '';
  public insurancePdfId: string = '';

  ngOnInit(): void { 
    this.fetchData();
  }

  fetchData() {
    this.insurancesService.getPdfs(this.data.insuranceId, this.data.type).subscribe(insurancePdfs => {
      this.insurancePdfs = insurancePdfs;
    });
  }

  onDeletePdf() {
    this.tabIndex = 0;
    this.insurancesService.deletePdf(this.insurancePdfId, this.pdfId).subscribe(() => {
      this.fetchData();
    });
  }

  onChangePdf(insurancePdf: InsurancePdfModel) {
    this.pdfId = insurancePdf.pdfId;
    this.insurancePdfId = insurancePdf._id;
    console.log(insurancePdf);
    if (insurancePdf.fileType === 'application/pdf') {
      this.tabIndex = 1;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.baseUrl}insurances/pdfs/${this.pdfId}`);
    } else if (insurancePdf.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // this.downloadURI(`${environment.baseUrl}insurances/docx/${this.pdfId}`, insurancePdf.filename)
    } else {
      this.downloadURI(`${environment.baseUrl}insurances/xls/${this.pdfId}`, insurancePdf.filename)
      // this.downloadURI(`${environment.baseUrl}insurances/xls/${this.pdfId}`, insurancePdf.filename)
    }
  }

  downloadURI(uri: string, name: string) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onFileSelected(files: FileList|null, input: HTMLInputElement) {
    if (files !== null) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const formData = new FormData();
        if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel" || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          formData.append('file', file),
          this.insurancesService.uploadFile(formData, this.data.insuranceId, this.data.type).subscribe(pdfId => {
            this.fetchData();
          });  
        } else {
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
              resolve(reader.result);
            };
            reader.onerror = function (error) {
              reject(error);
            };
          }).then((result: any) => {
            const pdf = new jsPDF("p", "mm", "a4");
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();
            pdf.addImage(result, 'JPEG', 0, 0, width, height);
            const data = pdf.output('blob');
            formData.append('file', data);
            this.insurancesService.uploadFile(formData, this.data.insuranceId, this.data.type).subscribe(pdfId => {
              console.log(pdfId);
              this.fetchData();
            });
          });
        }
      }      
    }
    input.value = '';
  }

}
