import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavigationService } from 'src/app/navigation/navigation.service';
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

  // public accept: string = 'application/pdf';
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

  onFileSelected(files: FileList|null, input: HTMLInputElement) {
    if (files !== null && files[0] !== null) {
      const file: File = files[0];
      input.value = '';
      const formData = new FormData();
      formData.append('file', file),
      this.paymentOrdersService.uploadPdf(formData, this.paymentOrderId).subscribe(pdfId => {
        this.fetchData();
        this.onChangePdfEvent$.next();
      });    
    }
  }

}
