import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { TemplateModel } from '../template.model';

@Component({
  selector: 'app-dialog-templates',
  templateUrl: './dialog-templates.component.html',
  styleUrls: ['./dialog-templates.component.sass']
})
export class DialogTemplatesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly template: TemplateModel,
  ) { }

  public baseUrl: string = environment.baseUrl;

  ngOnInit(): void { }
}
