import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/productos.interface';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'inventario',
  templateUrl: 'inventario.page.html',
  styleUrls: ['inventario.page.scss']
})
export class InventarioPage implements OnInit {

  productosName =[
    {
      nombre:'Pantallas',
      metodo:'/detalle-inventario/Pantalla'
    },
    {
      nombre:'Audifonos',
      metodo:'/detalle-inventario/Audifonos'
    },
    {
      nombre:'Micas',
      metodo:'/detalle-inventario/Micas'
    },
    {
      nombre:'Cargadores',
      metodo:'/detalle-inventario/Cargadores'
    },
    {
      nombre:'Pilas',
      metodo:'/detalle-inventario/Pilas'
    },
    {
      nombre:'Fundas',
      metodo:'/detalle-inventario/Fundas'
    },
    {
      nombre:'Piezas',
      metodo:'/detalle-inventario/Piezas'
    },
    {
      nombre:'Celulares',
      metodo:'/detalle-inventario/Celulares'
    },
    {
      nombre:'Laptops',
      metodo:'/detalle-inventario/Laptops'
    },
    {
      nombre:'Camaras',
      metodo:'/detalle-inventario/Camaras'
    }
  ];

  productos: Product[];

  productoId = null;

  costoU = null;

  cantP = null;

  constructor(private route : ActivatedRoute,
              private nav : NavController,
              private authSvc: AuthService,
              private loadingController: LoadingController) 
              {

              }

  ngOnInit() {
    
    this.authSvc.getProductos().subscribe( res => {
      this.productos=res;
    })
  }


  redirectPantallas(){
    
    this.nav.navigateForward(`/detalle-inventario/Pantalla`);
  }
  redirectAudifonos(){
    this.nav.navigateForward(`/detalle-inventario/Audifonos`);
  }

  redirectMicas(){
    this.nav.navigateForward(`/detalle-inventario/Micas`);
  }

  redirectCargadores(){
    this.nav.navigateForward(`/detalle-inventario/Cargadores`);
  }

  redirectPilas(){
    this.nav.navigateForward(`/detalle-inventario/Pilas`);
  }

  redirectFundas(){
    this.nav.navigateForward(`/detalle-inventario/Fundas`);
  }

  redirectPiezas(){
    this.nav.navigateForward(`/detalle-inventario/Piezas`);
  }
  
  redirectCelulares(){
    this.nav.navigateForward(`/detalle-inventario/Celulares`);
  }


  redirectLaptops(){
    this.nav.navigateForward(`/detalle-inventario/Laptops`);
  }

  redirectCamaras(){
    this.nav.navigateForward(`/detalle-inventario/Camaras`);
  }


  
}
