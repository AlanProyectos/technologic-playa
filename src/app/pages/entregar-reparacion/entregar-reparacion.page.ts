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
  date:any;

  reparaciones:ReparacionesInterface = {
    marca:'',
    modelo:'',
    nombre_cliente:'',
    partes_reparar:[],
    password:'',
    persona_entrego:'',
    persona_reparo:'',
    telefono:'',
    adicional:'',
    color:'',
    descripcion:'',
    detalle_reparacion:'',
    encendido:false,
    entregado:false,
    fecha_dejaron:new Date(),
    fecha_entrega:new Date(),
    cantidad_adicional:1,
    precio_reparacion:0
  }

  productoScaneado;
  new_producto: Product ={
    producto : '',
    modeloProducto : '',
    cantidadProducto : null,
    precioUnitario : '',
    marcaProducto:'',
  };

  constructor(private userSvc: AuthService, private prodSvc:ProductosService, private reparacionSvc:ReparacionesService, private route: ActivatedRoute, private router: Router, private barcodeScanner:BarcodeScanner,public alertController: AlertController) { }
  ngOnInit() {
    this.reparacionId = this.route.snapshot.paramMap.get('id');
    console.log(this.reparacionId);

    this.reparacionSvc.getReparacion(this.reparacionId).subscribe(res=>{
      console.log('Reparacion',res)
      this.reparaciones.nombre_cliente = res.nombre_cliente;
      this.reparaciones.telefono = res.telefono;
      this.reparaciones.fecha_dejaron = new Date(res.fecha_dejaron);
      this.reparaciones.entregado = res.entregado;
      this.reparaciones.marca = res.marca;
      this.reparaciones.modelo = res.modelo;
      this.reparaciones.color = res.color;
      this.reparaciones.encendido = res.encendido;
      this.reparaciones.descripcion = res.descripcion;
      this.reparaciones.partes_reparar = res.partes_reparar;
      this.reparaciones.password = res.password;
    })


    this.userSvc.getUsuarios().subscribe( res => {
      this.usuarios = res;
      console.log(res);
    })

    
    
  }
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

  entregarReparacion(personaReparo:string,personaEntrego:string,detalles_reparacion:string,adicional:string,fecha_entrega:string,equipo_entregado, precio_reparacion:number){

    let FechaEntrega = new Date(fecha_entrega); 
    if(adicional){

      this.reparacionSvc.getReparacion(this.reparacionId).subscribe(res=>{
        console.log('Reparacion',res)
        this.reparaciones.nombre_cliente = res.nombre_cliente;
        this.reparaciones.telefono = res.telefono;
        this.reparaciones.fecha_dejaron = res.fecha_dejaron;
        this.reparaciones.entregado = res.entregado;
        this.reparaciones.marca = res.marca;
        this.reparaciones.modelo = res.modelo;
        this.reparaciones.color = res.color;
        this.reparaciones.encendido = res.encendido;
        this.reparaciones.descripcion = res.descripcion;
        this.reparaciones.partes_reparar = res.partes_reparar;
        this.reparaciones.password = res.password;

        this.reparaciones.persona_reparo = personaReparo;
        this.reparaciones.persona_entrego = personaEntrego;
        this.reparaciones.detalle_reparacion = detalles_reparacion;
        this.reparaciones.adicional = adicional;
        this.reparaciones.fecha_entrega =  FechaEntrega;
        this.reparaciones.entregado = equipo_entregado;
        this.reparaciones.cantidad_adicional = 1;
        this.reparaciones.precio_reparacion = precio_reparacion;

        console.log('Reparacion Finalizada', this.reparaciones);

        this.reparacionSvc.updateReparacion(this.reparacionId, this.reparaciones);
        this.prodSvc.rebajaProductobyReparacion(this.new_producto,this.reparaciones);
      })
    }
    else
    {
      this.reparacionSvc.getReparacion(this.reparacionId).subscribe(res=>
        {
          console.log('Reparacion',res)
          this.reparaciones.nombre_cliente = res.nombre_cliente;
          this.reparaciones.telefono = res.telefono;
          this.reparaciones.fecha_dejaron = res.fecha_dejaron;
          this.reparaciones.entregado = res.entregado;
          this.reparaciones.marca = res.marca;
          this.reparaciones.modelo = res.modelo;
          this.reparaciones.color = res.color;
          this.reparaciones.encendido = res.encendido;
          this.reparaciones.descripcion = res.descripcion;
          this.reparaciones.partes_reparar = res.partes_reparar;
          this.reparaciones.password = res.password;

          this.reparaciones.persona_reparo = personaReparo;
          this.reparaciones.persona_entrego = personaEntrego;
          this.reparaciones.detalle_reparacion = detalles_reparacion;
          this.reparaciones.fecha_entrega =  FechaEntrega;
          this.reparaciones.entregado = equipo_entregado;
          this.reparaciones.cantidad_adicional = 1;
          this.reparaciones.precio_reparacion = precio_reparacion;

          console.log('Reparacion Finalizada', this.reparaciones);

          this.reparacionSvc.updateReparacion(this.reparacionId, this.reparaciones);
        })
    }
  }
}
