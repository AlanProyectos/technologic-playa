import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Productos } from './productos.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ProductosPageRoutingModule } from './productos-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ProductosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [Productos]
})
export class ProductosPageModule {}
