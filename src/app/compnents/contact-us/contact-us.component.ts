import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {

  // variables
  formHide: boolean = false;
  msgHide: boolean = true;
  mailForm!: FormGroup;
  // form builder
  fb: FormBuilder = inject(FormBuilder);

  // initialisation du formulaire
  ngOnInit(): void {
    this.mailForm = this.fb.group({
      prenom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      mail: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]],
      objet: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]]
    })
  }

  // getters
  get prenom() {
    return this.mailForm.get('prenom');
  }
  get nom() {
    return this.mailForm.get('nom');
  }
  get mail() {
    return this.mailForm.get('mail');
  }
  get objet() {
    return this.mailForm.get('objet');
  }
  get message() {
    return this.mailForm.get('message');
  }

  // envoi de l'email
  sendEmail() {
    const templateParams = {
      fname: this.prenom?.value,
      lname: this.nom?.value,
      mail: this.mail?.value,
      subject: this.objet?.value,
      message: this.message?.value
    };

    emailjs.send('service_x25gm4n', 'template_ds7tf14', templateParams, 'f3pmchZ2cLX7imTSh')
      .then((response: EmailJSResponseStatus) => {
        console.log(templateParams.message);
        console.log(templateParams.mail)
        console.log('Email sent successfully!', response.status, response.text);
        this.formHide = true;
        this.msgHide = false;
      })
      .catch((error) => {
        console.error('Failed to send email.', error);
      });
  }

}
