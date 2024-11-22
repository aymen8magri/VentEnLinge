import { Component} from '@angular/core';
import { Plant } from '../../model/plant';
import { PlantItemComponent } from '../plant-item/plant-item.component';
import { PalntService } from '../../services/palnt.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [PlantItemComponent, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  tabplants: Plant[] = []; //liste des plantes dans wishlist
  interval:any; //interval pour rafraichir la liste des plantes dans wishlist
  constructor(private palntService: PalntService) {} //service pour les plantes

  //initialiser la liste des plantes dans wishlist et l'interval pour rafraichir la liste
  ngOnInit(): void {
    this.tabplants = this.palntService.tabplants;
    console.log(this.tabplants);
    //rafraichir la liste des plantes dans wishlist toutes les 200ms
    this.interval = setInterval(() => {
      this.tabplants = this.palntService.tabplants;
    }, 200);
  }

  //vider la wishlist
  clearAll(): void {
    this.palntService.clearWishlist();
    this.tabplants = this.palntService.tabplants;
  }
}
