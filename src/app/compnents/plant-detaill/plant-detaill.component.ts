import { Component, inject, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PalntService } from '../../services/palnt.service';

@Component({
  selector: 'app-plant-detaill',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './plant-detaill.component.html',
  styleUrl: './plant-detaill.component.css'
})
export class PlantDetaillComponent implements OnInit{
  val:number=0; //id de la plante
  plant!:Plant; //plante à afficher
  route: ActivatedRoute = inject(ActivatedRoute); //route pour récupérer l'id de la plante
  palntService: PalntService = inject(PalntService); //service pour les plantes

  ngOnInit(): void {
    this.val=this.route.snapshot.params['id']; //récupérer l'id de la plante
    this.palntService.getPlantById(this.val).subscribe({
      next: (plant) => this.plant = plant, //afficher la plante
      error: (error) => console.error('Failed to fetch plant:', error), //afficher un message d'erreur si la plante n'est pas trouvée
    });
  }

  //fonction pour ajouter une plante au panier
  addToCart(plant: Plant) {
    this.palntService.addPlantToCart(plant);
  }

}
