import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.interface';
import * as Chart from "chart.js";
import { AuthService } from 'src/app/services/auth.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss'],
})
export class GraficosComponent implements OnInit {

  private ventasCharts: Chart;
  private ventasTodos:Chart;

  public resultado: User;


  ventasUser = {
    vendedor:[],
  };
  vendedores=[];

  vendedorName={
    nombre:[]
  };

  fechaVentas=[];

  

  Enero = 0;
  Febrero = 0;
  Marzo = 0;
  Abril = 0;
  Mayo = 0;
  Junio = 0;
  Julio = 0;
  Agosto = 0;
  Septiembre =0;
  Octubre=0;
  Noviembre=0;
  Diciembre=0;

  repetidos = {};
  vendedoresRepetidos =[];

  usuario: User = {
    email: '',
    emailVerified: true,
    uid: '',
    displayName: ''
  }

  cant: number;

  id: string;
  





  constructor(private ventaSvc: VentasService, private UserSvc: AuthService) { }


  ngOnInit() {
    this.Enero = 0;
  this.Febrero = 0;
  this.Marzo = 0;
  this.Abril = 0;
  this.Mayo = 0;
  this.Junio = 0;
  this.Julio = 0;
  this.Agosto = 0;
  this.Septiembre =0;
  this.Octubre=0;
  this.Noviembre=0;
  this.Diciembre=0;
    this.UserSvc.user$.subscribe(data => {
      this.resultado = data
      this.id = this.resultado.uid;
      const path = "ventas/";
      this.ventaSvc.getCollectionParametro(path, 'vendedorId', this.id).subscribe(res => {
        this.cant = res.length;
        res.map(item=>{
          this.fechaVentas.push((new Date(item.fechaOrden).getMonth() +1 ));
        })
        this.generateCharts();
      });
    });
  }
 
  async generateCharts() {
    const canvas = <HTMLCanvasElement>document.getElementById('ventas-charts');
    const ctx = canvas.getContext('2d');
    this.fechaVentas.forEach(res=>{
      this.repetidos[res] = (this.repetidos[res]||0)+1;
      if(res == 1){
        this.Enero++;
      }
      if(res == 2){
        this.Febrero++;
      }
      if(res == 3){
        this.Marzo++;
      }
      if(res == 4){
        this.Abril++;
      }
      if(res == 5){
        this.Mayo++;
      }
      if(res == 6){
        this.Junio++;
      }
      if(res == 7){
        this.Julio++;
      }
      if(res == 8){
        this.Agosto++;
      }
      if(res == 9){
        this.Septiembre++;
      }
      if(res == 10){
        this.Octubre++;
      }
      if(res == 11){
        this.Noviembre++;
      }
      if(res == 12){
        this.Diciembre++;
      }
    })

    this.ventasCharts = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
        datasets: [{
          label: '# de Ventas',
          data: [this.Enero,this.Febrero,this.Marzo, this.Abril, this.Mayo, this.Junio, this.Julio, this.Agosto, this.Septiembre, this.Octubre, this.Noviembre, this.Diciembre],
          backgroundColor: [
            'rgba(41, 175, 0, 0.2)',
            'rgba(41, 175, 0, 0.2)',
            'rgba(41, 175, 0, 0.2)',
            'rgba(41, 175, 0, 0.2)',
            'rgba(41, 175, 0, 0.2)',
            'rgba(41, 175, 0, 0.2)',
            'rgba(41, 175, 0, 0.2)',
            'rgba(41, 175, 0, 0.2)',
            'rgba(41, 175, 0, 0.2)',
            'rgba(41, 175, 0, 0.2)',
            'rgba(41, 175, 0, 0.2)',
            'rgba(41, 175, 0, 0.2)'
          ],
          borderColor: [
            'rgba(65, 255, 7, 0.2)',
            'rgba(65, 255, 7, 0.2)',
            'rgba(65, 255, 7, 0.2)',
            'rgba(65, 255, 7, 0.2)',
            'rgba(65, 255, 7, 0.2)',
            'rgba(65, 255, 7, 0.2)',
            'rgba(65, 255, 7, 0.2)',
            'rgba(65, 255, 7, 0.2)',
            'rgba(65, 255, 7, 0.2)',
            'rgba(65, 255, 7, 0.2)',
            'rgba(65, 255, 7, 0.2)',
            'rgba(65, 255, 7, 0.2)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
