import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessesRoutingModule } from './businesses-routing.module';
import { BusinessesComponent } from './businesses/businesses.component';
import { CreateBusinessesComponent } from './create-businesses/create-businesses.component';
import { EditBusinessesComponent } from './edit-businesses/edit-businesses.component';
import { DialogBusinessesComponent } from './dialog-businesses/dialog-businesses.component';
import { DialogConstructionBusinessesComponent } from './dialog-construction-businesses/dialog-construction-businesses.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogAttachPdfComponent } from './dialog-attach-pdf/dialog-attach-pdf.component';
import { InvestmentsModule } from '../investments/investments.module';
import { PropertiesModule } from '../properties/properties.module';
import { MovablePropertiesModule } from '../movable-properties/movable-properties.module';
import { ExperiencesModule } from '../experiences/experiences.module';
import { DialogFacilityCreditsComponent } from './dialog-facility-credits/dialog-facility-credits.component';

@NgModule({
  declarations: [
    BusinessesComponent, 
    CreateBusinessesComponent, 
    EditBusinessesComponent, 
    DialogBusinessesComponent, 
    DialogConstructionBusinessesComponent, 
    DialogAttachPdfComponent, DialogFacilityCreditsComponent,
  ],
  imports: [
    CommonModule,
    BusinessesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    InvestmentsModule,
    PropertiesModule,
    MovablePropertiesModule,
    ExperiencesModule
  ]
})
export class BusinessesModule { }
