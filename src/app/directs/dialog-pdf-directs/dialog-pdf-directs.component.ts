import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { DirectPdfModel } from '../direct-pdf.model';
import { DirectsService } from '../directs.service';
import jsPDF from "jspdf";

export interface DirectPdfData {
  type: string
  constructionId: string
  directId: string
}

@Component({
  selector: 'app-dialog-pdf-directs',
  templateUrl: './dialog-pdf-directs.component.html',
  styleUrls: ['./dialog-pdf-directs.component.sass']
})
export class DialogPdfDirectsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly data: DirectPdfData,
    private readonly dialogRef: MatDialogRef<DialogPdfDirectsComponent>,
    private readonly sanitizer: DomSanitizer,
    private readonly directsService: DirectsService,
  ) { }

  public url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  public accept: string = 'application/pdf, image/png, image/gif, image/jpeg';
  public isLoading: boolean = false;
  public directPdfs: DirectPdfModel[] = [];
  public tabIndex: number = 0;
  public pdfId: string = '';
  public directPdfId: string = '';
  public attachAll: boolean = false;

  ngOnInit(): void { 
    this.fetchData();
  }

  fetchData() {
    this.directsService.getDirectPdfs(this.data.directId, this.data.type).subscribe(directPdfs => {
      this.directPdfs = directPdfs;
    });
  }

  onDeletePdf() {
    this.tabIndex = 0;
    this.directsService.deletePdf(this.pdfId).subscribe(() => {
      this.fetchData();
    });
  }

  onChangePdf(directPdf: DirectPdfModel) {
    this.pdfId = directPdf.pdfId;
    this.directPdfId = directPdf._id,
    this.tabIndex = 1;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.baseUrl}directs/pdfs/${this.pdfId}`);
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
          this.directsService.uploadPdf(formData, this.data.directId, this.data.type, this.data.constructionId, this.attachAll).subscribe(pdfId => {
            console.log(pdfId);
            this.fetchData();
          });
        });
      } else {
        formData.append('file', file),
        this.directsService.uploadPdf(formData, this.data.directId, this.data.type, this.data.constructionId, this.attachAll).subscribe(pdfId => {
          console.log(pdfId);
          this.fetchData();
        });
      }
      
    }
  }

}
