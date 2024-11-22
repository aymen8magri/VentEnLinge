import { Component, inject, Input , Output,EventEmitter} from '@angular/core';
import { Plant } from '../../model/plant';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-plant-item-admin',
  standalone: true,
  imports: [CurrencyPipe, NgClass, RouterLink],
  templateUrl: './plant-item-admin.component.html',
  styleUrl: './plant-item-admin.component.css'
})
export class PlantItemAdminComponent {
  @Input() plant!: Plant; //plante à afficher
  @Output() notify=new EventEmitter<number>(); //émetteur d'événement pour notifier le parent
  

  //fonction pour supprimer une plante
  onDelete(id:number) {
    this.notify.emit(id); //émettre l'id de la plante à supprimer
  }
}
