import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {}

  private redirectRegister(){
      this.router.navigate(['register']);
  }

  private redirectForgotPassword(){
    this.router.navigate(['forgot-password']);
  }

  private redirectLogin(){
    this.router.navigate(['login']);
  }

}
