import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { InputComponent } from './input/input.component';
import { GraficosComponent } from './graficos/graficos.component';



@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    InputComponent,
    GraficosComponent
  ],
  exports:[
    MenuComponent,
    FooterComponent,
    InputComponent,
    GraficosComponent
  ],
  imports: [
    CommonModule
  ]

})
export class ComponentsModule { }
