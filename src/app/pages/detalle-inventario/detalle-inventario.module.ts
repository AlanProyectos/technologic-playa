import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleInventarioPageRoutingModule } from './detalle-inventario-routing.module';

import { DetalleInventarioPage } from './detalle-inventario.page';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { ModalInfoPageModule } from '../modal-info/modal-info.module';

@NgModule({
  entryComponents:[
    ModalInfoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleInventarioPageRoutingModule,
    ModalInfoPageModule
  ],
  declarations: [DetalleInventarioPage]
})
export class DetalleInventarioPageModule {}
