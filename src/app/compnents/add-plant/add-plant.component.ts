import { Component, inject, OnInit } from '@angular/core';
import { PalntService } from '../../services/palnt.service';
import { Plant } from '../../model/plant';
import { Commentaire } from '../../model/commentaire';

@Component({
  selector: 'app-add-plant',
  standalone: true,
  imports: [],
  templateUrl: './add-plant.component.html',
  styleUrl: './add-plant.component.css'
})
export class AddPlantComponent implements OnInit {
  
  plantService:PalntService=inject(PalntService);
  plant!:Plant;
  plants!:Plant[];
  instock!:boolean;
  comments!:Commentaire[]
  hide:boolean=true;
  ngOnInit(): void {
   
      this.plantService.getPlants().subscribe(
        data=>this.plants=data
        
      )
    }  
  
  onAjouter(nom:string,type:string,personality:string,description:string,bio:string,watering:string,maintenance:string,filter:string,price:string,stock:string,date:string,lifespan:string,category:string,img:string){
    this.plant=new Plant(this.plants.length+1,nom,type,personality,description,watering,bio,maintenance,lifespan,this.instock,category,filter,parseFloat(price),parseInt(stock),new Date(date),img,this.comments)
   
    this.plantService.addPlant(this.plant).subscribe(
      data=>console.log(data)
    
    )
    
  }

}
  
  
