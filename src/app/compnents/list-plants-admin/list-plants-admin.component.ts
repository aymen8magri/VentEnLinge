import { Component, inject, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { PlantItemComponent } from '../plant-item/plant-item.component';
import { PlantItemAdminComponent } from "../plant-item-admin/plant-item-admin.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-list-plants-admin',
  standalone: true,
  imports: [PlantItemAdminComponent,RouterLink],
  templateUrl: './list-plants-admin.component.html',
  styleUrl: './list-plants-admin.component.css'
})
export class ListPlantsAdminComponent implements OnInit {
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
onDeleteFleur(id:number){
  this.plantService.deletePlant(id).subscribe(
    data=>{this.plantsFleuries=this.plantsFleuries.filter((i)=>i.id!==id)}
  )
}
onDeleteSucc(id:number){
  this.plantService.deletePlant(id).subscribe(
    data=>{this.plantsCactus=this.plantsCactus.filter((i)=>i.id!==id)}
  )
}
onDeletePur(id:number){
  this.plantService.deletePlant(id).subscribe(
    data=>{this.plantsPurificatrices=this.plantsPurificatrices.filter((i)=>i.id!==id)}
  )
}
}
