import { Component } from '@angular/core';

@Component({
  selector: 'app-back-to-top-button',
  standalone: true,
  imports: [],
  templateUrl: './back-to-top-button.component.html',
  styleUrl: './back-to-top-button.component.css'
})
export class BackToTopButtonComponent {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
