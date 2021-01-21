import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReparacionesFinalizadasPage } from './reparaciones-finalizadas.page';

const routes: Routes = [
  {
    path: '',
    component: ReparacionesFinalizadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReparacionesFinalizadasPageRoutingModule {}
