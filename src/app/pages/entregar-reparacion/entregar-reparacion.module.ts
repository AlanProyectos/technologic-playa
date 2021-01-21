import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregarReparacionPageRoutingModule } from './entregar-reparacion-routing.module';

import { EntregarReparacionPage } from './entregar-reparacion.page';

import {IonicSelectableModule} from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregarReparacionPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [EntregarReparacionPage]
})
export class EntregarReparacionPageModule {}
