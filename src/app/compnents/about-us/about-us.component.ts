import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
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
