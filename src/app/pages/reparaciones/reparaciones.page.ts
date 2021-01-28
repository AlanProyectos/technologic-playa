import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service.service';
import { ReparacionesService } from 'src/app/services/reparaciones.service';
import { ReparacionesInterface } from 'src/app/shared/reparaciones.interface';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.page.html',
  styleUrls: ['./reparaciones.page.scss'],
})
export class ReparacionesPage implements OnInit {

  reparaciones:ReparacionesInterface ={
    telefono:'',
    color:'',
    descripcion:'',
    encendido:false,
    fecha_dejaron: new Date(),
    entregado:false,
    nombre_cliente:'',
    marca:'',
    modelo:'',
    password:'',
    partes_reparar:[]
  };

  marcasEquipo=['Iphone','Ipad','Huawei', 'Xiaomi','Motorola','Mac','Samsung','Toshiba','HP','Acer','ASUS','Lenovo','Otros']

  partesEquipo=['Cámaras','Botón de Volumen','Bateria','Botón de Power','Tapa Trasera','Botón Bloque','Camara Frontal','Pantalla','Botón Home','Centro de Carga','Microfono','Entrada de Jack Audio']
  

  constructor(private reparacionesSvc: ReparacionesService, private alertCtrl: AlertService, private router: Router) { }

  ngOnInit() {
    console.log(this.partesEquipo);
  }

  addFix(nombre_cliente,fecha_dejaron,telefono,marca,modelo,color,encendido,password,descripcion,partes_reparar){

    console.log(partes_reparar);
    let fechaDejaron = new Date(fecha_dejaron);
    this.reparaciones.nombre_cliente = nombre_cliente;
    this.reparaciones.fecha_dejaron = fechaDejaron;
    this.reparaciones.telefono = telefono;
    this.reparaciones.marca = marca;
    this.reparaciones.modelo = modelo;
    this.reparaciones.color = color;
    this.reparaciones.entregado = false;
    this.reparaciones.encendido = encendido ? true : false;
    this.reparaciones.password = password;
    this.reparaciones.descripcion = descripcion;
    this.reparaciones.partes_reparar = partes_reparar;

    this.reparacionesSvc.addReparacion(this.reparaciones);

    this.alertCtrl.basicAlert('Alert','Reparacion dada de Alta, favor de notificarle al tecnico de la reparación',['OK']);
    this.router.navigate(['tabs/productos']);

  }

}
