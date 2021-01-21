
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { VentasService } from 'src/app/services/ventas.service';
import { Product } from 'src/app/shared/productos.interface';
import { Ventas } from 'src/app/shared/ventas.interface';

import {EmailComposer} from "@ionic-native/email-composer/ngx";

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.page.html',
  styleUrls: ['./detalle-venta.page.scss'],
})
export class DetalleVentaPage implements OnInit {
  ordenId: string;
  venta = {
    ordenVentaId: '',
    cantidadVenta: null,
    emailCliente: '',
    fechaOrden: '',
    idProducto: '',
    telefonoCliente: null,
    totalPrecio: null,
    vendedor: ''
  };
  producto: Product = {
    cantidadProducto: null,
    marcaProducto: '',
    modeloProducto: '',
    precioUnitario: null,
    producto: '',
    id: ''
  }

  constructor(private route: ActivatedRoute, private ventasSvc: VentasService, private prodSvc: ProductosService, private emailComposer: EmailComposer) { }

  ngOnInit() {
    this.ordenId = this.route.snapshot.paramMap.get('id');
    if (this.ordenId) {
      this.ventasSvc.getVenta(this.ordenId).subscribe(res => {
        this.venta.cantidadVenta = res.cantidadVenta;
        this.venta.emailCliente = res.emailCliente;
        this.venta.fechaOrden = this.formatDate(res.fechaOrden);
        this.venta.idProducto = res.idProducto;
        this.venta.ordenVentaId = res.ordenVentaId;
        this.venta.telefonoCliente = res.telefonoCliente;
        this.venta.totalPrecio = res.totalPrecio;
        this.venta.vendedor = res.vendedor;

        if (res.idProducto) {
          this.prodSvc.getProducto(res.idProducto).subscribe(res => {
            this.producto.modeloProducto = res.modeloProducto;
            this.producto.cantidadProducto = res.cantidadProducto;
            this.producto.id = res.id;
            this.producto.marcaProducto = res.marcaProducto;
            this.producto.precioUnitario = res.precioUnitario;
            this.producto.producto = res.producto;
          })
        }
      })
    }
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
  sendEmail(){
    let email = {
      to: this.venta.emailCliente,
      cc: 'correo@gmail.com',
      subject: 'Venta Technologic',
      body: `
      <div> 
        La venta se realizo el dia de <strong>${this.venta.fechaOrden}</strong> <br>
        Correo del Cliente: <strong>${this.venta.emailCliente} </strong>  <br>
        Numero de Orden: <strong>${this.venta.ordenVentaId} </strong>  <br>
        Lo atendio : <strong>${this.venta.vendedor}</strong><br>
        Producto Vendido: <strong>${this.producto.producto}</strong><br>
        Modelo del Producto: <strong>${this.producto.modeloProducto}</strong><br>
        Marca del Producto Vendido: <strong>${this.producto.marcaProducto}</strong><br>
        El total de la venta Fue: <strong>${this.venta.totalPrecio}</strong><br>
      </div>` ,
      isHtml: true,
      type:'message/rfc822'
    }

    
    this.emailComposer.open(email);
  }

}
