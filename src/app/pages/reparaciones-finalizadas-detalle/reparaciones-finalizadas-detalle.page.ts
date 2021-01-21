import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReparacionesFinalizadasService } from 'src/app/services/reparaciones_finalizadas.service';

@Component({
  selector: 'app-reparaciones-finalizadas-detalle',
  templateUrl: './reparaciones-finalizadas-detalle.page.html',
  styleUrls: ['./reparaciones-finalizadas-detalle.page.scss'],
})
export class ReparacionesFinalizadasDetallePage implements OnInit {
  reparacionId: string;
  reparaciones=[];
  
  constructor(private route: ActivatedRoute, private reparacionesFinalizadasSvc: ReparacionesFinalizadasService) { }

  ngOnInit() {
    this.reparacionId = this.route.snapshot.paramMap.get('id');
    this.reparacionesFinalizadasSvc.getCollectionParameter('reparaciones_finalizadas','id',this.reparacionId).subscribe(res=>{
      console.log('Reparacion Finalizada',res)
      res.map(item=>{
        const dateFirebase:any = item.fecha_dejaron;
       // const dateCambiado = dateFirebase.toDate();
        var dateMostrar = new Date();
       // dateMostrar = dateCambiado;
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

}
