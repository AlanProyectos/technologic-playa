import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReparacionesService } from 'src/app/services/reparaciones.service';
import { ReparacionesFinalizadasService } from 'src/app/services/reparaciones_finalizadas.service';
import { ReparacionesFinalizadasInterface } from 'src/app/shared/reparaciones-entregadas.interface';

@Component({
  selector: 'app-reparaciones-pendientes',
  templateUrl: './reparaciones-pendientes.page.html',
  styleUrls: ['./reparaciones-pendientes.page.scss'],
})
export class ReparacionesPendientesPage implements OnInit {

  constructor(private reparacionesSvc: ReparacionesService, private router: Router, private reparacionesFinalizadasSvc:ReparacionesFinalizadasService) { }
  reparaciones=[];
  fecha =[];

  reparacionesEntregadas:ReparacionesFinalizadasInterface={
    id:'',
    marca:'',
    modelo:'',
    nombre:'',
    partes_reparar:[],
    password:'',
    persona_entrego:'',
    persona_reparo:'',
    telefono:'',
    adicional:'',
    color:'',
    descripcion:'',
    detalle_reparacion:'',
    encedido:false,
    entregado:false,
    fecha_dejaron:new Date(),
    fecha_entrega:'',
    cantidad_adicional:0
  };
  

  ngOnInit() {

    this.reparacionesFinalizadasSvc.getReparacionesFinalizadas().subscribe(res=>{
      console.log('Reparaciones finalizadas', res);
      res.map(item=>{
        this.reparacionesEntregadas.id = item.id;
        this.reparacionesEntregadas.nombre = item.nombre;
        this.reparacionesEntregadas.telefono = item.telefono;
        this.reparacionesEntregadas.fecha_dejaron = item.fecha_dejaron;
        this.reparacionesEntregadas.entregado = item.entregado;
        this.reparacionesEntregadas.marca = item.marca;
        this.reparacionesEntregadas.modelo= item.modelo;
        this.reparacionesEntregadas.color= item.color;
        this.reparacionesEntregadas.encedido = item.encedido;
        this.reparacionesEntregadas.password = item.password;
        this.reparacionesEntregadas.partes_reparar = item.partes_reparar;
        this.reparacionesEntregadas.descripcion = item.descripcion;


        this.reparacionesEntregadas.persona_reparo = item.persona_reparo;
        this.reparacionesEntregadas.persona_entrego = item.persona_entrego;
        this.reparacionesEntregadas.detalle_reparacion = item.detalle_reparacion;
        this.reparacionesEntregadas.adicional = item.adicional;
        this.reparacionesEntregadas.fecha_entrega =  item.fecha_entrega;


        console.log('Reparaciones finalizadas',this.reparacionesEntregadas);
      })
    })
    


    this.reparacionesSvc.getReparaciones().subscribe(res=>{
      this.reparaciones = res;
      console.log(this.reparaciones);
      res.map(f=>{
        const dateFirebase:any = f.fecha_dejaron;
        const dateCambiado = dateFirebase.toDate();
        var dateMostrar = new Date();
        dateMostrar = dateCambiado;
        var dia = dateMostrar.getDate();
        var mes = dateMostrar.getMonth()+1;
        var anio = dateMostrar.getFullYear();
        var date:any = dia +'/'+mes +'/'+anio;
        f.fecha_dejaron = date;
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
