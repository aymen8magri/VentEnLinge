import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
