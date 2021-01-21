import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioPage } from './inventario.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { InventarioPageRoutingModule } from './inventario-routing.module'
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: InventarioPage }]),
    InventarioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InventarioPage]
})
export class InventarioPageModule {}
