import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChequeModel } from '../cheque.model';
import { ChequesService } from '../cheques.service';

@Component({
  selector: 'app-dialog-detail-cheques',
  templateUrl: './dialog-detail-cheques.component.html',
  styleUrls: ['./dialog-detail-cheques.component.sass']
})
export class DialogDetailChequesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly chequeId: string,
    private readonly chequesService: ChequesService,
  ) { }

  cheque: ChequeModel|null = null;

  ngOnInit(): void {
    this.chequesService.getChequeById(this.chequeId).subscribe(cheque => {
      this.cheque = cheque;
    });
  }

}
