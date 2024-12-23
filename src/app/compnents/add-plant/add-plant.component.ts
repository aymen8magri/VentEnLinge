import { Component, inject, OnInit } from '@angular/core';
import { PalntService } from '../../services/palnt.service';
import { Plant } from '../../model/plant';
import { Watering } from '../../model/watering';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categorie } from '../../model/categorie';
import { Maintenance } from '../../model/maintenance';
import { Filter } from '../../model/filter';
import { BackToTopButtonComponent } from "../back-to-top-button/back-to-top-button.component";

@Component({
  selector: 'app-add-plant',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-plant.component.html',
  styleUrl: './add-plant.component.css'
})
export class AddPlantComponent implements OnInit {

  // variables
  plantService: PalntService = inject(PalntService); // service de gestion des plantes
  plant!: Plant; // plante à ajouter
  date!: Date // date d'ajout
  plants!: Plant[]; // liste des plantes
  arrosage!: Watering[] // arrosage de la plante
  hidef: boolean = false; // booléen pour masquer le formulaire
  hide:boolean=true;// booléen pour masquer affichage de success
  planteForm!: FormGroup; // formulaire de la plante
  cat: String[] = Object.values(Categorie); // catégories des plantes
  maintenance: String[] = Object.values(Maintenance); // types de maintenance
  filter: String[] = Object.values(Filter); // types de filtre
  readonly fb: FormBuilder = inject(FormBuilder); // form builder

  // initialisation du formulaire
  ngOnInit(): void {
    this.planteForm = this.fb.nonNullable.group(
      {
        nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        categorie: [Categorie.Pure],
        personalite: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        maintenance: [Maintenance.facile],
        filter: [Filter.bavarde],
        prix: ['', [Validators.required, Validators.min(5),Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
        stock: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]],
        enStock: [true],
        dateAjout: ['', [Validators.required, Validators.pattern('^\\d{4}-\\\d{2}-\\\d{2}$')]],
        durVie: ['', [
          Validators.required,
          Validators.pattern('^\\d+-\\d+\\s*(ans|years)$')
        ]],
        arrosage: this.fb.array([]),
        img: ['', Validators.required],


      }
    )
    console.log(this.planteForm.invalid)
    this.plantService.getPlants().subscribe(
      data => this.plants = data
    )

  }
  //getter pour les arrosages
  public get watering() {
    return this.planteForm.get('arrosage') as FormArray;
  }

  //ajouter un arrosage
  onAjouterArrosage() {
    const arrosageGroup = this.fb.group({
      saison: ['été'],   // Saison
      frequence: ['Chaque jour'],   // Fréquence
      quantite: ['600 ml']    // Quantité
    });
    this.watering?.push(arrosageGroup);
    console.log(this.planteForm.invalid)
  }

  //getters
  get nom() {
    return this.planteForm.get('nom');
  }
  get personalite() {
    return this.planteForm.get('personalite');
  }
  get description() {
    return this.planteForm.get('description');

  }
  get prix() {
    return this.planteForm.get('prix');
  }
  get stock() {
    return this.planteForm.get('stock');
  }
  get dateAjout() {
    return this.planteForm.get('dateAjout');
  }
  get durVie() {
    return this.planteForm.get('durVie');
  }
  get img() {
    return this.planteForm.get('img');
  }




  //ajouter une plante
  onAjouter() {
    const last=this.plants.slice(-1)[0]
    console.log(this.watering?.value);
    this.date = new Date(this.planteForm.value['dateAjout']);
    this.plant = new Plant(
      Number(last.id)+1,
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
      data => console.log(data)

    )
    this.hide=false; //afficher le message de succès si la plante est ajoutée
    this.hidef = true; //masquer le formulaire si la plante est ajoutée
    
  }

  //reset le formulaire
  onReset() {
    this.plantService.getPlants().subscribe(
      data => this.plants = data
    )
    this.planteForm.reset();
    this.hidef = false;
    this.hide=true;
    

  }
}


