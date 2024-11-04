import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Plant } from '../../model/plant';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PalntService } from '../../services/palnt.service';

@Component({
  selector: 'app-plant-item',
  standalone: true,
  imports: [CurrencyPipe, NgClass, RouterLink], 
  templateUrl: './plant-item.component.html',
  styleUrl: './plant-item.component.css'
})
export class PlantItemComponent implements OnInit {
  
  @Input() plant!: Plant;
  ngOnInit(): void {
    console.log(this.plant);
  }

  private plantService: PalntService = inject(PalntService);


  addToWishlist(plant: Plant) {
    console.log(plant);
    this.plantService.addPlantToWishlist(plant);
  }
  removeFromWishlist(plant: Plant) {
    this.plantService.removePlantFromWishlist(plant);
  }
  inWishlist(plant: Plant): boolean {
    return this.plantService.inWishlist(plant);
  }
  addToCart(plant: Plant) {
    this.plantService.addPlantToCart(plant);
  }
}
