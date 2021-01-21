import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReparacionesFinalizadasDetallePageRoutingModule } from './reparaciones-finalizadas-detalle-routing.module';

import { ReparacionesFinalizadasDetallePage } from './reparaciones-finalizadas-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReparacionesFinalizadasDetallePageRoutingModule
  ],
  declarations: [ReparacionesFinalizadasDetallePage]
})
export class ReparacionesFinalizadasDetallePageModule {}
