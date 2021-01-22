import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.interface';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Product } from 'src/app/shared/productos.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ReparacionesService } from 'src/app/services/reparaciones.service';
import { ReparacionesInterface } from 'src/app/shared/reparaciones.interface';
import { ReparacionesFinalizadasService } from 'src/app/services/reparaciones_finalizadas.service';
import { ReparacionesFinalizadasInterface } from 'src/app/shared/reparaciones-entregadas.interface';

@Component({
  selector: 'app-entregar-reparacion',
  templateUrl: './entregar-reparacion.page.html',
  styleUrls: ['./entregar-reparacion.page.scss'],
})
export class EntregarReparacionPage implements OnInit {
  reparacionId: string;

  usuarios: User[];

  reparacion:ReparacionesInterface ={
    telefono:'',
    color:'',
    descripcion:'',
    encendido:false,
    fecha_dejaron: new Date(),
    fecha_entrega:new Date(),
    entregado:false,
    nombre_cliente:'',
    id:'',
    marca:'',
    modelo:'',
    password:'',
    partes_reparar:[]
  };

  reparacionFinalizada:ReparacionesFinalizadasInterface = {
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
    cantidad_adicional:1
  }

  productoScaneado;
  new_producto: Product ={
    producto : '',
    modeloProducto : '',
    cantidadProducto : null,
    precioUnitario : '',
    marcaProducto:'',
  };

  constructor(private userSvc: AuthService, private prodSvc:ProductosService, private reparacionSvc:ReparacionesService, private reparacionFinalizadaSvc: ReparacionesFinalizadasService, private route: ActivatedRoute, private router: Router, private barcodeScanner:BarcodeScanner,public alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Quieres hacer una venta?',
      buttons: [
        {
          text:'Si',
          handler: () => {
            this.router.navigateByUrl('ventas');
          }
        },
        {
          text:'No'
        }
      ]
    });

    await alert.present();
  }

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
    this.prodSvc.getCollectionParametro(path,'id',productoScaneado).subscribe(res => {
      console.log(res);
      res.map( r =>{
        this.new_producto.id = productoScaneado;
        this.new_producto.marcaProducto = r.marcaProducto;
        this.new_producto.modeloProducto = r.modeloProducto;
        this.new_producto.precioUnitario = r.precioUnitario;
        this.new_producto.producto = r.producto;
        this.new_producto.cantidadProducto = r.cantidadProducto
        alert(this.new_producto.producto);
      })
      
    })


  }

  ngOnInit() {
    this.reparacionId = this.route.snapshot.paramMap.get('id');
    console.log(this.reparacionId);

    this.reparacionSvc.getCollectionParameter('reparaciones','id',this.reparacionId).subscribe(res =>{
      res.map(item=>{
        this.reparacion.nombre_cliente = item.nombre_cliente;
        this.reparacion.telefono = item.telefono;
        this.reparacion.descripcion = item.descripcion;


        const dateFirebase:any = item.fecha_dejaron;
        const dateCambiado = dateFirebase.toDate();
        var dateMostrar = new Date();
        dateMostrar = dateCambiado;
        var dia_dejaron = dateMostrar.getDate();
        var mes_dejaron = dateMostrar.getMonth()+1;
        var anio_dejaron = dateMostrar.getFullYear();
        var date_dejaron:any = dia_dejaron +'/'+mes_dejaron +'/'+anio_dejaron;


        this.reparacion.fecha_dejaron = date_dejaron;
        this.reparacion.marca = item.marca;
        this.reparacion.modelo = item.modelo;
        this.reparacion.color = item.color;
        this.reparacion.encendido = item.encendido;
        this.reparacion.password = item.password;
        this.reparacion.partes_reparar = item.partes_reparar;
        this.reparacion.persona_reparo = item.persona_reparo;
        this.reparacion.persona_entrego = item.persona_entrego;
        
      })
    })

    this.userSvc.getUsuarios().subscribe( res => {
      this.usuarios = res;
      console.log(res);
    })

    
    
  }

  entregarReparacion(personaReparo:string,personaEntrego:string,detalles_reparacion:string,adicional:string,fecha_entrega:string,equipo_entregado){
    console.log(personaReparo);
    console.log(personaEntrego);
    console.log(detalles_reparacion);
    console.log(adicional);
    console.log(fecha_entrega);
    console.log(equipo_entregado);

    if(adicional){
      this.reparacionFinalizada.id =  this.route.snapshot.paramMap.get('id');
      this.reparacionFinalizada.nombre = this.reparacion.nombre_cliente;
      this.reparacionFinalizada.telefono = this.reparacion.telefono;
      this.reparacionFinalizada.fecha_dejaron = this.reparacion.fecha_dejaron;
      this.reparacionFinalizada.marca = this.reparacion.marca;
      this.reparacionFinalizada.modelo = this.reparacion.modelo;
      this.reparacionFinalizada.color = this.reparacion.color;
      this.reparacionFinalizada.encedido = this.reparacion.encendido;
      this.reparacionFinalizada.password = this.reparacion.password;
      this.reparacionFinalizada.descripcion = this.reparacion.descripcion;
      this.reparacionFinalizada.partes_reparar = this.reparacion.partes_reparar;
      this.reparacionFinalizada.persona_reparo = personaReparo;
      this.reparacionFinalizada.persona_entrego = personaEntrego;
      this.reparacionFinalizada.detalle_reparacion = detalles_reparacion;
      this.reparacionFinalizada.adicional = adicional;
      this.reparacionFinalizada.cantidad_adicional = 1;
      this.reparacionFinalizada.fecha_entrega = fecha_entrega;
  
      this.reparacionFinalizada.entregado = equipo_entregado;
  
      console.log(this.reparacionFinalizada);
      this.reparacionFinalizadaSvc.addReparacionFinalizada(this.reparacionFinalizada);

      this.prodSvc.rebajaProductobyReparacion(this.new_producto, this.reparacionFinalizada);
    }
    else{
      this.reparacionFinalizada.id =  this.route.snapshot.paramMap.get('id');
      this.reparacionFinalizada.nombre = this.reparacion.nombre_cliente;
      this.reparacionFinalizada.telefono = this.reparacion.telefono;
      this.reparacionFinalizada.fecha_dejaron = this.reparacion.fecha_dejaron;
      this.reparacionFinalizada.marca = this.reparacion.marca;
      this.reparacionFinalizada.modelo = this.reparacion.modelo;
      this.reparacionFinalizada.color = this.reparacion.color;
      this.reparacionFinalizada.encedido = this.reparacion.encendido;
      this.reparacionFinalizada.password = this.reparacion.password;
      this.reparacionFinalizada.descripcion = this.reparacion.descripcion;
      this.reparacionFinalizada.partes_reparar = this.reparacion.partes_reparar;
      this.reparacionFinalizada.persona_reparo = personaReparo;
      this.reparacionFinalizada.persona_entrego = personaEntrego;
      this.reparacionFinalizada.detalle_reparacion = detalles_reparacion;
      this.reparacionFinalizada.cantidad_adicional = 1;
      this.reparacionFinalizada.fecha_entrega = fecha_entrega;
  
      this.reparacionFinalizada.entregado = equipo_entregado;
  
      console.log(this.reparacionFinalizada);
      this.reparacionFinalizadaSvc.addReparacionFinalizada(this.reparacionFinalizada);

      this.prodSvc.rebajaProductobyReparacion(this.new_producto, this.reparacionFinalizada);
    }

    




    

  }

}
