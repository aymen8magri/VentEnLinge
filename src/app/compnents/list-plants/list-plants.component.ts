import { Component, inject, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { PlantItemComponent } from '../plant-item/plant-item.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../filter.pipe';

@Component({
    selector: 'app-list-plants',
    standalone: true,
    imports: [PlantItemComponent, RouterLink, FormsModule, FilterPipe],
    templateUrl: './list-plants.component.html',
    styleUrl: './list-plants.component.css'
})
export class ListPlantsComponent implements OnInit {

    plants: Plant[] = [];            // Liste complète des plantes
    filteredPlants: Plant[] = [];     // Liste des plantes après filtrage
    selectedFunFilter: string = '';   // Stockage de la valeur du filtre de fonction
    selectedCategory: string = '';    // Stockage de la valeur de la catégorie

    private plantService: PalntService = inject(PalntService); //service pour les plantes

    ngOnInit(): void {
        // Fetch the list of plants from the service on component load
        this.plantService.getPlants().subscribe((data: Plant[]) => {
            this.plants = data; //récupérer les plantes de la base de données
            this.filteredPlants = data;  // Initialize with the full list
        });
    }

    /*--------------------* Filter by Fun *---------------------------*/
    onFilter(event: Event): void {
        // Get the values of the selected fun filter and category
        const target = event.target as HTMLSelectElement;

        if (target.id === 'funFilterSelect') {
            this.selectedFunFilter = target.value;
        } else if (target.id === 'categorySelect') {
            this.selectedCategory = target.value;
        }

        // Filter the plants based on the selected values
        this.filteredPlants = this.plants.filter(plant => {
            const matchesFunFilter = this.selectedFunFilter ? plant.fun_filter === this.selectedFunFilter : true;
            const matchesCategory = this.selectedCategory ? plant.category === this.selectedCategory : true;
            return matchesFunFilter && matchesCategory;
        });
    }

    /*--------------------* Sort by Price *---------------------------*/
    sortAscending(): void {
        this.filteredPlants.sort((a, b) => a.price - b.price);
    }
    sortDescending(): void {
        this.filteredPlants.sort((a, b) => b.price - a.price);
    }

    /*--------------------* Search *---------------------------*/
    searchTerm: any; //terme de recherche pour les plantes



}
