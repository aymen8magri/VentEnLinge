import { Injectable } from '@angular/core';
import { Plant } from '../model/plant';
import { ListPlantsAdminComponent } from '../compnents/list-plants-admin/list-plants-admin.component';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor() { }

  addPlantToWishlist(plant: Plant): void {
    // Implementation for adding the plant to the wishlist
    console.log(plant);
    this.plants.push(plant);
  }
}
