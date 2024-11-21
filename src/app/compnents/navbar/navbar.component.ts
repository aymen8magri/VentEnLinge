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
  isNavbarCollapsed = true; 


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


}
