import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface DialogSelectPdfData {
  file: File,
  fileName: string
  fileType: string
  base64: string
}

@Component({
  selector: 'app-dialog-select-pdf',
  templateUrl: './dialog-select-pdf.component.html',
  styleUrls: ['./dialog-select-pdf.component.sass']
})
export class DialogSelectPdfComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly insurancePdfs: DialogSelectPdfData[],
    private readonly sanitizer: DomSanitizer,
  ) { }

  public accept: string = 'application/pdf, image/png, image/gif, image/jpeg, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/msword, .doc, .docx';
  public isLoading: boolean = false;
  public insurancePdf: DialogSelectPdfData|null = null;
  public index: number = 0;
  public tabIndex: number = 0;
  public pdfId: string = '';
  private selectedFile$: EventEmitter<DialogSelectPdfData[]> = new EventEmitter();
  public url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');


  ngOnInit(): void { 
  }

  handleSelectedFile() {
    return this.selectedFile$.asObservable();
  }

  onChangePdf(insurancePdf: DialogSelectPdfData, index: number) {
    this.insurancePdf = insurancePdf;
    this.index = index;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(insurancePdf.base64);
    this.tabIndex = 1;
  }

  onDeletePdf() {
    this.insurancePdfs.splice(this.index, 1);
    this.selectedFile$.next(this.insurancePdfs);
    this.tabIndex = 0;
  }

  downloadURI(uri: string, name: string) { 
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
        reject(error);
      };
    });
 }
 

  async onFileSelected(files: FileList|null, input: HTMLInputElement) {
    if (files !== null) {
      
      for (let index = 0; index < files.length; index++) {
        const file: File = files[index];
        
        const base64 = await this.getBase64(file);
        
        this.insurancePdfs.push({
          file,
          base64,
          fileName: file.name,
          fileType: file.type
        });
      }
      
      input.value = '';

      this.selectedFile$.next(this.insurancePdfs);
    }
  }


}
