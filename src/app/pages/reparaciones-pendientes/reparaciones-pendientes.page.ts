import { Component, OnInit } from '@angular/core';
import { ReparacionesService } from 'src/app/services/reparaciones.service';
import { ReparacionesInterface } from 'src/app/shared/reparaciones.interface';

@Component({
  selector: 'app-reparaciones-pendientes',
  templateUrl: './reparaciones-pendientes.page.html',
  styleUrls: ['./reparaciones-pendientes.page.scss'],
})
export class ReparacionesPendientesPage implements OnInit {

  reparaciones: ReparacionesInterface[];

  constructor(private reparacionesSvc : ReparacionesService) { }
  
  

  ngOnInit() {
  this.reparacionesSvc.getReparaciones().subscribe(res =>{
    this.reparaciones = res;
  })
  }

  buscarReparacion(event){
    

    const texto = event.target.value;
    console.log(texto);

  }

 

}
