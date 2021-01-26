import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReparacionesFinalizadasService } from 'src/app/services/reparaciones_finalizadas.service';
import { ReparacionesFinalizadasInterface } from 'src/app/shared/reparaciones-entregadas.interface';

@Component({
  selector: 'app-reparaciones-finalizadas',
  templateUrl: './reparaciones-finalizadas.page.html',
  styleUrls: ['./reparaciones-finalizadas.page.scss'],
})
export class ReparacionesFinalizadasPage implements OnInit {

  reparacionesEntregadas=[];
  

  constructor(private ReparacionesFinalizadasSvc: ReparacionesFinalizadasService, private router: Router) { }

  ngOnInit() {

    this.ReparacionesFinalizadasSvc.getReparacionesFinalizadas().subscribe(res=>{
      console.log('Reparaciones finalizadas', res);
      res.map(item=>{
        this.reparacionesEntregadas.push({
          id: item.id,
          marca:item.marca,
          modelo:item.modelo,
          nombre:item.nombre,
          partes_reparar:item.partes_reparar,
          password:item.password,
          persona_entrego:item.persona_entrego,
          persona_reparo:item.persona_reparo,
          telefono:item.telefono,
          adicional: item.adicional,
          color:item.color,
          descripcion:item.descripcion,
          detalle_reparacion:item.detalle_reparacion,
          encedido:item.encedido,
          entregado:item.entregado,
          fecha_dejaron: item.fecha_dejaron,
          fecha_entrega: item.fecha_entrega,
          cantidad_adicional:item.adicional
        })



        console.log('Reparaciones finalizadas',this.reparacionesEntregadas);
      })
    })
  }

  viewMoreInformation(id:string){
    console.log(id)
    this.router.navigate([`reparaciones-detalle/${id}`])
  }

  viewMoreInformationReparacionFinalizada(id:string){
    console.log(id);
    this.router.navigate([`reparaciones-finalizadas-detalle/${id}`]);
  }

}
