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
  
  plantService:PalntService=inject(PalntService);
  tabcom:Plant[]=this.plantService.tabcart;
  commandeService:commandeService=inject(commandeService)
  com!:Commande;
  formHide!:boolean;
  msgHide:boolean=true;
  commandeForm!:FormGroup;
  fb:FormBuilder=inject(FormBuilder);
  ngOnInit(): void {
    this.commandeForm=this.fb.group({
      nom:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern('[a-zA-Z]+')]],
      prenom:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern('[a-zA-Z]+')]],
      tel:['',[Validators.required,Validators.pattern('[0-9]{8}')]],
      adresse:['',[Validators.required,Validators.minLength(3)]]

    })
  }
  get nom(){
    return this.commandeForm.get('nom');
  }

  get prenom(){
    return this.commandeForm.get('prenom');
  }

  get tel(){
    return this.commandeForm.get('tel');
  }

  get adresse(){
    return this.commandeForm.get('adresse');
  }

 
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
    
     this.plantService.tabcart=[]; 
    }

  }



