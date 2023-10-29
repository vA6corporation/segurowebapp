import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaymentModel } from '../payment.model';

@Component({
  selector: 'app-dialog-payments',
  templateUrl: './dialog-payments.component.html',
  styleUrls: ['./dialog-payments.component.sass']
})
export class DialogPaymentsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public readonly payments: PaymentModel[],
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  onOpen(payment: PaymentModel) {
    const url = this.router.serializeUrl(this.router.createUrlTree([`/constructions/${payment.parentId}/edit`]));
    window.open(url, '_blank');
  }

}
