import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReparacionesPendientesPageRoutingModule } from './reparaciones-pendientes-routing.module';

import { ReparacionesPendientesPage } from './reparaciones-pendientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReparacionesPendientesPageRoutingModule
  ],
  declarations: [ReparacionesPendientesPage]
})
export class ReparacionesPendientesPageModule {}
