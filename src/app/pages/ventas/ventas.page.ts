import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductosService } from 'src/app/services/productos.service';
import { User} from '../../shared/user.interface'; 
import {Product} from '../../shared/productos.interface';
import { VentasService } from 'src/app/services/ventas.service';
import { Ventas} from '../../shared/ventas.interface';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service.service';






@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit { 

  usuarios: User[];
  productos: Product[];

  venta: Ventas ={
    ordenVentaId :'',
    emailCliente:'',
    fechaOrden: null,
    telefonoCliente:null,
    idProducto:'',
    vendedor:'',
    vendedorId:'',
    cantidadVenta:null,
    totalPrecio:null
  }

  new_producto: Product ={
    producto : '',
    modeloProducto : '',
    cantidadProducto : null,
    precioUnitario : '',
    marcaProducto:'',
  };



  productoId;
  cantidadProducto = null;

  totalVenta = null;
  vendedor_opt: string;

  productoScaneado;


  constructor(private authSvc: AuthService,private route : Router,private prodSvc: ProductosService, private ventasSvc: VentasService, private barcodeScanner:BarcodeScanner,  private alertSvc : AlertService) { }

  

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.productoScaneado = barcodeData.text;
      this.obtenerProducto(this.productoScaneado);

     }).catch(err => {
         console.log('Error', err);
     });
  }

  obtenerProducto(productoScaneado){
    const path ="productos/";
    this.prodSvc.getCollectionParametro(path,'id',productoScaneado.value).subscribe(res => {
      console.log(res);
      res.map( r =>{
        this.new_producto.id = productoScaneado;
        this.new_producto.marcaProducto = r.marcaProducto;
        this.new_producto.modeloProducto = r.modeloProducto;
        this.new_producto.precioUnitario = r.precioUnitario;
        this.new_producto.producto = r.producto;
        this.new_producto.cantidadProducto = r.cantidadProducto
      })
      
    })


  }





  ngOnInit() { 
    this.authSvc.getUsuarios().subscribe( res => {
      this.usuarios = res;
    })
    this.authSvc.getProductos().subscribe(res =>{
      this.productos=res;
    });
  }


  async calcularPrecio(cant){

    this.totalVenta = (Number(this.new_producto.precioUnitario) * cant.value)

  }





  async ventaCompletada( orden, emailCliente, fechaOrden, telefonoCliente, cantidad)
  {          

    const ventaFinalVerify = (this.new_producto.cantidadProducto-cantidad.value);
    
    if( ventaFinalVerify < 0){
      alert('');
      this.alertSvc.basicAlert('Alert','This sold can not make because we dont have enough producto',['OK']);
    }
    else{
      this.venta.ordenVentaId = orden.value;
      this.venta.emailCliente = emailCliente.value;
      this.venta.fechaOrden = fechaOrden.value
      this.venta.telefonoCliente = telefonoCliente.value;
      this.venta.vendedorId = this.vendedor_opt;
      //this.venta.vendedorId = this.vendedor_opt;
      this.venta.idProducto = this.productoScaneado;
      this.venta.cantidadVenta = cantidad.value;
      this.venta.totalPrecio = this.totalVenta;

      this.authSvc.getUsuario(this.vendedor_opt).subscribe(res=>{
        this.venta.vendedor = res.displayName;
        //registro de venta
        this.ventasSvc.addVenta(this.venta);
      })
  
      //Se actualiza el producto restando el producto
      this.authSvc.updateProducto(this.new_producto, this.venta);
      this.alertSvc.basicAlert('Alert','Sold made it',['OK']);
      this.route.navigateByUrl('tabs/home')
    }     
  }
}


