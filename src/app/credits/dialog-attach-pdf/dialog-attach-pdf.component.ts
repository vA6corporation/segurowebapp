import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';
import { CreditPdfModel } from '../credit-pdf.model';
import { CreditsService } from '../credits.service';

export interface CreditPdfData {
  type: string
  creditId: string
}

@Component({
  selector: 'app-dialog-attach-pdf',
  templateUrl: './dialog-attach-pdf.component.html',
  styleUrls: ['./dialog-attach-pdf.component.sass']
})
export class DialogAttachPdfComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly data: CreditPdfData,
    private readonly sanitizer: DomSanitizer,
    private readonly creditsService: CreditsService,
  ) { }

  public url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  public accept: string = 'application/pdf, image/png, image/gif, image/jpeg, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/msword, .doc, .docx';
  public isLoading: boolean = false;
  public creditPdfs: CreditPdfModel[] = [];
  public tabIndex: number = 0;
  public pdfId: string = '';
  public creditPdfId: string = '';

  ngOnInit(): void { 
    this.fetchData();
  }

  fetchData() {
    this.creditsService.getPdfs(this.data.creditId, this.data.type).subscribe(creditPdfs => {
      this.creditPdfs = creditPdfs;
    });
  }

  onDeletePdf() {
    this.tabIndex = 0;
    this.creditsService.deletePdf(this.creditPdfId, this.pdfId).subscribe(() => {
      this.fetchData();
    });
  }

  onChangePdf(creditPdf: CreditPdfModel) {
    this.pdfId = creditPdf.pdfId;
    this.creditPdfId = creditPdf._id;
    if (creditPdf.fileType === 'application/pdf') {
      this.tabIndex = 1;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.baseUrl}credits/pdfs/${this.pdfId}`);
    } else if (creditPdf.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      this.downloadURI(`${environment.baseUrl}credits/docx/${this.pdfId}`, creditPdf.filename)
    } else {
      this.downloadURI(`${environment.baseUrl}credits/xls/${this.pdfId}`, creditPdf.filename)
    }
  }

  downloadURI(uri: string, name: string) {
    console.log(uri);
    console.log(name);
    
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onFileSelected(files: FileList|null, input: HTMLInputElement) {
    if (files !== null && files[0] !== null) {
      const file: File = files[0];
      input.value = '';
      const formData = new FormData();

      console.log(file);
      
      if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel" || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        formData.append('file', file),
        this.creditsService.uploadPdf(formData, this.data.creditId, this.data.type).subscribe(pdfId => {
          console.log(pdfId);
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
            console.log('Error: ', error);
          };
        }).then((result: any) => {
          const pdf = new jsPDF("p", "mm", "a4");

          var width = pdf.internal.pageSize.getWidth();
          var height = pdf.internal.pageSize.getHeight();

          pdf.addImage(result, 'JPEG', 0, 0, width, height);
          const data = pdf.output('blob');
          formData.append('file', data);
          this.creditsService.uploadPdf(formData, this.data.creditId, this.data.type).subscribe(pdfId => {
            console.log(pdfId);
            this.fetchData();
          });
        });
      }
      
    }
  }

}
