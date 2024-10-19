import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './compnents/navbar/navbar.component';
import { FooterComponent } from './compnents/footer/footer.component';
import { BackToTopButtonComponent } from './compnents/back-to-top-button/back-to-top-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, BackToTopButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VentEnLinge';

}
