import { Component, inject } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [CurrencyPipe,FormsModule,RouterLink],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
  router:Router=inject(Router);

  goToPanier(){
   
    this.router.navigate(['/panier']);
  }

  tabcart: Plant[] = [];
  tabsearch: Plant[] = [];

  constructor(private palntService: PalntService) {}
  interval: any;

  ngOnInit(): void {
    this.tabcart = this.palntService.tabcart;
    console.log(this.tabcart);
    this.interval = setInterval(() => {
      this.tabcart = this.palntService.tabcart;
    }, 1000);
  }

  get total(): number {
    return this.tabcart.reduce((acc, plant) => acc + plant.price, 0);
  }

  searchTerm: string = '';


}
