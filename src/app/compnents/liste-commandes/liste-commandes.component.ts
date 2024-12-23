import { Component, inject, OnInit } from '@angular/core';
import { commandeService } from '../../services/commande.service';
import { Commande } from '../../model/commande';
import { Plant } from '../../model/plant';
import { DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-liste-commandes',
  standalone: true,
  imports: [NgClass,DecimalPipe],
  templateUrl: './liste-commandes.component.html',
  styleUrl: './liste-commandes.component.css'
})
export class ListeCommandesComponent implements OnInit {
  commandeService: commandeService = inject(commandeService); //service pour les commandes
  commandes: Commande[] = []; //tableau des commandes
  articles: Plant[] = []; //tableau des plantes
  uniqueArticles:Plant[]=[]; //tableau des plantes uniques

  ngOnInit(): void {
    //get commandes de la base de données
    this.commandeService.getCommande().subscribe(
      data => {
        this.commandes = data,
        console.log(data)
      }
    )
  }

  //get articles par commande
  getArticles(id: string) {
    this.commandeService.getArticles(id).subscribe(data => {
      this.articles = data;
      console.log(data);
      this.removeDuplicates();
    });
  }
  //supprimer les doublons
  removeDuplicates(): void {
    this.uniqueArticles = this.articles.filter((value, index, self) => 
      index === self.findIndex((t) => (
        t.id === value.id 
      ))
    );
  }
  //get total de la commande
  getTotal(articles:Plant[]){
    return articles.reduce((acc,curr)=>acc+curr.price,0);
  }

  //calculer la quantité de chaque article
  calculateQuantity(name:string){
    return this.articles.filter(a => a.name === name).length;
  }

  //delete commande par id
  onDeleteCommande(id: string) {
    this.commandeService.deleteCommande(id).subscribe(
      data => this.commandeService.getCommande().subscribe(
        data => this.commandes = data
      )
    )

  }

  //valider commande par id
  onValiderCommande(commande:Commande) {
    this.commandeService.changeState(commande.id, { etat: "Validée" }).subscribe(
      data => commande.etat="Validée"
      
    )
  }

}
