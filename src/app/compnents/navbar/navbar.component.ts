import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Plant } from '../../model/plant';
import { CurrencyPipe, NgClass } from '@angular/common';
import { PalntService } from '../../services/palnt.service';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CurrencyPipe, FormsModule,RouterOutlet,FooterComponent,NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isNavbarCollapsed = true; //boolean pour savoir si la navbar est collée
  router:Router=inject(Router); //router pour la navigation

  //naviguer vers le panier
  goToPanier(){
    this.router.navigate(['/panier']);
  }

  tabcart: Plant[] = []; //tableau des plantes dans le panier
  tabsearch: Plant[] = []; //tableau des plantes dans la recherche

  constructor(private palntService: PalntService) {} //service pour les plantes
  interval: any; //interval pour actualiser le panier

  ngOnInit(): void {
    this.tabcart = this.palntService.tabcart; //récupérer le panier
    console.log(this.tabcart);
    this.interval = setInterval(() => {
      this.tabcart = this.palntService.tabcart; //actualiser le panier
    }, 500);
  }

  //calculer le total du panier
  get total(): number {
    return this.tabcart.reduce((acc, plant) => acc + plant.price, 0);
  }


}
