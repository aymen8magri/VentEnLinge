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
  tabplants: Plant[] = [];
  interval:any;
  constructor(private palntService: PalntService) {}

  ngOnInit(): void {
    this.tabplants = this.palntService.tabplants;
    console.log(this.tabplants);
    this.interval = setInterval(() => {
      this.tabplants = this.palntService.tabplants;
    }, 200);
  }

  clearAll(): void {
    this.palntService.clearWishlist();
    this.tabplants = this.palntService.tabplants;
  }
}
