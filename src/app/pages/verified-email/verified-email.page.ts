import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verified-email',
  templateUrl: './verified-email.page.html',
  styleUrls: ['./verified-email.page.scss'],
})
export class VerifiedEmailPage{

  public user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService,private router: Router) { }
  

  async onSendEmail() :Promise<void>{
    try {
      await this.authSvc.sendVerifiedEmail();
    }
    catch(error){
      console.log('Error -> ',error)
    }
    
  }

  ngOnDestroy(): void{
    this.authSvc.logout();
  }

  pageLogin(){
    this.router.navigate(['login'])
  }



}
