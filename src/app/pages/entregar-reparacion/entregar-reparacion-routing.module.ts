import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntregarReparacionPage } from './entregar-reparacion.page';

const routes: Routes = [
  {
    path: '',
    component: EntregarReparacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregarReparacionPageRoutingModule {}
