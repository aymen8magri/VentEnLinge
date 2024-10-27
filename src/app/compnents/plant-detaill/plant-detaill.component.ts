import { Component, inject, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PalntService } from '../../services/palnt.service';

@Component({
  selector: 'app-plant-detaill',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './plant-detaill.component.html',
  styleUrl: './plant-detaill.component.css'
})
export class PlantDetaillComponent implements OnInit{
  val:number=0;
  plant!:Plant;
  route: ActivatedRoute = inject(ActivatedRoute);
  palntService: PalntService = inject(PalntService);  

  ngOnInit(): void {
    this.val=this.route.snapshot.params['id'];
    this.palntService.getPlantById(this.val).subscribe({
      next: (plant) => this.plant = plant,
      error: (error) => console.error('Failed to fetch plant:', error),
      complete: () => console.log(this.plant)
    });
  }

}
