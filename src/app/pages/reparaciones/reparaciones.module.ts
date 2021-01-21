import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReparacionesPageRoutingModule } from './reparaciones-routing.module';

import { ReparacionesPage } from './reparaciones.page';
import { ComponentsModule } from 'src/app/components/components.module';
import {IonicSelectableModule} from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReparacionesPageRoutingModule,
    ComponentsModule,
    IonicSelectableModule
  ],
  declarations: [ReparacionesPage]
})
export class ReparacionesPageModule {}
