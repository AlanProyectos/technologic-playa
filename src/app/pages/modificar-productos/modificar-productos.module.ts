import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';

import { ModificarProductosPageRoutingModule } from './modificar-productos-routing.module';

import { ModificarProductosPage } from './modificar-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarProductosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModificarProductosPage]
})
export class ModificarProductosPageModule {}
