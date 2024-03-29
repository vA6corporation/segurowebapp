import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ConstructionPdfModel } from '../construction-pdf.model';
import { ConstructionsService } from '../constructions.service';
import jsPDF from 'jspdf';

export interface DialogAttachPdfData {
  constructionId: string
  type: string
}

@Component({
  selector: 'app-dialog-attach-pdf',
  templateUrl: './dialog-attach-pdf.component.html',
  styleUrls: ['./dialog-attach-pdf.component.sass']
})
export class DialogAttachPdfComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly data: DialogAttachPdfData,
    private readonly sanitizer: DomSanitizer,
    private readonly constructionsService: ConstructionsService,
  ) { }

  public url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  public accept: string = 'application/pdf, image/png, image/gif, image/jpeg, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/msword, .doc, .docx';
  public isLoading: boolean = false;
  public constructionPdfs: ConstructionPdfModel[] = [];
  public tabIndex: number = 0;
  public pdfId: string = '';
  public constructionPdfId: string = '';

  ngOnInit(): void { 
    this.fetchData();
  }

  fetchData() {
    this.constructionsService.getPdfs(this.data.type, this.data.constructionId).subscribe(constructionPdfs => {
      this.constructionPdfs = constructionPdfs;
    });
  }

  onDeletePdf() {
    this.tabIndex = 0;
    this.constructionsService.deletePdf(this.constructionPdfId, this.pdfId).subscribe(() => {
      this.fetchData();
    });
  }

  onChangePdf(constructionPdf: ConstructionPdfModel) {
    this.pdfId = constructionPdf.pdfId;
    this.constructionPdfId = constructionPdf._id;
    if (constructionPdf.contentType === 'application/pdf' || constructionPdf.contentType.includes('image')) {
      this.tabIndex = 1;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.baseUrl}constructions/pdfs/${this.pdfId}`);
    } else {
      this.downloadURI(`${environment.baseUrl}paymentOrderPdfs/byPdfIdDownload/${this.pdfId}/${constructionPdf.filename}`, constructionPdf.filename)
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
        const file: File = files[index];
        const formData = new FormData();
  
        if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel" || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          formData.append('file', file),
          this.constructionsService.uploadPdf(formData, this.data.type, this.data.constructionId).subscribe(pdfId => {
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
            this.constructionsService.uploadPdf(formData, this.data.type, this.data.constructionId).subscribe(pdfId => {
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
