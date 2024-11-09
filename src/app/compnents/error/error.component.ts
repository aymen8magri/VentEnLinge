import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

  router: Router = inject(Router);

  goHome() {
    this.router.navigate(['/']);
  }

}
