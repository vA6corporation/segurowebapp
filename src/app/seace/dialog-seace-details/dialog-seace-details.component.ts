import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-seace-details',
  templateUrl: './dialog-seace-details.component.html',
  styleUrls: ['./dialog-seace-details.component.sass']
})
export class DialogSeaceDetailsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly seaceData: any
  ) { }

  ngOnInit(): void {
  }

}
