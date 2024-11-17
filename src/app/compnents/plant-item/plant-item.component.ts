import { Component, inject, Input, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { CurrencyPipe, DecimalPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PalntService } from '../../services/palnt.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-plant-item',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, NgClass, RouterLink], 
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
    if(!(this.plantService.inWishlist(plant))){
    this.plantService.addPlantToWishlist(plant);}
  }
  removeFromWishlist(plant: Plant) {
    this.plantService.removePlantFromWishlist(plant);
  }
  inWishlist(plant: Plant): boolean {
    return this.plantService.inWishlist(plant);
  }
  addToCart(plant: Plant) {
    if(plant.stock > 0){
      this.plantService.addPlantToCart(plant);
    }
    else{
      const stockModal = new bootstrap.Modal(document.getElementById('stockModal')!);
      stockModal.show();
    }
  }
}
