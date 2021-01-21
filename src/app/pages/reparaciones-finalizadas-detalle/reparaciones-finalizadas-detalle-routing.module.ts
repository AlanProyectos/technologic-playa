import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReparacionesFinalizadasDetallePage } from './reparaciones-finalizadas-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ReparacionesFinalizadasDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReparacionesFinalizadasDetallePageRoutingModule {}
