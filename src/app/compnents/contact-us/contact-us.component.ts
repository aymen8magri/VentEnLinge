import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  fname='';
  lname='';
  mail='';
  subject = '';
  message ='' ;

  sendEmail() {
    const templateParams = {
      fname:this.fname,
      lname:this.lname,
      mail:this.mail,
      subject:this.subject,
      message:this.message,
    };

    emailjs.send('service_x25gm4n', 'template_ds7tf14', templateParams, 'f3pmchZ2cLX7imTSh')
      .then((response: EmailJSResponseStatus) => {
        console.log(templateParams.message);
        console.log(templateParams.mail)
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Failed to send email.', error);
      });
  } 

}
