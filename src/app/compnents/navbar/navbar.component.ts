import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Plant } from '../../model/plant';
import { CurrencyPipe } from '@angular/common';
import { PalntService } from '../../services/palnt.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CurrencyPipe, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

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
    }, 500);
  }

  get total(): number {
    return this.tabcart.reduce((acc, plant) => acc + plant.price, 0);
  }

  searchTerm: string = '';

  search(){
    this.palntService.search(this.searchTerm).subscribe(plants => {
      this.tabsearch = plants;
      console.log(this.tabsearch);
    });
    console.log(this.searchTerm);
  }



}
