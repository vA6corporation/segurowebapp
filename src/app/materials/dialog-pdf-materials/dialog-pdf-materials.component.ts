import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';
import { MaterialPdfModel } from '../material-pdf.model';
import { MaterialsService } from '../materials.service';

export interface MaterialPdfData {
  type: string
  constructionId: string
  materialId: string
}

@Component({
  selector: 'app-dialog-pdf-materials',
  templateUrl: './dialog-pdf-materials.component.html',
  styleUrls: ['./dialog-pdf-materials.component.sass']
})
export class DialogPdfMaterialsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly data: MaterialPdfData,
    private readonly sanitizer: DomSanitizer,
    private readonly materialsService: MaterialsService,
  ) { }

  public url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  public accept: string = 'application/pdf, image/png, image/gif, image/jpeg';
  public isLoading: boolean = false;
  public materialPdfs: MaterialPdfModel[] = [];
  public tabIndex: number = 0;
  public pdfId: string = '';
  public materialPdfId: string = '';
  public attachAll: boolean = false;

  ngOnInit(): void { 
    this.fetchData();
  }

  fetchData() {
    this.materialsService.getMaterialPdfs(this.data.materialId, this.data.type).subscribe(materialPdfs => {
      this.materialPdfs = materialPdfs;
    });
  }

  onDeletePdf() {
    this.tabIndex = 0;
    this.materialsService.deletePdf(this.pdfId).subscribe(() => {
      this.fetchData();
    });
  }

  onChangePdf(materialPdf: MaterialPdfModel) {
    this.pdfId = materialPdf.pdfId;
    this.materialPdfId = materialPdf._id,
    this.tabIndex = 1;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.baseUrl}materials/pdfs/${this.pdfId}`);
  }

  onFileSelected(files: FileList|null, input: HTMLInputElement) {
    if (files !== null && files[0] !== null) {
      const file: File = files[0];
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
          this.materialsService.uploadPdf(formData, this.data.materialId, this.data.type, this.data.constructionId, this.attachAll).subscribe(pdfId => {
            console.log(pdfId);
            this.fetchData();
          });
        });
      } else {
        formData.append('file', file),
        this.materialsService.uploadPdf(formData, this.data.materialId, this.data.type, this.data.constructionId, this.attachAll).subscribe(pdfId => {
          console.log(pdfId);
          this.fetchData();
        });
      }
      
    }
  }

}
