import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PalntService } from '../../services/palnt.service';
import { PlantCommentComponent } from '../plant-comment/plant-comment.component';
import { Plant } from '../../model/plant';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-plant-detail-admin',
  standalone: true,
  imports: [RouterLink,PlantDetailAdminComponent, PlantCommentComponent, RouterOutlet, RouterLinkActive],
  templateUrl: './plant-detail-admin.component.html',
  styleUrl: './plant-detail-admin.component.css'
})
export class PlantDetailAdminComponent implements OnInit{
  val:number=0;
  plant!:Plant;
  route: ActivatedRoute = inject(ActivatedRoute);
  palntService: PalntService = inject(PalntService);  

  ngOnInit(): void {
    this.val=this.route.snapshot.params['id'];
    this.palntService.getPlantById(this.val).subscribe({
      next: (plant) => this.plant = plant,
      error: (error) => console.error('Failed to fetch plant:', error),
    });
  }

}
