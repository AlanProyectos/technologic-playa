import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReparacionesPendientesPage } from './reparaciones-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: ReparacionesPendientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReparacionesPendientesPageRoutingModule {}
