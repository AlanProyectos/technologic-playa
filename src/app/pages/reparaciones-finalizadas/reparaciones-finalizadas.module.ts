import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReparacionesFinalizadasPageRoutingModule } from './reparaciones-finalizadas-routing.module';

import { ReparacionesFinalizadasPage } from './reparaciones-finalizadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReparacionesFinalizadasPageRoutingModule
  ],
  declarations: [ReparacionesFinalizadasPage]
})
export class ReparacionesFinalizadasPageModule {}
