import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private menu: MenuController,private router : Router, private authSvc: AuthService) { }

  ngOnInit() {}

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  redirectLogin(){
    this.authSvc.logout();
    this.router.navigateByUrl('/login');
  }

  redirectModificarUsuario(){
    this.router.navigateByUrl('/modificar-usuario');
  }
  redirectModificarProductos(){
    this.router.navigateByUrl('/modificar-productos');
  }
  redirectOrdenesVentas(){
    this.router.navigateByUrl('/ordenes-ventas');
  }

  redirectVentasPorMes(){
    this.router.navigateByUrl('/ventas-por-mes');
  }
  redirectReparacionesPendientes(){
    this.router.navigateByUrl('/reparaciones-pendientes');
  }
  


}
