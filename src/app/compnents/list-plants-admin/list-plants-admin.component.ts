import { Component, inject, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { PlantItemAdminComponent } from "../plant-item-admin/plant-item-admin.component";
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../filter.pipe';


@Component({
  selector: 'app-list-plants-admin',
  standalone: true,
  imports: [PlantItemAdminComponent, FormsModule, FilterPipe],
  templateUrl: './list-plants-admin.component.html',
  styleUrl: './list-plants-admin.component.css'
})
export class ListPlantsAdminComponent implements OnInit {
  
  plants: Plant[] = [];            // Complete list of plants
  filteredPlants: Plant[] = [];     // List of plants after filtering
  selectedFunFilter: string = '';   // Stores the selected fun filter value
  selectedCategory: string = '';    // Stores the selected category value


  private plantService: PalntService = inject(PalntService);

  ngOnInit(): void {

    
    this.plantService.getPlants().subscribe((data: Plant[]) => {
      this.plants = data;
      this.filteredPlants = data;  // Initialize with the full list
    });

  }
  onDeletePlant(id: number) {
    this.plantService.deletePlant(id).subscribe(
      data => { this.filteredPlants = this.filteredPlants.filter((i) => i.id !== id) }
    )
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
  searchTerm: any;

}
