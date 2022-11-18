import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessesRoutingModule } from './businesses-routing.module';
import { BusinessesComponent } from './businesses/businesses.component';
import { CreateBusinessesComponent } from './create-businesses/create-businesses.component';
import { EditBusinessesComponent } from './edit-businesses/edit-businesses.component';
import { DialogBusinessesComponent } from './dialog-businesses/dialog-businesses.component';
import { DialogConstructionBusinessesComponent } from './dialog-construction-businesses/dialog-construction-businesses.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogAttachPdfComponent } from './dialog-attach-pdf/dialog-attach-pdf.component';
import { InvestmentsModule } from '../investments/investments.module';
import { PropertiesModule } from '../properties/properties.module';
import { MovablePropertiesModule } from '../movable-properties/movable-properties.module';
import { ExperiencesModule } from '../experiences/experiences.module';
import { DialogFacilityCreditsComponent } from './dialog-facility-credits/dialog-facility-credits.component';
import { DialogAddGuarantiesComponent } from './dialog-add-guaranties/dialog-add-guaranties.component';
import { BoardMembersModule } from '../board-members/board-members.module';
import { DialogAddSalesmixComponent } from './dialog-add-salesmix/dialog-add-salesmix.component';
import { DialogAddMainCustomersComponent } from './dialog-add-main-customers/dialog-add-main-customers.component';
import { DialogAddMainSuppliersComponent } from './dialog-add-main-suppliers/dialog-add-main-suppliers.component';
import { DialogAddAccountRotationComponent } from './dialog-add-account-rotation/dialog-add-account-rotation.component';
import { DialogAddAccessCreditComponent } from './dialog-add-access-credit/dialog-add-access-credit.component';
import { DialogAddTrialsComponent } from './dialog-add-trials/dialog-add-trials.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    BusinessesComponent, 
    CreateBusinessesComponent, 
    EditBusinessesComponent, 
    DialogBusinessesComponent, 
    DialogConstructionBusinessesComponent, 
    DialogAttachPdfComponent, DialogFacilityCreditsComponent, DialogAddGuarantiesComponent, DialogAddSalesmixComponent, DialogAddMainCustomersComponent, DialogAddMainSuppliersComponent, DialogAddAccountRotationComponent, DialogAddAccessCreditComponent, DialogAddTrialsComponent,
  ],
  imports: [
    CommonModule,
    BusinessesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    InvestmentsModule,
    PropertiesModule,
    MovablePropertiesModule,
    ExperiencesModule,
    BoardMembersModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class BusinessesModule { }
