import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter', 
  standalone: true
})
export class FilterPipe implements PipeTransform {

  // La méthode 'transform' est utilisée pour appliquer la logique de filtrage sur la valeur d'entrée
  transform(value: any, args?: any): any {
    // Si la valeur d'entrée est null ou undefined, on retourne null
    if (!value) return null;

    // Si l'argument de recherche est null ou undefined, on retourne la valeur complète sans modification
    if (!args) return value;

    // Convertir l'argument (terme de recherche) en minuscule pour effectuer une recherche insensible à la casse
    args = args.toLowerCase();

    // Utilisation de la méthode 'filter' pour parcourir la liste 'value' (qui est une collection d'objets)
    // Chaque élément de la liste est vérifié pour voir si son nom contient le terme de recherche
    return value.filter((item: any) => 
      // On transforme 'item.name' en chaîne de caractères et on la compare avec l'argument
      // 'JSON.stringify' est utilisé pour s'assurer que l'objet est converti en chaîne au cas où l'élément n'est pas déjà une chaîne
      JSON.stringify(item.name).toLowerCase().includes(args)
    );
  }
}
