import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { QuizComponent } from '../quiz/quiz.component';
import { ContactUsComponent } from "../contact-us/contact-us.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuizComponent, ContactUsComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  router:Router = inject(Router);
    onAboutUs(){
        this.router.navigate(['/aboutUs']);
    } 
    onShowAllPlants(){
        this.router.navigate(['/listePlantes']);
    }
}
