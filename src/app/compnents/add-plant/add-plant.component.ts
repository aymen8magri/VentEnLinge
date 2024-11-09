import { Component, inject, OnInit } from '@angular/core';
import { PalntService } from '../../services/palnt.service';
import { Plant } from '../../model/plant';
import { Watering } from '../../model/watering';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Categorie } from '../../model/categorie';
import { Maintenance } from '../../model/maintenance';
import { Filter } from '../../model/filter';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-add-plant',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarAdminComponent],
  templateUrl: './add-plant.component.html',
  styleUrl: './add-plant.component.css'
})
export class AddPlantComponent implements OnInit {
  
  plantService:PalntService=inject(PalntService);
  plant!:Plant;
  date!:Date
  plants!:Plant[];
  arrosage!:Watering[]
  hide:boolean=true;
  planteForm!:FormGroup;
  cat:String[]=Object.values(Categorie);
  maintenance:String[]=Object.values(Maintenance);
  filter:String[]=Object.values(Filter);
  readonly fb:FormBuilder=inject(FormBuilder);
  ngOnInit(): void {
    this.plantService.getPlants().subscribe(
      data=>this.plants=data
    )
     
      this.planteForm=this.fb.nonNullable.group(
        {
          id:[0],
          nom:[''],
          categorie:[Categorie.Pure],
          personalite:[''],
          description:[''],
          maintenance:[Maintenance.facile],
          filter:[Filter.bavarde],
          prix:[0],
          stock:[0],
          enStock:[true],
          dateAjout:[''],
          durVie:[''],
          arrosage:this.fb.array([]),
          img:[''],


        }
      )
    }  
    public get watering(){
      return this.planteForm.get('arrosage') as FormArray;
    }
    onAjouterArrosage(){
     
        const arrosageGroup = this.fb.group({
          saison: '',   // Saison
          frequence: '',   // Fréquence
          quantite: ''    // Quantité
        });
        this.watering.push(arrosageGroup);
      }
     
    

    
  
  onAjouter(){
    
    console.log(this.watering.value);
    this.date=new Date(this.planteForm.value['dateAjout']);
    this.plant=new Plant(
      String(this.plants.length+1),
      this.planteForm.value['name'],
      this.planteForm.value['personalite'],
      this.planteForm.value['description'],
      this.planteForm.value['maintenance'],
      this.planteForm.value['durVie'],
      this.planteForm.value['enStock'],
      this.planteForm.value['categorie'],
      this.planteForm.value['filter'],
      this.planteForm.value['prix'],
      this.planteForm.value['stock'],
      this.date,
      this.planteForm.value['img'],
      this.watering.value
    )
    console.log(this.plant);
    this.plantService.addPlant(this.plant).subscribe(
      data=>console.log(data)
    
    )
    this.hide=false;
  }
onReset(){
  this.plantService.getPlants().subscribe(
    data=>this.plants=data
  )
  this.planteForm.reset();
  this.hide=true;

}
}
  
  
