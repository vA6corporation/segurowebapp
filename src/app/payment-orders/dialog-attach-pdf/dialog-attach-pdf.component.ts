import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { PaymentOrderPdfModel } from '../payment-order-pdf.model';
import { PaymentOrdersService } from '../payment-orders.service';

@Component({
  selector: 'app-dialog-attach-pdf',
  templateUrl: './dialog-attach-pdf.component.html',
  styleUrls: ['./dialog-attach-pdf.component.sass']
})
export class DialogAttachPdfComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly paymentOrderId: string,
    private readonly sanitizer: DomSanitizer,
    private readonly paymentOrdersService: PaymentOrdersService,
  ) { }

  public url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  public accept: string = '';
  public isLoading: boolean = false;
  public paymentOrderPdfs: PaymentOrderPdfModel[] = [];
  public tabIndex: number = 0;
  public pdfId: string = '';
  public paymentOrderPdfId: string = '';

  private onChangePdfEvent$: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void { 
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    this.paymentOrdersService.getPdfs(this.paymentOrderId).subscribe(paymentOrderPdfs => {
      this.isLoading = false;
      this.paymentOrderPdfs = paymentOrderPdfs;
    });
  }

  handleChangePdf() {
    return this.onChangePdfEvent$;
  }

  onDeletePdf() {
    this.tabIndex = 0;
    this.paymentOrdersService.deletePdf(this.pdfId).subscribe(() => {
      this.fetchData();
      this.onChangePdfEvent$.next();
    });
  }

  onChangePdf(paymentOrderPdf: PaymentOrderPdfModel) {
    this.pdfId = paymentOrderPdf.pdfId;
    this.paymentOrderPdfId = paymentOrderPdf._id;
    if (paymentOrderPdf.contentType === 'application/pdf' || paymentOrderPdf.contentType.includes('image')) {
      this.tabIndex = 1;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.baseUrl}paymentOrderPdfs/byPdfId/${this.pdfId}`);
    } else {
      this.downloadURI(`${environment.baseUrl}paymentOrderPdfs/byPdfIdDownload/${this.pdfId}/${paymentOrderPdf.filename}`, paymentOrderPdf.filename)
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
          const promise = this.paymentOrdersService.uploadFile(formData, this.paymentOrderId).toPromise();
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
        const promise = this.paymentOrdersService.uploadFile(formData, this.paymentOrderId).toPromise();
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
