import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { CapitalIncreasesService } from '../capital-increases.service';
import { CapitalIncreasePdfModel } from '../capital-increase-pdf.model';

export interface DialogAttachPdfData {
  capitalIncreaseId: string
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
    private readonly capitalIncreasesService: CapitalIncreasesService,
  ) { }

  public url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  public accept: string = '';
  public isLoading: boolean = false;
  public capitalIncreasePdfs: CapitalIncreasePdfModel[] = [];
  public tabIndex: number = 0;
  public pdfId: string = '';
  public capitalIncreasePdfId: string = '';

  private onChangePdfEvent$: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void { 
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    this.capitalIncreasesService.getPdfs(this.data.capitalIncreaseId, this.data.type).subscribe(capitalIncreasePdfs => {
      this.isLoading = false;
      this.capitalIncreasePdfs = capitalIncreasePdfs;
    });
  }

  handleChangePdf() {
    return this.onChangePdfEvent$;
  }

  onDeletePdf() {
    this.tabIndex = 0;
    this.capitalIncreasesService.deletePdf(this.pdfId).subscribe(() => {
      this.fetchData();
      this.onChangePdfEvent$.next();
    });
  }

  onChangePdf(capitalIncreasePdf: CapitalIncreasePdfModel) {
    this.pdfId = capitalIncreasePdf.pdfId;
    this.capitalIncreasePdfId = capitalIncreasePdf._id;
    if (capitalIncreasePdf.contentType === 'application/pdf' || capitalIncreasePdf.contentType.includes('image')) {
      this.tabIndex = 1;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.baseUrl}capitalIncreasePdfs/byPdfId/${this.pdfId}`);
    } else {
      this.downloadURI(`${environment.baseUrl}capitalIncreasePdfs/byPdfIdDownload/${this.pdfId}/${capitalIncreasePdf.filename}`, capitalIncreasePdf.filename)
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
          const promise = this.capitalIncreasesService.uploadFile(formData, this.data.capitalIncreaseId, this.data.type).toPromise();
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
    console.log(files)
    if (files !== null) {
      const promises: Promise<any>[] = [];
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const formData = new FormData();
        formData.append('file', file);
        const promise = this.capitalIncreasesService.uploadFile(formData, this.data.capitalIncreaseId, this.data.type).toPromise().catch(console.log);
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
