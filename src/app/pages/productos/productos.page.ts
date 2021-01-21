import { Component } from '@angular/core';
import { Product } from '../../shared/productos.interface';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

import {ProductosService} from '../../services/productos.service';



@Component({
  selector: 'productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss']
})
export class Productos {
  producto: Product ={
    producto : '',
    modeloProducto : '',
    cantidadProducto : null,
    precioUnitario : null,
    marcaProducto:'',
  };

  productoId = null;


  constructor(private route : ActivatedRoute,
              private nav : NavController,
              private authSvc: AuthService,
              private loadingController: LoadingController,
              private prodSvc: ProductosService) 
              {

              }

  ngOnInit() {
    this.productoId = this.route.snapshot.paramMap.get('id');
    if(this.productoId){
      this.loadProducto();

    }
  }

  async loadProducto(){
    const loading = await this.loadingController.create({
      message: 'Loading.....'
    })

    await loading.present();



    this.prodSvc.getProducto(this.productoId).subscribe(res =>{
      loading.dismiss();
      this.producto = res;
    })

  }

  async saveProducto(){
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    })
    await loading.present();

    if(this.productoId)
    {

      this.prodSvc.actualizarProducto(this.productoId,this.producto).then( () =>{
        this.nav.navigateForward('/tabs/home');
        loading.dismiss();
      } )
    }
      
      
  }

  async addProducto(){
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    })
    await loading.present();

    
    

    if(this.producto.producto !== '' && this.producto.marcaProducto !== '' && this.producto.modeloProducto !== '' && this.producto.precioUnitario !== null && this.producto.cantidadProducto !== null){
      console.log(this.producto);
      this.prodSvc.addProducto(this.producto);
      loading.dismiss();
    }
    else{
      alert('Los campos estan vacios');
      loading.dismiss();
    }
  }

  async deleteProducto(){
    const loading = await this.loadingController.create({
      message: 'Cargando.....'
    })
    await loading.present();
    if(this.productoId != null){
      this.prodSvc.removeProducto(this.productoId).then( () => {
        alert("Hemos eliminado el Producto");
        this.nav.navigateForward('/tabs/home');
        this.loadingController.dismiss();
      })
    }
    else{
      alert('No hay ningun producto por Borrar')
      this.loadingController.dismiss();
    }
    
  }

}
