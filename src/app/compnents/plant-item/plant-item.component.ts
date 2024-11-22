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
  
  @Input() plant!: Plant; //plante à afficher

  ngOnInit(): void {
    console.log(this.plant);
  }

  private plantService: PalntService = inject(PalntService); //service pour les plantes

  //fonction pour ajouter une plante à la liste des souhaits
  addToWishlist(plant: Plant) {
    if(!(this.plantService.inWishlist(plant))){
    this.plantService.addPlantToWishlist(plant);}
  }
  //fonction pour supprimer une plante de la liste des souhaits
  removeFromWishlist(plant: Plant) {
    this.plantService.removePlantFromWishlist(plant);
  }
  //fonction pour vérifier si une plante est dans la liste des souhaits
  inWishlist(plant: Plant): boolean {
    return this.plantService.inWishlist(plant);
  }
  //fonction pour ajouter une plante au panier
  addToCart(plant: Plant) {
    if(plant.stock > 0){
      this.plantService.addPlantToCart(plant); //ajouter la plante au panier si elle est en stock
    }
    else{
      const stockModal = new bootstrap.Modal(document.getElementById('stockModal')!); //afficher la modal si la plante n'est pas en stock
      stockModal.show();
    }
  }
}
