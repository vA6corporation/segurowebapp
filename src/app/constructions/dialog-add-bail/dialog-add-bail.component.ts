import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-bail',
  templateUrl: './dialog-add-bail.component.html',
  styleUrls: ['./dialog-add-bail.component.sass']
})
export class DialogAddBailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly constructionId: string,
  ) { }

  ngOnInit(): void {
  }

}
