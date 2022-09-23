import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';
import { BusinessPdfModel } from '../business-pdf.model';
import { BusinessesService } from '../businesses.service';

@Component({
  selector: 'app-dialog-attach-pdf',
  templateUrl: './dialog-attach-pdf.component.html',
  styleUrls: ['./dialog-attach-pdf.component.sass']
})
export class DialogAttachPdfComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly businessId: string,
    private readonly sanitizer: DomSanitizer,
    private readonly businessesService: BusinessesService,
  ) { }

  public url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  public accept: string = 'application/pdf, image/png, image/gif, image/jpeg';
  public isLoading: boolean = false;
  public businessPdfs: BusinessPdfModel[] = [];
  public tabIndex: number = 0;
  public pdfId: string = '';
  public businessPdfId: string = '';

  ngOnInit(): void { 
    this.fetchData();
  }

  fetchData() {
    this.businessesService.getPdfs(this.businessId).subscribe(businessPdfs => {
      this.businessPdfs = businessPdfs;
    }, (error: HttpErrorResponse) => {
      console.log(error);    
    });
  }

  onDeletePdf() {
    this.tabIndex = 0;
    this.businessesService.deletePdf(this.businessPdfId, this.pdfId).subscribe(() => {
      this.fetchData();
    });
  }

  onChangePdf(businessPdf: BusinessPdfModel) {
    this.pdfId = businessPdf.pdfId;
    this.businessPdfId = businessPdf._id;
    if (businessPdf.fileType === 'application/pdf') {
      this.tabIndex = 1;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.baseUrl}businesses/pdfs/${this.pdfId}`);
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
    if (files !== null && files[0] !== null) {
      const file: File = files[0];
      input.value = '';
      const formData = new FormData();

      console.log(file);
      
      if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel" || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        formData.append('file', file),
        this.businessesService.uploadPdf(formData, this.businessId).subscribe(pdfId => {
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
          this.businessesService.uploadPdf(formData, this.businessId).subscribe(pdfId => {
            console.log(pdfId);
            this.fetchData();
          });
        });
      }
      
    }
  }

}
