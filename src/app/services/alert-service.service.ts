import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert;

  constructor( private alertaCtrl : AlertController) { }


  async basicAlert(header,message,buttons){
    this.alert = await this.alertaCtrl.create({
      header,
      message,
      buttons
    })
    this.alert.present();
  }
}
