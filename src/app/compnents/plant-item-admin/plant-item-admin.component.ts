import { Component, inject, Input , Output,EventEmitter} from '@angular/core';
import { Plant } from '../../model/plant';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { PalntService } from '../../services/palnt.service';

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
