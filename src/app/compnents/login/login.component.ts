import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    authService:AuthService=inject(AuthService); //service pour l'authentification
    router:Router=inject(Router); //router pour la navigation
    loginForm!: FormGroup; //formulaire de connexion
    fb: FormBuilder = inject(FormBuilder); //builder pour le formulaire

  // initialisation du formulaire
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      pwd: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
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
  onEnvoyer() { 
    
    this.authService.login(this.user?.value,this.pwd?.value).subscribe(
      data=>{
        console.log(data);
        if(data){
          
          this.router.navigate(['/ListePlantesAdmin']);
        }
        else{
          const loginModal = new bootstrap.Modal(document.getElementById('loginModal')!);
          loginModal.show();
        }
      }
    )
  }
}
