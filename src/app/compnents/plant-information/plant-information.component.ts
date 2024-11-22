import { Component, inject, Input, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plant-information',
  standalone: true,
  imports: [],
  templateUrl: './plant-information.component.html',
  styleUrl: './plant-information.component.css'
})
export class PlantInformationComponent implements OnInit {
  plant!: Plant; //plante à afficher
  palntService: PalntService = inject(PalntService); //service pour les plantes
  route: ActivatedRoute = inject(ActivatedRoute); //route pour récupérer l'id de la plante
  val!: number; //id de la plante
  
  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => { // Utiliser `parent` pour accéder à `id`
      const idParam = params.get('id');
      console.log("ID Param (string):", idParam);
  
      this.val = idParam ? +idParam : NaN;
      console.log("Plant ID (number):", this.val);
  
      if (!isNaN(this.val)) {
        this.palntService.getPlantById(this.val).subscribe({
          next: (plant) => {
            this.plant = plant;
            console.log("Fetched plant:", this.plant);
          },
          error: (error) => console.error('Failed to fetch plant:', error),
        });
      } else {
        console.error('Invalid or missing Plant ID');
      }
    });
  }
  
  
  
}
