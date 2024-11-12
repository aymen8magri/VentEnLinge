import { Component, inject, OnInit } from '@angular/core';
import { PalntService } from '../../services/palnt.service';
import { Plant } from '../../model/plant';
import { Watering } from '../../model/watering';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categorie } from '../../model/categorie';
import { Maintenance } from '../../model/maintenance';
import { Filter } from '../../model/filter';

@Component({
  selector: 'app-add-plant',
  standalone: true,
  imports: [ReactiveFormsModule],
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
    this.planteForm=this.fb.nonNullable.group(
      {
        nom:['',Validators.required],
        categorie:[Categorie.Pure],
        personalite:['',Validators.required],
        description:['',Validators.required],
        maintenance:[Maintenance.facile],
        filter:[Filter.bavarde],
        prix:[0,[Validators.required ,Validators.min(5)]],
        stock:[0,[Validators.required,Validators.min(1)]],
        enStock:[true],
        dateAjout:['',Validators.required],
        durVie:['',Validators.required],
        arrosage:this.fb.array([]),
        img:['',Validators.required],


      }
    )
    console.log(this.planteForm.invalid)
    this.plantService.getPlants().subscribe(
      data=>this.plants=data
    )
      
    }  
    public get watering(){
      return this.planteForm.get('arrosage') as FormArray;
    }
    onAjouterArrosage(){
     
        const arrosageGroup = this.fb.group({
          saison: ['été'],   // Saison
          frequence: ['Chaque jour'],   // Fréquence
          quantite: ['600 ml']    // Quantité
        });
        this.watering?.push(arrosageGroup);
        console.log(this.planteForm.invalid)
      }
     
    get nom(){
      return this.planteForm.get('nom');
    }
    get personalite(){
      return this.planteForm.get('personalite');
    }
    get description(){
      return this.planteForm.get('description');

    }
    get prix(){
      return this.planteForm.get('prix');
    }
    get stock(){
      return this.planteForm.get('stock');
    } 
     get dateAjout(){
      return this.planteForm.get('dateAjout');
    } 
    get durVie(){
      return this.planteForm.get('durVie');
    }
    get img(){
      return this.planteForm.get('img');
    }


    
  
  onAjouter(){
    
    console.log(this.watering?.value);
    this.date=new Date(this.planteForm.value['dateAjout']);
    this.plant=new Plant(
      String(this.plants.length+1),
      this.planteForm.value['nom'],
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
      this.watering?.value
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
  
  
