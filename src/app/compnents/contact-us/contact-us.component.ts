import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule,RouterLink,ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit{
 
  
  formHide:boolean=false;
  msgHide:boolean=true;
  mailForm!:FormGroup;
  fb:FormBuilder=inject(FormBuilder);
   ngOnInit(): void {
    this.mailForm=this.fb.group({
      prenom:['',Validators.required],
      nom:['',Validators.required],
      mail:['',[Validators.required,Validators.pattern('^.+@.+\\.[a-zA-Z]{2,}$')]],
      objet:['',Validators.required],
      message:['',Validators.required]
    })
  }

  get prenom(){
    return this.mailForm.get('prenom');
  }
  get nom(){
    return this.mailForm.get('nom');
  }
  get mail(){
    return this.mailForm.get('mail');
  }
  get objet(){
    return this.mailForm.get('objet');
  }
  get message(){
    return this.mailForm.get('message');
  }
  

  sendEmail() {
    const templateParams = {
      fname:this.prenom?.value,
      lname:this.nom?.value,
      mail:this.mail?.value,
      subject:this.objet?.value,
      message:this.message?.value
    };

    emailjs.send('service_x25gm4n', 'template_ds7tf14', templateParams, 'f3pmchZ2cLX7imTSh')
      .then((response: EmailJSResponseStatus) => {
        console.log(templateParams.message);
        console.log(templateParams.mail)
        console.log('Email sent successfully!', response.status, response.text);
        this.formHide=true;
        this.msgHide=false;
      })
      .catch((error) => {
        console.error('Failed to send email.', error);
      });
  } 

}
