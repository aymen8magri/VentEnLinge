import { Component, inject, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-plant-information-admin',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './plant-information-admin.component.html',
  styleUrl: './plant-information-admin.component.css'
})
export class PlantInformationAdminComponent implements OnInit{
  plant!: Plant; //plante à afficher
  palntService: PalntService = inject(PalntService); //service pour les plantes
  route: ActivatedRoute = inject(ActivatedRoute); //route pour récupérer l'id de la plante
  val!: number; //id de la plante
  ngOnInit(): void {

    this.route.parent?.paramMap.subscribe(params => { // Use `parent` to access `id`
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
