import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TopbarComponent,
    SidenavListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [ 
    TopbarComponent,
    SidenavListComponent,
  ]
})
export class NavigationModule { }
