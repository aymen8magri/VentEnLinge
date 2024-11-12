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
export class LoginComponent implements OnInit{
  
  loginForm!:FormGroup;
  fb:FormBuilder=inject(FormBuilder);

  ngOnInit(): void {
this.loginForm=this.fb.group({
  user:['',Validators.required],
  pwd:['',Validators.required]
})  }

get user(){
  return this.loginForm.get('user');
}
get pwd(){
  return this.loginForm.get('pwd');
}
onEnvoyer(){}
}
