import { Pipe, PipeTransform } from '@angular/core';
import { Cadena } from 'src/app/models/cadena';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(cadenas: Object[], page: number = 0): Cadena[] {
    if (cadenas) {
      return cadenas.slice(page, page + 2);
      
    }
  }

}
