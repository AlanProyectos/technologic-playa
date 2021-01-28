import { Pipe, PipeTransform } from '@angular/core';
import { ReparacionesInterface } from '../shared/reparaciones.interface';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(reparacion: ReparacionesInterface[], texto: string): ReparacionesInterface[] {
    if(texto.length === 0) {
      return reparacion;
    }

    return reparacion.filter(repara =>{
      return repara.nombre_cliente.includes(texto) || repara.marca.includes(texto);
    } )
  }

}
