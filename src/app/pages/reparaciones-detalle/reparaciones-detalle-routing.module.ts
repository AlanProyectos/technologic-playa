import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReparacionesDetallePage } from './reparaciones-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ReparacionesDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReparacionesDetallePageRoutingModule {}
