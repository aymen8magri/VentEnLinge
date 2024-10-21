import { Component, inject, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { PlantItemComponent } from '../plant-item/plant-item.component';

@Component({
  selector: 'app-list-plants',
  standalone: true,
  imports: [PlantItemComponent],
  templateUrl: './list-plants.component.html',
  styleUrl: './list-plants.component.css'
})
export class ListPlantsComponent implements OnInit{
    plantsFleuries: Plant[] = [];
    plantsCactus: Plant[] = [];
    plantsPurificatrices: Plant[] = [];

    private plantService: PalntService = inject(PalntService);

    ngOnInit(): void {
        this.plantService.getPlantsByCategory("Plantes fleuries").subscribe(plants => {
            this.plantsFleuries = plants;
        });
        this.plantService.getPlantsByCategory("Cactus et succulentes").subscribe(plants => {
            this.plantsCactus = plants;
        });
        this.plantService.getPlantsByCategory("Plantes purificatrices d'air").subscribe(plants => {
            this.plantsPurificatrices = plants;
        });
    }
}
