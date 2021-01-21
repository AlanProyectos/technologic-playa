import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Services
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from 'src/environments/environment';
import { ComponentsModule } from './components/components.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {EmailComposer} from "@ionic-native/email-composer/ngx";
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent, 
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ComponentsModule,
    ChartsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
