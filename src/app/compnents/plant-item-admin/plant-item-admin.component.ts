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
  @Input() plant!: Plant;
  @Output() notify=new EventEmitter<number>();
  

  onDelete(id:string) {
  
    this.notify.emit(parseInt(id));
  }
}
