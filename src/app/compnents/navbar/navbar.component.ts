import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Plant } from '../../model/plant';
import { CurrencyPipe } from '@angular/common';
import { PalntService } from '../../services/palnt.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CurrencyPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router:Router=inject(Router);

  goToPanier(){
    this.router.navigate(['/panier']);
  }

  tabcart: Plant[] = [];

  constructor(private palntService: PalntService) {}

  ngOnInit(): void {
    this.tabcart = this.palntService.tabcart;
    console.log(this.tabcart);
  }

  get total(): number {
    return this.tabcart.reduce((acc, plant) => acc + plant.price, 0);
  }
  

}
