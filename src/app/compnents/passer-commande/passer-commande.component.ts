import { Component, inject, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { Commande } from '../../model/commande';
import { commandeService } from '../../services/commande.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-passer-commande',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './passer-commande.component.html',
  styleUrl: './passer-commande.component.css'
})
export class PasserCommandeComponent implements OnInit{
  
  plantService:PalntService=inject(PalntService); //service pour les plantes
  tabcom:Plant[]=this.plantService.tabcart; //tableau des plantes dans le panier
  commandeService:commandeService=inject(commandeService) //service pour les commandes
  com!:Commande; //commande à passer
  formHide!:boolean; //boolean pour masquer le formulaire
  msgHide:boolean=true; //boolean pour masquer le message de succès
  commandeForm!:FormGroup; //formulaire pour passer une commande
  fb:FormBuilder=inject(FormBuilder); //builder pour le formulaire

  ngOnInit(): void {
    this.commandeForm=this.fb.group({
      nom:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern('[a-zA-Z]+')]],
      prenom:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern('[a-zA-Z]+')]],
      tel:['',[Validators.required,Validators.pattern('[0-9]{8}')]],
      adresse:['',[Validators.required,Validators.minLength(3)]]

    })
  }
  //récupérer le nom
  get nom(){
    return this.commandeForm.get('nom');
  }
  //récupérer le prénom
  get prenom(){
    return this.commandeForm.get('prenom');
  }
  //récupérer le téléphone
  get tel(){
    return this.commandeForm.get('tel');
  }
  //récupérer l'adresse
  get adresse(){
    return this.commandeForm.get('adresse');
  }

  //passer la commande
  onCommande(){
    console.log(this.tabcom);
   
    this.com=new Commande(this.nom?.value,this.prenom?.value,this.tel?.value,this.adresse?.value,"en attente",this.plantService.total(),this.tabcom);
    console.log(this.com);
    this.commandeService.addCommande(this.com).subscribe(
      data=>console.log(data)
    )
    this.formHide=true;
    this.msgHide=false;
    for(const t of this.tabcom){
      t.stock--;
      this.plantService.updateStock(t.id,{stock:t.stock}).subscribe(
        data=>{console.log(data)
          }
        
      )
      if(t.stock==0){
        this.plantService.updateInStock(t.id,{in_stock:false}).subscribe(
          data=>console.log(data)
        )
      }
    }
    
     this.plantService.tabcart=[]; //vider le panier
    }

  }



