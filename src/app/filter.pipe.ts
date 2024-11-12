import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  // filtre les plantes selon le terme de recherche
  transform(value: any, args?: any): any {
    if(!value) return null;// si la valeur est null, retourne null
    if(!args) return value;// si l'argument est null, retourne la valeur

    args = args.toLowerCase();// convertie l'argument en minuscule

    // filtre les plantes selon le terme de recherche
    return value.filter((item: any) => JSON.stringify(item).toLowerCase().includes(args));
  }
}
