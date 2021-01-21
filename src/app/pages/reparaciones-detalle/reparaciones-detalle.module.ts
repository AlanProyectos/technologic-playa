import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReparacionesDetallePageRoutingModule } from './reparaciones-detalle-routing.module';

import { ReparacionesDetallePage } from './reparaciones-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReparacionesDetallePageRoutingModule
  ],
  declarations: [ReparacionesDetallePage]
})
export class ReparacionesDetallePageModule {}
