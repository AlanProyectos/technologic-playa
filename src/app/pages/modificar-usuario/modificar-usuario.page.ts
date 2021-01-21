import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.interface';



@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.page.html',
  styleUrls: ['./modificar-usuario.page.scss'],
})
export class ModificarUsuarioPage implements OnInit {

  constructor( private authSvc : AuthService,private loadingController: LoadingController,private nav : NavController) { }

  public resultado : User;

  ngOnInit() {
    this.authSvc.user$.subscribe(data =>{
    this.resultado = data
  });
    
  }

  async saveProducto(){
    const loading = await this.loadingController.create({
      message: 'Saving.....'
    })
    await loading.present();

    if(this.resultado.uid)
    {
      //Add New
      this.authSvc.updateUsuario(this.resultado, this.resultado.uid);
      await loading.dismiss();
    }
  }



}
