import { Component, inject, OnInit } from '@angular/core';
import { commandeService } from '../../services/commande.service';
import { Commande } from '../../model/commande';
import { Plant } from '../../model/plant';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-liste-commandes',
  standalone: true,
  imports: [NgClass],
  templateUrl: './liste-commandes.component.html',
  styleUrl: './liste-commandes.component.css'
})
export class ListeCommandesComponent implements OnInit{
  commandeService:commandeService=inject(commandeService);
  commandes:Commande[]=[];
  ngOnInit(): void {
    this.commandeService.getCommande().subscribe(
      data=>{this.commandes=data,
      console.log(data)
      }
      
    )
    
  }
 onDeleteCommande(id:string){
  this.commandeService.deleteCommande(id).subscribe(
    data=>this.commandeService.getCommande().subscribe(
      data=>this.commandes=data
    )
  )

}
onValiderCommande(id:string){
  this.commandeService.changeState(id,{etat:"Validée"}).subscribe(
    data=>this.commandeService.getCommande().subscribe(
      data=>this.commandes=data
    )
  )
}

}
