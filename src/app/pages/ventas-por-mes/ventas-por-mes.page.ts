import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-ventas-por-mes',
  templateUrl: './ventas-por-mes.page.html',
  styleUrls: ['./ventas-por-mes.page.scss'],
})
export class VentasPorMesPage implements OnInit {
  public resultado : User;

  public idUser:string;

  public nombre:string;

  constructor(private router : Router, private authSvc : AuthService) { }

  ngOnInit() {
    this.authSvc.user$.subscribe(data =>
      {
        this.nombre = data.displayName;
        this.resultado = data
        this.idUser=data.uid;
      });
  }


}
