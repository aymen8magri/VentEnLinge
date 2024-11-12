import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  // variables
  loginForm!: FormGroup;
  // form builder
  fb: FormBuilder = inject(FormBuilder);

  // initialisation du formulaire
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('admin')]],
      pwd: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('admin')]]
    })
  } 

  // getters
  get user() {
    return this.loginForm.get('user');
  }
  get pwd() {
    return this.loginForm.get('pwd');
  }
  
  // envoi du formulaire
  onEnvoyer() { }
}
