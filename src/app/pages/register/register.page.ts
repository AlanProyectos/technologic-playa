import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor( private authSvc: AuthService,private router: Router,private alertSvc : AlertService) { }

  ngOnInit() {
  }

  async onRegister(email, password){
    try{
      const user = await this.authSvc.register(email.value, password.value);
      if(user){
        console.log('User->',user);
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
      return user;
    }
    catch(error){
      console.log('Error ->',error);
    }
  }
  private redirectUser( isVerified:boolean ):void{
    if(isVerified){
      this.router.navigate(['tabs/tab1']);
    }
    else{
      this.router.navigate(['verified-email'])
    }
  }

}
