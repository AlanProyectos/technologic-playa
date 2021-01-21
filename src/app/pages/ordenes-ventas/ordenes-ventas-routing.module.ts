import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesVentasPage } from './ordenes-ventas.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenesVentasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesVentasPageRoutingModule {}
