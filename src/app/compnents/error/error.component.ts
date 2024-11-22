import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

  router: Router = inject(Router); //service pour la navigation

  //rediriger vers la page d'accueil
  goHome() {
    this.router.navigate(['/']);
  }

}
