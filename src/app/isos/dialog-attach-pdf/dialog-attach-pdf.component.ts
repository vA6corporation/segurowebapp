import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { IsosService } from '../isos.service';
import { IsoPdfModel } from '../iso-pdf.model';

export interface DialogAttachPdfData {
  isoId: string
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
    private readonly isosService: IsosService,
  ) { }

  public url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  public accept: string = '';
  public isLoading: boolean = false;
  public isoPdfs: IsoPdfModel[] = [];
  public tabIndex: number = 0;
  public pdfId: string = '';
  public isoPdfId: string = '';

  private onChangePdfEvent$: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void { 
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    this.isosService.getPdfs(this.data.isoId, this.data.type).subscribe(isoPdfs => {
      this.isLoading = false;
      this.isoPdfs = isoPdfs;
    });
  }

  handleChangePdf() {
    return this.onChangePdfEvent$;
  }

  onDeletePdf() {
    this.tabIndex = 0;
    this.isosService.deletePdf(this.pdfId).subscribe(() => {
      this.fetchData();
      this.onChangePdfEvent$.next();
    });
  }

  onChangePdf(isoPdf: IsoPdfModel) {
    this.pdfId = isoPdf.pdfId;
    this.isoPdfId = isoPdf._id;
    if (isoPdf.contentType === 'application/pdf' || isoPdf.contentType.includes('image')) {
      this.tabIndex = 1;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.baseUrl}isoPdfs/byPdfId/${this.pdfId}`);
    } else {
      this.downloadURI(`${environment.baseUrl}isoPdfs/byPdfIdDownload/${this.pdfId}/${isoPdf.filename}`, isoPdf.filename)
    }
  }

  downloadURI(uri: string, name: string) {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.items) {
      [...event.dataTransfer.items as any].forEach((item, i) => {
        const files: File[] = [];
        if (item.kind === "file") {
          const file = item.getAsFile();
          files.push(file);
          console.log(`… file[${i}].name = ${file.name}`);
        }
        const promises: Promise<any>[] = [];
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          const formData = new FormData();
          formData.append('file', file);
          const promise = this.isosService.uploadFile(formData, this.data.isoId, this.data.type).toPromise();
          promises.push(promise);
        }
        Promise.all(promises).then(() => {
          this.fetchData();
          this.onChangePdfEvent$.next();
        });
      });
    }
  }

  onDragOver(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }

  onFileSelected(files: FileList|null, input: HTMLInputElement) {
    if (files !== null) {
      const promises: Promise<any>[] = [];
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const formData = new FormData();
        formData.append('file', file);
        const promise = this.isosService.uploadFile(formData, this.data.isoId, this.data.type).toPromise();
        promises.push(promise);
      }
      Promise.all(promises).then(() => {
        this.fetchData();
        this.onChangePdfEvent$.next();
      });
      input.value = '';
    }
  }

}
