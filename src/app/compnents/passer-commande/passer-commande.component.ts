import { Component, inject } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { Commande } from '../../model/commande';
import { commandeService } from '../../services/commande.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-passer-commande',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './passer-commande.component.html',
  styleUrl: './passer-commande.component.css'
})
export class PasserCommandeComponent {
  plantService:PalntService=inject(PalntService);
  tabcom:Plant[]=this.plantService.tabcart;
  commandeService:commandeService=inject(commandeService)
  com!:Commande;
  formHide!:boolean;
  msgHide:boolean=true;
  onCommande(nom:string,pnom:string,tel:string,adresse:string){
    console.log(this.tabcom);
    console.log(nom,pnom)
    this.com=new Commande(nom,pnom,tel,adresse,"en attente",this.tabcom);
    console.log(this.com);
    this.commandeService.addCommande(this.com).subscribe(
      data=>console.log(data)
    )
    this.formHide=true;
    this.msgHide=false;
  }


}
