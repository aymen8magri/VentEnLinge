import { Component, inject, OnInit } from '@angular/core';
import { PalntService } from '../../services/palnt.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-api',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class APIComponent implements OnInit {
  plants: any[] = []; // Plantes filtrées
  categories: string[] = [ // Catégories disponibles
    'All', 'Dracaena', 'Palm', 'Anthurium', 'Other', 'Aglaonema',
    'Hanging', 'Bromeliad', 'Spathiphyllum', 'Flower', 'Aralia',
    'Ficus', 'Sansevieria', 'Foliage plant', 'Dieffenbachia',
    'Philodendron', 'Cactus & Succulent', 'Schefflera', 'Topiairy',
    'Fern', 'Grass', 'Ground Cover'
  ];
  selectedCategory: string = 'All'; // Catégorie sélectionnée
  isLoading = false; //chargement en cours
  errorMessage: string = ''; //message d'erreur

  plantService: PalntService = inject(PalntService); //service pour les plantes

  ngOnInit(): void {
    this.fetchPlants('All'); // Charger toutes les plantes par défaut
  }

  //charger les plantes en fonction de la catégorie
  fetchPlants(category: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    if (category === 'All') { //charger toutes les plantes
      this.plantService.getPlantApi().subscribe({
        next: (data) => {
          this.plants = data;
          console.log(data);
          this.isLoading = false;
        }
      });
    } else { //charger les plantes en fonction de la catégorie
      this.plantService.getPlantApiByCategory(category).subscribe({
        next: (data) => {
          this.plants = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = `Erreur lors de la récupération des plantes pour la catégorie : ${category}`;
          this.isLoading = false;
          console.error(error);
        }
      });
    }
  }

  //changer la catégorie
  onCategoryChange(): void {
    this.fetchPlants(this.selectedCategory);
  }

}
