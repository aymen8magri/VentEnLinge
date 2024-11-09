import { Component, inject, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { PlantItemComponent } from '../plant-item/plant-item.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-list-plants',
    standalone: true,
    imports: [PlantItemComponent, RouterLink, NavbarComponent],
    templateUrl: './list-plants.component.html',
    styleUrl: './list-plants.component.css'
})
export class ListPlantsComponent implements OnInit {

    plants: Plant[] = [];            // Complete list of plants
    filteredPlants: Plant[] = [];     // List of plants after filtering
    selectedFunFilter: string = '';   // Stores the selected fun filter value
    selectedCategory: string = '';    // Stores the selected category value

    private plantService: PalntService = inject(PalntService);

    ngOnInit(): void {
        // Fetch the list of plants from the service on component load
        this.plantService.getPlants().subscribe((data: Plant[]) => {
            this.plants = data;
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

}
