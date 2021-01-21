import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenesVentasPageRoutingModule } from './ordenes-ventas-routing.module';

import { OrdenesVentasPage } from './ordenes-ventas.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenesVentasPageRoutingModule
  ],
  declarations: [OrdenesVentasPage]
})
export class OrdenesVentasPageModule {}
