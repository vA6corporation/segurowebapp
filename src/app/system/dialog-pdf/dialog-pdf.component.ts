import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-pdf',
  templateUrl: './dialog-pdf.component.html',
  styleUrls: ['./dialog-pdf.component.sass']
})
export class DialogPdfComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly uri: string,
    private readonly dialogRef: MatDialogRef<DialogPdfComponent>,
    private readonly sanitizer: DomSanitizer,
  ) { }

  public url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.baseUrl + this.uri);
  private onDeleteEvent: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void { 

  }

  onDeletePdf() {
    this.onDeleteEvent.next();
  }

  handleDeletePdf() {
    return this.onDeleteEvent;
  }

}





