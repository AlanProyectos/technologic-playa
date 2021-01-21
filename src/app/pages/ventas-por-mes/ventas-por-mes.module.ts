import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentasPorMesPageRoutingModule } from './ventas-por-mes-routing.module';

import { VentasPorMesPage } from './ventas-por-mes.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentasPorMesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VentasPorMesPage]
})
export class VentasPorMesPageModule {}
