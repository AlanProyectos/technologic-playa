import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from '../../shared/productos.interface';


@Component({
  selector: 'app-modificar-productos',
  templateUrl: './modificar-productos.page.html',
  styleUrls: ['./modificar-productos.page.scss'],
})
export class ModificarProductosPage implements OnInit {

  productos: Product[];

  constructor(private productoService : AuthService) { }

  ngOnInit() {
    this.productoService.getProductos().subscribe(res =>{
      this.productos = res;
    })
  }

}
