import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.interface';


@Component({
  selector: 'app-tab2',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage  {
  public resultado : User;

  public idUser:string;

  public nombre:string;

  constructor(private router : Router, private authSvc : AuthService) {}

 
  ngOnInit() {
    this.authSvc.user$.subscribe(data =>
      {
        this.nombre = data.displayName;
        this.resultado = data
        this.idUser=data.uid;
      });
  }

}

