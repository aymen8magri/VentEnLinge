import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PalntService } from '../../services/palnt.service';
import { Plant } from '../../model/plant';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-plant-detail-admin',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './plant-detail-admin.component.html',
  styleUrl: './plant-detail-admin.component.css'
})
export class PlantDetailAdminComponent implements OnInit{
  val:number=0; //id de la plante
  plant!:Plant; //plante à afficher
  route: ActivatedRoute = inject(ActivatedRoute); //route pour récupérer l'id de la plante
  palntService: PalntService = inject(PalntService); //service pour les plantes

  ngOnInit(): void {
    this.val=this.route.snapshot.params['id']; //récupérer l'id de la plante
    this.palntService.getPlantById(this.val).subscribe({
      next: (plant) => this.plant = plant, //afficher la plante
      error: (error) => console.error('Failed to fetch plant:', error),
    });
  }

}
