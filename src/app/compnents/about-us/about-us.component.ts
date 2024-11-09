import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  router: Router = inject(Router);

  onContactUs() {
    this.router.navigate(['/contactUs']);
  }

  tabImg = [
    'logo.jpg',
    'logo.jpg',
    'logo.jpg',
    'logo.jpg',
    'logo.jpg',
    'logo.jpg',
  ]

}
