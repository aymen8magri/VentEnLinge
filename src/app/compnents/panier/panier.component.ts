import { Component } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {
  tabcart: Plant[] = [];


  constructor(private palntService: PalntService) {}

  ngOnInit(): void {
    this.tabcart = this.palntService.tabcart;
    console.log(this.tabcart);
  }

  get total(): number {
    return this.tabcart.reduce((acc, plant) => acc + plant.price, 0);
  }

  deleteFromCart(plant: Plant): void {
    this.palntService.deleteFromCart(plant);
    this.tabcart = this.palntService.tabcart; 
  }

  clearCart(): void {
    this.palntService.clearCart();
    this.tabcart = this.palntService.tabcart;
  }
}
