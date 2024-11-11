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
  total!:number


  constructor(private palntService: PalntService) {}

  ngOnInit(): void {
    this.tabcart = this.palntService.tabcart;
    console.log(this.tabcart);
    this.total=this.palntService.total();
  }

   
  deleteFromCart(plant: Plant): void {
    this.palntService.deleteFromCart(plant);
    this.tabcart = this.palntService.tabcart; 
    this.total=this.palntService.total();
  }

  clearCart(): void {
    this.palntService.clearCart();
    this.tabcart = this.palntService.tabcart;
    this.total=this.palntService.total();
    
  }
}
