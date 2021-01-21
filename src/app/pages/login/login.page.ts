import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import{AlertService} from '../../services/alert-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSvc : AuthService, private router: Router, private alertSvc : AlertService) { }

  ngOnInit() {
  }

  async onLogin(email, password){
    
    try{
      const user = await this.authSvc.login(email.value,password.value);
      if( user ){
        const isEmailVerified =  this.authSvc.isEmailVerified(user);
        this.redirectUser(isEmailVerified);
      }
    }
    catch(error){
      console.log('Error -> ',error);
      this.alertSvc.basicAlert('Alert',error,['OK']);
    }

  }

  private redirectUser( isVerified:boolean ):void{
    if(isVerified){
      this.router.navigate(['tabs/productos']);
    }
    else{
      this.router.navigate(['verified-email'])
    }
  }

  redirectRegister(){
    this.router.navigate(['register']);
}

redirectForgotPassword(){
  this.router.navigate(['forgot-password']);
}

}
