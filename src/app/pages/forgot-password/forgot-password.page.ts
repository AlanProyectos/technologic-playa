import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage  {

  constructor(private authService: AuthService, private router : Router, private alertSvc : AlertService) { }

  async onResetPassword(email){
    try{
       await this.authService.resetPassword(email.value);
       this.router.navigate(['/login'])
    }
    catch(error){
      console.log('Error-> ',error);
      this.alertSvc.basicAlert('Alerta','No has puesto el correo',['Ok']);
    }
  }

}
