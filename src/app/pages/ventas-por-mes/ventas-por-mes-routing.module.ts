import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentasPorMesPage } from './ventas-por-mes.page';

const routes: Routes = [
  {
    path: '',
    component: VentasPorMesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasPorMesPageRoutingModule {}
