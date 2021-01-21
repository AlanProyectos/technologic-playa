import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Product } from 'src/app/shared/productos.interface';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-detalle-inventario',
  templateUrl: './detalle-inventario.page.html',
  styleUrls: ['./detalle-inventario.page.scss'],
})
export class DetalleInventarioPage implements OnInit {

  nombreProducto="";
  productos: Product[];

  cantProducto:any;




  constructor(private route : ActivatedRoute,private productService: ProductosService, private modalController: ModalController) { }

  ngOnInit() {
    this.nombreProducto = this.route.snapshot.paramMap.get('nombre');
    const path ="productos/";
    this.productService.getCollectionParametro(path,'producto',this.nombreProducto).subscribe(res => {
      this.productos = res;
      this.cantProducto = this.productos.length;
    })
    
  }

  async abrirProducto(prod: Product){
    const modal = await this.modalController.create({
      component: ModalInfoPage,
      componentProps:{
        producto: prod.producto,
        marcaProducto: prod.marcaProducto,
        cantidadProducto: prod.cantidadProducto,
        modeloProducto: prod.modeloProducto,
        precioUnitario: prod.precioUnitario
      }
    });

    console.log(prod);

    await modal.present();
  }



}
