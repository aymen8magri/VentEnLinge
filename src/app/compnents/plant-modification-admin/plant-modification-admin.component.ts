import { Component, inject, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Filter } from '../../model/filter';
import { Categorie } from '../../model/categorie';
import { Maintenance } from '../../model/maintenance';

@Component({
  selector: 'app-plant-modification-admin',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './plant-modification-admin.component.html',
  styleUrl: './plant-modification-admin.component.css'
})
export class PlantModificationAdminComponent implements OnInit{
  plant!: Plant; //plante à afficher
  palntService: PalntService = inject(PalntService); //service pour les plantes
  route: ActivatedRoute = inject(ActivatedRoute); //route pour récupérer l'id de la plante
  val!: number; //id de la plante
  maintenance: String[] = Object.values(Maintenance); // types de maintenance
  cat: String[] = Object.values(Categorie); // catégories des plantes
  filter: String[] = Object.values(Filter); // types de filtre  plantForm:FormGroup=inject(FormGroup);
  planteForm!:FormGroup;//formulaire pour la plante
  router: Router = inject(Router);//router pour naviguer entre les pages
  fb:FormBuilder=inject(FormBuilder);//formbuilder pour créer le formulaire
  ngOnInit(): void {
   
    //formulaire pour la plante
    this.planteForm = this.fb.nonNullable.group(
      {
        nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        categorie: ['',Validators.required],
        personalite: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        maintenance: ['',Validators.required],
        filter: ['',Validators.required],
        prix: ['', [Validators.required, Validators.min(5),Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
        stock: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]],
        enStock: ['',Validators.required],
        dateAjout: ['', [Validators.required, Validators.pattern('^\\d{4}-\\\d{2}-\\\d{2}$')]],
        durVie: ['', [
          Validators.required,
          Validators.pattern('^\\d+-\\d+\\s*(ans|years)$')
        ]],
        arrosage: this.fb.array([]),
        img: ['', Validators.required],

      }
    )
    

    this.route.parent?.paramMap.subscribe(params => { // Use `parent` to access `id`
      const idParam = params.get('id');
      console.log("ID Param (string):", idParam);
  
      this.val = idParam ? +idParam : NaN;
      console.log("Plant ID (number):", this.val);
  
      if (!isNaN(this.val)) {
        this.palntService.getPlantById(this.val).subscribe({
          next: (plant) => {
            this.plant = plant;
            this.updateFormWithPlant();
            this.remplirArrosage();
            console.log("Fetched plant:", this.plant);
          },
          error: (error) => console.error('Failed to fetch plant:', error),
        });
      } else {
        console.error('Invalid or missing Plant ID');
      }
    });
   
   
    
  }
  
  //getters pour les champs du formulaire
  public get watering() {
    return this.planteForm.get('arrosage') as FormArray;
  }
  get nom() {
    return this.planteForm.get('nom');
  }
  get categorie() {
    return this.planteForm.get('categorie');
  }
  get personalite() {
    return this.planteForm.get('personalite');
  }
  get description() {
    return this.planteForm.get('description');
  }
  get entretien() {
    return this.planteForm.get('maintenance');
  }
  get type() {
    return this.planteForm.get('filter');
  }
  
  get prix() {
    return this.planteForm.get('prix');
  }
  get stock() {
    return this.planteForm.get('stock');
  }
  get enStock() {
    return this.planteForm.get('enStock');
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

  //mettre à jour le formulaire avec les informations de la plante
  updateFormWithPlant(): void {
    this.planteForm.patchValue({
      nom: this.plant.name,
      categorie: this.plant.category,
      
      personalite: this.plant.personality,
      description: this.plant.description,
      maintenance: this.plant.entretien,
      filter: this.plant.fun_filter,
      prix: this.plant.price,
      stock: this.plant.stock,
      enStock: this.plant.in_stock,
      dateAjout:  this.plant.date_ajout,
      durVie: this.plant.dureeVie,
      img:this.plant.images,
    });
    console.log(this.planteForm);
    console.log(this.plant.category);
    console.log(this.categorie?.value);
  }

  //remplir le formulaire avec les informations d'arrosage de la plante
  remplirArrosage(){
    if(this.plant.arrosage){
      const watering = this.planteForm.get('arrosage') as FormArray;
      this.plant.arrosage.forEach((elem) => {
        watering.push(
          this.fb.group({
            saison: [elem.saison, Validators.required],
            frequence: [elem.frequence, Validators.required],
            quantite: [elem.quantite, Validators.required],
          })
        );
      });
    }
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

  //mettre à jour la plante avec les informations du formulaire
  onUpdatePlant(){
    this.plant.name=this.nom?.value;
    this.plant.category=this.categorie?.value;
    this.plant.personality=this.personalite?.value;
    this.plant.description=this.description?.value;
    this.plant.entretien=this.entretien?.value;
    this.plant.fun_filter=this.type?.value;
    this.plant.price=this.prix?.value;
    this.plant.stock=this.stock?.value;
    this.plant.in_stock=this.enStock?.value;
    this.plant.date_ajout=this.dateAjout?.value;
    this.plant.dureeVie=this.durVie?.value;
    this.plant.arrosage=this.watering?.value
    this.plant.images=this.img?.value;
    this.palntService.updatePlant(this.val,this.plant).subscribe(
      data=>console.log(data)
    )
    this.router.navigate(['/ListePlantesAdmin']);
  }
}

