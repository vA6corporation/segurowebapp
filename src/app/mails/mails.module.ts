import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailsRoutingModule } from './mails-routing.module';
import { MailsComponent } from './mails/mails.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [MailsComponent],
  imports: [
    MaterialModule,
    CommonModule,
    MailsRoutingModule
  ]
})
export class MailsModule { }
