import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentasService } from 'src/app/services/ventas.service';
import { Ventas } from 'src/app/shared/ventas.interface';

@Component({
  selector: 'app-ordenes-ventas',
  templateUrl: './ordenes-ventas.page.html',
  styleUrls: ['./ordenes-ventas.page.scss'],
})
export class OrdenesVentasPage implements OnInit {

  ordenes_venta :Ventas[];

  orden_id:string="";

  constructor(private ventasSvc: VentasService, private router: Router) { }

  ngOnInit() {
    this.ventasSvc.getVentas().subscribe(res =>{
      this.ordenes_venta = res;
      this.ordenes_venta.sort();
    });
    
  }

  redirigirDetalleVenta(ordenId){
    this.router.navigate([`detalle-venta/`+ordenId]);
  }


  eliminarVenta(id){
    this.ventasSvc.removeVenta(id);
  }

}
