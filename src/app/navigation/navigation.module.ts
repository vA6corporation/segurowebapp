import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TopbarComponent,
    SidenavListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [ 
    TopbarComponent,
    SidenavListComponent,
  ]
})
export class NavigationModule { }
