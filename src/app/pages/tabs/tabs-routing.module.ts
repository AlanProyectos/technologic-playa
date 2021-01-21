import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'productos',
        loadChildren: () => import('../productos/productos.module').then(m => m.ProductosPageModule)
      },
      {
        path: 'productos/:id',
        loadChildren: () => import('../productos/productos.module').then(m => m.ProductosPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path:'reparaciones',
        loadChildren: () => import('../reparaciones/reparaciones.module').then(m=> m.ReparacionesPageModule)
      },
      {
        path: 'ventas',
        loadChildren: () => import('../ventas/ventas.module').then(m => m.VentasPageModule)
      },
      {
        path: 'inventario',
        loadChildren: () => import('../inventario/inventario.module').then(m => m.InventarioPageModule)
      },
      {
        path: 'inventario/:id',
        loadChildren: () => import('../inventario/inventario.module').then(m => m.InventarioPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
