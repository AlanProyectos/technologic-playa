import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReparacionesService } from 'src/app/services/reparaciones.service';
import { ReparacionesFinalizadasService } from 'src/app/services/reparaciones_finalizadas.service';
import { ReparacionesFinalizadasInterface } from 'src/app/shared/reparaciones-entregadas.interface';
import { ReparacionesInterface } from 'src/app/shared/reparaciones.interface';

@Component({
  selector: 'app-reparaciones-detalle',
  templateUrl: './reparaciones-detalle.page.html',
  styleUrls: ['./reparaciones-detalle.page.scss'],
})
export class ReparacionesDetallePage implements OnInit {
  reparacionId: string;
  reparaciones=[];

  reparacionEntregada:ReparacionesInterface ={
    color:'',
    descripcion:'',
    encendido:false,
    fecha_dejaron:new Date(),
    id:'',
    marca:'',
    modelo:'',
    nombre_cliente:'',
    partes_reparar:[],
    password:'',
    telefono:'',
    entregado:false,
    fecha_entrega: new Date()
  }
  

  constructor(private route: ActivatedRoute, private reparacionesSvc : ReparacionesService, private router:Router) { }

  

  
  ngOnInit() {
    this.reparacionId = this.route.snapshot.paramMap.get('id');
    console.log(this.reparacionId);
    this.reparacionesSvc.getCollectionParameter('reparaciones','id',this.reparacionId).subscribe(res=>{
      console.log(res);
      res.map(item=>{
        const dateFirebase:any = item.fecha_dejaron;
        const dateCambiado = dateFirebase.toDate();
        var dateMostrar = new Date();
        dateMostrar = dateCambiado;
        var dia = dateMostrar.getDate();
        var mes = dateMostrar.getMonth()+1;
        var anio = dateMostrar.getFullYear();
        var date:any = dia +'/'+mes +'/'+anio;
        console.log(date);
        item.fecha_dejaron = date;
      })
      this.reparaciones = res;
      console.log(res);
    })
  }

  entregarCelular(id:string){
    console.log(id);

    this.router.navigateByUrl(`entregar-reparacion/${id}`)

  
    

  }



}
