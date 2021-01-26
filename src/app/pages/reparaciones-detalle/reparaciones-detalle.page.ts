import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductosService } from 'src/app/services/productos.service';
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
  nombre_cliente:string;
  telefono:string;
  fecha_dejaron:any;
  entregando: boolean;
  marca: string;
  modelo:string;
  color:string;
  encendido:string;
  password:string;
  descripcion:string;
  partes_reparar:string[];
  persona_reparo:string;
  person_entrego:string;
  detalle_reparaccion:string;
  adicional:string;
  fecha_entrega:Date;
    


  reparacionEntregada:ReparacionesInterface ={
    color:'',
    descripcion:'',
    encendido:false,
    fecha_dejaron:new Date(),
    marca:'',
    modelo:'',
    nombre_cliente:'',
    partes_reparar:[],
    password:'',
    telefono:'',
    entregado:false,
    fecha_entrega: new Date()
  }
  

  constructor(private route: ActivatedRoute, private productoSvc: ProductosService, private reparacionesSvc : ReparacionesService, private router:Router, private userSvc: AuthService) { }

  

  
  ngOnInit() {
    this.reparacionId = this.route.snapshot.paramMap.get('id');
    console.log(this.reparacionId);

    this.reparacionesSvc.getReparacion(this.reparacionId).subscribe(res =>
      {
        this.nombre_cliente = res.nombre_cliente;
        this.telefono = res.telefono;
        this.marca = res.marca;
        this.modelo = res.modelo;
        this.color = res.color;
        this.password = res.password;
        this.partes_reparar = res.partes_reparar;
        this.detalle_reparaccion = res.detalle_reparacion;
        this.adicional = res.adicional;

        this.productoSvc.getProducto(res.adicional).subscribe(producto=>{
          this.adicional = producto.producto;
        })




        this.userSvc.getUsuario(res.persona_reparo).subscribe(reparo =>{
          this.persona_reparo = reparo.displayName;
        })
        

        this.userSvc.getUsuario(res.persona_entrego).subscribe(entrego=>{
          this.person_entrego = entrego.displayName;
        })
        
        
      });

  }

  entregarCelular(id:string){
    console.log(id);

    this.router.navigateByUrl(`entregar-reparacion/${id}`)
  }



}
