import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m=> m.TabsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'verified-email',
    loadChildren: () => import('./pages/verified-email/verified-email.module').then( m => m.VerifiedEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('./pages/ventas/ventas.module').then( m => m.VentasPageModule)
  },
  {
    path: 'detalle-inventario/:nombre',
    loadChildren: () => import('./pages/detalle-inventario/detalle-inventario.module').then( m => m.DetalleInventarioPageModule)
  },
  {
    path: 'modificar-usuario',
    loadChildren: () => import('./pages/modificar-usuario/modificar-usuario.module').then( m => m.ModificarUsuarioPageModule)
  },
  {
    path: 'ordenes-ventas',
    loadChildren: () => import('./pages/ordenes-ventas/ordenes-ventas.module').then( m => m.OrdenesVentasPageModule)
  },
  {
    path: 'modificar-productos',
    loadChildren: () => import('./pages/modificar-productos/modificar-productos.module').then( m => m.ModificarProductosPageModule)
  },
  {
    path: 'detalle-venta/:id',
    loadChildren: () => import('./pages/detalle-venta/detalle-venta.module').then( m => m.DetalleVentaPageModule)
  },
  {
    path: 'ventas-por-mes',
    loadChildren: () => import('./pages/ventas-por-mes/ventas-por-mes.module').then( m => m.VentasPorMesPageModule)
  },
  {
    path: 'reparaciones',
    loadChildren: () => import('./pages/reparaciones/reparaciones.module').then( m => m.ReparacionesPageModule)
  },
  {
    path: 'reparaciones-pendientes',
    loadChildren: () => import('./pages/reparaciones-pendientes/reparaciones-pendientes.module').then( m => m.ReparacionesPendientesPageModule)
  },
  {
    path: 'reparaciones-detalle/:id',
    loadChildren: () => import('./pages/reparaciones-detalle/reparaciones-detalle.module').then( m => m.ReparacionesDetallePageModule)
  },
  {
    path: 'entregar-reparacion/:id',
    loadChildren: () => import('./pages/entregar-reparacion/entregar-reparacion.module').then( m => m.EntregarReparacionPageModule)
  },
  {
    path: 'reparaciones-finalizadas',
    loadChildren: () => import('./pages/reparaciones-finalizadas/reparaciones-finalizadas.module').then( m => m.ReparacionesFinalizadasPageModule)
  },
  {
    path: 'reparaciones-finalizadas-detalle/:id',
    loadChildren: () => import('./pages/reparaciones-finalizadas-detalle/reparaciones-finalizadas-detalle.module').then( m => m.ReparacionesFinalizadasDetallePageModule)
  }








];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
